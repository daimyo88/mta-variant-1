import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Public from '../layouts/Public';
import { Container, Paper } from '@material-ui/core';

import IntroHeading from '../components/text/IntroHeading';
import IntroLogo from '../components/logo/IntroLogo';

const useStyles = makeStyles( theme => ({
    cont: {
        
    }
}));

export default function Page() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {t} = useTranslation();

    return (
        <Public> 
            <Container maxWidth={"lg"}>
                <Paper style={{ position: 'relative', padding: "30px 24px", margin: '20px 0 20px'}}>
                    <IntroLogo />
                    <IntroHeading text={ t('translation:privacy-policy') } />
                    <div className={classes.cont} style={{wordBreak: 'break-all'}}>
                        Privacy policy text
                    </div>
                </Paper>
            </Container>
        </Public>
    )
}