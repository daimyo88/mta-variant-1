import React, { useState, useEffect } from 'react';
import Public from '../../layouts/Public';
import useTranslation from 'next-translate/useTranslation';
import { Container, Paper, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import Api from '../../axios/Api';
import useUser from '../../hooks/useUser';

import IntroHeading from '../../components/text/IntroHeading';
import IntroLogo from '../../components/logo/IntroLogo';
import SignupForm from '../../components/forms/users/Signup';

import FormLoader from '../../components/loaders/Loader';
import Loader from '../../components/loaders/OverlapLoader';
import { useRouter } from 'next/router';

const useStyles = makeStyles( theme => ({

}));

export default function Login() {
  const { t } = useTranslation();
  const user = useUser();
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles(theme);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    privacyPolicyConsent: false,
});

useEffect(() => {
  const checkToken = async() => {
      const data = {
          token: router.query?.token
      }
      try {      
          const response = await Api.post('/api/auth/check-email-url-token/', data );
          setInitialValues({
            ...initialValues,
            firstName: response.data?.firstName,
            lastName: response.data?.lastName,
          })
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

  const signup = async (values, formik) => {
    try {
        setFormLoading(true);
        const response = await Api.post('/api/users/profile/complete', values); 
        user.mutate(response.data);
        router.push('/admin/stats');
      } catch(e) {
        console.log(e);   
      } finally {
        setFormLoading(false);
      }
  }

  return (
    <Public> 
        <Container maxWidth={"xs"}>
            <Paper style={{ position: 'relative', padding: "30px 24px", margin: '20px 0'}}>
                { !loading && <IntroLogo /> }
                { !loading && !error && <>
                <IntroHeading text={ t('translation:create-account-heading') } />
                <SignupForm 
                  initialValues = { initialValues }
                  submitHandler={ signup } 
                  submitButtonText = {t('translation:submit')}
                /> 
                </>}
            { formLoading && <FormLoader />}
            { loading && <Loader /> }
            { error && <MuiAlert elevation={6} variant="filled" severity="error">
                        { error }
                    </MuiAlert>}
            </Paper>
        </Container>    
    </Public>
  )
}
