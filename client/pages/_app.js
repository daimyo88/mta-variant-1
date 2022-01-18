import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import useTranslation from 'next-translate/useTranslation';

import theme from '../theme/theme';
import Api from '../axios/Api';

import Alert from '../components/messages/Alert/Alert';

function MyApp({ Component, pageProps }) {

  const { t } = useTranslation();
  const [alert, setAlert] = useState({open: false, text: '', severity: 'success'});

  useEffect(() => {
    // Remove the server-side injected CSS to avoid conflict with Material UI
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  useEffect(() => {
    // Showing success/error messages based on server response
    Api.interceptors.response.use((response) => {
      let successMessage = response.data?.successMessage;
      if(successMessage) {
        setAlert({
          open: true,
          text: t(`success-messages:${successMessage}`),
          severity: "success"
        });
      }
      return response;
      }, (error) => {
          let errorText = error.response?.data?.message || error.message;
          setAlert({
            open: true,
            text: t(`errors:${errorText}`),
            severity: 'error'
          });
          return Promise.reject(error.message);
      });
  },[]);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={0} square >
          <Head>
            <meta charSet="utf-8" />
            <title>MTA</title>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content=""
            />
          </Head>
          <Component {...pageProps} />
          <Alert state={alert} handleClose={() => {setAlert({...alert, open: false })}}/>
        </Paper>
      </ThemeProvider >
  )
}

export default MyApp
