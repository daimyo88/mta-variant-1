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
    }));

const ResetPasswordForm = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Formik
         initialValues = {{
            newPassword: '',
            newPasswordRepeat: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema= { Yup.object({
            newPassword: Yup.string()
                .trim()
                .required(t('errors:required-field'))
                .min(8, t('errors:password-length'))
                .max(16, t('errors:password-length')),
            newPasswordRepeat: Yup.string()
                .trim()
                .required(t('errors:required-field'))
                .min(8, t('errors:password-length'))
                .max(16, t('errors:password-length'))
                .test('match passwords',t('errors:passwords-should-match'), function() {
                    if(this.parent.newPassword) {
                        return this.parent.newPassword === this.parent.newPasswordRepeat;     
                    } else return true;
                }),
          })}

        onSubmit= {(values) => {
            props.submitHandler(values);
        }}
        >
            <Form noValidate>
                <div className={classes.inputCont}>
                    <CustomInputPassword
                        name="newPassword"
                        type="newPassword"
                        placeholder={t('translation:password')} 
                        changeHandler={() => setShowPassword(!showPassword)}
                        showPassword = { showPassword }
                        />
                </div>
                <div className={classes.inputCont}>
                    <CustomInputPassword
                        name="newPasswordRepeat"
                        type="newPasswordRepeat"
                        placeholder={t('translation:repeat-password')} 
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

export default ResetPasswordForm;