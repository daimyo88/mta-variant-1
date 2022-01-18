import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import CustomSelect from '../../inputs/CustomSelect';

import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    formCont: {
        width: '500px',
        paddingBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto'
        }
    },
    formItem: {
        marginBottom: '10px'
    }
}));

const Form = (receivedProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Formik
            initialValues = {
                receivedProps.initialValues
            }
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema= { Yup.object({
                freightType: Yup
                        .string()
                        .required(t('errors:required-field')),
                dateNomination: Yup
                        .string()
                        .required(t('errors:required-field')),
                user: Yup
                        .string()
                        .required(t('errors:required-field')),
            })}

            onSubmit= {(values, formik) => {
                receivedProps.submitHandler(values, formik);
            }}
        >
        {
            props => {
                const setField= (value, field) => {
                    props.setFieldValue(field, value);
                }

                return (
                <form onSubmit={props.handleSubmit} className={classes.formCont}>
                    <Grid container spacing={2} style={{marginTop: '20px'}}>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.freightType}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:freight-type')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'freightType')}}
                                name="freightType"
                                isrequired="true"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.dateNomination}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:date-nomination')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'dateNomination')}}
                                name="dateNomination"
                                isrequired="true"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.ship}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:ship-name')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'ship')}}
                                name="ship"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.user}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:ship-owner')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'user')}}
                                name="user"
                                isrequired="true"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipCategory}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:ship-category')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipCategory')}}
                                name="shipCategory"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.dwt}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:dwt')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'dwt')}}
                                name="dwt"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipVolume}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:volume')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipVolume')}}
                                name="shipVolume"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipLength}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:ship-length')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipLength')}}
                                name="shipLength"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipWidth}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:width')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipWidth')}}
                                name="shipWidth"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipProductGroup}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:ship-product-group')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipProductGroup')}}
                                name="shipProductGroup"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipCoated}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:coated')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipCoated')}}
                                name="shipCoated"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipHeated}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:heated')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipHeated')}}
                                name="shipHeated"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipPiping}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:piping')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipPiping')}}
                                name="shipPiping"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipProfile}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:profile')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipProfile')}}
                                name="shipProfile"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.tanksQuantity}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:tanks-quantity')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'tanksQuantity')}}
                                name="tanksQuantity"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.shipFlag}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:flag')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'shipFlag')}}
                                name="shipFlag"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.productGroup}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:product-group')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'productGroup')}}
                                name="productGroup"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.productGroupOther}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:product-group-other')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'productGroupOther')}}
                                name="productGroupOther"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.loadedTons}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:loaded-tons')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'loadedTons')}}
                                name="loadedTons"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.loadingPort}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:loading-port')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'loadingPort')}}
                                name="loadingPort"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.deliveryPort}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:delivery-port')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'deliveryPort')}}
                                name="deliveryPort"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.dominantArea}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:dominant-area')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'dominantArea')}}
                                name="dominantArea"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.freightPricePerTon}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:freight-price-ton')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'freightPricePerTon')}}
                                name="freightPricePerTon"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.lumpsumFreight}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:lumpsum-freight')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'lumpsumFreight')}}
                                name="lumpsumFreight"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.rentalPriceDay}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:rental-price-day')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'rentalPriceDay')}}
                                name="rentalPriceDay"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.standbyPricePerHour}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:standby-price')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'standbyPricePerHour')}}
                                name="standbyPricePerHour"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.standbyHours}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:standby-hours')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'standbyHours')}}
                                name="standbyHours"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.sailingTime}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:sailing-time')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'sailingTime')}}
                                name="sailingTime"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.startDateContract}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:contract-start-date')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'startDateContract')}}
                                name="startDateContract"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.endDateContract}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:contract-end-date')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'endDateContract')}}
                                name="endDateContract"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.miniTC}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:mini-tc')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'miniTC')}}
                                name="miniTC"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.engineRoomFreeOfCharge}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:engine-room-free-of-charge')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'engineRoomFreeOfCharge')}}
                                name="engineRoomFreeOfCharge"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.portFees}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:port-fees')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'portFees')}}
                                name="portFees"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.channelCostsFree}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:channel-costs-free')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'channelCostsFree')}}
                                name="channelCostsFree"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.emptyDaysBeforeTrip}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:empty-days-before-trip')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'emptyDaysBeforeTrip')}}
                                name="emptyDaysBeforeTrip"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.comment}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:comment')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'comment')}}
                                name="comment"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} className={classes.formItem}>
                            <CustomSelect
                                value={ props.values.commentDate}
                                placeholder={t('translation:select-field')}
                                label={ t('translation:comment-date')}
                                options={ receivedProps.valuesSet } 
                                changeHandler={(e) => {setField(e.target.value, 'commentDate')}}
                                name="commentDate"
                            />
                        </Grid>

                    </Grid>

                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">
                                { t('translation:import') } 
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