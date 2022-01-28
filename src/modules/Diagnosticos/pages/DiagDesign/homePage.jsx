import React, { Fragment, useEffect, useRef, useState } from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

//Componentes de Mui
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Box,
    Typography,
    Button,
} from "@mui/material";

// Iconos
import {
    Biotech as BiotechIcon,
    ChevronLeft as ChevronLeftIcon,
    ConnectWithoutContact as ConnectWithoutContactIcon,
    ListAlt as ListAltIcon,
} from "@mui/icons-material";

import useGetDiagnProd from "../../hooks/useGetDiagnProd";
import useGetDiagnServ from "../../hooks/useGetDiagnServ";
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

import ModalResumen from "./modalResumen";

const DiagDesign = ({ intId }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [openModalResumen, setOpenModalResumen] = useState(false);

    const handleOpenModalResumen = () => {
        setOpenModalResumen(!openModalResumen);
    };

    const [objResumen, setObjResumen] = useState({
        bitResumenProducto: false,
        bitResumenServicio: false,
    });

    const [objProducto, setObjProducto] = useState();
    const [objServicio, setObjServicio] = useState();

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData: getUniqueDataProd } = useGetDiagnProd({
        autoLoad: false,
    });

    const { getUniqueData: getUniqueDataServ } = useGetDiagnServ({
        autoLoad: false,
    });

    const refFntGetDataProd = useRef(getUniqueDataProd);
    const refFntGetDataServ = useRef(getUniqueDataServ);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoadingGetData(true);

        async function getData() {
            await refFntGetDataProd
                .current({ intIdEmpresario: intId })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        let data = res.data.data[0];

                        setObjProducto(data);

                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenProducto: true,
                        }));
                    }

                    setLoadingGetData(false);
                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                    setLoadingGetData(false);
                });

            await refFntGetDataServ
                .current({ intIdEmpresario: intId })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        let data = res.data.data[0];

                        setObjServicio(data);

                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenServicio: true,
                        }));
                    }

                    setLoadingGetData(false);
                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                    setLoadingGetData(false);
                });
        }

        getData();
    }, [intId]);
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    return (
        <Fragment>
            <ModalResumen
                onClose={handleOpenModalResumen}
                open={openModalResumen}
                values={{
                    intIdProducto: objProducto?.objInfoGeneral?.intId,
                    intIdServicio: objServicio?.objInfoGeneral?.intId,
                }}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Button
                        component={RouterLink}
                        to={`/diagnosticos`}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Card>
                        <CardActionArea
                            onClick={() => handleOpenModalResumen()}
                            disabled={
                                !objResumen.bitResumenProducto &&
                                !objResumen.bitResumenServicio
                            }
                        >
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                                backgroundColor:
                                                    !objResumen.bitResumenProducto &&
                                                    !objResumen.bitResumenServicio
                                                        ? "gray"
                                                        : "#7BDBD8",
                                                padding: "25px",
                                            }}
                                        >
                                            <Box>
                                                <ListAltIcon
                                                    htmlColor="#fff"
                                                    sx={{ fontSize: "80px" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Resumen
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Card>
                        <CardActionArea
                            component={RouterLink}
                            to={`/diagnosticos/diagDesign/product/create`}
                        >
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#7BDBD8",
                                                padding: "25px",
                                            }}
                                        >
                                            <Box>
                                                <BiotechIcon
                                                    htmlColor="#fff"
                                                    sx={{ fontSize: "80px" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Producto
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Card>
                        <CardActionArea
                            component={RouterLink}
                            to={`/diagnosticos/diagDesign/service/create`}
                        >
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#7BDBD8",
                                                padding: "25px",
                                            }}
                                        >
                                            <Box>
                                                <ConnectWithoutContactIcon
                                                    htmlColor="#fff"
                                                    sx={{ fontSize: "80px" }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Servicio
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DiagDesign;
