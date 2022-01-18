import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
    heading: {
        position: 'relative',
        paddingBottom: '10px',
        marginBottom: '25px',
        '&::after': {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '80px',
            height: '3px',
            background: theme.palette.secondary.main,
            content: '""',
            [theme.breakpoints.down('sm')]: {
                height: '2px',
            }
        }
        
    }
}));

const PageTitle = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Typography variant="h2" className={classes.heading}>
            {props.children}
        </Typography>
    )
}

export default PageTitle;