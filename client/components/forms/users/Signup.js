import React, { useState } from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import CustomInput from '../../inputs/CustomInput';
import CustomInputPassword from '../../inputs/CustomInputPassword';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles( theme => ({
    inputCont: {
        marginBottom: '15px'
    },
    privacyLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;
    const [showPassword, setShowPassword] = useState(false);

    const privacyPolicyLabel = (
        <>
          <span>{ t('translation:privacy-policy-consent-text') }</span>
          <Link href="/privacy-policy">
                <a className={classes.privacyLink }target="blank">
                     { t('translation:privacy-policy-consent-link-text') }
                </a>   
            </Link>
        </>
      )

    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                firstName: Yup.string()
                .required(t('errors:required-field')),
              lastName: Yup.string()
                .required(t('errors:required-field')),
              password: Yup.string()
                .required(t('errors:required-field'))
                .min(8, t('errors:password-length'))
                .max(16, t('errors:password-length')),
              privacyPolicyConsent: Yup.bool()
                .oneOf([true], t('errors:privacy-policy')),
              repeatPassword: Yup.string()
                .required(t('errors:required-field'))
                .min(8, t('errors:password-length'))
                .max(16, t('errors:password-length'))
                .test('match passwords',t('errors:passwords-should-match'), function() {
                  return this.parent.password === this.parent.repeatPassword     
                })

            })}

            onSubmit= {(values, formik) => {
                props.submitHandler(values, formik);
            }}
        >
        {
            props => {

                const setCheckbox = (event) => {
                    props.setFieldValue(event.target.name, event.target.checked);
                }

                return (
                <form onSubmit={props.handleSubmit}>


                        <div className={classes.inputCont}>
                            <CustomInput 
                                name="firstName"
                                type="text"
                                label={t('translation:first-name')} 
                                isrequired="true"
                            />
                        </div>
                        <div className={classes.inputCont}>
                            <CustomInput 
                                name="lastName"
                                type="text"
                                label={t('translation:last-name')} 
                                isrequired="true"
                            />
                        </div>
                        <Grid item xs={12} className={classes.inputCont}>
                            <CustomInputPassword
                                name="password"
                                label={t('translation:password')} 
                                isrequired="true"
                                changeHandler={() => setShowPassword(!showPassword)}
                                showPassword = { showPassword }
                            />
                        </Grid>
                        <div className={classes.inputCont}>
                            <CustomInputPassword
                                name="repeatPassword"
                                type="password"
                                label={t('translation:repeat-password')} 
                                isrequired="true"
                                changeHandler={() => setShowPassword(!showPassword)}
                                showPassword = { showPassword }
                            />
                        </div>
                        <div className={classes.inputCont}>
                            <FormControl error={!!props.errors.privacyPolicyConsent}>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={props.values.privacyPolicyConsent}
                                        onChange={ setCheckbox }
                                        name="privacyPolicyConsent"
                                        color="primary"
                                    />
                                    }
                                    label={ privacyPolicyLabel }
                                />
                                { props.errors.privacyPolicyConsent && <FormHelperText>{props.errors.privacyPolicyConsent}</FormHelperText>}
                            </FormControl>
                        </div>

                    <Grid container justifyContent="center" style={{'marginTop':'25px'}}>
                        <Button type="submit" variant="contained" color="primary">
                            { submitButtonText } 
                        </Button>
                    </Grid>
                </form> 
                )
            }
        }
        </Formik>
    )
}

export default Form;