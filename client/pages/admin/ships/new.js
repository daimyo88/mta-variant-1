import React, { useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';

import NewShipForm from '../../../components/forms/ships/ShipForm';

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        shipName: '',
        dwt: '',
        shipLength: '',
        shipCategory: '',
        shipWidth: '',
        shipVolume: '',
        productGroup: '',
        coated: false,
        piping: '',
        heated: false,
        shipProfile: '',
        flag: '',
        tanksQuantity: '',
    }

    const createShip = async (values, formik) => {
        try {
            setLoading(true);
            await Api.post('/api/ships', values); 
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
                { t('translation:new-ship')}
            </PageTitle>
            { loading && <Loader />}
            <NewShipForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ initialValues } 
                submitHandler={ createShip } 
            />
        </Admin>
    )
}