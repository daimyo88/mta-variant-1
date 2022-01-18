import React from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles( theme => ({
    inputWrapper: {
     //   marginBottom: '15px'
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
    const inputProps = {
        type: props.showPassword ? 'text' : 'password',
        name: props.name,
        placeholder: props.placeholder
    }
    return (
            <div className={classes.inputWrapper}>

                { props.tip && 
                <Tooltip arrow title={props.tip}>
                    <IconButton size="small">
                        <HelpIcon />
                    </IconButton>
                </Tooltip>}

                { props.description && <div className={classes.description}>
                    {props.description}
                </div> }
                <TextField 
                    id={props.name}
                    error= {!!meta.touched && !!meta.error} 
                    fullWidth
                    {...field}
                    {...inputProps} 
                    helperText={meta.error}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           <IconButton tabIndex={-1}><LockIcon color="secondary" /></IconButton></InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                           <IconButton onClick={props.changeHandler}>{  props.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                    </InputAdornment>,
                    }}
                />         
            </div>
    )
}

export default CustomInput;