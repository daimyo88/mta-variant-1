import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import useTranslation from 'next-translate/useTranslation';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

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
    },
    divider: {
        paddingTop: '10px',
        marginBottom: '10px',
        borderBottom: `1px solid #ccc`
    }
}));

const freightData = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const info = props.data;
    return (
            <div className={classes.container} >
                { info?.map((el, i, arr) => {
                    return (
                        <React.Fragment key={ 'data_' + i }>
                            <Grid container >
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:product-group')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.productGroupOther || t(`product-groups:${el?.productGroup}`) }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:loaded-tons')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.loadedTons }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:loading-port')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.loadingPort }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:delivery-port')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.deliveryPort }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:dominant-area')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.area }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:freight-price-ton')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.freightPricePerTon ? el?.freightPricePerTon + ' €' : '' }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:lumpsum-freight')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.lumpsumFreight ? el?.lumpsumFreight +' €' : '' }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:standby-price')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.standbyPricePerHour ? el?.standbyPricePerHour + ' €' : '' }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:standby-hours')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.standbyHours ? el?.standbyHours + ' ' + t('translation:hours') : '' }
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    <b>{t('translation:sailing-time')}:</b>
                                </Grid>
                                <Grid item xs={6} className={classes.dataRow}>
                                    {el?.sailingTime ? el?.sailingTime + ' ' + t('translation:hours') : '' }
                                </Grid>
                                { el?.emptyDaysBeforeTrip && <>
                                    <Grid item xs={6} className={classes.dataRow}>
                                        <b>{t('translation:empty-days-before-trip')}:</b>
                                    </Grid>
                                    <Grid item xs={6} className={classes.dataRow}>
                                        { el?.emptyDaysBeforeTrip }
                                    </Grid>
                                </> }
                                { props.removeHandler && <Grid item xs={12} style={{marginTop: '10px'}}>
                                        <Button 
                                            size="small"
                                            variant="contained"
                                            onClick={() => props.removeHandler(i)}
                                            endIcon={<DeleteIcon/>}
                                        >
                                        { t('translation:delete-product-group') }
                                        </Button>
                                </Grid>}
                            </Grid>
                            { i < arr.length - 1 && <div className={classes.divider} ></div> }
                        </React.Fragment>
                    )
                })}
            </div>
    )
}

export default freightData;