import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import MainNavigation from "../navigations/MainNavigation";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "240px",
    background: "#fff",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)",
    marginRight: "15px",
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.wrapper}>
      <MainNavigation />
    </div>
  );
};

export default Sidebar;
