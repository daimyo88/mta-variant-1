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

import PortAreaForm from '../../../../components/forms/locations/PortArea';
import useUser from '../../../../hooks/useUser';
import Modal from '../../../../components/modals/Modal';

const useStyles = makeStyles( theme => ({


  }));

const fetcher = url => Api.get(url);

export default function Page() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { mutate } =  useSWR("/api/locations/port-areas/" + router.query.id, fetcher);
    const portArea = useSWR("/api/locations/port-areas/" + router.query.id, fetcher).data?.data;
    const user = useUser();
    const [deleteModal, setDeleteModal] = useState(false);

    const initialValues = {
        title: portArea?.title || '',
    }

    const updatePortArea = async (values, formik) => {
        try {
            setLoading(true);
            await Api.patch('/api/locations/port-areas/' + router.query.id, values); 
            mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const deletePortArea = async (id) => {
        const data = {
            portArea: {
                _id: router.query.id
            }
        }
        
        try {
            setDeleteModal(false);
            await Api.post('/api/locations/port-areas/delete', data);
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
            { portArea && <PageTitle>
                { `${t('translation:port-area')}: ${portArea?.title}`}             
                <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                    <IconButton onClick={() => {setDeleteModal(true)}}>
                        <DeleteIcon />
                    </IconButton> 
                </Tooltip>  
            </PageTitle> }
            { loading && <Loader />}
            { !portArea && <Loader />}

            { portArea && <>
                <PortAreaForm 
                    submitButtonText={t('translation:submit')} 
                    initialValues={ initialValues } 
                    submitHandler={ updatePortArea } 
                    ports = {portArea?.ports}
                />
            </> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deletePortArea }
                text= {t('modals:default-prefix') + t('modals:delete-location', { title: portArea?.title })}
            />

        </Admin>
    )
}