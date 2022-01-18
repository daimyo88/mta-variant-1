import React, { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import FormLoader from '../../../components/loaders/Loader'
import {useRouter} from 'next/router';

import useUser from '../../../hooks/useUser';

import FileUploaderSingle from "../../../components/inputs/FileUploaderSingle";
import ImportDataEntries from '../../../components/import/ImportDataEntries';

export default function Page() {
    const {t} = useTranslation();
    const router = useRouter();
    const user = useUser();

    const [loading, setLoading] = useState(false);
    const [importedFile, setImportedFile] = useState([]);

    useEffect(() => {
        if(user.data && !['admin'].includes(user.data?.role) ) {
            router.push('/');
        }
    },[user]);

    const sendImportInfo = async (files) => {
        try {
            console.log(files)
            const data = new FormData();
            data.append('document', files[0]);
            setLoading(true);  
            const response = await Api.post('/api/data-entries/import-file' , data);
            setImportedFile(response.data);
        } finally {
          setLoading(false);    
        }
    }

    const importDataEntries = async (values) => {
        try {
            localStorage.setItem('dataEntriesSchema', JSON.stringify(values));
            const data = {
                fieldsSet: values,
                files: importedFile,
                language: router.locale
            }
            setLoading(true);
            setImportedFile([]);  
            await Api.post('/api/data-entries/import' , data);
        } finally { 
          setLoading(false);
        }
    }

    return (
        <Admin> 
            { loading && <FormLoader />}
            <PageTitle>
                    { t('translation:import-data') }
            </PageTitle> 

            <FileUploaderSingle 
                max="100000000" 
                submitHandler = { sendImportInfo } 
                text={t('translation:upload-csv')}
                uploadText={t('translation:submit') }
                allowed=".csv"
            />

            <ImportDataEntries
              show={ !!importedFile.length } 
              cancelHandler={ () => { setImportedFile([])}} 
              items={ importedFile }
              submitHandler = { importDataEntries }
            />
        </Admin>
    )
}