import React from "react";
import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "../../inputs/CustomInput";
import CustomSelect from "../../inputs/CustomSelect";

const useStyles = makeStyles((theme) => ({
  cont: {
    maxWidth: "400px",
    marginBottom: "30px",
  },
}));

const Form = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const submitButtonText = props.submitButtonText;

  const regions = props.regions || [];
  const regionsOptions = regions.map((region) => { return { _id: region._id, title: region.name }});

  return (
    <Formik
      initialValues={props.initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      validationSchema={Yup.object({
        name: Yup.string().required(t("errors:required-field")),
        region: Yup.string().required(t("errors:required-field")),
      })}
      onSubmit={(values, formik) => {
        props.submitHandler(values, formik);
      }}
    >
      {(props) => {
        const setField = (value, field) => {
          props.setFieldValue(field, value);
        };

        return (
          <form onSubmit={props.handleSubmit}>
            <div className={classes.cont}>
              <CustomInput
                name="name"
                type="text"
                label={t("translation:name")}
                isrequired="true"
              />
              <CustomSelect
                id="region"
                name="region"
                label={t("translation:region")}
                changeHandler={(e) => {
                  setField(e.target.value, "region");
                }}
                isrequired="true"
                options={regionsOptions}
                value={props.values.region}
                error={props.errors.region}
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              {submitButtonText}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
