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

import TransportForm from '../../../components/forms/transports/TransportForm';
import Modal from '../../../components/modals/Modal';

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState(false);
    const transportSWR = useSWR("/api/transports/" + router.query.id, fetcher);
    const transportData = transportSWR.data?.data;

    const initialValues = {
        model: transportData?.vehicleModel || '',
        maxWeight: transportData?.maxWeight || '',
        category: transportData?.category || '',
        height: transportData?.height || '',
        volume: transportData?.volume || '',
        coated: transportData?.coated || false,
    }

    const updateTransport = async (values, formik) => {
        try {
            setLoading(true);
            await Api.patch('/api/transports/' + router.query.id, values); 
            transportSWR.mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const deleteTransport = async (id) => {
        const data = {
            transport: {
                _id: router.query.id
            }
        }
      try {
          setDeleteModal(false);
          await Api.post('/api/transports/delete', data);
          router.push('/admin/transports?pp=&p=&s=');
        } catch(e) {
            console.log(e);
        } 
    }

    return (
        <Admin> 
            { !transportSWR.data && <Loader />}

            { transportSWR.data && <>
                <PageTitle>
                        { `${t('translation:transport')}: ${transportData?.vehicleModel}`}
                        <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                        <IconButton onClick={() => {setDeleteModal(true)}}>
                            <DeleteIcon />
                        </IconButton> 
                    </Tooltip> 
                </PageTitle> 

                { loading && <Loader />}
                <TransportForm 
                    submitButtonText={t('translation:submit')} 
                    initialValues={ initialValues } 
                    submitHandler={ updateTransport } 
                /></> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deleteTransport }
                text= {t('modals:default-prefix') + t('modals:delete-transport', { name: transportData?.vehicleModel })}
            />
        </Admin>
    )
}