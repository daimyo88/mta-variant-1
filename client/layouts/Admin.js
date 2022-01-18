import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import useUser from "../hooks/useUser";

import Sidebar from "../components/sidebars/AdminSidebar";
import Header from "../components/headers/AdminHeader";
import Footer from "../components/footers/Footer";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#EDF2F3",
  },
  main: {
    minHeight: "100vh",
  },
  center: {
    flexGrow: 1,
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "15px",
    flexWrap: "nowrap",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
    },
  },
  pageContainer: {
    position: "relative",
    maxWidth: "100%",
    background: "#ffffff",
    flexGrow: 1,
    padding: "15px",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
    },
  },
}));

const Admin = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user?.data && !user.data?._id) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className={classes.wrapper}>
      <Grid container className={classes.main} direction="column" wrap="nowrap">
        <Grid item>
          <Header />
        </Grid>
        <Grid container className={classes.center}>
          <Hidden smDown>
            <Grid item>
              <Sidebar />
            </Grid>
          </Hidden>
          <Grid item className={classes.pageContainer}>
            {props.children}
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
};

export default Admin;
