import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'; 
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
    button: {
        textTransform: 'none',
        margin: '0 0 20px auto',
        '& a': {
            color: theme.palette.type === 'light' ? theme.palette.primary.main : '#ffffff',
            fontWeight: '600',
            textDecoration: 'none'
        },
        '& a:hover': {
            textDecoration: 'none'
        }
    }
    }));

const LoginForm = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Formik
         initialValues = {{
            email: '',
            password: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema= { Yup.object({
            email: Yup.string()
              .required(t('errors:required-field'))
              .email(t('errors:invalid-email')),
            password: Yup.string()
              .required(t('errors:required-field'))
              .min(8, t('errors:password-length'))
              .max(16, t('errors:password-length')),
          })}

        onSubmit= {(values) => {
            props.submitHandler(values);
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
                <div className={classes.inputCont}>
                    <CustomInputPassword
                        name="password"
                        type="password"
                        placeholder={t('translation:password')} 
                        changeHandler={() => setShowPassword(!showPassword)}
                        showPassword = { showPassword }
                        />
                    </div>

                <Grid container style={{marginTop: '30px'}} justifyContent="center">
                    <Button variant="contained" color="primary" type="submit">
                        {t('translation:login-heading')}
                    </Button>
                </Grid>
            </Form >

        </Formik>
    )
}

export default LoginForm;