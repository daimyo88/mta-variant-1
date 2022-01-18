import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useSWR from "swr";
import { useRouter } from 'next/router';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Public from '../../layouts/Public';
import { Container, Paper } from '@material-ui/core';

import ResetPasswordForm from '../../components/forms/auth/ResetPassword';

import IntroHeading from '../../components/text/IntroHeading';
import IntroLogo from '../../components/logo/IntroLogo';
import FormLoader from '../../components/loaders/Loader';
import Loader from '../../components/loaders/OverlapLoader';

import Api from '../../axios/Api';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles( theme => ({
  noMarginTop: {
    marginTop: '5px'
},
}));

export default function Page() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkToken = async (formData) => {
            const data = {
                token: router.query?.token
            }
            try {      
                await Api.post('/api/auth/check-reset-password-token/', data );
            } catch(e) {
                let errorText = e.response?.data?.message || e.message;
                setError(t(`errors:${errorText}`))
            } finally {
                setLoading(false);
            }
            
        }
        if(router.query?.token) {
            checkToken();
        }
    },[router]);

    const resetPassword  = async (values, formik) => {
        try {
            setFormLoading(true);
            await Api.post('/api/auth/reset-password', values); 
            router.push('/login');
          } catch(e) {
            console.log(e);   
          } finally {
            setFormLoading(false);
          }
    }

    return (
        <Public> 
            <Container maxWidth={"xs"}>
                <Paper style={{ position: 'relative', padding: "30px 24px", margin: '70px 0 20px'}}>
                    { loading && <div style={{'height': '150px'}}><Loader /></div>}
                    { !loading && <IntroLogo /> }
                    { !loading && !error && <>
                    <IntroHeading text={ t('translation:reset-password-heading') } />
                    <ResetPasswordForm 
                        submitButtonText={t('translation:submit')} 
                        submitHandler={ resetPassword } 
                    /></>}
                    { formLoading && <FormLoader />}
                    { error && <MuiAlert elevation={6} variant="filled" severity="error">
                        { error }
                    </MuiAlert>}
                </Paper>
            </Container>
        </Public>
    )
}