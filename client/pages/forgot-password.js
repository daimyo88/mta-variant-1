import Public from '../layouts/Public';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Container, Paper } from '@material-ui/core';

import Api from '../axios/Api';

import IntroHeading from '../components/text/IntroHeading';
import IntroLogo from '../components/logo/IntroLogo';
import ForgotPasswordForm from '../components/forms/auth/ForgotPassword';
import Loader from '../components/loaders/Loader';

export default function Page() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);

  const forgotPassword = async (formData, formik) => {
    setLoading(true); 
    try {      
      await Api.post('/api/auth/forgot-password', formData );
      formik.resetForm({email: ''});
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    
}

  return (
    <Public> 
        <Container maxWidth={"xs"}>
            <Paper style={{ position: 'relative', padding: "30px 24px", margin: '70px 0 20px'}}>
                <IntroLogo />
                <IntroHeading text={ t('translation:forgot-password-heading') } />
                { <ForgotPasswordForm submitHandler={ forgotPassword } /> }
                { isLoading && <Loader /> }
            </Paper>
        </Container>    
    </Public>
  )
}