import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import useTranslation from 'next-translate/useTranslation';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({

  }));

const CustomSearch = (props) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const submitHandler = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            props.submitHandler();
        }
    }

    const submitIconHandler = () => {
        props.submitHandler();
    }

    return (
        <div className={classes.inputWrapper}>
            <div onKeyDown={submitHandler}>
                <TextField
                    id={props.name}
                    fullWidth
                    value={props.value}
                    onChange={(e)=> {props.changeHandler(e.target.value)}}
                    type="text"
                    variant="outlined"
                    placeholder={t('translation:search')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => {props.clearHandler()}}
                              >
                                  <ClearIcon />
                              </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={submitIconHandler}

                                color="secondary"
                              >
                                  <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                        )
                    }}

                />
            </div>
      </div>

    )
}

export default CustomSearch;
