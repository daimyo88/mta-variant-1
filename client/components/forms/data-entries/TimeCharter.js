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
import CustomSelect from '../../inputs/CustomSelect';;
import CustomInput from '../../inputs/CustomInput';

import setInteger from '../../../utils/form-helpers/setInteger';
import setPrice from '../../../utils/form-helpers/setPrice';
import CustomDatePicker from '../../inputs/CustomDatePicker';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CustomSwitch from '../../inputs/CustomSwitch';
import Divider from '../../ui/Divider';

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
            _id: 'unknown',
            title: t('translation:unknown')
        },
        {
            _id: 'other',
            title: t('translation:other')
        },
    ];

    const portAreas = props.locations;

    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                dominantProductGroupOther: Yup
                    .string()
                    .test('required-field',t('errors:required-field'), function(value) {
                        if(this.parent.dominantProductGroup === 'other') {
                            return value;     
                        } else return true;
                    }),
                startDateContract: Yup
                    .string()
                    .nullable()
                    .required(t('errors:required-field')),
                endDateContract: Yup
                    .string()
                    .nullable()
                    .required(t('errors:required-field')),
                dominantProductGroup: Yup
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
                    if(field === 'dominantProductGroup' && value !== 'other') {
                        props.setFieldValue('dominantProductGroupOther', '');
                    }
                    if (value === undefined) {
                        return;
                    }
                    props.setFieldValue(field, value);
                }

                const setCheckbox = (event) => {
                    props.setFieldValue(event.target.name, event.target.checked);
                }

                return (
                <form onSubmit={props.handleSubmit} className={classes.cont}>
                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:dates')}
                    </Typography>
                    <Grid container spacing={2} >

                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomDatePicker
                                label={ t('translation:contract-start-date') }
                                changeHandler={(value) => {setField(value, 'startDateContract')}}
                                isrequired="true"
                                value={props.values.startDateContract}
                                error={props.errors.startDateContract}
                                maxDate={props.values.endDateContract}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomDatePicker
                                label={ t('translation:contract-end-date') }
                                changeHandler={(value) => {setField(value, 'endDateContract')}}
                                isrequired="true"
                                value={props.values.endDateContract}
                                error={props.errors.endDateContract}
                                minDate={props.values.startDateContract}
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12} style={{marginBottom: '15px'}}>
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={props.values.miniTC}
                                        onChange={ setCheckbox }
                                        name="miniTC"
                                        color="primary"
                                    />
                                    }
                                label={ t('translation:mini-tc') }
                            />
                        </Grid>
                    </Grid>

                    <Typography 
                        variant="h3" 
                        color="textSecondary"
                        >
                        { t('translation:freight')}
                    </Typography>

                    <Grid container spacing={2} >

                            <Grid item lg={4} sm={6} xs={12}>
                                <CustomSelect
                                    id="dominantProductGroup"
                                    name="dominantProductGroup"
                                    label={ t('translation:dominant-product-group') }
                                    changeHandler={(e) => {setField(e.target.value, 'dominantProductGroup')}}
                                    isrequired="true"
                                    options={productGroups}
                                    value={props.values.dominantProductGroup}
                                    error={props.errors.dominantProductGroup}
                                />

                                { props.values.dominantProductGroup === 'other' && <CustomInput 
                                    name="dominantProductGroupOther"
                                    type="text"
                                    label={t('product-groups:other-product-group')} 
                                    isrequired="true"
                                /> }

                            </Grid>

                            <Grid item lg={4} sm={6} xs={12}>
                                <CustomSelectTitle
                                    id="dominantArea"
                                    name="dominantArea"
                                    label={ t('translation:dominant-area') }
                                    changeHandler={(e) => {setField(e.target.value, 'dominantArea')}}
                                    isrequired="true"
                                    options={portAreas}
                                    value={props.values.dominantArea}
                                    error={props.errors.dominantArea}
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
                        <Grid item lg={4} sm={6} xs={12} >
                            <CustomSwitch 
                                value = {props.values.engineRoomFreeOfCharge}
                                onChange={ setCheckbox }
                                name="engineRoomFreeOfCharge"
                                color="primary"
                                label={ t('translation:engine-room-free-of-charge') }
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSwitch 
                                value = {props.values.portFees}
                                onChange={ setCheckbox }
                                name="portFees"
                                color="primary"
                                label={ t('translation:port-fees') }
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomSwitch 
                                value = {props.values.channelCostsFree}
                                onChange={ setCheckbox }
                                name="channelCostsFree"
                                color="primary"
                                label={ t('translation:channel-costs-free') }
                            />
                        </Grid>

                        <Grid item lg={4} sm={6} xs={12}>
                            <CustomInput 
                                name="rentalPriceDay"
                                type="number"
                                label={t('translation:rental-price-day')} 
                                isrequired="true"
                                onBlur={(e) => setPrice(e, "rentalPriceDay", props.setFieldValue, 15000)}
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


                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item className={classes.buttonCont} style={{marginBottom: '15px'}}>
                            <Button variant="contained" onClick={goBack}>
                                { t('translation:back-to-general-details') }
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonCont}>
                            <Button type="submit" variant="contained" color="primary">
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