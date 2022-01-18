import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import useTranslation from 'next-translate/useTranslation'; 
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../../inputs/auth/Email';
import CustomInputPassword from '../../inputs/auth/Password';

import { Button, Grid } from '@material-ui/core';


const useStyles = makeStyles( theme => ({
    inputCont: {
        marginBottom: '25px'
    },
}));

const ForgotPasswordForm = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    return (
        <Formik
         initialValues = {{
            email: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema= { Yup.object({
            email: Yup.string()
              .required(t('errors:required-field'))
              .email(t('errors:invalid-email')),
          })}

        onSubmit= {(values, formik) => {
            props.submitHandler(values, formik);
        }}
        >
            <Form noValidate>
                <div className={classes.inputCont}>
                    <CustomInput 
                        name="email"
                        type="text"
                        placeholder={t('translation:email')} 
                    />
                </div>

                <Grid container style={{marginTop: '30px'}} justifyContent="center">
                    <Button variant="contained" color="primary" type="submit">
                        {t('translation:submit')}
                    </Button>
                </Grid>
            </Form >

        </Formik>
    )
}

export default ForgotPasswordForm;