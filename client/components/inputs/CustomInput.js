import React from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    },
    required: {
        color: '#C21807'
    },
}));

const CustomInput = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [field, meta] = useField(props);
    const tip = props.tip ? {
        endAdornment: <InputAdornment position="end">
            <Tooltip arrow title={props.tip}>
                <IconButton size="small">
                    <HelpIcon />
                </IconButton>
            </Tooltip>
        </InputAdornment>,
    } : {};

    return (
        <div className={classes.inputWrapper}>
            <TextField 
                id={props.name}
                error= {!!meta.touched && !!meta.error} 
                fullWidth
                required={!!props.isrequired}
                {...field}
                {...props} 
                helperText={meta.error}
                variant="outlined"
                className={classes.input}
                InputProps={tip}
            />         
        </div>
    )
}

export default CustomInput;