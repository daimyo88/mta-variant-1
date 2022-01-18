import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';

const useStyles = makeStyles( theme => ({
    listItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
    expandIcon: {
        '& svg': {
            transform: 'translateY(4px)'
        }
    },
    listItemInner: {
        textDecoration: 'none',
        color: 'inherit',
        '& span' : {
            paddingLeft: '55px',
            fontSize: '14px'
        }
    }
    
}));

const getCollapseInitialState = (router) => {
    if(router.pathname.indexOf('data-entries') !== -1 && !router.query?.id) {
        return 'data-entries';
    }
    if(router.pathname.indexOf('ships') !== -1 && !router.query?.id) {
        return 'ships';
    }
    if(router.pathname.indexOf('users') !== -1 && !router.query?.id) {
        return 'users';
    }
    if(router.pathname.indexOf('port-areas') !== -1 && !router.query?.id) {
        return 'locations';
    }
}

export default function MainNavigation() {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();
    const [collapseState, setCollapseState] = useState(getCollapseInitialState(router) || '');
    const user = useUser();

    const menuItemClickHandler = (state) => {
        let newState = '';
        if (state !== collapseState) {
            newState = state;
        }
        setCollapseState(newState);
    }

    
    return (
            <List component="nav">
                <Link href="/admin/stats">
                    <a className={classes.listItem}>
                        <ListItem
                            button
                            divider
                            selected={router.pathname === '/admin/stats'}
                        >
                        <ListItemIcon>
                            <EqualizerIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu:stats')} />
                        </ListItem>
                    </a>
                </Link>

                <ListItem
                    className={classes.listItem}
                    button
                    divider
                    onClick={() => menuItemClickHandler('data-entries') }
                    >
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('menu:data-entries')} />
                    <span className={classes.expandIcon}>
                        {collapseState === 'data-entries' ? <ExpandLess /> : <ExpandMore />}
                    </span>
                </ListItem>

                <Collapse in={ collapseState ==='data-entries' } timeout="auto" unmountOnExit>
                    <Link href="/admin/data-entries/new">
                        <a className={classes.listItemInner}>
                            <ListItem
                                button
                                divider
                                selected={router.pathname === '/admin/data-entries/new'}
                            >
                            <ListItemText primary={t('menu:new-entry')} />
                            </ListItem>
                        </a>
                    </Link>
                    <Link href="/admin/data-entries/time-charter?pp=&p=&s=">
                        <a className={classes.listItemInner}>
                            <ListItem
                                button
                                divider
                                selected={router.pathname === '/admin/data-entries'}
                            >
                            <ListItemText primary={t('menu:all-entries')} />
                            </ListItem>
                        </a>
                    </Link>
                </Collapse>

                <ListItem
                    button
                    divider
                    onClick={() => menuItemClickHandler('transports') }
                >
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('menu:transports')} />
                    <span className={classes.expandIcon}>
                        {collapseState === 'transports' ? <ExpandLess /> : <ExpandMore />}
                    </span>
                </ListItem>

                <Collapse in={collapseState === 'transports'} timeout="auto" unmountOnExit>
                    <Link href="/admin/transports/new">
                        <a className={classes.listItemInner}>
                            <ListItem
                                button
                                divider
                                selected={router.pathname === '/admin/transports/new'}
                            >
                            <ListItemText primary={t('menu:new-transport')} />
                            </ListItem>
                        </a>
                    </Link>
                    <Link href="/admin/transports?pp=&p=&s=">
                        <a className={classes.listItemInner}>
                            <ListItem
                                button
                                divider
                                selected={router.pathname === '/admin/transports'}
                            >
                            <ListItemText primary={t('menu:transports')} />
                            </ListItem>
                        </a>
                    </Link>
                </Collapse>

                { ['admin'].includes(user.data?.role) && 
                        <ListItem
                            button
                            divider
                            onClick={() => menuItemClickHandler('locations') }
                            
                        >
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu:locations')} />
                        <span className={classes.expandIcon}>
                            {collapseState === 'locations' ? <ExpandLess /> : <ExpandMore />}
                        </span>
                        </ListItem>
                }

                { ['admin'].includes(user.data?.role) &&
                    <Collapse in={collapseState === 'locations'} timeout="auto" unmountOnExit>
                        <Link href="/admin/locations/new">
                            <a className={classes.listItemInner}>
                                <ListItem
                                    button
                                    divider
                                    selected={router.pathname === '/admin/locations/new'}
                                >
                                <ListItemText primary={t('menu:new-location')} />
                                </ListItem>
                            </a>
                        </Link>
                        <Link href="/admin/locations?pp=&p=&s=">
                            <a className={classes.listItemInner}>
                                <ListItem
                                    button
                                    divider
                                    selected={router.pathname === '/admin/locations'}
                                >
                                <ListItemText primary={t('menu:locations')} />
                                </ListItem>
                            </a>
                        </Link>
                    </Collapse>
                }

                { ['admin'].includes(user.data?.role) &&
                        <ListItem
                            button
                            divider
                            onClick={() => menuItemClickHandler('users') }
                        >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('menu:users')} />
                        <span className={classes.expandIcon}>
                            {collapseState === 'users' ? <ExpandLess /> : <ExpandMore />}
                        </span>
                        </ListItem>
                }

                { ['admin'].includes(user.data?.role) &&
                    <Collapse in={collapseState === 'users'} timeout="auto" unmountOnExit>
                        <Link href="/admin/users/new">
                            <a className={classes.listItemInner}>
                                <ListItem
                                    button
                                    divider
                                    selected={router.pathname === '/admin/users/new'}
                                >
                                <ListItemText primary={t('menu:new-user')} />
                                </ListItem>
                            </a>
                        </Link>
                        <Link href="/admin/users?pp=&p=&s=">
                            <a className={classes.listItemInner}>
                                <ListItem
                                    button
                                    divider
                                    selected={router.pathname === '/admin/users'}
                                >
                                <ListItemText primary={t('menu:users')} />
                                </ListItem>
                            </a>
                        </Link>
                    </Collapse>
                }
                
                <Link href={`/admin/users/${user.data?._id}`}>
                    <a className={classes.listItem}>
                        <ListItem
                            button
                            divider
                            selected={router.query?.id === user.data?._id}
                        >
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('menu:my-profile')} />
                        </ListItem>
                    </a>
                </Link>

            </List>
    )

}