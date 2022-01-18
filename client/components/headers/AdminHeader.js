import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import { useRouter } from "next/router";

import MainNavigation from "../navigations/MainNavigation";
import Modal from "../../components/modals/Modal";
import Api from "../../axios/Api";
import useUser from "../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.secondary.light,
  },
  headerInner: {
    maxWidth: "1600px",
    padding: "5px 15px 0",
    margin: "0 auto",
  },
  greeting: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  drawer: {
    "& .MuiPaper-root": {
      width: "250px",
    },
  },
  drawerHeader: {
    background: "rgba(234,234,234,0.9)",
    padding: "8px 5px",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
}));

const Header = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const [drawer, setDrawer] = useState(false);
  const user = useUser();
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await Api.post("/api/auth/logout");
      setLogoutModal(false);
      user.mutate({});
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.header}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.headerInner}
        alignItems="center"
      >
        <Grid item>
          <Link href="/">
            <a>
              <Image
                src="/images/logo.svg"
                width={100}
                height={28}
                alt="Logo"
                loading="eager"
                layout="intrinsic"
              />
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Hidden smDown>
            <Grid container alignItems="center">
              {user.data?.firstName && (
                <Grid item className={classes.greeting}>
                  {t('translation:greeting')}, {user.data?.firstName}!
                </Grid>
              )}
              <Grid item style={{marginLeft: '5px'}}>
                <IconButton onClick={() => setLogoutModal(true)}>
                  <PowerSettingsNewIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="primary"
              className={classes.icon}
              onClick={() => {
                setDrawer(!drawer);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Grid
          container
          className={classes.drawerHeader}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <IconButton color="primary" onClick={() => setLogoutModal(true)}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={() => {
                setDrawer(!drawer);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <MainNavigation />
      </Drawer>
      <Modal
        open={logoutModal}
        handleClose={() => {
          setLogoutModal(false);
        }}
        handleConfirm={logout}
        text={t("modals:default-prefix") + t("modals:logout") + "?"}
      />
    </div>
  );
};

export default Header;
