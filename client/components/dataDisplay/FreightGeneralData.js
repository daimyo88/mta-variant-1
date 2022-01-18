import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import useTranslation from 'next-translate/useTranslation';
import {formatDate} from '../../utils/formatDate';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import useUser from '../../hooks/useUser';

const useStyles = makeStyles( theme => ({
    container: {
        maxWidth: '600px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${theme.palette.secondary.main}`
    },
    dataRow: {
        padding: '5px 0',
        fontSize: '15px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px'
        }
    },
    link: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: theme.palette.primary.main
    }

}));

const freightData = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();
    const info = props.data;
    const user = useUser().data;

    return (
        <>
            <Typography 
                variant="h3" 
                color="primary"
                style={{marginBottom: '10px'}}
            >
                { t('translation:general-details')}
            </Typography>

            <Grid 
                className={classes.container} 
                container
            >
                <Grid item xs={6} className={classes.dataRow}>
                   <b>{t('translation:freight-type')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {t(`translation:${info.freightType}`)}
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:date-nomination')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {formatDate(info.dateNomination)}
                </Grid>
            </Grid>
            <Typography 
                variant="h3" 
                color="primary"
                style={{marginBottom: '10px', marginTop: '15px'}}
                >
                { t('translation:ship')}
            </Typography>
            <Grid 
                className={classes.container} 
                container
            >
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:ship-name')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.ship || info.shipTitle }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:ship-length')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipLength }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:width')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipWidth }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:dwt')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.dwt }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:ship-category')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipCategory }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:volume')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipVolume }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:product-group')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipProductGroup ? t(`translation:${info.shipProductGroup}`) : '' }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:piping')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipPiping ? t(`translation:${info.shipPiping}`) : '' }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:coated')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipCoated ? t(`translation:yes`) : t(`translation:no`) }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:heated')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipHeated ? t(`translation:yes`) : t(`translation:no`) }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:profile')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipProfile }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:tanks-quantity')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.tanksQuantity }
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:flag')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {info.shipFlag }
                </Grid>

                { user?.role === 'admin' && props.shipOwner && <>
                    <Grid item xs={6} className={classes.dataRow}>
                        <b>{t('translation:ship-owner')}:</b>
                    </Grid>
                    <Grid item xs={6} className={classes.dataRow}>
                        { props.shipOwner?.firstName ? 
                                <span>{props.shipOwner?.firstName + ' ' + props?.shipOwner.lastName }</span>
                                 : <span>({t('translation:deleted')})</span>}
                    </Grid>
                </>}
            </Grid>
        </>
    )
}

export default freightData;