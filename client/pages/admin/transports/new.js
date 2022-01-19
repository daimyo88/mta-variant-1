import React, { useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';

import TransportForm from '../../../components/forms/transports/TransportForm';

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        model: '',
        maxWeight: '',
        height: '',
        volume: '',
        category: '',
        coated: true,
    }

    const createTransport = async (values, formik) => {
        try {
            setLoading(true);
            await Api.post('/api/transports', values); 
            formik.resetForm(initialValues);
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    return (
        <Admin> 
            <PageTitle>
                { t('translation:new-transport')}
            </PageTitle>
            { loading && <Loader />}
            <TransportForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ initialValues } 
                submitHandler={ createTransport } 
            />
        </Admin>
    )
}