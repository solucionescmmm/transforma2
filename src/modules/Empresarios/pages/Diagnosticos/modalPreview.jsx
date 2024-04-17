import React, { useState, useEffect, useRef } from "react";

//Hooks
import useGetDiagnHumano from "../../../Diagnosticos/hooks/useGetDiagnHumano";
import useGetDiagnTecn from "../../../Diagnosticos/hooks/useGetDiagnTecnico";
import useGetDiagnGeneral from "../../../Diagnosticos/hooks/useGetDiagnGeneral";
import useGetDiagnProd from "../../../Diagnosticos/hooks/useGetDiagnProd";
import useGetDiagnServ from "../../../Diagnosticos/hooks/useGetDiagnServ";

//Componentes de Material UI
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    Grid,
} from "@mui/material";

// Iconos
import { Article as ArticleIcon } from "@mui/icons-material";

//Componentes
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

const ModalPreview = ({
    handleOpenDialog,
    open,
    intIdIdea,
    intIdDiagnostico,
    onChangeRoute
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [objResumen, setObjResumen] = useState({
        bitResumenGen: false,
        bitResumenHumano: false,
        bitResumenTec: false,
        bitResumenProd: false,
        bitResumenServ: false,
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    const { getUniqueData: getUniqueDataProd } = useGetDiagnProd({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const { getUniqueData: getUniqueDataServ } = useGetDiagnServ({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    
    const refFntGetDataGen = useRef(getUniqueDataGen);
    const refFntGetDataHum = useRef(getUniqueDataHum);
    const refFntGetDataTec = useRef(getUniqueDataTec);
    const refFntGetDataProd = useRef(getUniqueDataProd);
    const refFntGetDataServ = useRef(getUniqueDataServ);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================


    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================

    useEffect(() => {
        if (intIdDiagnostico && intIdIdea && open) {
            setLoadingGetData(true);
            async function getData() {
                await refFntGetDataServ
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
                            bitResumenServ: true,
                        }));
                    }

                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                });

                await refFntGetDataProd
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
                            bitResumenProd: true,
                        }));
                    }

                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                });

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
        }
    }, [intIdDiagnostico, intIdIdea, open]);

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
        <Dialog
            fullScreen={bitMobile}
            open={loadingGetData ? true : open}
            onClose={handleOpenDialog}
            fullWidth
        >
            <DialogTitle>Previsualización diagnóstico</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Selecciona el detalle que desea visualizar
                </DialogContentText>

                <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ marginTop: "15px" }}
                >
                    <Grid item xs={6}>
                        <Button
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialRead", {
                                    intIdIdea: intIdIdea,
                                    intIdDiagnostico: intIdDiagnostico,
                                    isPreview: true,
                                })
                            }
                            color="primary"
                            disabled={!objResumen.bitResumenGen}
                            startIcon={<ArticleIcon />}
                        >
                            Información General
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialHumRead", {
                                    intIdIdea: intIdIdea,
                                    intIdDiagnostico: intIdDiagnostico,
                                    isPreview: true,
                                })
                            }
                            color="primary"
                            disabled={!objResumen.bitResumenHumano}
                            startIcon={<ArticleIcon />}
                        >
                            Competencias Humanas
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            color="primary"
                            disabled={!objResumen.bitResumenTec}
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialTecRead", {
                                    intIdIdea: intIdIdea,
                                    intIdDiagnostico: intIdDiagnostico,
                                    isPreview: true,
                                })
                            }
                            startIcon={<ArticleIcon />}
                        >
                            Competencias Técnicas
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            color="primary"
                            disabled={!objResumen.bitResumenProd}
                            onClick={() => {
                                onChangeRoute("DiagDesignProdRead", {
                                    intIdIdea,
                                    intIdDiagnostico,
                                    isPreview: true,
                                });
                            }}
                            startIcon={<ArticleIcon />}
                        >
                            producto
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            color="primary"
                            disabled={!objResumen.bitResumenServ}
                            onClick={() =>
                                onChangeRoute("DiagDesignServRead", {
                                    intIdIdea: intIdIdea,
                                    intIdDiagnostico: intIdDiagnostico,
                                    isPreview: true,
                                })
                            }
                            startIcon={<ArticleIcon />}
                        >
                            Servicio
                        </Button>
                    </Grid>
{/* 
                    <Grid item xs={6}>
                        <Button
                            color="primary"
                            disabled={true}
                            startIcon={<ArticleIcon />}
                        >
                            Consolidado diagnóstico
                        </Button>
                    </Grid> */}
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    type="button"
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPreview;