import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    loaderWrapper: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'RGBA(255,255,255, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    }
    }));

const Loader = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.loaderWrapper} >
            <CircularProgress />
        </div>
    )
}

export default Loader;