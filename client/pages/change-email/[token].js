import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import Public from "../../layouts/Public";
import { Container, Paper } from "@material-ui/core";

import IntroLogo from "../../components/logo/IntroLogo";
import Loader from "../../components/loaders/Loader";

import Api from "../../axios/Api";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  noMarginTop: {
    marginTop: "5px",
  },
}));

export default function Page() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const data = {
        token: router.query?.token,
      };
      try {
        await Api.patch("/api/users/change-email/", data);
        setSuccess(true);
      } catch (e) {
        let errorText = e.response?.data?.message || e.message;
        setError(t(`errors:${errorText}`));
      } finally {
        setLoading(false);
      }
    };
    if (router.query?.token) {
      checkToken();
    }
  }, [router]);

  return (
    <Public>
      <Container maxWidth={"xs"}>
        <Paper
          style={{
            position: "relative",
            padding: "30px 24px",
            margin: "70px 0 20px",
          }}
        >
          {loading && (
            <div style={{ height: "150px" }}>
              <Loader />
            </div>
          )}
          {!loading && <IntroLogo />}
          {error && (
            <MuiAlert elevation={6} variant="filled" severity="error">
              {error}
            </MuiAlert>
          )}
          {success && (
            <MuiAlert elevation={6} variant="filled" severity="success">
              {t("success-messages:user-email-changed")}
            </MuiAlert>
          )}
        </Paper>
      </Container>
    </Public>
  );
}
