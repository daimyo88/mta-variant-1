import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useUser from '../../../hooks/useUser';
import CustomInput from '../../inputs/CustomInput';
import CustomSelect from '../../inputs/CustomSelect';

const useStyles = makeStyles( theme => ({
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;
    const user = useUser();

    const roles = [          
        {
          _id: 'admin',
          title: t('translation:role-admin')
        },
        {
            _id: 'user',
            title: t('translation:role-user')
        }
        ]

    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                firstName: Yup
                    .string()
                    .required(t('errors:required-field')),
                lastName: Yup
                    .string()
                    .required(t('errors:required-field')),
                email: Yup
                    .string()
                    .required(t('errors:required-field'))
                    .email(t('errors:invalid-email')),
                role: Yup
                    .string()
                    .required(t('errors:required-field')),

            })}

            onSubmit= {(values, formik) => {
                props.submitHandler(values, formik);
            }}
        >
        {
            props => {

                const setField = (value, field) => {
                    props.setFieldValue(field, value);
                }

                return (
                <form onSubmit={props.handleSubmit}>

                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:personal-data')}
                    </Typography>
                    
                    <Grid container spacing={2} >
                        <Grid item md={4} sm={6} xs={12}>
                            <CustomInput 
                                name="firstName"
                                type="text"
                                label={t('translation:first-name')} 
                                isrequired="true"
                        />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CustomInput 
                                name="lastName"
                                type="text"
                                label={t('translation:last-name')} 
                                isrequired="true"
                            />
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                            <CustomInput 
                                name="email"
                                type="email"
                                label={t('translation:email')} 
                                isrequired="true"
                                tip={t('translation:change-email-tip')}
                            />
                        </Grid>
                        { ['admin'].includes(user.data?.role) && <Grid item md={4} sm={6} xs={12}>
                            <CustomSelect
                                id="role"
                                name="plan"
                                label={ t('translation:user-role') }
                                changeHandler={(e) => {setField(e.target.value, 'role')}}
                                isrequired="true"
                                options={roles}
                                value={props.values.role}
                                error={props.errors.role}
                            /></Grid> }
                        
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