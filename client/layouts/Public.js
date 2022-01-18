
import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import Footer from '../components/footers/Footer';

const useStyles = makeStyles( theme => ({
  basicWrapper: {
      minHeight: '100vh'
  },
  basicContainer: {
      width: "100%",
      background: '#EDF2F3',
      flexGrow: 1
  } 
}));

const Public = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
      <main>
            <Grid 
                container 
                direction="column"
                className={ classes.basicWrapper }
            >
                <Grid 
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={ classes.basicContainer }
                >
                  {props.children}
                </Grid >
            <Footer />
          </Grid >
      </main>
    );
}

export default Public;
