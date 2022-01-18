import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    divider: {
        width: '100%',
        margin: '25px 0',
        borderTop: `2px solid ${theme.palette.secondary.main}`
    }
}));

const Divider = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div className={classes.divider} ></div>
    )
}

export default Divider;