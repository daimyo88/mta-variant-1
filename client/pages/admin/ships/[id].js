import React, { useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';
import useSWR from "swr";
import {useRouter} from 'next/router';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import ShipForm from '../../../components/forms/ships/ShipForm';
import Modal from '../../../components/modals/Modal';

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState(false);
    const shipSWR = useSWR("/api/ships/" + router.query.id, fetcher);
    const shipData = shipSWR.data?.data;

    const initialValues = {
        shipName: shipData?.title || '',
        dwt: shipData?.dwt || '',
        shipLength: shipData?.shipLength || '',
        shipCategory: shipData?.shipCategory || '',
        shipWidth: shipData?.shipWidth || '',
        shipVolume: shipData?.shipVolume || '',
        productGroup: shipData?.productGroup || '',
        coated: shipData?.coated || false,
        piping: shipData?.piping || '',
        heated: shipData?.heated || false,
        shipProfile: shipData?.shipProfile || '',
        flag: shipData?.flag || '',
        tanksQuantity: shipData?.tanksQuantity || ''
    }

    const updateShip = async (values, formik) => {
        try {
            setLoading(true);
            await Api.patch('/api/ships/' + router.query.id, values); 
            shipSWR.mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const deleteShip = async (id) => {
        const data = {
            ship: {
                _id: router.query.id
            }
        }
      try {
          setDeleteModal(false);
          await Api.post('/api/ships/delete', data);
          router.push('/admin/ships?pp=&p=&s=');
        } catch(e) {
            console.log(e);
        } 
    }

    return (
        <Admin> 
            { !shipSWR.data && <Loader />}

            { shipSWR.data && <>
                <PageTitle>
                        { `${t('translation:ship')}: ${shipData?.title}`}
                        <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                        <IconButton onClick={() => {setDeleteModal(true)}}>
                            <DeleteIcon />
                        </IconButton> 
                    </Tooltip> 
                </PageTitle> 

                { loading && <Loader />}
                <ShipForm 
                    submitButtonText={t('translation:submit')} 
                    initialValues={ initialValues } 
                    submitHandler={ updateShip } 
                /></> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deleteShip }
                text= {t('modals:default-prefix') + t('modals:delete-ship', { name: shipData?.title })}
            />
        </Admin>
    )
}