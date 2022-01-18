import React, { useState } from "react";
import useTranslation from 'next-translate/useTranslation';
import PageTitle from '../../../components/text/PageTitle';
import Admin from '../../../layouts/Admin';
import Api from '../../../axios/Api';
import Loader from '../../../components/loaders/Loader';
import useSWR from "swr";
import {useRouter} from 'next/router';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography } from '@material-ui/core';

import FreightGeneralData from '../../../components/dataDisplay/FreightGeneralData';
import TimeCharterData from '../../../components/dataDisplay/TimeCharterData';
import SpotMarketData from '../../../components/dataDisplay/SpotMarketData';
import DataEntryComment from '../../../components/dataDisplay/DataEntryComment';

import Modal from '../../../components/modals/Modal';

import {formatDate} from '../../../utils/formatDate';
import useUser from '../../../hooks/useUser';

const fetcher = url => Api.get(url);

export default function Page() {
    const {t} = useTranslation();
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState(false);
    const dataEntrSWR = useSWR("/api/data-entries/" + router.query.id, fetcher);
    const dataEntryData = dataEntrSWR.data?.data;
    const user = useUser().data;

    const deleteDataEntry = async (id) => {

      try {
          setDeleteModal(false);
          await Api.delete('/api/data-entries/' + router.query.id);
          router.push(`/admin/data-entries/${dataEntryData?.freightType}?pp=&p=&s=`);
        } catch(e) {
            console.log(e);
        } 
    }

    return (
        <Admin> 
            { !dataEntrSWR.data && <Loader />}

            { dataEntrSWR.data && <>
                <PageTitle>
                        <IconButton style={{ marginRight: '10px'}} onClick={() => {window.history.back();}}>
                            <ArrowBackIcon />
                        </IconButton> 
                        { `${t('translation:data-entry')}: ${formatDate(dataEntryData?.dateNomination)}`}
                        { user?.role === 'admin' && <Tooltip arrow title={t('translation:delete')} style={{marginLeft: '20px', transform:'translateY(-2px)'}}>
                        <IconButton onClick={() => {setDeleteModal(true)}}>
                            <DeleteIcon />
                        </IconButton> 
                    </Tooltip> }
                </PageTitle> 

                <FreightGeneralData data={dataEntryData} shipOwner={ dataEntryData?.user }/>

                <Typography 
                    variant="h3" 
                    color="primary"
                    style={{marginBottom: '10px', marginTop: '15px'}}
                >
                    { t('translation:freight-details')}
                </Typography>

                {dataEntryData?.freightType === 'time-charter' && 
                    <TimeCharterData data={dataEntryData?.freightData}/>
                }

                {dataEntryData?.freightType === 'spot-market' &&
                    <SpotMarketData data={dataEntryData?.freightData}/>
                }

                {dataEntryData?.comment && 
                    <DataEntryComment 
                        text= { dataEntryData?.comment } 
                        date= { dataEntryData?.createdAt } 
                    /> 
                }

            </> }

            <Modal 
                open={deleteModal} 
                handleClose={() => {setDeleteModal(false)}}
                handleConfirm={ deleteDataEntry }
                text= {t('modals:default-prefix') + t('modals:delete-data-entry', { date: formatDate(dataEntryData?.dateNomination) })}
            />
        </Admin>
    )
}