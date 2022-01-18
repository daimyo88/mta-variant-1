import React, { useState } from "react";
import Link from 'next/link';
import useSWR from "swr";
import AddIcon from '@material-ui/icons/Add';
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Loader from '../../../components/loaders/OverlapLoader';
import FormLoader from '../../../components/loaders/Loader';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Api from '../../../axios/Api';
import useUser from '../../../hooks/useUser';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import GeneralFieldsForm from '../../../components/forms/data-entries/GeneralFields';
import SpotMarketForm from '../../../components/forms/data-entries/SpotMarket';
import TimeCharterForm from '../../../components/forms/data-entries/TimeCharter';
import Divider from '../../../components/ui/Divider';
import FreightGeneralData from '../../../components/dataDisplay/FreightGeneralData';
import TimeCharterData from '../../../components/dataDisplay/TimeCharterData';
import SpotMarketData from '../../../components/dataDisplay/SpotMarketData';


const fetcher = url => Api.get(url);

const useStyles = makeStyles( theme => ({
    commentCont: {
        maxWidth: '600px',
        marginTop: '10px',
        borderTop: `1px solid ${theme.palette.secondary.main}`
    },
    comment: {
        width: '100%'
    },
    buttonCont: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    }
}));

const generalDataShchema = {        
    freightType: 'spot-market',
    dateNomination: null,
    ship: '',
    shipLength: '',
    shipCategory: '',
    dwt: '',
    shipWidth: '',
    shipVolume: '',
    shipProductGroup: '',
    shipCoated: false,
    shipHeated: false,
    shipPiping: '',
    shipProfile: '',
    tanksQuantity: '',
    shipFlag: ''
}

const spotMarketSchema = {
    productGroup: '',
    productGroupOther: '',
    loadedTons: '',
    loadingPort: '',
    deliveryPort: '',
    area: '',
    freightPricePerTon: '',
    lumpsumFreight: '',
    standbyPricePerHour: '',
    standbyHours: '',
    sailingTime: '',
    emptyDaysBeforeTrip: '',
    submitType: ''
}

const timeCharterSchema = {
    startDateContract: null,
    endDateContract: null,
    dominantProductGroup: '',
    dominantProductGroupOther: '',
    dominantArea: '',
    miniTC: false,
    engineRoomFreeOfCharge: false,
    portFees: false,
    channelCostsFree: false,
    rentalPriceDay: '',
    sailingTime: '',
    emptyDaysBeforeTrip: ''
}

export default function Page() {
    const {t} = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = useUser().data;
    const data = useSWR(user && "/api/data-entries/populate-data?uid=" + user?._id, fetcher).data?.data;
    const theme = useTheme();
    const classes = useStyles(theme);

    const ports = [];

    data?.locations.forEach(el => {
        if(el.ports.length) {
            ports.push({
                ...el,
                categoryTitle: true
            });
            el.ports.forEach(el => {
                ports.push(el);
            })
        }
    });
    
    const [generalData, setGeneralData] = useState(generalDataShchema);
    const [spotMarketData, setSpotMarketData] = useState([spotMarketSchema]);
    const [timeCharterData, setTimeCharterData] = useState(timeCharterSchema);
    const [comment, setComment] = useState('');

    function getSteps() {
        return [t('translation:general-details'), t('translation:freight-details'), t('translation:overview')];
    }

    const steps = getSteps();

    const goToFirstStep = () => {
        setSpotMarketData([spotMarketSchema]);
        setTimeCharterData(timeCharterSchema);
        setActiveStep(0);
        setComment('');
    }

    const submitGeneralFields = (values) => {
        setGeneralData(values);
        setActiveStep(1);
    }

    const submitSpotMarketForm = (values, formik) => {
        const currentFreightData = [...spotMarketData];
        currentFreightData.pop();
        if (values.submitType === 'submit') {
            currentFreightData.push({...values});
            setSpotMarketData(currentFreightData);
            setActiveStep(2);
        } 
        if (values.submitType === 'add') {
            currentFreightData.push({...values});
            currentFreightData.push(spotMarketSchema);
            formik.resetForm();
            setSpotMarketData(currentFreightData);
        } 
    }

    const submitTimeCharterForm = (values) => {
        setTimeCharterData(values);
        setActiveStep(2);
    }

    const removeProductGroup = (index) => {
        const currentFreightData = [...spotMarketData];
        currentFreightData.splice(index, 1);
        setSpotMarketData(currentFreightData);
    }

    const createDataEntry = async () => {
        try {
            let freightData = generalData.freightType === 'spot-market' ? spotMarketData : timeCharterData;
            let data = {
                ...generalData,
                freightData,
                comment,
                userId: user?._id 
            }
            setLoading(true);
            await Api.post("/api/data-entries", data);
            setSpotMarketData([spotMarketSchema]);
            setTimeCharterData(timeCharterSchema);
            setGeneralData(generalDataShchema);
            setActiveStep(0);
            setComment('');
        } finally {
            setLoading(false);
        }

    }

    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <GeneralFieldsForm 
                    initialValues = { generalData }
                    submitHandler={ submitGeneralFields }
                    ships={data?.ships || []}
                />
            );
          case 1:
            return (
                <>
                    {generalData.freightType === 'spot-market' && <>
                    <SpotMarketData 
                        removeHandler={removeProductGroup}
                        data={spotMarketData.slice(0, spotMarketData.length - 1)}
                        />
                    <SpotMarketForm 
                        initialValues = {spotMarketData.length ? spotMarketData[spotMarketData.length - 1] : spotMarketSchema}
                        submitHandler={ submitSpotMarketForm }
                        locations={data?.locations || [] }   
                        ports={ ports || [] }  
                        goBack={goToFirstStep} 
                    /> </>}
                    {generalData.freightType === 'time-charter' && 
                    <TimeCharterForm
                        initialValues = { timeCharterData }
                        submitHandler={ submitTimeCharterForm }
                        locations={data?.locations || [] }  
                        goBack={goToFirstStep}   
                    />}
                </>
            )
          case 2:
            return (
                <div style={{paddingTop: '10px'}}>
                    <FreightGeneralData data={generalData}/>
                    <Typography 
                        variant="h3" 
                        color="primary"
                        style={{marginBottom: '10px', marginTop: '15px'}}
                    >
                        { t('translation:freight-details')}
                    </Typography>
                    {generalData.freightType === 'time-charter' && 
                        <TimeCharterData data={timeCharterData}/>
                    }
                    {generalData.freightType === 'spot-market' &&
                        <SpotMarketData data={spotMarketData}/>
                    }
                    <div className={classes.commentCont}>
                        <Typography 
                            variant="h3" 
                            color="primary"
                            style={{marginBottom: '10px', marginTop: '15px'}}
                        >
                            { t('translation:comment')}
                        </Typography>
                        <TextField 
                            name="comment"
                            type="text"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            variant="outlined"
                            className={classes.comment}
                            minRows={3}
                            multiline={true}
                            color="secondary"
                        />
                    </div>
                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item className={classes.buttonCont} style={{marginBottom: '15px'}}>
                            <Button variant="contained" onClick={() => {setActiveStep(1); setComment('');}}>
                                { t('translation:back-to-freight-details') }
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonCont}>
                            <Button onClick={createDataEntry} variant="contained" color="primary">
                                { t('translation:confirm') }
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )
          default:
            return null;
        }
    }

    return (
        <Admin> 
            <PageTitle>
                { t('translation:new-entry')}
            </PageTitle>
            { loading && <FormLoader />}
            { !data && <Loader />}
            { data && !!data?.ships.length && <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                        </StepContent>
                    </Step>
                ))}
            </Stepper> }
            { data && !data?.ships.length && <>
                <Typography 
                    variant="h3" 
                    style={{marginBottom: '25px', marginTop: '15px'}}
                >
                    {t('translation:create-ship-before-adding-data')}
                </Typography> 
                <Link href="/admin/ships/new">
                    <Button
                        variant="contained" 
                        color="primary"
                        endIcon={<AddIcon/>}
                    >
                        {t('translation:add-ship')} 
                    </Button>
                </Link>
            </>}
        </Admin>
    )
}