import React, {useState} from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../../inputs/CustomInputPassword';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    marginBottom: {
        marginBottom: '20px'
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
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

            onSubmit= {(values, formik) => {
                props.submitHandler(values, formik);
            }}
        >
        {
            props => {

                return (
                <form onSubmit={props.handleSubmit}>
                    <Typography variant="h3" color="textSecondary" className={classes.marginBottom}>
                        {t('translation:new-password')}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12} >
                            <CustomInput 
                                name="newPassword"
                                label={t('translation:password')} 
                                isrequired="true"
                                changeHandler={() => setShowPassword(!showPassword)}
                                showPassword = { showPassword }
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CustomInput 
                                name="newPasswordRepeat"
                                type="password"
                                label={t('translation:repeat-password')} 
                                isrequired="true"
                                changeHandler={() => setShowPassword(!showPassword)}
                                showPassword = { showPassword }
                            />
                        </Grid>
                    </Grid> 
      
                    <Button type="submit" variant="contained" color="primary">
                        { submitButtonText } 
                    </Button>
                </form> 
                )
            }
        }
        </Formik>
    )
}

export default Form;