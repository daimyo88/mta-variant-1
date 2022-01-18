import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  wrapper: {
      width: '100%',
      height: '100%',
      minHeight: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
  }
}));

export default function GlobalLoader() {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.wrapper}>
        <CircularProgress size={60}/>
    </div>
  )
}