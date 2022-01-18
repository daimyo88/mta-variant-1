import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function GrowTransition(props) {
    return <Grow {...props} />;
}
  

const ErrorMessage = (props) => {
    return (
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={props.state.open} 
            autoHideDuration={6000} 
            onClose={props.handleClose}
            TransitionComponent={GrowTransition}
        >
            <Alert onClose={props.handleClose} severity={props.state.severity}>
                { props.state.text }
            </Alert>
        </Snackbar>
    )
}

export default ErrorMessage;