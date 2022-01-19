import Public from "../layouts/Public";
import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Container, Paper, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

import Api from "../axios/Api";
import useUser from "../hooks/useUser";

import IntroHeading from "../components/text/IntroHeading";
import IntroLogo from "../components/logo/IntroLogo";
import LoginForm from "../components/forms/auth/Login";

import Loader from "../components/loaders/Loader";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  forgotPasswordLink: {
    marginLeft: "10px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

export default function Login() {
  const { t } = useTranslation();
  const user = useUser();
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles(theme);

  const [loading, setLoading] = useState(false);

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      await Api.post("/api/auth/login", data);
      await user.mutate();
      router.push("/admin/stats");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Public>
      <Container maxWidth={"xs"}>
        <Paper
          style={{
            position: "relative",
            padding: "30px 24px",
            margin: "20px 0",
          }}
        >
          <IntroLogo />
          <IntroHeading text={t("translation:login-heading")} />
          <LoginForm submitHandler={loginHandler} />
          <Grid
            container
            style={{ marginTop: "20px" }}
            justifyContent="center"
          >
            <span>{t("translation:forgot-password")}</span>
            <Link href="/forgot-password">
              <a className={classes.forgotPasswordLink}>
                {t("translation:click-here")}
              </a>
            </Link>
          </Grid>
          {loading && <Loader />}
        </Paper>
      </Container>
    </Public>
  );
}
