import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import useTranslation from 'next-translate/useTranslation';
import {formatDate} from '../../utils/formatDate';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    container: {
        maxWidth: '600px',
        marginTop: '10px',
        borderTop: `1px solid ${theme.palette.secondary.main}`
    },
    dataRow: {
        padding: '5px 0',
        fontSize: '15px',
        whiteSpace: 'pre-wrap',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px'
        }
    }

}));

const Data = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();

    console.log(props.text)
    return (
            <Grid 
                className={classes.container} 
                container
            >
                <Grid item xs={12}>
                    <Typography 
                        variant="h3" 
                        color="primary"
                        style={{marginBottom: '10px', marginTop: '15px'}}
                    >
                        { t('translation:comment')}
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    <b>{t('translation:date')}:</b>
                </Grid>
                <Grid item xs={6} className={classes.dataRow}>
                    {formatDate(props.date)}
                </Grid>
                <Grid item xs={12} className={classes.dataRow}>
                    { props.text }
                </Grid>
            </Grid>
    )
}

export default Data;