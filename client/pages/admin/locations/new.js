import React, { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation';
import useSWR from "swr";

import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';

import NewRegionForm from '../../../components/forms/locations/NewRegion';
import NewCityForm from '../../../components/forms/locations/City';
import useUser from '../../../hooks/useUser';

import CustomSelect from '../../../components/inputs/CustomSelect';

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [locationType, setLocationType] = useState('region');
    const { mutate } =  useSWR("/api/locations/regions", fetcher);
    const regions =  useSWR("/api/locations/regions", fetcher).data?.data;
    const user = useUser();

    const locationTypes = [
        {
            _id: 'region',
            title: t('translation:region')
        },
        {
            _id: 'city',
            title: t('translation:city')
        }
    ]

    const regionInitialValues = {
        name: '',
    }

    const cityInitialValues = {
        name: '',
        region: ''
    }

    const createRegion = async (values, formik) => {
        try {
            setLoading(true);
            await Api.post('/api/locations/region', values); 
            formik.resetForm(regionInitialValues);
            mutate();
          } catch(e) {
            console.log(e);   
          } finally {
            setLoading(false);
          }
    }

    const createCity = async (values, formik) => {
        try {
            setLoading(true);
            await Api.post('/api/locations/city', values); 
            formik.resetForm(cityInitialValues);
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
                { t('translation:new-location')}
            </PageTitle>
            { loading && <Loader />}

            <div style={{maxWidth: '400px'}} >
                <CustomSelect
                    label={ t('translation:location-type') }
                    changeHandler={(e) => {setLocationType(e.target.value)}}
                    options={locationTypes}
                    value={locationType}
                />
            </div> 

            { locationType === 'region' && <NewRegionForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ regionInitialValues } 
                submitHandler={ createRegion } 
            /> }

            { locationType === 'city' && <NewCityForm 
                submitButtonText={t('translation:submit')} 
                initialValues={ cityInitialValues } 
                submitHandler={ createCity } 
                regions = { regions }
            /> }

        </Admin>
    )
}