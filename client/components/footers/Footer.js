import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "10px 0",
    background: theme.palette.text.secondary,
    color: "#fff",
    "& a": {
      textDecoration: "none",
      transition: "0.3s",
      color: theme.palette.secondary.main,
    },
    "& a:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  footerInner: {
    maxWidth: "1600px",
    padding: "0 15px",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      "& p": {
        fontSize: "14px",
      },
    },
  },
}));

const date = new Date();

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  return (
    <div className={classes.footer}>
      <Grid container justifyContent="center" className={classes.footerInner}>
        <Grid item>
          <Typography>
            <span>© {date.getFullYear()} <b>MTA. </b></span> 
            <span style={{marginRight: '5px'}}>{t("translation:footer-copyright")}</span>
          </Typography>
        </Grid>
        <Typography>
          <Link href="/privacy-policy">
            {t("translation:footer-privacy-link")}
          </Link>
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;
