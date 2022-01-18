import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import nlLocale from "date-fns/locale/nl";
import { IconButton, InputAdornment } from "@material-ui/core";
import EventIcon from '@material-ui/icons/Event';
import { useRouter} from 'next/router';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles( theme => ({
    inputWrapper: {
        margin: '0 0 25px',
        "& .MuiFormControl-root": {
            width: '100%'
        }
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

const localeMap = {
    en: enLocale,
    nl: nlLocale
  };

const CustomDatePicker = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();
    const required = props.isrequired ? true : false;
    return (
        <div className={classes.inputWrapper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}  locale={localeMap[router.locale]}>
                    <DatePicker 
                        inputVariant="outlined" 
                        format="dd/MM/yyyy" 
                        value={props.value} 
                        inputVariant="outlined"
                        label={props.label}
                        required={required}
                        onChange={props.changeHandler}
                        helperText={props.error}
                        error={!!props.error}
                        minDate={props.minDate}
                        maxDate={props.maxDate}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                <EventIcon />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default CustomDatePicker;