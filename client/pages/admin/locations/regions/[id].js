import React, { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation';
import useSWR from "swr";
import {useRouter} from 'next/router';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import PageTitle from '../../../../components/text/PageTitle';
import Admin from '../../../../layouts/Admin';
import Api from '../../../../axios/Api';
import Loader from '../../../../components/loaders/Loader';

import RegionForm from '../../../../components/forms/locations/Region';
import useUser from '../../../../hooks/useUser';
import Modal from '../../../../components/modals/Modal';

const fetcher = url => Api.get(url);

export default function Page() {
    const theme = useTheme();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { mutate } =  useSWR("/api/locations/regions/" + router.query.id, fetcher);
    const region = useSWR("/api/locations/regions/" + router.query.id, fetcher).data?.data;
    const user = useUser();
    const [deleteModal, setDeleteModal] = useState(false);

    const initialValues = {
        name: region?.name || '',
    }

    const updateRegion = async (values, formik) => {
        try {
            setLoading(true);
            await Api.patch('/api/locations/regions/' + router.query.id, values); 
            mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const deleteRegion = async (id) => {
        const data = {
            region: {
                _id: router.query.id
            }
        }
        
        try {
            setDeleteModal(false);
            await Api.post('/api/locations/regions/delete', data);
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
            { region && <PageTitle>
                { `${t('translation:region')}: ${region?.name}`}             
                <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                    <IconButton onClick={() => {setDeleteModal(true)}}>
                        <DeleteIcon />
                    </IconButton> 
                </Tooltip>  
            </PageTitle> }
            { loading && <Loader />}
            { !region && <Loader />}

            { region && <>
                <RegionForm 
                    submitButtonText={t('translation:submit')} 
                    initialValues={ initialValues } 
                    submitHandler={ updateRegion } 
                    cities = {region?.cities}
                />
            </> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deleteRegion }
                text= {t('modals:default-prefix') + t('modals:delete-location', { title: region?.name })}
            />

        </Admin>
    )
}