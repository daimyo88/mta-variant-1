import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomInput from '../../inputs/CustomInput';
import CustomSwitch from '../../inputs/CustomSwitch';


import getTransportCategory from '../../../utils/getTransportCategory';
import setInteger from '../../../utils/form-helpers/setInteger';

const useStyles = makeStyles( theme => ({
    cont: {
        marginBottom: '30px'
    },
    category: {
        marginTop: '-10px',
        marginBottom: '25px',
        fontSize: '16px',
        '& b': {
            marginLeft: '5px'
        }
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;

    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                model: Yup
                    .string()
                    .required(t('errors:required-field')),
                maxWeight: Yup
                    .string()
                    .required(t('errors:required-field')),
                height: Yup
                    .string()
                    .required(t('errors:required-field')),
                volume: Yup
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

                const setCheckbox = (event) => {
                    props.setFieldValue(event.target.name, event.target.checked);
                }

                return (
                    <>
                        <form onSubmit={props.handleSubmit}>

                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="model"
                                        type="text"
                                        label={t('translation:model')} 
                                        isrequired="true"
                                    />
                                </Grid>
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="maxWeight"
                                        type="number"
                                        label={t('translation:max-weight')} 
                                        isrequired="true"
                                        onBlur={(e) => {
                                            setInteger(e, "maxWeight", props.setFieldValue);
                                            props.setFieldValue('сategory', getTransportCategory(props.values.maxWeight));
                                        }
                                    }
                                    />
                                    { !!getTransportCategory(props.values.maxWeight) && <Grid container justifyContent="space-between" className={classes.category}>
                                        <Grid item>
                                            <b>{t('translation:transport-category')} :</b>
                                        </Grid>
                                        <Grid item>
                                            {getTransportCategory(props.values.maxWeight)}
                                        </Grid>
                                    </Grid> }
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="height"
                                        type="number"
                                        label={t('translation:height')} 
                                        isrequired="true"
                                        onBlur={(e) => { setInteger(e, "height", props.setFieldValue) }}          
                                    />

                                </Grid>
             
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="volume"
                                        type="number"
                                        label={t('translation:volume')} 
                                       isrequired="true"
                                        onBlur={(e) => { setInteger(e, "volume", props.setFieldValue) }
                                        }
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="shipVolume"
                                        type="number"
                                        label={t('translation:volume')} 
                                        isrequired="true"
                                        onBlur={(e) => { setInteger(e, "shipVolume", props.setFieldValue) }
                                        }
                                    />
                                </Grid>
                               
                                <Grid item lg={4} sm={6} xs={12} style={{marginBottom: '15px', marginTop:'-10px'}}>
                                    <CustomSwitch 
                                        value = {props.values.coated}
                                        onChange={ setCheckbox }
                                        name="coated"
                                        color="primary"
                                        label={ t('translation:coated') }
                                    />
                                </Grid>
                            </Grid>
             
                            <Button type="submit" variant="contained" color="primary">
                                { submitButtonText } 
                            </Button>
                        </form>
                    </>
                )
            }
        }
        </Formik>
    )
}

export default Form;