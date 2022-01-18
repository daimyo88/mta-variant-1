import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from "swr";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import Admin from '../../../layouts/Admin';
import TableFooter from '../../../components/footers/TableFooter';

import PageTitle from '../../../components/text/PageTitle';
import CustomSearch from '../../../components/inputs/CustomSearch';
import Api from '../../../axios/Api';
import useUser from '../../../hooks/useUser';
import Modal from '../../../components/modals/Modal';
import Loader from '../../../components/loaders/Loader';

const useStyles = makeStyles( theme => ({
    icon: {
        marginLeft: '10px',
        size: '14px'
    },
    withMargin: {
        margin: '10px 0 5px',
        [theme.breakpoints.down('xs')]: {
            margin: '5px 0 10px',
        },
    },
    table: {
        margin: '20px 0',
        minWidth: '800px'
    },
    head: {
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        fontSize: '16px',
        background: theme.palette.secondary.main
    },
    row: {
        fontSize: '16px',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    nothingFound: {
        fontSize: '24px',
        margin: '30px 0',
        fontWeight: 'bold'
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none'
    }

  }));

const fetcher = url => Api.get(url);

export default function Page() {

    const {t} = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();
    const user = useUser();
    const [inputValue, setInputValue] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [canFetch, setCanFetch] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    const { data, mutate } = useSWR(
        user?.data && canFetch && "/api/users?p="+ page +"&pp="+itemsPerPage +"&s=" + search, fetcher);

    const users = data?.data?.data?.[0]?.users;

    useEffect(() => {
        let search = '', perPage = localStorage.getItem('items-per-page') || 15 , page = 1;

        if(router?.query?.s) {
            search = router?.query?.s;
        }

        if(router?.query?.p) {
            page = router?.query?.p;
        }


        if(router?.query?.pp) {
            perPage = router?.query?.pp;
        }

        setInputValue(search);
        setSearch(search);
        setPage(page);
        setItemsPerPage(perPage);
        setCanFetch(true);

      }, [router]);
  
      useEffect(() => {
        if(canFetch) {
            let routerQuery = {
              pp: itemsPerPage,
              p: page,
              s: search,
            }
            router.push({
              pathname: '/admin/users',
              query: routerQuery
            })
          }
        
      },[canFetch, itemsPerPage, page, search ]);
      
    const submitSearch = () => {
        setPage(1);
        setSearch(inputValue);
    }
  
    useEffect(() => {
        if(user.data && !['admin'].includes(user.data?.role) ) {
            router.push('/');
        }
    },[user]);

    const deleteUser = async (id) => {
        const data = {
            user: currentItem
        }
      try {
          setDeleteModal(false);
          await Api.post('/api/users/delete', data);
          mutate();
        } catch(e) {
            console.log(e);
        } 
    }

    const changeItemsPerPage = (e) => {
        setItemsPerPage(e.target.value);
        setPage(1); 
        localStorage.setItem('items-per-page',e.target.value)
    }

    return (
        <Admin>  
            <PageTitle>
                {t('translation:users')}
            </PageTitle>
            <Grid container style={{marginTop:'20px'}} justifyContent="flex-start" alignItems="center" >
                <Grid item >
                    <CustomSearch value={inputValue} changeHandler={setInputValue} submitHandler={submitSearch} clearHandler={() => {setSearch('')}} />
                </Grid>
            </Grid>

            { users && !users?.length && 
                <div className={classes.nothingFound}>
                    {t('translation:no-items-found')}
                </div>}

            { !users && <div style={{position:'relative', minHeight: '300px'}}>
                 <Loader />
            </div> }

            { !!users?.length && <TableContainer style={{flexGrow: 1}}>
                <Table stickyHeader={true} className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>
                                {t('translation:fullname')}
                            </TableCell>
                            <TableCell className={classes.head}>
                                {t('translation:email')}
                            </TableCell>
                            <TableCell className={classes.head}>
                                {t('translation:user-role')}
                            </TableCell>
                            <TableCell className={classes.head}>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users?.map((item) => {
                        return(
                            <TableRow className={classes.row} key={item._id}>
                                <TableCell>
                                    <Link href={'/admin/users/' + item._id }>
                                        <a style={{fontWeight:'bold'}} className={classes.link}>
                                            { item.fullname}
                                        </a>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {item.email && <Link href={'mailto:' + item.email}>
                                        <a className={classes.link} target="_blank">
                                            { item.email}
                                        </a>
                                    </Link>}
                                </TableCell>
                                <TableCell>
                                    { t('translation:role-' + item.role) }
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={'/admin/users/' + item._id }>
                                        <Tooltip arrow title={t('translation:edit')}>
                                            <IconButton size="small" >
                                                <EditIcon />
                                            </IconButton> 
                                        </Tooltip>
                                    </Link>
                                    { user.data?._id !== item._id &&
                                    <Tooltip arrow title={t('translation:delete')}>
                                        <IconButton className={classes.icon} size="small" onClick={() => {setCurrentItem({_id: item._id, email: item.email });setDeleteModal(true)}}>
                                            <DeleteIcon />
                                        </IconButton> 
                                    </Tooltip> }
                                </TableCell>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
                </TableContainer> }
                { !!users?.length && <>
                    <TableFooter
                        page={page}
                        pages={data?.data?.pages} 
                        itemsPerPage={itemsPerPage}
                        changeItemsPerPage={changeItemsPerPage}
                        setPage={(event, value)=> setPage(value)}
                    />
                </> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deleteUser }
                text= {t('modals:default-prefix') + t('modals:delete-profile', { email: currentItem?.email })}
            />
        </Admin>
    )
}