import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import { useRouter } from "next/router";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import PageTitle from "../../../../components/text/PageTitle";
import Admin from "../../../../layouts/Admin";
import Api from "../../../../axios/Api";
import Loader from "../../../../components/loaders/Loader";

import CityForm from "../../../../components/forms/locations/City";
import useUser from "../../../../hooks/useUser";
import Modal from "../../../../components/modals/Modal";

const fetcher = (url) => Api.get(url);

export default function Page() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWR(
    "/api/locations/cities/" + router.query.id,
    fetcher
  );
  const city = useSWR("/api/locations/cities/" + router.query.id, fetcher).data
    ?.data;
  const regions = useSWR("/api/locations/regions", fetcher).data?.data;
  const user = useUser();
  const [deleteModal, setDeleteModal] = useState(false);

  const cityInitialValues = {
    name: city?.name || "",
    region: city?.region || "",
  };

  const updateCity = async (values, formik) => {
    try {
      setLoading(true);
      await Api.patch("/api/locations/cities/" + router.query.id, values);
      mutate();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteCity = async (id) => {
    const data = {
      city: {
        _id: router.query.id,
      },
    };

    try {
      setDeleteModal(false);
      await Api.post("/api/locations/cities/delete", data);
      router.push("/admin/locations?pp=&p=&s=");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user.data && !["admin"].includes(user.data?.role)) {
      router.push("/");
    }
  }, [user]);

  return (
    <Admin>
      {city && (
        <PageTitle>
          {`${t("translation:city")}: ${city?.name}`}
          <Tooltip
            arrow
            title={t("translation:delete")}
            style={{ marginLeft: "20px", transform: "translateY(-2px)" }}
          >
            <IconButton
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </PageTitle>
      )}
      {loading && <Loader />}
      {!regions && !city && <Loader />}

      {regions && (
        <CityForm
          submitButtonText={t("translation:submit")}
          initialValues={cityInitialValues}
          submitHandler={updateCity}
          regions={regions}
        />
      )}

      <Modal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
        }}
        handleConfirm={deleteCity}
        text={
          t("modals:default-prefix") +
          t("modals:delete-location", { title: city?.name })
        }
      />
    </Admin>
  );
}
