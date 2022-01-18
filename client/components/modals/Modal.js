import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles( theme => ({
  closeButton: {
    position: 'absolute',
    right: '0',
    top: '0',
    color: theme.palette.text.primary,
  },
  modalButton: {
      margin: '0 15px'
  },
  modalText: {
    fontSize: '20px'
  }
}));

export default function Modal(props) {

  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();

  return (
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <MuiDialogContent>
          <Typography gutterBottom className={classes.modalText}>
            { props.text }
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
            { !props.onlyconfirm && <Button className={classes.modalButton} onClick={props.handleClose} variant="contained">{t('modals:cancel')}</Button> }
            <Button className={classes.modalButton}  onClick={props.handleConfirm} variant="contained" color="primary">
              {t('modals:ok')}
            </Button>
        </MuiDialogActions>
      </Dialog>
  );
}