import React, { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';

import NewUserForm from '../../../components/forms/users/NewUser';
import useUser from '../../../hooks/useUser';

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const user = useUser();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    }

    const createUser = async (values, formik) => {
        try {
            setLoading(true);
            await Api.post('/api/users/profile', values); 
            formik.resetForm(initialValues);
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    useEffect(() => {
        if(user.data && !['admin'].includes(user.data?.role) ) {
            router.push('/');
        }
    },[user]);

    return (
        <Admin> 
            <PageTitle>
                { t('translation:new-user')}
            </PageTitle>
            { loading && <Loader />}
            <NewUserForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ initialValues } 
                submitHandler={ createUser } 
            />
        </Admin>
    )
}