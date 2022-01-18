import React from 'react';
import { useField } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles( theme => ({
    inputWrapper: {
        marginBottom: '25px'
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
        label: props.label,
        type: props.showPassword ? 'text' : 'password',
    }
    return (
            <div className={classes.inputWrapper}>
        
                <TextField 
                    id={props.name}
                    error= {!!meta.touched && !!meta.error} 
                    fullWidth
                    {...field}
                    {...inputProps} 
                    helperText={meta.error}
                    variant="outlined"
                    required={!!props.isrequired}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                           <IconButton onClick={props.changeHandler}>{  props.showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                    </InputAdornment>,
                    }}
                />         
            </div>
    )
}

export default CustomInput;