import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { format, parseISO } from "date-fns";
import validator from "validator";
import html2canvas from "html2canvas";
import { propiedades as propiedadesMercadeo } from "../../Create&Edit/Tecnicas/infoComMercadeo";

//Componentes de Mui
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";

//Iconos
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Edit as EditIcon,
    Print as PrintIcon,
    CheckCircle as CheckCircleIcon,
    RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";
import ModalFinish from "./modalFinish";
import { Can } from "../../../../../../common/functions/can";
import ChartBar from "./chartBar";
import useGetDataPDFTecnico from "../../../../hooks/useGetDataPDFTecnico";
import { propiedades as propiedadesAdmin } from "../../Create&Edit/Tecnicas/infoComAdministrativo";
import { propiedades as propiedadesProd } from "../../Create&Edit/Tecnicas/infoComProductivo";
import { propiedades as propiedadesFin } from "../../Create&Edit/Tecnicas/infoComFinanciero";
import { propiedades as propiedadesAsoc } from "../../Create&Edit/Tecnicas/infoComAsociativo";

const ResumenTecnicas = ({ onChangeRoute, intIdIdea, intIdDiagnostico }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoGeneral: [
            {
                parent: "dtmFechaSesion",
                value: "",
                label: "Fecha y hora de la sesión",
            },
            {
                parent: "strLugarSesion",
                value: "",
                label: "Lugar de la sesión",
            },
            {
                parent: "dtmActualizacion",
                value: null,
                label: "Fecha de ultima actualización",
            },
            {
                parent: "strUsuarioCreacion",
                value: "",
                label: "Responsable del diagnóstico",
            },
            {
                parent: "strUsuarioActualizacion",
                value: "",
                label: "Responsable de actualizar la información",
            },
        ],
        objInfoTemasFortalecer: [],
        objInfoFortalezas: [],
    });

    const [loadingGetData, setLoadingGetData] = useState(false);
    const [openModalFinish, setOpenModalFinish] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [openModalPDF, setOpenModalPDF] = useState(false);

    const [openCollapseInfoGeneral, setOpenCollapseInfoGeneral] =
        useState(true);

    const [openCollapseTemasFortalecer, setOpenCollapseTemasFortalecer] =
        useState(true);

    const [openCollapseFortalezas, setOpenCollapseFortalezas] = useState(true);


    const [openCollapseGrafico, setOpenCollapseGrafico] = useState(true);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData } = useGetDataPDFTecnico({
        autoLoad: false,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerChangeOpenModalFinish = () => {
        setOpenModalFinish(!openModalFinish);
    };

    async function getData() {
        await refFntGetData
            .current({ intIdDiagnostico })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }

                if (res.data) {
                    let data = res.data.data[0];

                    setFinalizado(data.objInfoGeneral.btFinalizado);

                    const arrayTecnicas = data.arrayTecnicas

                    const objInfoGeneral = {
                        dtmFechaSesion: data.objInfoGeneral.dtmFechaSesion
                            ? parseISO(data.objInfoGeneral.dtmFechaSesion)
                            : null,
                        strLugarSesion:
                            data.objInfoGeneral.strLugarSesion || "",
                        strUsuarioCreacion:
                            data.objInfoGeneral.strUsuarioCreacion || "",
                        dtmActualizacion: data.objInfoGeneral.dtmActualizacion
                            ? parseISO(data.objInfoGeneral.dtmActualizacion)
                            : null,
                        strUsuarioActualizacion:
                            data.objInfoGeneral.strUsuarioActualizacion || "",
                    };


                    const objMercadeoBajo = data.objMercadeoBajo
                    const objMercadeoMedio = data.objMercadeoMedio
                    const objMercadeoAlto = data.objMercadeoAlto

                    const objProductivoBajo = data.objProductivoBajo
                    const objProductivoMedio = data.objProductivoMedio
                    const objProductivoAlto = data.objProductivoAlto

                    const objFinancieroBajo = data.objFinancieroBajo
                    const objFinancieroMedio = data.objFinancieroMedio
                    const objFinancieroAlto = data.objFinancieroAlto

                    const objAdministrativoBajo = data.objAdministrativoBajo
                    const objAdministrativoMedio = data.objAdministrativoMedio
                    const objAdministrativoAlto = data.objAdministrativoAlto

                    const objAsociativoBajo = data.objAsociativoBajo
                    const objAsociativoMedio = data.objAsociativoMedio
                    const objAsociativoAlto = data.objAsociativoAlto

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;
                        let prevInfoTemasFortalecer =
                            prevState.objInfoTemasFortalecer;
                        let prevInfoFortalezas = prevState.objInfoFortalezas;

                     
                        for (const key in objInfoGeneral) {
                            if (
                                Object.hasOwnProperty.call(objInfoGeneral, key)
                            ) {
                                prevInfoGeneral.forEach((e) => {
                                    if (e.parent === key) {
                                        e.value = objInfoGeneral[key];

                                        if (key === "dtmActualizacion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(e.value, "yyyy-MM-dd H:mm")
                                                : "No diligenciado";
                                        }

                                        if (key === "dtmFechaSesion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(
                                                      e.value,
                                                      "yyyy-MM-dd H:mm"
                                                  )
                                                : "No diligenciado";
                                        }
                                    }
                                });
                            }
                        }

                        const getLabelMercadeo = (parent) => {
                            const label = propiedadesMercadeo.find(x => x.nombre === parent)?.label
                            return label
                        }

                        const getLabelProductivo = (parent) => {
                            const label = propiedadesProd.find(x => x.nombre === parent)?.label
                            return label
                        }

                        const getLabelFinanciero = (parent) => {
                            const label = propiedadesFin.find(x => x.nombre === parent)?.label
                            return label
                        }
                        
                        const getLabelAdministrativo = (parent) => {
                            const label = propiedadesAdmin.find(x => x.name === parent)?.label
                            return label
                        }

                        const getLabelAsociativo = (parent) => {
                            const label = propiedadesAsoc.find(x => x.name === parent)?.label
                            return label
                        }

                        const objMercadeoFortalecer = []
                        const objMercadeoFortalezas = []

                        const objProductivoFortalecer = []
                        const objProductivoFortalezas = []

                        const objFinancieroFortalecer = []
                        const objFinancieroFortalezas = []

                        const objAdministrativoFortalecer = []
                        const objAdministrativoFortalezas = []

                        const objAsociativoFortalecer = []
                        const objAsociativoFortalezas = []

                        for (const key in objMercadeoBajo) {
                            const obj = objMercadeoBajo[parseInt(key)]
                            objMercadeoFortalecer.push({...obj, label: getLabelMercadeo(obj.parent)})
                        }

                        for (const key in objMercadeoMedio) {
                            const obj = objMercadeoMedio[parseInt(key)]
                            objMercadeoFortalecer.push({...obj, label: getLabelMercadeo(obj.parent)})
                        }

                        for (const key in objMercadeoAlto) {
                            const obj = objMercadeoAlto[parseInt(key)]
                            objMercadeoFortalezas.push({...obj, label: getLabelMercadeo(obj.parent)})
                        }

                        for (const key in objProductivoBajo) {
                            const obj = objProductivoBajo[parseInt(key)]
                            objProductivoFortalecer.push({...obj, label: getLabelProductivo(obj.parent)})
                        }

                        for (const key in objProductivoMedio) {
                            const obj = objProductivoMedio[parseInt(key)]
                            objProductivoFortalecer.push({...obj, label: getLabelProductivo(obj.parent)})
                        }

                        for (const key in objProductivoAlto) {
                            const obj = objProductivoAlto[parseInt(key)]
                            objProductivoFortalezas.push({...obj, label: getLabelProductivo(obj.parent)})
                        }

                        for(const key in objFinancieroBajo) {
                            const obj = objFinancieroBajo[parseInt(key)]
                            objFinancieroFortalecer.push({...obj, label: getLabelFinanciero(obj.parent)})
                        }

                        for(const key in objFinancieroMedio) {
                            const obj = objFinancieroMedio[parseInt(key)]
                            objFinancieroFortalecer.push({...obj, label: getLabelFinanciero(obj.parent)})
                        }

                        for(const key in objFinancieroAlto) {
                            const obj = objFinancieroAlto[parseInt(key)]
                            objFinancieroFortalezas.push({...obj, label: getLabelFinanciero(obj.parent)})
                        }

                        for(const key in objAdministrativoBajo) {
                            const obj = objAdministrativoBajo[parseInt(key)]
                            objAdministrativoFortalecer.push({...obj, label: getLabelAdministrativo(obj.parent)})
                        }

                        for(const key in objAdministrativoMedio) {
                            const obj = objAdministrativoMedio[parseInt(key)]
                            objAdministrativoFortalecer.push({...obj, label: getLabelAdministrativo(obj.parent)})
                        }

                        for(const key in objAdministrativoAlto) {
                            const obj = objAdministrativoAlto[parseInt(key)]
                            objAdministrativoFortalezas.push({...obj, label: getLabelAdministrativo(obj.parent)})
                        }

                        for(const key in objAsociativoBajo) {
                            const obj = objAsociativoBajo[parseInt(key)]
                            objAsociativoFortalecer.push({...obj, label: getLabelAsociativo(obj.parent)})
                        }

                        for(const key in objAsociativoMedio) {
                            const obj = objAsociativoMedio[parseInt(key)]
                            objAsociativoFortalecer.push({...obj, label: getLabelAsociativo(obj.parent)})
                        }

                        for(const key in objAsociativoAlto) {
                            const obj = objAsociativoAlto[parseInt(key)]
                            objAsociativoFortalezas.push({...obj, label: getLabelAsociativo(obj.parent)})
                        }


                        if(objMercadeoFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objMercadeoFortalecer,
                            });
                        }

                        if(objProductivoFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objProductivoFortalecer,
                            });
                        }

                        if(objFinancieroFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objFinancieroFortalecer,
                            });
                        }

                        if(objAdministrativoFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objAdministrativoFortalecer,
                            });
                        }

                        if(objAsociativoFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objAsociativoFortalecer,
                            });
                        }

                        if(objMercadeoFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objMercadeoFortalezas,
                            });
                        }

                        if(objProductivoFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objProductivoFortalezas,
                            });
                        }

                        if(objFinancieroFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objFinancieroFortalezas,
                            });
                        }

                        if(objAdministrativoFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objAdministrativoFortalezas,
                            });
                        }

                        if(objAsociativoFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objAsociativoFortalezas,
                            });
                        }

                        return {
                            ...prevState,
                            objInfoGeneral: prevInfoGeneral,
                            objInfoTemasFortalecer: prevInfoTemasFortalecer,
                            objInfoFortalezas: prevInfoFortalezas,
                            arrayTecnicas
                        };
                    });
                }

                setLoadingGetData(false);
                setErrorGetData({ flag: false, msg: "" });
            })
            .catch((error) => {
                setErrorGetData({ flag: true, msg: error.message });
                setLoadingGetData(false);
            });
    }

    const handlerChangeOpenModalPDF = () => {
        const divChart = window.document.getElementById("chart-diag-serv");

        html2canvas(divChart).then((canvas) => {
            const img = canvas.toDataURL("image/png");

            setData((prevState) => ({
                ...prevState,
                imgChart: img,
            }));

            setOpenModalPDF(!openModalPDF);
        });
    };

    const handlerChangeOpenCollapseInfoGeneral = () => {
        setOpenCollapseInfoGeneral(!openCollapseInfoGeneral);
    };

    const handlerChangeOpenCollapseGrafico = () => {
        setOpenCollapseGrafico(!openCollapseGrafico);
    };

    
    const handlerChangeopenCollapseTemasFortalecer = () => {
        setOpenCollapseTemasFortalecer(!openCollapseTemasFortalecer);
    };

    const handlerChangeopenCollapseFortalezas = () => {
        setOpenCollapseFortalezas(!openCollapseFortalezas);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intIdIdea) {
            setLoadingGetData(true);
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intIdIdea, intIdDiagnostico]);

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
            <ModalEditDiag
                intId={intIdDiagnostico}
                handleOpenDialog={handlerChangeOpenModalEdit}
                open={openModalEdit}
                onChangeRoute={onChangeRoute}
                intIdIdea={intIdIdea}
                intIdDiagnostico={intIdDiagnostico}
            />

            <ModalFinish
                handleOpenDialog={handlerChangeOpenModalFinish}
                open={openModalFinish}
                onChangeRoute={onChangeRoute}
                intIdIdea={intIdIdea}
                intIdDiagnostico={intIdDiagnostico}
                refresh={getData}
            />

            <ModalPDF
                handleOpenDialog={handlerChangeOpenModalPDF}
                open={openModalPDF}
                intId={intIdIdea}
                values={data}
                intIdDiagnostico={intIdDiagnostico}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}></Box>

                        <Box>
                            <Tooltip title="Finalizar diagnóstico">
                                <IconButton
                                    color="error"
                                    disabled={finalizado}
                                    onClick={() =>
                                        handlerChangeOpenModalFinish()
                                    }
                                >
                                    <CheckCircleIcon />
                                </IconButton>
                            </Tooltip>

                            <Can I="edit" a="Diag">
                                <Tooltip title="Editar diagnóstico">
                                    <IconButton
                                        color="success"
                                        disabled={finalizado}
                                        onClick={() =>
                                            handlerChangeOpenModalEdit()
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Can>

                            <Tooltip title="Imprimir diagnóstico">
                                <IconButton
                                    color="inherit"     
                                    onClick={() => handlerChangeOpenModalPDF()}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            {finalizado ? (
                                <Tooltip title="Previsualizar diagnóstico">
                                    <IconButton
                                        color="inherit"
                                        onClick={()=> onChangeRoute("DiagEmpresarialTecPrev", {
                                            intIdIdea,
                                            intIdDiagnostico,
                                            isPreview : true
                                        })}
                                    >
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        sx={{ color: "#F5B335", textTransform: "uppercase" }}
                        textAlign="center"
                    >
                        <b>detalle diagnóstico de competencias técnicas</b>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Información general</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoGeneral()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoGeneral
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoGeneral ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoGeneral} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoGeneral.map((e, i) => (
                                    <Grid item xs={12} md={6} key={i}>
                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
                                                display: "flex",
                                                alignContent: "center",
                                            }}
                                        >
                                            <b style={{ marginRight: "5px" }}>
                                                {e.label}:{" "}
                                            </b>
                                            {e.value || "No diligenciado"}
                                        </p>
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>


                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Fortalezas</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeopenCollapseFortalezas()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseFortalezas
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseFortalezas ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseFortalezas} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoFortalezas.map((e, i) => {
                                    if (e.objMercadeoFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Mercadeo
                                                    </Typography>
                                                </Grid>

                                                {e.objMercadeoFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                        

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objProductivoFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Productivo
                                                    </Typography>
                                                </Grid>

                                                {e.objProductivoFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                    <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                    

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objFinancieroFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Financiero
                                                    </Typography>
                                                </Grid>

                                                {e.objFinancieroFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                     <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                   

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objAdministrativoFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Administrativo
                                                    </Typography>
                                                </Grid>

                                                {e.objAdministrativoFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                 <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                       

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objAsociativoFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Asociativo
                                                    </Typography>
                                                </Grid>

                                                {e.objAsociativoFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                     <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                   

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    return null;
                                })}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Temas a fortalecer</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeopenCollapseTemasFortalecer()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseTemasFortalecer
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseTemasFortalecer ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseTemasFortalecer}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoTemasFortalecer.map((e, i) => {
                                    if (e.objMercadeoFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Mercadeo
                                                    </Typography>
                                                </Grid>

                                                {e.objMercadeoFortalecer.map(
                                                    (e, i) => {
                                                        return ( <Fragment key={i}>

                                                            <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            md={2}
                                                                                                                        >
                                                                                                                            <p
                                                                                                                                style={{
                                                                                                                                    margin: "0px",
                                                                                                                                    fontSize:
                                                                                                                                        "13px",
                                                                                                                                    display:
                                                                                                                                        "flex",
                                                                                                                                    alignContent:
                                                                                                                                        "center",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b>
                                                                                                                                    {i === 0
                                                                                                                                        ? "Nivel"
                                                                                                                                        : ""}
                                                                                                                                </b>
                                                                                                                            </p>
                                                            
                                                                                                                            <p
                                                                                                                                style={{
                                                                                                                                    margin: "0px",
                                                                                                                                    fontSize:
                                                                                                                                        "13px",
                                                                                                                                    display:
                                                                                                                                        "flex",
                                                                                                                                    alignContent:
                                                                                                                                        "center",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {e.nivel ||
                                                                                                                                    "No diligenciado"}
                                                                                                                            </p>
                                                                                                                        </Grid>
                                                                                                                    
                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            md={8}
                                                                                                                        >
                                                                                                                            <p
                                                                                                                                style={{
                                                                                                                                    margin: "0px",
                                                                                                                                    fontSize:
                                                                                                                                        "13px",
                                                                                                                                    display:
                                                                                                                                        "flex",
                                                                                                                                    alignContent:
                                                                                                                                        "center",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b
                                                                                                                                    style={{
                                                                                                                                        marginRight:
                                                                                                                                            "5px",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    {
                                                                                                                                        e.label
                                                                                                                                    }
                                                                                                                                    :{" "}
                                                                                                                                </b>
                                                                                                                            </p>
                                                            
                                                                                                                            <p
                                                                                                                                style={{
                                                                                                                                    margin: "0px",
                                                                                                                                    fontSize:
                                                                                                                                        "13px",
                                                                                                                                    display:
                                                                                                                                        "flex",
                                                                                                                                    alignContent:
                                                                                                                                        "center",
                                                                                                                                    maxWidth:
                                                                                                                                        "600px",
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {e.value ||
                                                                                                                                    "No diligenciado"}
                                                                                                                            </p>
                                                                                                                        </Grid>
                                                                                               
                                                            
                                                                                                                        {(
                                                                                                                            <Grid
                                                                                                                                item
                                                                                                                                xs={12}
                                                                                                                                md={2}
                                                                                                                            >
                                                                                                                                <p
                                                                                                                                    style={{
                                                                                                                                        margin: "0px",
                                                                                                                                        fontSize:
                                                                                                                                            "13px",
                                                                                                                                        display:
                                                                                                                                            "flex",
                                                                                                                                        alignContent:
                                                                                                                                            "center",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <b>
                                                                                                                                        Detalle
                                                                                                                                    </b>
                                                                                                                                </p>
                                                            
                                                                                                                                <p
                                                                                                                                    style={{
                                                                                                                                        margin: "0px",
                                                                                                                                        fontSize:
                                                                                                                                            "13px",
                                                                                                                                        display:
                                                                                                                                            "flex",
                                                                                                                                        alignContent:
                                                                                                                                            "center",
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    {e.detalle ||
                                                                                                                                        "No diligenciado"}
                                                                                                                                </p>
                                                                                                                            </Grid>
                                                                                                                        )}
                                                                                                                    </Fragment>)
                                                    }
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objProductivoFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Productivo
                                                    </Typography>
                                                </Grid>

                                                {e.objProductivoFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                              <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>


                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.datelle ? 8: 10}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                          
                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objFinancieroFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Financiero
                                                    </Typography>
                                                </Grid>

                                                {e.objFinancieroFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                      <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>
                                                            
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                  

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objAdministrativoFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Administrativo
                                                    </Typography>
                                                </Grid>

                                                {e.objAdministrativoFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                   <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                     

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objAsociativoFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Componente Asociativo
                                                    </Typography>
                                                </Grid>

                                                {e.objAsociativoFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                                 <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                       

                                                            {(
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    return null;
                                })}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Grafíco de resultados</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseGrafico()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseGrafico
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseGrafico ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseGrafico} timeout="auto">
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{ minWidth: "850px" }}
                                            id="chart-diag-serv"
                                        >
                                            <ChartBar
                                                title=""
                                                labels={[
                                                    "Mercadeo",
                                                    "Productivo",
                                                    "Financiero",
                                                    "Administrativo",
                                                ]}
                                                values={[
                                                    data.arrayTecnicas
                                                        ?.intMercadeoComercial ||
                                                        0,
                                                    data.arrayTecnicas
                                                        ?.intTecnicoProductivo ||
                                                        0,
                                                    data.arrayTecnicas
                                                        ?.intContableFinanciero ||
                                                        0,
                                                    data.arrayTecnicas
                                                        ?.intAdministrativo ||
                                                        0,
                                                ]}
                                                maxValues={[65, 55, 30, 50]}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResumenTecnicas;
