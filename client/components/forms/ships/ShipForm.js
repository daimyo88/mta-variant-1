import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomInput from '../../inputs/CustomInput';
import CustomSelect from '../../inputs/CustomSelect';
import CustomSwitch from '../../inputs/CustomSwitch';

import getShipCategory from '../../../utils/getShipCategory';

import setInteger from '../../../utils/form-helpers/setInteger';

const useStyles = makeStyles( theme => ({
    cont: {
        marginBottom: '30px'
    },
    shipCategory: {
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

    const productGroupOptions = [
        {
            _id: '',
            title: t('translation:select-product-group')
        },
        {
            _id: 'black',
            title: t('translation:black')
        },
        {
            _id: 'blank',
            title: t('translation:blank')
        },
    ]

    const pipingOptions = [
        {
            _id: '',
            title: t('translation:select')
        },
        {
            _id: 'single',
            title: t('translation:single')
        },
        {
            _id: 'double',
            title: t('translation:double')
        },
    ]

    const profileOptions = [
        {
            _id: '',
            title: t('translation:select')
        },
        {
            _id: 'A1',
            title: 'A1'
        },
        {
            _id: 'A2',
            title: 'A2'
        },
        {
            _id: 'B',
            title: 'B'
        },
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
                shipName: Yup
                    .string()
                    .required(t('errors:required-field')),
                dwt: Yup
                    .string()
                    .required(t('errors:required-field')),
                shipLength: Yup
                    .string()
                    .required(t('errors:required-field')),
                dwt: Yup
                    .string()
                    .required(t('errors:required-field')),
                shipWidth: Yup
                     .string()
                     .required(t('errors:required-field')),
                shipVolume: Yup
                     .string()
                     .required(t('errors:required-field')),
                productGroup: Yup
                     .string()
                     .required(t('errors:required-field')),
                piping: Yup
                     .string()
                     .required(t('errors:required-field')),
                shipProfile: Yup
                     .string()
                     .required(t('errors:required-field')),
                tanksQuantity: Yup
                     .string()
                     .required(t('errors:required-field')),
                flag: Yup
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
                                        name="shipName"
                                        type="text"
                                        label={t('translation:ship-name')} 
                                        isrequired="true"
                                    />
                                </Grid>
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="shipLength"
                                        type="number"
                                        label={t('translation:ship-length')} 
                                        isrequired="true"
                                        onBlur={(e) => setInteger(e, "shipLength", props.setFieldValue)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="dwt"
                                        type="number"
                                        label={t('translation:dwt')} 
                                        isrequired="true"
                                        onBlur={(e) => {
                                                setInteger(e, "dwt", props.setFieldValue);
                                                props.setFieldValue('shipCategory', getShipCategory(props.values.dwt));
                                            }
                                        }
                                    />
                                    { !!getShipCategory(props.values.dwt) && <Grid container justifyContent="space-between" className={classes.shipCategory}>
                                        <Grid item>
                                            <b>{t('translation:ship-category')} :</b>
                                        </Grid>
                                        <Grid item>
                                            {getShipCategory(props.values.dwt)}
                                        </Grid>
                                    </Grid> }
                                </Grid>
             
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="shipWidth"
                                        type="number"
                                        label={t('translation:width')} 
                                       isrequired="true"
                                        onBlur={(e) => { setInteger(e, "shipWidth", props.setFieldValue) }
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
                               
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomSelect
                                        id="productGroup"
                                        name="productGroup"
                                        label={ t('translation:product-group') }
                                        changeHandler={(e) => {setField(e.target.value, 'productGroup')}}
                                        options={ productGroupOptions }
                                        value={props.values.productGroup}
                                        error={props.errors.productGroup}
                                        isrequired="true"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomSelect
                                        id="piping"
                                        name="piping"
                                        label={ t('translation:piping') }
                                        changeHandler={(e) => {setField(e.target.value, 'piping')}}
                                        options={ pipingOptions }
                                        value={props.values.piping}
                                        error={props.errors.piping}
                                        isrequired="true"
                                    />
                                </Grid>
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomSelect
                                        id="shipProfile"
                                        name="shipProfile"
                                        label={ t('translation:profile') }
                                        changeHandler={(e) => {setField(e.target.value, 'shipProfile')}}
                                        options={ profileOptions }
                                        value={props.values.shipProfile}
                                        error={props.errors.shipProfile}
                                        isrequired="true"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="tanksQuantity"
                                        type="number"
                                        label={t('translation:tanks-quantity')} 
                                        isrequired="true"
                                        onBlur={(e) => { setInteger(e, "tanksQuantity", props.setFieldValue) }
                                        }
                                        />  
                                </Grid>  
                                <Grid item lg={4} sm={6} xs={12}>
                                    <CustomInput 
                                        name="flag"
                                        type="text"
                                        label={t('translation:flag')} 
                                        isrequired="true"
                                    />  
                                </Grid>
                            </Grid> 

                            <Grid container spacing={2} style={{marginBottom: '15px'}}>
                                <Grid item lg={4} sm={6} xs={12} style={{marginBottom: '15px', marginTop:'-10px'}}>
                                    <CustomSwitch 
                                        value = {props.values.coated}
                                        onChange={ setCheckbox }
                                        name="coated"
                                        color="primary"
                                        label={ t('translation:coated') }
                                    />
                                </Grid>
                                <Grid item lg={4} sm={6} xs={12} style={{marginBottom: '15px', marginTop:'-10px'}}>
                                    <CustomSwitch 
                                        value = {props.values.heated}
                                        onChange={ setCheckbox }
                                        name="heated"
                                        color="primary"
                                        label={ t('translation:heated') }
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