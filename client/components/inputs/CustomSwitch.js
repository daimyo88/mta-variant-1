import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles( theme => ({
    inputWrapper: {
        margin: '0 0 25px',
    },
    labelWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '5px'
    },
    label: {
        lineHeight: '30px',
        fontSize: '16px'
    },
    description: {
        fontSize: '14px',
        marginBottom: '5px'      
    }
}));

const CustomInput = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    return (
        <div className={classes.inputWrapper}>
            { props.label && <div className={classes.label}>{props.label}</div> }
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                    {t('translation:no')}
                </Grid>
                <Grid item>
                    <Switch
                        checked={ props.value }
                        onChange={ props.onChange }
                        name={ props.name }
                        color="primary"
                    />
                </Grid>
                <Grid item>
                    {t('translation:yes')}
                </Grid>
            </Grid>

        </div>
    )
}

export default CustomInput;