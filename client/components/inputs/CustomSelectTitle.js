import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles( theme => ({
    inputWrapper: {
        margin: '0 0 25px',
        "& .MuiFormControl-root": {
            width: '100%'
        }
    },
    required: {
        color: '#C21807'
    },
}));

const CustomSelect = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const required = props.isrequired ? true : false;
    return (
        <div className={classes.inputWrapper}>
            <FormControl required={ required } variant="outlined" error={!!props.error}>
                <InputLabel id={'label_' + props.id}>{props.label}</InputLabel>
                <Select
                    labelId={'label_' + props.id}
                    onChange={props.changeHandler}
                    value={props.value}
                    key={props.id}
                    >
                    { props.options.map(el => {
                        if(el.categoryTitle) {
                            return (
                                <ListSubheader key={'select_' + el._id} >{el.title}</ListSubheader>
                            )
                        } else {
                            return (
                                <MenuItem disabled={el.title === props.disabled } key={'select_' + el._id} value={el.title}>{el.title}</MenuItem>
                            )
                        }
                    })}
                </Select>
                { props.error && <FormHelperText>{props.error}</FormHelperText> }
            </FormControl>
        </div>
    )
}

export default CustomSelect;