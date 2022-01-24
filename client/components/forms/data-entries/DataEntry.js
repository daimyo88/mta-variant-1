import React from "react";
import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

import CustomInput from "../../inputs/CustomInput";
import CustomSelect from "../../inputs/CustomSelect";
import CustomDatePicker from "../../inputs/CustomDatePicker";

import setNumber from "../../../utils/form-helpers/setNumber";

const useStyles = makeStyles((theme) => ({
  cont: {
    maxWidth: "350px",
  },
  additionalInfo: {
    marginTop: "-15px",
    marginBottom: "15px",
    "& p": {
      margin: 0,
      marginBottom: "5px",
    },
  },
  commentCont: {
      marginBottom: '20px',
      '& .MuiFormControl-root': {
          width: '100%'
      }
  }
}));

export default function Form(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const transports = props.transports;
  const locations = props.locations;

  const productGroups = [
    {
      _id: "",
      title: t("translation:select-product-group"),
    },
    {
      _id: "gasoline-and-components",
      title: t("product-groups:gasoline-and-components"),
    },
    {
      _id: "chemicals",
      title: t("product-groups:chemicals"),
    },
    {
      _id: "heavy-products",
      title: t("product-groups:heavy-products"),
    },
    {
      _id: "biodiesel",
      title: t("product-groups:biodiesel"),
    },
    {
      _id: "other",
      title: t("translation:other"),
    },
  ];

  const transportOptions = [
    {
      _id: "",
      title: t("translation:select-transport"),
    },
  ];

  transports?.forEach((el) => {
    transportOptions.push({
      _id: el._id,
      title: el.vehicleModel,
    });
  });

  const citiesOptions = [
    {
      _id: "",
      title: t("translation:select"),
    },
  ];

  const regionsOptions = [
    {
      _id: "",
      title: t("translation:select"),
    },
  ];

  locations?.forEach((el) => {
    const region = {
      _id: el._id,
      title: el.name,
    };
    regionsOptions.push(region);
    if (el.cities.length) {
      citiesOptions.push({
        ...region,
        categoryTitle: true,
      });
      el.cities.forEach((el) => {
        citiesOptions.push({
          _id: el._id,
          title: el.name,
        });
      });
    }
  });

  return (
    <Formik
      initialValues={props.initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      validationSchema={Yup.object({
        departureDate: Yup.string()
          .nullable()
          .required(t("errors:required-field")),
        transport: Yup.string().required(t("errors:required-field")),
        productGroup: Yup.string().required(t("errors:required-field")),
        dispatchCity: Yup.string().required(t("errors:required-field")),
        destinationCity: Yup.string().required(t("errors:required-field")),
        dominantArea: Yup.string().required(t("errors:required-field")),
        pricePerTon: Yup.string().required(t("errors:required-field")),
        cargoWeight: Yup.string().required(t("errors:required-field")),
      })}
      onSubmit={(values, formik) => {
        props.submitHandler(values, formik);
      }}
    >
      {(props) => {
        const setField = (value, field) => {
          if (field === "transport") {
            const currentTransport = transports.find((el) => el._id === value);
            props.setFieldValue("transportData", currentTransport);
          }
          props.setFieldValue(field, value);
        };

        return (
          <form onSubmit={props.handleSubmit} className={classes.cont}>
            <CustomDatePicker
              label={t("translation:departure-date")}
              changeHandler={(value) => {
                setField(value, "departureDate");
              }}
              isrequired="true"
              value={props.values.departureDate}
              error={props.errors.departureDate}
            />

            <CustomSelect
              id="transport"
              name="transport"
              label={t("translation:transport")}
              changeHandler={(e) => {
                setField(e.target.value, "transport");
              }}
              isrequired="true"
              options={transportOptions}
              value={props.values.transport}
              error={props.errors.transport}
            />
            {props.values.transportData?.category && (
              <div className={classes.additionalInfo}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <b>
                      <p>{t("translation:max-weight")}:</p>
                    </b>
                  </Grid>
                  <Grid item>
                    <p>{props.values.transportData?.maxWeight}</p>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <b>
                      <p>{t("translation:transport-category")}:</p>
                    </b>
                  </Grid>
                  <Grid item>
                    <p>{props.values.transportData?.category}</p>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <b>
                      <p>{t("translation:volume")}:</p>
                    </b>
                  </Grid>
                  <Grid item>
                    <p>{props.values.transportData?.volume}</p>
                  </Grid>
                </Grid>

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <b>
                      <p>{t("translation:coated")}:</p>
                    </b>
                  </Grid>
                  <Grid item>
                    <p>
                      {props.values.transportData?.coated
                        ? t("translation:yes")
                        : t("translation:no")}
                    </p>
                  </Grid>
                </Grid>
              </div>
            )}

            <CustomSelect
              id="productGroup"
              name="productGroup"
              label={t("translation:product-group")}
              changeHandler={(e) => {
                setField(e.target.value, "productGroup");
              }}
              isrequired="true"
              options={productGroups}
              value={props.values.productGroup}
              error={props.errors.productGroup}
            />

            <CustomSelect
              id="dispatchCity"
              name="dispatchCity"
              label={t("translation:dispatch-city")}
              changeHandler={(e) => {
                setField(e.target.value, "dispatchCity");
              }}
              isrequired="true"
              options={citiesOptions}
              value={props.values.dispatchCity}
              error={props.errors.dispatchCity}
            />

            <CustomSelect
              id="destinationCity"
              name="destinationCity"
              label={t("translation:destination-city")}
              changeHandler={(e) => {
                setField(e.target.value, "destinationCity");
              }}
              isrequired="true"
              options={citiesOptions}
              value={props.values.destinationCity}
              error={props.errors.destinationCity}
            />

            <CustomSelect
              id="dominantArea"
              name="dominantArea"
              label={t("translation:dominant-area")}
              changeHandler={(e) => {
                setField(e.target.value, "dominantArea");
              }}
              isrequired="true"
              options={regionsOptions}
              value={props.values.dominantArea}
              error={props.errors.dominantArea}
            />

            <CustomInput
              name="cargoWeight"
              type="number"
              label={t("translation:cargo-weight")}
              isrequired="true"
              onBlur={(e) => {
                setNumber(
                  e,
                  "cargoWeight",
                  props.setFieldValue,
                  props.values.transportData?.maxWeight,
                  2
                );
              }}
            />

            <CustomInput
              name="pricePerTon"
              type="number"
              label={t("translation:price-per-ton")}
              isrequired="true"
              onBlur={(e) => {
                setNumber(e, "pricePerTon", props.setFieldValue, 100000, 2);
              }}
            />

            <div className={classes.commentCont}>
              <Typography
                variant="h3"
                style={{ fontWeight: 'normal', marginBottom: "10px", marginTop: "15px" }}
              >
                {t("translation:comment")}
              </Typography>
              <TextField
                name="comment"
                type="text"
                onChange={(e) => setField(e.target.value, "comment")}
                value={props.values.comment}
                variant="outlined"
                minRows={3}
                multiline={true}
                color="secondary"
              />
            </div>

            <Button type="submit" variant="contained" color="primary">
              {t("translation:submit")}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
