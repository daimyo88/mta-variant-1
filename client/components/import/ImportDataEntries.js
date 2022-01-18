import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import ImportDataEntriesForm from '../forms/data-entries/ImportDataEntries';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    closeButton: {
        position: 'absolute',
        right: '5px',
        top: '5px',
        color: theme.palette.text.primary,
    }
}));

const Import = (props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const arr = [];
        for (const property in props.items[0]) {
            arr.push({
                _id: property,
                title: property
            });
        } 
        arr.sort();
        arr.unshift({
            _id: '',
            title: t('translation:select-field')
        });
        setValues(arr);
    },[props.items, t]);

    const [initialValues, setInitialValues] = useState({
        freightType: '',
        dateNomination: '',
        comment: '',
        commentDate: '',
        user: '',
        ship: '',
        shipLength: '',
        shipCategory: '',
        dwt: '',
        shipWidth: '',
        shipVolume: '',
        shipProductGroup: '',
        shipCoated: '',
        shipHeated: '',
        shipPiping: '',
        shipProfile: '',
        tanksQuantity: '',
        shipFlag: '',
//spot-market
        productGroup: '',
        productGroupOther: '',
        loadedTons: '',
        loadingPort: '',
        deliveryPort: '',
        // area: '',
        freightPricePerTon: '',
        lumpsumFreight: '',
        standbyPricePerHour: '',
        standbyHours: '',
        sailingTime: '',
        emptyDaysBeforeTrip: '',
//timecharter
        startDateContract: '',
        endDateContract: '',
        // dominantProductGroup: '',
        // dominantProductGroupOther: '',
        dominantArea: '',
        miniTC: '',
        engineRoomFreeOfCharge: '',
        portFees: '',
        channelCostsFree: '',
        rentalPriceDay: '',
        // sailingTime: '',
        // emptyDaysBeforeTrip: ''
    }); 

    useEffect(() => {
        let schema = localStorage.getItem('dataEntriesSchema');
        let updatedObject = {};

        if(schema) {
            schema = JSON.parse(schema);
            for (const property in schema) {
                let check = schema[property];
                for (const itemProperty in props.items[0]) {
                    if(check === itemProperty) {
                        updatedObject[property] = itemProperty
                    }
                } 
            } 
        setInitialValues({
            ...initialValues,
            ...updatedObject
        });
        }
    },[props.items]);


    return (
        <Dialog onClose={props.cancelHandler} open={props.show}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={props.cancelHandler}>
                <CloseIcon />
            </IconButton>
            <MuiDialogContent>
                <Typography variant="h2" align="center">
                    { t('translation:adjust-the-fields')}
                </Typography>
                <ImportDataEntriesForm
                    initialValues={ initialValues } 
                    submitHandler={ props.submitHandler } 
                    valuesSet= { values }
                />
            </MuiDialogContent>
        </Dialog>
    )
}

export default Import;