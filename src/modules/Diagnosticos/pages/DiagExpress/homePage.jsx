import React, { Fragment, useEffect, useRef, useState } from "react";

//Componentes de Mui
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Box,
    Typography,
} from "@mui/material";

// Iconos
import {
    DirectionsRun as DirectionsRunIcon,
    ListAlt as ListAltIcon,
} from "@mui/icons-material";

import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

import useGetDiagnExp from "../../hooks/useGetDiagnExp";

const DiagExpress = ({ intIdIdea, intIdDiagnostico, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [objResumen, setObjResumen] = useState({
        bitResumenExpress: false,
    });

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData: getUniqueDataExp } = useGetDiagnExp({
        autoLoad: false,
        intIdDiagnostico,
        intIdIdea,
    });

    const refFntGetDataExp = useRef(getUniqueDataExp);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoadingGetData(true);

        async function getData() {
            await refFntGetDataExp
                .current({
                    intIdDiagnostico,
                    intIdIdea,
                })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenProducto: true,
                        }));
                    }

                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                });

            setLoadingGetData(false);
        }

        getData();
    }, [intIdDiagnostico, intIdIdea]);
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
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Card>
                        <CardActionArea
                            onClick={() => {
                                onChangeRoute("DiagnExpressRead", {
                                    intIdIdea,
                                    intIdDiagnostico,
                                });
                            }}
                            disabled={!objResumen.bitResumenExpress}
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
                                                    !objResumen.bitResumenExpress
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
                            onClick={() =>
                                onChangeRoute("DiagnExpressCreate", {
                                    intIdIdea,
                                    intIdDiagnostico,
                                })
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
                                                backgroundColor: "#7BDBD8",
                                                padding: "25px",
                                            }}
                                        >
                                            <Box>
                                                <DirectionsRunIcon
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
                                            Diagnóstico exprés
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

export default DiagExpress;
