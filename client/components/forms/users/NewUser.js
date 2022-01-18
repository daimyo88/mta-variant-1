import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../../inputs/CustomInput';
import CustomSelect from '../../inputs/CustomSelect';

const useStyles = makeStyles( theme => ({
    cont: {
        maxWidth: '400px',
        marginBottom: '30px'
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;

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

                    <div className={classes.cont}>
                            <CustomInput 
                                name="email"
                                type="email"
                                label={t('translation:email')} 
                                isrequired="true"
                            />
                            <CustomInput 
                                name="firstName"
                                type="text"
                                label={t('translation:first-name')} 
                            />
                            <CustomInput 
                                name="lastName"
                                type="text"
                                label={t('translation:last-name')} 
                            />
                            <CustomSelect
                                id="role"
                                name="role"
                                label={ t('translation:user-role') }
                                changeHandler={(e) => {setField(e.target.value, 'role')}}
                                isrequired="true"
                                options={roles}
                                value={props.values.role}
                                error={props.errors.role}
                            />

                    </div> 
    
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