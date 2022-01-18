import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import useTranslation from 'next-translate/useTranslation';
import {formatDate} from '../../utils/formatDate';

const useStyles = makeStyles( theme => ({
    container: {
        maxWidth: '600px'
    },
    dataRow: {
        padding: '5px 0',
        fontSize: '15px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px'
        }
    }

}));

const freightData = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const info = props.data;
    return (
            <Grid 
                className={classes.container} 
                container
            >
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:contract-start-date')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    { info?.startDateContract ? formatDate(info?.startDateContract) : '' }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:contract-end-date')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.endDateContract ? formatDate(info?.endDateContract) : ''}
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:mini-tc')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.miniTC ? t('translation:yes') : t('translation:no') }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:dominant-product-group')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.dominantProductGroupOther || t(`product-groups:${info?.dominantProductGroup}`) }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:dominant-area')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.dominantArea }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:engine-room-free-of-charge')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.engineRoomFreeOfCharge ? t('translation:yes') : t('translation:no') }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:port-fees')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.portFees ? t('translation:yes') : t('translation:no') }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:channel-costs-free')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.channelCostsFree ? t('translation:yes') : t('translation:no') }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:rental-price-day')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info?.rentalPriceDay ? info?.rentalPriceDay + ' €' : ''}
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:sailing-time')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    { info?.sailingTime ? info?.sailingTime + ' ' + t('translation:hours') : ''}
                </Grid>
                { info?.emptyDaysBeforeTrip && <>
                    <Grid item xs={6} className={classes.dataRow}>
                        <b>{t('translation:empty-days-before-trip')}:</b>
                    </Grid>
                    <Grid item xs={6} className={classes.dataRow}>
                        { info?.emptyDaysBeforeTrip }
                    </Grid>
                </> }
            </Grid>
    )
}

export default freightData;