import { Typography } from '@material-ui/core';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    heading: {
        position: 'relative',
        paddingBottom: '10px',
        marginBottom: '20px',
        '&::after': {
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: 'calc(50% - 30px)',
            height: '3px',
            width: '60px',
            background: theme.palette.primary.main,
            content: '""'
        },
        '& h2': {
            marginBottom: '0'
        }
    }
}));

const IntroHeading = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div className={classes.heading}>
            <Typography 
                gutterBottom
                variant="h1" 
                component="h2"
                align="center"
                color="textSecondary"
                >
                { props.text }
            </Typography>
        </div>
    )
}

export default IntroHeading;