import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import CustomInput from '../../inputs/CustomInput';

const useStyles = makeStyles( theme => ({
    cont: {
        maxWidth: '400px',
        marginBottom: '25px'
    },
    link: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        cursor: 'pointer'
    }
}));

const Form = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const submitButtonText = props.submitButtonText;
    const ports = props.ports || [];
    return (
        <Formik
            initialValues = {
                props.initialValues
            }
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            validationSchema= { Yup.object({
                title: Yup
                    .string()
                    .required(t('errors:required-field')),

            })}

            onSubmit= {(values, formik) => {
                props.submitHandler(values, formik);
            }}
        >
        {
            props => {

                return (
                <form onSubmit={props.handleSubmit}>

                    <div className={classes.cont}>
                            <CustomInput 
                                name="title"
                                type="text"
                                label={t('translation:title')} 
                                isrequired="true"
                            />

                    </div> 

                    { !!ports.length && <div className={classes.cont}>
                        <span style={{fontSize: '16px', marginRight: '10px'}}>{ t('translation:ports')}:</span>
                        { ports.map((el, i) => {
                            return (
                                <React.Fragment key={el._id}>
                                    <Link href={`/admin/locations/ports/${el._id}` }>
                                        <a className={classes.link}>
                                            {el.title}
                                        </a>
                                    </Link>
                                    { i < ports.length - 1 && <span>, &nbsp;</span>}
                                </React.Fragment>
                            )
                        })}
                    </div> }
    
                    <Button type="submit" variant="contained" color="primary">
                        { submitButtonText } 
                    </Button>
                </form> 
                )
            }
        }
        </Formik>
    )
}

export default Form;