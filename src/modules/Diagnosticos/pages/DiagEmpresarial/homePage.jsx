import React, { useState, useEffect, useRef, Fragment } from "react";

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
    People as PeopleIcon,
    ManageAccounts as ManageAccountsIcon,
    FactCheck as FactCheckIcon,
    ListAlt as ListAltIcon,
} from "@mui/icons-material";

// Hooks
import useGetDiagnHumano from "../../hooks/useGetDiagnHumano";

// Componentes
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

import ModalResumen from "./modalResumen";
import useGetDiagnTecn from "../../hooks/useGetDiagnTecnico";
import useGetDiagnGeneral from "../../hooks/useGetDiagnGeneral";

const DiagEmpresarialPage = ({
    intId,
    intIdIdea,
    onChangeRoute,
    intIdDiagnostico,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [openModalResumen, setOpenModalResumen] = useState(false);

    const handleOpenModalResumen = () => {
        setOpenModalResumen(!openModalResumen);
    };

    // eslint-disable-next-line no-unused-vars
    const [objResumen, setObjResumen] = useState({
        bitResumenGen: false,
        bitResumenHumano: false,
        bitResumenTec: false,
    });

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData: getUniqueDataHum } = useGetDiagnHumano({
        autoLoad: false,
        intIdDiagnostico,
        intIdIdea,
    });

    const { getUniqueData: getUniqueDataTec } = useGetDiagnTecn({
        autoLoad: false,
        intIdDiagnostico,
        intIdIdea,
    });

    const { getUniqueData: getUniqueDataGen } = useGetDiagnGeneral({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const refFntGetDataGen = useRef(getUniqueDataGen);
    const refFntGetDataHum = useRef(getUniqueDataHum);
    const refFntGetDataTec = useRef(getUniqueDataTec);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoadingGetData(true);

        async function getData() {
            await refFntGetDataHum
                .current({
                    intIdIdea,
                    intIdDiagnostico,
                })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenHumano: true,
                        }));
                    }

                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                });

            await refFntGetDataTec
                .current({
                    intIdIdea,
                    intIdDiagnostico,
                })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenTec: true,
                        }));
                    }

                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                });

            await refFntGetDataGen
                .current({
                    intIdIdea,
                    intIdDiagnostico,
                })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data?.data) {
                        setObjResumen((prevState) => ({
                            ...prevState,
                            bitResumenGen: true,
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
            <ModalResumen
                onChangeRoute={onChangeRoute}
                onClose={handleOpenModalResumen}
                open={openModalResumen}
                values={{
                    objResumen,
                    intIdDiagnostico,
                    intIdIdea,
                }}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Card>
                        <CardActionArea
                            onClick={() => handleOpenModalResumen()}
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
                                onChangeRoute("DiagEmpresarialCreate", {
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
                                                <FactCheckIcon
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
                                            Información general
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
                                onChangeRoute("DiagEmpresarialHumCreate", {
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
                                                <PeopleIcon
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
                                            Competencias humanas
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
                                onChangeRoute("DiagEmpresarialTecCreate", {
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
                                                <ManageAccountsIcon
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
                                            Competencias técnicas
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

export default DiagEmpresarialPage;
