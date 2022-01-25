import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import { formatDate } from "../../utils/formatDate";
import { Typography } from "@material-ui/core";
import useUser from "../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "600px",
    },
    dataRow: {
        padding: "5px 0",
        fontSize: "15px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
        },
    },
    sectionHeading: {
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        paddingTop: "10px",
        "& h3": {
            marginBottom: "10px",
        },
    },
}));

export default function Data(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { t } = useTranslation();
    const info = props.data;

    const user = useUser()?.data;

    return (
        <Grid className={classes.container} container>
            <Grid item xs={12}>
                <Typography style={{ marginBottom: "10px" }} variant="h3">
                    {t("translation:general-data")}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:departure-date")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.departureDate ? formatDate(info?.departureDate) : ""}
            </Grid>
            {user?.role === "admin" && (
                <>
                    <Grid item xs={6} className={classes.dataRow}>
                        <b>{t("translation:owner")}:</b>
                    </Grid>
                    <Grid item xs={6} className={classes.dataRow}>
                        {`${info?.user?.firstName} ${info?.user?.lastName}`}
                    </Grid>
                </>
            )}

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:dominant-area")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.dominantArea}
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:dispatch-city")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.dispatchCity}
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:destination-city")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.destinationCity}
            </Grid>

            <Grid
                item
                xs={12}
                style={{ marginTop: "15px" }}
                className={classes.sectionHeading}
            >
                <Typography variant="h3">
                    {t("translation:freight-data")}
                </Typography>
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:product-group")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {t(`product-groups:${info?.freightData?.productGroup}`)}
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:cargo-weight")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.cargoWeight}
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:price-per-ton")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.pricePerTon}
            </Grid>

            <Grid
                item
                xs={12}
                style={{ marginTop: "15px" }}
                className={classes.sectionHeading}
            >
                <Typography variant="h3">
                    {t("translation:transport-data")}
                </Typography>
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:model")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.transportData?.vehicleModel}
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:max-weight")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.transportData?.maxWeight}
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:transport-category")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.transportData?.category}
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:volume")}:</b>
            </Grid>
            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.transportData?.volume}
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                <b>{t("translation:coated")}:</b>
            </Grid>

            <Grid item xs={6} className={classes.dataRow}>
                {info?.freightData?.transportData?.coated
                    ? t("translation:yes")
                    : t("translation:no")}
            </Grid>
        </Grid>
    );
}
