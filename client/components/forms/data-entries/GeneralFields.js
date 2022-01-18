import React from 'react';
import { Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import CustomSelect from '../../inputs/CustomSelect';
import CustomDatePicker from '../../inputs/CustomDatePicker';

const useStyles = makeStyles( theme => ({
    cont: {
        maxWidth: '300px',
        paddingTop: '15px'
    },
    additionalInfo: {
        marginTop: '-15px',
        marginBottom: '15px',
        '& p': {
            margin: 0,
            marginBottom: '5px'
        }
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();

    const freightOptions = [
        {
            _id: 'spot-market',
            title: t('translation:spot-market')
        },
        {
            _id: 'time-charter',
            title: t('translation:time-charter')
        },
    ]

    const ships = [{
        _id: '',
        title: t('translation:select-ship'),
        dwt: '',
        category: '',
        length: '',
        width: ''
    }]

    props.ships.forEach(el => {
        ships.push({
            _id: el.title,
            title: el.title,
            dwt: el.dwt,
            category: el.shipCategory,
            length: el.shipLength,
            width: el.shipWidth,
            volume: el.shipVolume,
            productGroup: el.productGroup,
            coated: el.coated,
            piping: el.piping,
            heated: el.heated,
            shipProfile: el.shipProfile,
            flag: el.flag,
            tanksQuantity: el.tanksQuantity
        });
    });

    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                freightType: Yup
                    .string()
                    .required(t('errors:required-field')),
                dateNomination: Yup
                    .string()
                    .nullable()
                    .required(t('errors:required-field')),
                ship: Yup
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
                    if(field === 'ship') {
                        const currentShip = ships.find(el => el._id === value);
                        props.setFieldValue('shipCategory', currentShip.category);
                        props.setFieldValue('dwt', currentShip.dwt);
                        props.setFieldValue('shipLength', currentShip.length);
                        props.setFieldValue('shipWidth', currentShip.width);
                        props.setFieldValue('shipVolume', currentShip.volume);
                        props.setFieldValue('shipProductGroup', currentShip.productGroup);
                        props.setFieldValue('shipCoated', currentShip.coated);
                        props.setFieldValue('shipHeated', currentShip.heated);
                        props.setFieldValue('shipPiping', currentShip.piping);
                        props.setFieldValue('shipProfile', currentShip.shipProfile);
                        props.setFieldValue('tanksQuantity', currentShip.tanksQuantity);
                        props.setFieldValue('shipFlag', currentShip.flag);
                    }
                    props.setFieldValue(field, value);
                }


                return (
                    <form onSubmit={props.handleSubmit} className={classes.cont}>

                        <CustomSelect
                                id="freightType"
                                name="freightType"
                                label={ t('translation:freight-type') }
                                changeHandler={(e) => {setField(e.target.value, 'freightType')}}
                                isrequired="true"
                                options={freightOptions}
                                value={props.values.freightType}
                                error={props.errors.freightType}
                            />

                        <CustomDatePicker
                            label={ t('translation:date-nomination') }
                            changeHandler={(value) => {setField(value, 'dateNomination')}}
                            isrequired="true"
                            value={props.values.dateNomination}
                            error={props.errors.dateNomination}
                        />

                        <CustomSelect
                                id="ship"
                                name="ship"
                                label={ t('translation:ship') }
                                changeHandler={(e) => {setField(e.target.value, 'ship')}}
                                isrequired="true"
                                options={ships}
                                value={props.values.ship}
                                error={props.errors.ship}
                            />
                        {props.values.shipCategory && <div className={classes.additionalInfo}>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:ship-length')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipLength}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:width')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipWidth}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:dwt')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.dwt}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:ship-category')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipCategory}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:volume')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipVolume}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:product-group')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipProductGroup ? t(`translation:${props.values.shipProductGroup }`) : ''}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:piping')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipPiping ? t(`translation:${props.values.shipPiping}`) : '' }
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:coated')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipCoated ? t('translation:yes') : t('translation:no')}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:heated')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipHeated ? t('translation:yes') : t('translation:no')}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:profile')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipProfile}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:tanks-quantity')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.tanksQuantity}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <b><p>
                                        {t('translation:flag')}:
                                    </p></b>
                                </Grid>
                                <Grid item>
                                    <p>
                                        {props.values.shipFlag}
                                    </p>
                                </Grid>
                            </Grid>
                        </div>}

                        <Button type="submit" variant="contained" color="primary">
                            { t('translation:to-the-freight-fields') }
                        </Button>
                    </form> 
                )
            }
        }
        </Formik>
    )
}

export default Form;