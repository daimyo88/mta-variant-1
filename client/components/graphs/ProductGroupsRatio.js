import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useSWR from "swr";
import PageTitle from '../text/PageTitle';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomSelect from '../inputs/CustomSelect';
import PieChart from '../dataDisplay/stats/PieChart';
import startOfDay from 'date-fns/startOfDay'
import subDays from 'date-fns/subDays'
import endOfDay from 'date-fns/endOfDay'
import Loader from '../loaders/OverlapLoader';

import Api from '../../axios/Api';

const useStyles = makeStyles( theme => ({
    chartCont: {
        width: 'calc(100% - 250px)',
        minHeight: '600px',
        '@media(max-width: 1600px)': {
          minHeight: '450px',
        },
        '@media(max-width: 1400px)': {
            minHeight: '360px',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '150px',
            width: '100%',
            order: 2
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            order: 2
        }
    },
    filterCont: {
        width: '250px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            order: 1
        }
    },
    periodLabel: {
        fontWeight: 'bold'
    },
    noData: {
        height: '100%',
        fontSize: '20px',
        fontWeight: 'bold'
    }
  }));

let today = new Date();
const startDate = startOfDay(subDays(today, 30));
today = endOfDay(today);

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [startPeriod, setStartPeriod] = useState(startDate);
    const [endPeriod, setEndPeriod] = useState(today);
    const [freightType, setFreightType] = useState('all');
    const [shipCategory, setShipCategory] = useState('all');
    const [area, setArea] = useState('all');

    const portAreas =  useSWR("/api/locations/port-areas", fetcher).data?.data;
    
    const { data, mutate } = useSWR(
        portAreas && "/api/stats/product-groups-ratio?start="+ startPeriod +"&end="+ endPeriod +"&ft=" + freightType + "&sc=" + shipCategory + "&da=" + area, fetcher);

    const freightOptions = [
        {
            _id: 'all',
            title: t('translation:all')
        },
        {
            _id: 'spot-market',
            title: t('translation:spot-market')
        },
        {
            _id: 'time-charter',
            title: t('translation:time-charter')
        },
    ]

    const shipCategories = [
        {
            _id: 'all',
            title: t('translation:all')
        },
        {
            _id: '0 - 1999',
            title: '0 - 1999'
        },
        {
            _id: '2000 - 3299',
            title: '2000 - 3299'
        },
        {
            _id: '3300 - 4499',
            title: '3300 - 4499'
        },
        {
            _id: '4500 - 6499',
            title: '4500 - 6499'
        },
        {
            _id: '6500+',
            title: '6500+'
        },
    ]

    const areas = [
        {
            _id: 'all',
            title: t('translation:all')
        }
    ]

    portAreas?.map(el => {
        const newArea = {
            _id: el.title,
            title: el.title
        };
        areas.push(newArea);
    });

    return (
        <div style={{paddingBottom: '15px'}}> 
            <Grid container >
                <PageTitle>
                    { `${t('translation:ratio-of-product-groups')} `}
                </PageTitle>
            </Grid>
            <Grid container spacing={2} >
                <Grid item className={classes.chartCont} >
                    { !data && <Loader /> }
                    { data && !!data?.data?.all?.length && <PieChart data = { data?.data } /> }

                    { data && !data?.data?.all?.length && 
                        <Grid container className={classes.noData} justifyContent="center" alignItems="center">
                            <Grid item>{t('translation:no-data')}</Grid>
                        </Grid>}
                </Grid>
                <Grid item className={classes.filterCont}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomDatePicker
                                value={startPeriod}
                                label={ t('translation:date-from') }
                                changeHandler={(value) => {setStartPeriod(value)}}
                                maxDate={endPeriod}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomDatePicker
                                value={endPeriod}
                                label={ t('translation:date-to') }
                                changeHandler={(value) => {setEndPeriod(value)}}
                                minDate={startPeriod}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="freightType"
                                label={ t('translation:freight-type') }
                                changeHandler={(e) => {setFreightType(e.target.value);}}
                                options={freightOptions}
                                value={freightType}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="shipCategory"
                                label={ t('translation:ship-category') }
                                changeHandler={(e) => {setShipCategory(e.target.value)}}
                                options={shipCategories}
                                value={shipCategory}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="area"
                                label={ t('translation:dominant-area') }
                                changeHandler={(e) => {setArea(e.target.value)}}
                                options={areas}
                                value={area}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}