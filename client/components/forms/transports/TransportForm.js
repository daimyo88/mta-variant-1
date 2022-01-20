import React from "react";
import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CustomInput from "../../inputs/CustomInput";
import CustomSwitch from "../../inputs/CustomSwitch";

import getTransportCategory from "../../../utils/getTransportCategory";
import setNumber from "../../../utils/form-helpers/setNumber";

const useStyles = makeStyles((theme) => ({
  cont: {
    marginBottom: "30px",
  },
  category: {
    marginTop: "-15px",
    marginBottom: "15px",
    fontSize: "16px",
    "& span": {
      marginLeft: "5px",
    },
  },
}));

const Form = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const submitButtonText = props.submitButtonText;

  return (
    <Formik
      initialValues={props.initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      validationSchema={Yup.object({
        model: Yup.string().required(t("errors:required-field")),
        maxWeight: Yup.string().required(t("errors:required-field")),
        height: Yup.string().required(t("errors:required-field")),
        volume: Yup.string().required(t("errors:required-field")),
      })}
      onSubmit={(values, formik) => {
        props.submitHandler(values, formik);
      }}
    >
      {(props) => {
        const setCheckbox = (event) => {
          props.setFieldValue(event.target.name, event.target.checked);
        };

        return (
          <>
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item lg={4} sm={6} xs={12}>
                  <CustomInput
                    name="model"
                    type="text"
                    label={t("translation:model")}
                    isrequired="true"
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <CustomInput
                    name="maxWeight"
                    type="number"
                    label={t("translation:max-weight")}
                    isrequired="true"
                    onBlur={(e) => {
                      setNumber(e, "maxWeight", props.setFieldValue, 1000, 1);
                      props.setFieldValue(
                        "category",
                        getTransportCategory(props.values.maxWeight)
                      );
                    }}
                  />
                  {!!props.values.category && (
                    <Grid
                      container
                      justifyContent="space-between"
                      className={classes.category}
                    >
                      <Grid item>
                        <span>{t("translation:transport-category")} :</span>
                      </Grid>
                      <Grid item>{props.values.category}</Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={4} sm={6} xs={12}>
                  <CustomInput
                    name="height"
                    type="number"
                    label={t("translation:height")}
                    isrequired="true"
                    onBlur={(e) => {
                      setNumber(e, "height", props.setFieldValue, 5);
                    }}
                  />
                </Grid>

                <Grid item lg={4} sm={6} xs={12}>
                  <CustomInput
                    name="volume"
                    type="number"
                    label={t("translation:volume")}
                    isrequired="true"
                    onBlur={(e) => {
                      setNumber(e, "volume", props.setFieldValue, 1000);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={4}
                  sm={6}
                  xs={12}
                  style={{ marginBottom: "15px", marginTop: "-10px" }}
                >
                  <CustomSwitch
                    value={props.values.coated}
                    onChange={setCheckbox}
                    name="coated"
                    color="primary"
                    label={t("translation:coated")}
                  />
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" color="primary">
                {submitButtonText}
              </Button>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default Form;
