import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles( theme => ({
    selectWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: '0 0 10px',
        [theme.breakpoints.down('xs')]: {
            order: 2,
          },
    },
    selectLabel: {
        fontSize: '16px',
        marginRight: '15px'
    },
    paginationWrapper: {
        '& .MuiPagination-ul': {
            justifyContent: 'flex-end',
        },
        [theme.breakpoints.down('xs')]: {
            order: 1,
            margin: '10px 0 30px',
            '& .MuiPagination-ul': {
                justifyContent: 'center',
            }
          },
    },
}));

const Footer = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();

    return (
        <Grid container justifyContent="space-between" style={{'padding':'0 15px'}}>
            <Grid item xs={12} sm={6} className={classes.selectWrapper}>
                <span className={classes.selectLabel}>{ t('translation:items-per-page')}</span>
                <Select
                    value={props.itemsPerPage}
                    onChange={props.changeItemsPerPage}
                    >
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                </Select>
            </Grid>
            <Grid className={classes.paginationWrapper} item xs={12} sm={6}>
                { props?.pages > 1 &&
                <Pagination siblingCount={0} color="secondary" count={props?.pages} page={+props.page} onChange={props.setPage} /> }
            </Grid>
        </Grid>
    )
}

export default Footer;