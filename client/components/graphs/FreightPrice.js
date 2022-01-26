import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import useSWR from "swr";
import PageTitle from "../text/PageTitle";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomDatePicker from "../inputs/CustomDatePicker";
import CustomSelect from "../inputs/CustomSelect";
import LineChart from "../dataDisplay/stats/LineChart";
import startOfDay from "date-fns/startOfDay";
import subDays from "date-fns/subDays";
import endOfDay from "date-fns/endOfDay";
import { formatDate } from "../../utils/formatDate";
import Loader from "../loaders/OverlapLoader";

import Api from "../../axios/Api";

const useStyles = makeStyles((theme) => ({
    chartCont: {
        width: "calc(100% - 250px)",
        minHeight: "535px",
        "@media(max-width: 1600px)": {
            minHeight: "450px",
        },
        "@media(max-width: 1400px)": {
            minHeight: "360px",
        },
        [theme.breakpoints.down("sm")]: {
            minHeight: "150px",
            width: "100%",
            order: 2,
        },
    },
    filterCont: {
        width: "250px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            order: 1,
        },
    },
    periodLabel: {
        fontWeight: "bold",
    },
    noData: {
        height: "100%",
        fontSize: "20px",
        fontWeight: "bold",
    },
}));

let today = new Date();
const startDate = startOfDay(subDays(today, 30));
today = endOfDay(today);

const fetcher = (url) => Api.get(url);

export default function Page() {
    const { t } = useTranslation();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [startPeriod, setStartPeriod] = useState(startDate);
    const [endPeriod, setEndPeriod] = useState(today);
    const [productGroup, setProductGroup] = useState("all");
    const [transportCategory, setTransportCategory] = useState("all");
    const [area, setArea] = useState("all");

    const regions = useSWR("/api/locations/regions", fetcher).data?.data;
    const { data, mutate } = useSWR(
        regions &&
            "/api/stats/freight-price?start=" +
                startPeriod +
                "&end=" +
                endPeriod +
                "&pg=" +
                productGroup +
                "&tc=" +
                transportCategory +
                "&da=" +
                area,
        fetcher
    );

    const productGroups = [
        {
            _id: "all",
            title: t("translation:all"),
        },
        {
            _id: "food",
            title: t("product-groups:food"),
        },
        {
            _id: "electronics",
            title: t("product-groups:electronics"),
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
            _id: "other",
            title: t("translation:other"),
        },
    ];

    const transportCategories = [
        {
            _id: "all",
            title: t("translation:all"),
        },
        {
            _id: "< 1",
            title: "< 1",
        },
        {
            _id: "1 - 5",
            title: "1 - 5",
        },
        {
            _id: "5 - 10",
            title: "5 - 10",
        },
        {
            _id: "10 - 20",
            title: "10 - 20",
        },
        {
            _id: "20+",
            title: "20+",
        },
    ];

    const areas = [
        {
            _id: "all",
            title: t("translation:all"),
        },
    ];

    regions?.map((el) => {
        const newArea = {
            _id: el.name,
            title: el.name,
        };
        areas.push(newArea);
    });

    return (
        <div style={{ marginBottom: "25px" }}>
            <Grid container>
                <PageTitle>{t("translation:price-per-ton")}</PageTitle>
            </Grid>
            <Grid container spacing={2}>
                <Grid item className={classes.chartCont}>
                    {!data && <Loader />}
                    {data && !!data?.data?.labels?.length && (
                        <>
                            <LineChart data={data?.data} />
                            <Grid
                                container
                                spacing={2}
                                justifyContent="space-between"
                                style={{ marginTop: "10px" }}
                            >
                                <Grid item>
                                    <span className={classes.periodLabel}>
                                        {formatDate(startPeriod)}
                                    </span>
                                </Grid>
                                <Grid item>
                                    <span className={classes.periodLabel}>
                                        {formatDate(endPeriod)}
                                    </span>
                                </Grid>
                            </Grid>{" "}
                        </>
                    )}
                    {data && !data?.data?.labels?.length && (
                        <Grid
                            container
                            className={classes.noData}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>{t("translation:no-data")}</Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item className={classes.filterCont}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomDatePicker
                                value={startPeriod}
                                label={t("translation:date-from")}
                                changeHandler={(value) => {
                                    setStartPeriod(value);
                                }}
                                maxDate={endPeriod}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomDatePicker
                                value={endPeriod}
                                label={t("translation:date-to")}
                                changeHandler={(value) => {
                                    setEndPeriod(value);
                                }}
                                minDate={startPeriod}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="productGroup"
                                label={t("translation:product-group")}
                                changeHandler={(e) => {
                                    setProductGroup(e.target.value);
                                }}
                                options={productGroups}
                                value={productGroup}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="transportCategory"
                                label={t("translation:transport-category")}
                                changeHandler={(e) => {
                                    setTransportCategory(e.target.value);
                                }}
                                options={transportCategories}
                                value={transportCategory}
                            />
                        </Grid>
                        <Grid item md={12} sm={6} xs={12}>
                            <CustomSelect
                                id="area"
                                label={t("translation:dominant-area")}
                                changeHandler={(e) => {
                                    setArea(e.target.value);
                                }}
                                options={areas}
                                value={area}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
