import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import AddIcon from "@material-ui/icons/Add";
import useTranslation from "next-translate/useTranslation";
import PageTitle from "../../../components/text/PageTitle";
import Admin from "../../../layouts/Admin";
import Loader from "../../../components/loaders/OverlapLoader";
import FormLoader from "../../../components/loaders/Loader";
import Button from "@material-ui/core/Button";
import Api from "../../../axios/Api";
import useUser from "../../../hooks/useUser";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import DataEntryForm from "../../../components/forms/data-entries/DataEntry";

const fetcher = (url) => Api.get(url);

const useStyles = makeStyles((theme) => ({
  commentCont: {
    maxWidth: "600px",
    marginTop: "10px",
    borderTop: `1px solid ${theme.palette.secondary.main}`,
  },
  comment: {
    width: "100%",
  },
  buttonCont: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const initialValues = {
  departureDate: null,
  transport: '',
  transportData: {},
  productGroup: "",
  dispatchCity: "",
  destinationCity: "",
  dominantArea: "",
  pricePerTon: "",
  cargoWeight: "",
  comment: "",
};

export default function Page() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const user = useUser().data;
  const data = useSWR(
    user && "/api/data-entries/populate-data?uid=" + user?._id,
    fetcher
  ).data?.data;
  const theme = useTheme();
  const classes = useStyles(theme);

  const createDataEntry = async (values) => {
    const data = {
      user: user._id,
      ...values,
    };

    console.log(data);
    return;
    try {
      setLoading(true);
      await Api.post("/api/data-entries", data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Admin>
      <PageTitle>{t("translation:new-entry")}</PageTitle>
      {loading && <FormLoader />}
      {!data && <Loader />}
      {data && !!data?.transports.length && (
        <DataEntryForm
          initialValues={initialValues}
          submitHandler={createDataEntry}
          transports={data?.transports || []}
          locations={data?.locations || []}
        />
      )}
      {data && !data?.transports.length && (
        <>
          <Typography
            variant="h3"
            style={{ marginBottom: "25px", marginTop: "15px" }}
          >
            {t("translation:add-transport-before-adding-data")}
          </Typography>
          <Link href="/admin/transports/new">
            <Button variant="contained" color="primary" endIcon={<AddIcon />}>
              {t("translation:add-transport")}
            </Button>
          </Link>
        </>
      )}
    </Admin>
  );
}
