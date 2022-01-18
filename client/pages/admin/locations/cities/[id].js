import React, { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation';
import useSWR from "swr";
import {useRouter} from 'next/router';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PageTitle from '../../../../components/text/PageTitle';
import Admin from '../../../../layouts/Admin';
import Api from '../../../../axios/Api';
import Loader from '../../../../components/loaders/Loader';

import PortForm from '../../../../components/forms/locations/City';
import useUser from '../../../../hooks/useUser';
import Modal from '../../../../components/modals/Modal';

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { mutate } =  useSWR("/api/locations/ports/" + router.query.id, fetcher);
    const port = useSWR("/api/locations/ports/" + router.query.id, fetcher).data?.data;
    const portAreas =  useSWR("/api/locations/port-areas", fetcher).data?.data;
    const user = useUser();
    const [deleteModal, setDeleteModal] = useState(false);

    const portInitialValues = {
        title: port?.title || '',
        portArea: port?.portArea || ''
    }

    const updatePort = async (values, formik) => {
        try {
            setLoading(true);
            await Api.patch('/api/locations/ports/' + router.query.id, values); 
            mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const deletePort = async (id) => {
        const data = {
            port: {
                _id: router.query.id
            }
        }
        
        try {
            setDeleteModal(false);
            await Api.post('/api/locations/ports/delete', data);
            router.push('/admin/locations?pp=&p=&s=');
        } catch(e) {
            console.log(e);
        } 
    }

    useEffect(() => {
        if(user.data && !['admin'].includes(user.data?.role) ) {
            router.push('/');
        }
    },[user]);

    return (
        <Admin> 
            { port && <PageTitle>
                { `${t('translation:port')}: ${port?.title}`}             
                <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                    <IconButton onClick={() => {setDeleteModal(true)}}>
                        <DeleteIcon />
                    </IconButton> 
                </Tooltip>  
            </PageTitle> }
            { loading && <Loader />}
            { !portAreas && !port && <Loader />}

            { portAreas && <PortForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ portInitialValues } 
                submitHandler={ updatePort } 
                portAreas = { portAreas }
            /> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deletePort }
                text= {t('modals:default-prefix') + t('modals:delete-location', { title: port?.title })}
            />

        </Admin>
    )
}