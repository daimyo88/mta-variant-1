import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import CustomSelectTitle from '../../inputs/CustomSelectTitle';
import CustomSelect from '../../inputs/CustomSelect';
import CustomInput from '../../inputs/CustomInput';

import setInteger from '../../../utils/form-helpers/setInteger';
import setPrice from '../../../utils/form-helpers/setPrice';

import Divider from '../../../components/ui/Divider';

const useStyles = makeStyles( theme => ({
    cont: {
        paddingTop: '15px'
    },
    buttonCont: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const goBack = props.goBack;

    const productGroups = [
        {
            _id: '',
            title: t('translation:select-product-group')
        },
        {
            _id: 'gasoil-and-gasoil-components',
            title: t('product-groups:gasoil-and-gasoil-components')
        },
        {
            _id: 'gasoline-and-components',
            title: t('product-groups:gasoline-and-components')
        },
        {
            _id: 'chemicals',
            title: t('product-groups:chemicals')
        },
        {
            _id: 'heavy-products',
            title: t('product-groups:heavy-products')
        },
        {
            _id: 'biodiesel',
            title: t('product-groups:biodiesel')
        },
        {
            _id: 'other',
            title: t('translation:other')
        },
    ];

    const ports = props.ports;
    const portAreas = props.locations;
    const initialValues = props.initialValues;

    return (
        <Formik
            initialValues = {
                initialValues 
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                productGroup: Yup
                    .string()
                    .required(t('errors:required-field')),
                loadedTons: Yup
                    .string()
                    .required(t('errors:required-field')),
                productGroupOther: Yup
                    .string()
                    .test('required-field',t('errors:required-field'), function(value) {
                        if(this.parent.productGroup === 'other') {
                            return value;     
                        } else return true;
                    }),
                loadingPort: Yup
                    .string()
                    .required(t('errors:required-field')),
                deliveryPort: Yup
                    .string()
                    .required(t('errors:required-field')),
                area: Yup
                    .string()
                    .required(t('errors:required-field')),
                freightPricePerTon: Yup
                    .string()
                    .required(t('errors:required-field')),
                lumpsumFreight: Yup
                    .string()
                    .required(t('errors:required-field')),
                standbyPricePerHour: Yup
                    .string()
                    .required(t('errors:required-field')),
                standbyHours: Yup
                    .string()
                    .required(t('errors:required-field')),
                sailingTime: Yup
                    .string()
                    .required(t('errors:required-field')),

            })}

            onSubmit= {(values, formik ) => {         
                props.submitHandler(values, formik);
            }}
        >
        {
            props => {

                const setField = (value, field) => {
                    if (value === undefined) {
                        return;
                    }
                    props.setFieldValue(field, value);
                }

                return (
                <form className={classes.cont}>
                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:freight')}
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSelect
                                id="productGroup"
                                name="productGroup"
                                label={ t('translation:product-group') }
                                changeHandler={(e) => {setField(e.target.value, 'productGroup')}}
                                isrequired="true"
                                options={productGroups}
                                value={props.values.productGroup}
                                error={props.errors.productGroup}
                            />

                            { props.values.productGroup === 'other' && <CustomInput 
                                name="productGroupOther"
                                type="text"
                                label={t('product-groups:other-product-group')} 
                                isrequired="true"
                            /> }

                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="loadedTons"
                                type="number"
                                label={t('translation:loaded-tons')} 
                                isrequired="true"
                                onBlur={(e) => setInteger(e, "loadedTons", props.setFieldValue, 12000)}
                                tip={t('translation:metric-tons')}
                            />
                        </Grid>
                    </Grid>

                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:locations')}
                    </Typography>

                    <Grid container spacing={2} >
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSelectTitle
                                id="loadingPort"
                                name="loadingPort"
                                label={ t('translation:loading-port') }
                                changeHandler={(e) => {setField(e.target.value, 'loadingPort')}}
                                isrequired="true"
                                options={ports}
                                value={props.values.loadingPort}
                                error={props.errors.loadingPort}
                                categoryGroup="ports"
                            //    disabled={props.values.deliveryPort}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSelectTitle
                                id="deliveryPort"
                                name="deliveryPort"
                                label={ t('translation:delivery-port') }
                                changeHandler={(e) => {setField(e.target.value, 'deliveryPort')}}
                                isrequired="true"
                                options={ports}
                                value={props.values.deliveryPort}
                                error={props.errors.deliveryPort}
                                categoryGroup="ports"
                              //  disabled={props.values.loadingPort}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSelectTitle
                                id="area"
                                name="area"
                                label={ t('translation:dominant-area') }
                                changeHandler={(e) => {setField(e.target.value, 'area')}}
                                isrequired="true"
                                options={portAreas}
                                value={props.values.area}
                                error={props.errors.area}
                            />
                        </Grid>
                    </Grid>

                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:prices')}
                    </Typography>

                    <Grid container spacing={2} >
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="freightPricePerTon"
                                type="number"
                                label={t('translation:freight-price-ton')} 
                                isrequired="true"
                                onBlur={(e) => setPrice(e, "freightPricePerTon", props.setFieldValue, 100)}
                                tip={t('translation:price-tip')}
                            />    
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="lumpsumFreight"
                                type="number"
                                label={t('translation:lumpsum-freight')} 
                                isrequired="true"
                                onBlur={(e) => setPrice(e, "lumpsumFreight", props.setFieldValue)}
                                tip={t('translation:price-tip')}
                            />    
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="standbyPricePerHour"
                                type="number"
                                label={t('translation:standby-price')} 
                                isrequired="true"
                                onBlur={(e) => setPrice(e, "standbyPricePerHour", props.setFieldValue)}
                                tip={t('translation:price-tip')}
                            />    
                        </Grid>
                    </Grid>

                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:time')}
                    </Typography>

                    <Grid container spacing={2} >
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="standbyHours"
                                type="number"
                                label={t('translation:standby-hours')} 
                                isrequired="true"
                                onBlur={(e) => setInteger(e, "standbyHours", props.setFieldValue)}
                            />    
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="sailingTime"
                                type="number"
                                label={t('translation:sailing-time')} 
                                isrequired="true"
                                onBlur={(e) => setInteger(e, "sailingTime", props.setFieldValue)}
                                tip={t('translation:in-hours')}
                            />    
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="emptyDaysBeforeTrip"
                                type="number"
                                label={t('translation:empty-days-before-trip')} 
                                onBlur={(e) => setInteger(e, "emptyDaysBeforeTrip", props.setFieldValue)}
                            />    
                        </Grid>
                    </Grid>

                    <Button onClick={() => {setField('add','submitType');props.handleSubmit()}} variant="contained" color="primary">
                        { t('translation:add-product-group') }
                    </Button>

                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item className={classes.buttonCont} style={{marginBottom: '15px'}}>
                            <Button variant="contained" onClick={goBack}>
                                { t('translation:back-to-general-details') }
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonCont}>
                            <Button onClick={() => {setField('submit','submitType');props.handleSubmit()}} variant="contained" color="primary">
                                { t('translation:to-overview') }
                            </Button>
                        </Grid>
                    </Grid>
                </form> 
                )
            }
        }
        </Formik>
    )
}

export default Form;