import React, { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

import Admin from "../../../layouts/Admin";
import TableFooter from "../../../components/footers/TableFooter";

import PageTitle from "../../../components/text/PageTitle";
import CustomSearch from "../../../components/inputs/CustomSearch";
import Api from "../../../axios/Api";
import useUser from "../../../hooks/useUser";
import Modal from "../../../components/modals/Modal";
import Loader from "../../../components/loaders/Loader";

import { formatDate } from "../../../utils/formatDate";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: "10px",
    size: "14px",
  },
  withMargin: {
    margin: "10px 0 5px",
    [theme.breakpoints.down("xs")]: {
      margin: "5px 0 10px",
    },
  },
  table: {
    margin: "20px 0",
    minWidth: "800px",
  },
  head: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "16px",
    background: theme.palette.secondary.main,
  },
  row: {
    fontSize: "16px",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  nothingFound: {
    fontSize: "24px",
    margin: "30px 0",
    fontWeight: "bold",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    cursor: "pointer",
  },
}));

const fetcher = (url) => Api.get(url);

export default function Page() {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles(theme);
  const router = useRouter();
  const user = useUser();
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [canFetch, setCanFetch] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const { data, mutate } = useSWR(
    user?.data &&
      canFetch &&
      "/api/data-entries?p=" + page + "&pp=" + itemsPerPage + "&s=" + search,
    fetcher
  );

  const dataEntries = data?.data?.data?.[0]?.dataEntries;

  useEffect(() => {
    let search = "",
      perPage = localStorage.getItem("items-per-page") || 15,
      page = 1;

    if (router?.query?.s) {
      search = router?.query?.s;
    }

    if (router?.query?.p) {
      page = router?.query?.p;
    }

    if (router?.query?.pp) {
      perPage = router?.query?.pp;
    }

    setInputValue(search);
    setSearch(search);
    setPage(page);
    setItemsPerPage(perPage);
    setCanFetch(true);
  }, [router]);

  useEffect(() => {
    if (canFetch) {
      let routerQuery = {
        pp: itemsPerPage,
        p: page,
        s: search,
      };
      router.push({
        pathname: "/admin/data-entries",
        query: routerQuery,
      });
    }
  }, [canFetch, itemsPerPage, page, search]);

  const submitSearch = () => {
    setPage(1);
    setSearch(inputValue);
  };

  const deleteItem = async (id) => {
    try {
      setDeleteModal(false);
      await Api.delete("/api/data-entries/" + currentItem._id);
      mutate();
    } catch (e) {
      console.log(e);
    }
  };

  const changeItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setPage(1);
    localStorage.setItem("items-per-page", e.target.value);
  };

  const exportData = async () => {
    const params = {
      page: page,
      search: search,
      itemsPerPage: itemsPerPage,
      language: router.locale,
      type: "spot-market",
    };
    try {
      const response = await Api.get("/api/data-entries/export", {
        params,
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const href = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = href;
      a.download =
        t("translation:data-entries") +
        ": " +
        t("translation:spot-market").toLowerCase() +
        ".csv";
      a.click();
      a.remove();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Admin>
      <PageTitle>{t("translation:data-entries")}</PageTitle>
      <Grid
        container
        style={{ marginTop: "20px" }}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <CustomSearch
            value={inputValue}
            changeHandler={setInputValue}
            submitHandler={submitSearch}
            clearHandler={() => {
              setSearch("");
            }}
          />
        </Grid>
      </Grid>

      {dataEntries && !dataEntries?.length && (
        <div className={classes.nothingFound}>
          {t("translation:no-items-found")}
        </div>
      )}

      {!dataEntries && (
        <div style={{ position: "relative", minHeight: "300px" }}>
          <Loader />
        </div>
      )}

      {!!dataEntries?.length && (
        <TableContainer style={{ flexGrow: 1 }}>
          <Table stickyHeader={true} className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>
                  {t("translation:departure-date")}
                </TableCell>
                <TableCell className={classes.head}>
                  {t("translation:dominant-area")}
                </TableCell>
                <TableCell className={classes.head}>
                  {t("translation:price-per-ton")}
                </TableCell>
                <TableCell className={classes.head}>
                  {t("translation:cargo-weight")}
                </TableCell>
                <TableCell className={classes.head}>
                  {t("translation:product-group")}
                </TableCell>
                {user.data?.role === "admin" && (
                  <TableCell className={classes.head}>
                    {t("translation:owner")}
                  </TableCell>
                )}
                <TableCell className={classes.head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEntries?.map((item) => {
                console.log(item);
                return (
                  <TableRow className={classes.row} key={item._id}>
                    <TableCell>
                      <Link href={"/admin/data-entries/" + item._id}>
                        <a
                          style={{ fontWeight: "bold" }}
                          className={classes.link}
                        >
                          {formatDate(item.departureDate)}
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <b
                        className={classes.link}
                        onClick={() => {
                          setSearch(item.freightData?.dominantArea);
                        }}
                      >
                        {item.freightData?.dominantArea}
                      </b>
                    </TableCell>
                    <TableCell>{item.freightData.pricePerTon}</TableCell>
                    <TableCell>{item.freightData.cargoWeight}</TableCell>
                    <TableCell>
                    <b
                        className={classes.link}
                        onClick={() => {
                          setSearch(item.freightData.productGroup);
                        }}
                      >
                      {t(`product-groups:${item.freightData.productGroup}`)}
                      </b>
                    </TableCell>
                    {user.data?.role === "admin" && (
                      <TableCell>
                        <Link href={"/admin/users/" + item.owner._id}>
                          <a
                            style={{ fontWeight: "bold" }}
                            className={classes.link}
                          >
                            {item.owner.fullname}
                          </a>
                        </Link>
                      </TableCell>
                    )}
                    <TableCell align="right">
                      <Grid container style={{ flexWrap: "nowrap" }}>
                        <Grid item>
                          <Link href={"/admin/data-entries/" + item._id}>
                            <Tooltip arrow title={t("translation:view")}>
                              <IconButton size="small">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </Grid>
                        {user.data?.role === "admin" && (
                          <Grid item>
                            <Tooltip arrow title={t("translation:delete")}>
                              <IconButton
                                className={classes.icon}
                                size="small"
                                onClick={() => {
                                  setCurrentItem({
                                    _id: item._id,
                                    date: formatDate(item.departureDate),
                                  });
                                  setDeleteModal(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )}
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!!dataEntries?.length && (
        <Grid container justifyContent="space-between">
          <Grid item sm={6} xs={12} style={{ marginBottom: "15px" }}>
            <TableFooter
              page={page}
              pages={data?.data?.pages}
              itemsPerPage={itemsPerPage}
              changeItemsPerPage={changeItemsPerPage}
              setPage={(event, value) => setPage(value)}
            />
          </Grid>
        </Grid>
      )}

      <Modal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
        }}
        handleConfirm={deleteItem}
        text={
          t("modals:default-prefix") +
          t("modals:delete-data-entry", { date: currentItem?.date })
        }
      />
    </Admin>
  );
}
