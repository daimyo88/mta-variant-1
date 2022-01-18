import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import PageTitle from "../../../components/text/PageTitle";
import Admin from "../../../layouts/Admin";
import Api from "../../../axios/Api";
import Loader from "../../../components/loaders/Loader";
import Divider from "../../../components/ui/Divider";

import UserDataForm from "../../../components/forms/users/UserData";
import NewPasswordForm from "../../../components/forms/users/NewPassword";
import useUser from "../../../hooks/useUser";
import Modal from "../../../components/modals/Modal";

const fetcher = (url) => Api.get(url);

const useStyles = makeStyles((theme) => ({}));

export default function Page() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();
  const [accountStatusModal, setAccountStatusModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const profileSWR = useSWR("/api/users/profile/" + router.query.id, fetcher);

  const initialValues = {
    firstName: profileSWR.data?.data?.firstName || "",
    lastName: profileSWR.data?.data?.lastName || "",
    email: profileSWR.data?.data?.email || "",
    role: profileSWR.data?.data?.role || "",
  };

  const passwordInitialValues = {
    newPassword: "",
    newPasswordRepeat: "",
  };

  const updateInfo = async (values, formik) => {
    try {
      setLoading(true);
      await Api.patch("/api/users/profile/" + router.query.id, values);
      profileSWR.mutate();
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (values, formik) => {
    try {
      setLoading(true);
      await Api.patch(
        "/api/users/profile/update-password/" + router.query.id,
        values
      );
      formik.resetForm(passwordInitialValues);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const data = {
      user: {
        _id: router.query.id,
      },
    };
    try {
      setDeleteModal(false);
      await Api.post("/api/users/delete", data);
      router.push("/admin/users?pp=&p=&s=");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Admin>
      {!profileSWR.data && <Loader />}

      {profileSWR.data && (
        <>
          <PageTitle>
            {`${t("translation:user-profile")}: ${
              profileSWR.data?.data?.firstName
            } ${profileSWR.data?.data?.lastName}`}
            {user.data?._id !== router.query.id && user.data?.role === "admin" && (
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
            )}
          </PageTitle>
          {loading && <Loader />}
          <Grid container>
            <Grid item xs={12}>
              <UserDataForm
                submitButtonText={t("translation:update-profile")}
                initialValues={initialValues}
                submitHandler={updateInfo}
              />
            </Grid>
            {router.query.id === user.data?._id && (
              <>
                <Divider />
                <Grid item xs={12}>
                  <NewPasswordForm
                    submitButtonText={t("translation:update-password")}
                    initialValues={passwordInitialValues}
                    submitHandler={updatePassword}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}

      <Modal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
        }}
        handleConfirm={deleteUser}
        text={
          t("modals:default-prefix") +
          t("modals:delete-profile", { email: profileSWR.data?.data?.email })
        }
      />
    </Admin>
  );
}
