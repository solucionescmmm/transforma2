import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    CircularProgress,
    TextField,
    Divider,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";
import SelectListasNivel from "../../../../components/selectListasNivel";

const InfoEvaluacion = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strServicio: "",
        strHerramientasServicio: "",
        strObjetivoProposito: "",
        strObjetivoPropositoDetalle: "",
        strObjetivoPropositoNivel: "",
        strRenovacionPortafolio: "",
        strRenovacionPortafolioDetalle: "",
        strRenovacionPortafolioNivel: "",
        strProcesoInteraccion: "",
        strProcesoInteraccionDetalle: "",
        strProcesoInteraccionNivel: "",
        strPuntosContacto: "",
        strPuntosContactoDetalle: "",
        strPuntosContactoNivel: "",
        strExperienciaDiseñada: "",
        strExperienciaDiseñadaDetalle: "",
        strExperienciaDiseñadaNivel: "",
        strRecursosServicio: "",
        strRecursosServicioDetalle: "",
        strRecursosServicioNivel: "",
        strPostVenta: "",
        strPostVentaDetalle: "",
        strLineaGrafica: "",
        strLineaGraficaDetalle: "",
        strLineaGraficaNivel: "",
        strIdentidadMarca: "",
        strIdentidadMarcaDetalle: "",
        strIdentidadMarcaNivel: "",
        strComunicacionMarca: "",
        strComunicacionMarcaDetalle: "",
        strComunicacionMarcaNivel: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
                strServicio: values.strServicio || "",
                strHerramientasServicio: values.strHerramientasServicio || "",
                strObjetivoProposito: values.strObjetivoProposito || "",
                strObjetivoPropositoDetalle:
                    values.strObjetivoPropositoDetalle || "",
                strObjetivoPropositoNivel:
                    values.strObjetivoPropositoNivel || "",
                strRenovacionPortafolio: values.strRenovacionPortafolio || "",
                strRenovacionPortafolioDetalle:
                    values.strRenovacionPortafolioDetalle || "",
                strRenovacionPortafolioNivel:
                    values.strRenovacionPortafolioNivel || "",
                strProcesoInteraccion: values.strProcesoInteraccion || "",
                strProcesoInteraccionDetalle:
                    values.strProcesoInteraccionDetalle || "",
                strProcesoInteraccionNivel:
                    values.strProcesoInteraccionNivel || "",
                strPuntosContacto: values.strPuntosContacto || "",
                strPuntosContactoDetalle: values.strPuntosContactoDetalle || "",
                strExperienciaDiseñada: values.strExperienciaDiseñada || "",
                strExperienciaDiseñadaDetalle:
                    values.strExperienciaDiseñadaDetalle || "",
                strExperienciaDiseñadaNivel:
                    values.strExperienciaDiseñadaNivel || "",
                strRecursosServicio: values.strRecursosServicio || "",
                strRecursosServicioDetalle:
                    values.strRecursosServicioDetalle || "",
                strRecursosServicioNivel: values.strRecursosServicioNivel || "",
                strPostVenta: values.strPostVenta || "",
                strPostVentaDetalle: values.strPostVentaDetalle || "",
                strLineaGrafica: values.strLineaGrafica || "",
                strLineaGraficaDetalle: values.strLineaGraficaDetalle || "",
                strLineaGraficaNivel: values.strLineaGraficaNivel || "",
                strIdentidadMarca: values.strIdentidadMarca || "",
                strIdentidadMarcaDetalle: values.strIdentidadMarcaDetalle || "",
                strIdentidadMarcaNivel: values.strIdentidadMarcaNivel || "",
                strComunicacionMarca: values.strComunicacionMarca || "",
                strComunicacionMarcaDetalle:
                    values.strComunicacionMarcaDetalle || "",
                strComunicacionMarcaNivel:
                    values.strComunicacionMarcaNivel || "",
            });
        }

        setLoading(false);
    }, [values]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoEvaluacion
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Servicios evaluados en el diagnóstico
                    </Typography>
                </Box>

                <Box>
                    <IconButton
                        onClick={() => handlerChangeOpenCollapse()}
                        size="large"
                    >
                        <Tooltip
                            title={
                                openCollapese
                                    ? "Contraer detalle"
                                    : "Expandir detalle"
                            }
                        >
                            {openCollapese ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.objInfoEvaluacion
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row-reverse" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEvaluacion.strServicio"
                            defaultValue={data.strServicio}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Servicio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEvaluacion?.strServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEvaluacion?.strServicio
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    variant="outlined"
                                    multiline
                                    minRows={4}
                                    fullWidth
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEvaluacion.strHerramientasServicio"
                            defaultValue={data.strHerramientasServicio}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Herramientas y componentes del servicio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEvaluacion
                                            ?.strHerramientasServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEvaluacion
                                            ?.strHerramientasServicio
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    variant="outlined"
                                    multiline
                                    minRows={4}
                                    fullWidth
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Innovación
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strObjetivoProposito"
                                    defaultValue={data.strObjetivoProposito}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Objetivo o propósito"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strObjetivoProposito",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoProposito
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoProposito
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ObjetivoProposito"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strObjetivoPropositoDetalle"
                                    defaultValue={
                                        data.strObjetivoPropositoDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoPropositoDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoPropositoDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strObjetivoPropositoNivel"
                                    defaultValue={
                                        data.strObjetivoPropositoNivel
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strObjetivoProposito}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoPropositoNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoPropositoNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ObjetivoProposito"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strRenovacionPortafolio"
                                    defaultValue={data.strRenovacionPortafolio}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Renovación de portafolio"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strRenovacionPortafolio",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolio
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="RenovacionPortafolio"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strRenovacionPortafolioDetalle"
                                    defaultValue={
                                        data.strRenovacionPortafolioDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolioDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolioDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strRenovacionPortafolioNivel"
                                    defaultValue={
                                        data.strRenovacionPortafolioNivel
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={
                                                data.strRenovacionPortafolio
                                            }
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolioNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolioNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="RenovacionPortafolio"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strProcesoInteraccion"
                                    defaultValue={data.strProcesoInteraccion}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Procesos de interacción"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strProcesoInteraccion",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccion
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ProcesosInteraccion"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strProcesoInteraccionDetalle"
                                    defaultValue={
                                        data.strProcesoInteraccionDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccionDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccionDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strProcesoInteraccionNivel"
                                    defaultValue={
                                        data.strProcesoInteraccionNivel
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={
                                                data.strProcesoInteraccion
                                            }
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccionNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccionNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ProcesosInteraccion"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strPuntosContacto"
                                    defaultValue={data.strPuntosContacto}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Puntos de contacto"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strPuntosContacto",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContacto
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContacto
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="PuntosContacto"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strPuntosContactoDetalle"
                                    defaultValue={data.strPuntosContactoDetalle}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContactoDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContactoDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strPuntosContactoNivel"
                                    defaultValue={data.strPuntosContactoNivel}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strPuntosContacto}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContactoNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContactoNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="PuntosContacto"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Experiencia
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strExperienciaDiseñada"
                                    defaultValue={data.strExperienciaDiseñada}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Experiencia diseñada"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strExperienciaDiseñada",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñada
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñada
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ExperienciaDiseñada"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strExperienciaDiseñadaDetalle"
                                    defaultValue={
                                        data.strExperienciaDiseñadaDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñadaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñadaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            variant="standard"
                                            multiline
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strExperienciaDiseñadaNivel"
                                    defaultValue={
                                        data.strExperienciaDiseñadaNivel
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={
                                                data.strExperienciaDiseñada
                                            }
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñadaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñadaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ExperienciaDiseñada"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strRecursosServicio"
                                    defaultValue={data.strRecursosServicio}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Recursos del servicio"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strRecursosServicio",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicio
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="RecursoServicio"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strRecursosServicioDetalle"
                                    defaultValue={
                                        data.strRecursosServicioDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicioDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicioDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strRecursosServicioNivel"
                                    defaultValue={data.strRecursosServicioNivel}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strRecursosServicio}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicioNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicioNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="RecursoServicio"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strPostVenta"
                                    defaultValue={data.strPostVenta}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Post venta"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strPostVenta",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVenta
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVenta?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="PostVenta"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strPostVentaDetalle"
                                    defaultValue={data.strPostVentaDetalle}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVentaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVentaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strPostVentaNivel"
                                    defaultValue={data.strPostVentaNivel}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strPostVenta}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVentaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPostVentaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="PostVenta"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Marca
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strLineaGrafica"
                                    defaultValue={data.strLineaGrafica}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Línea gráfica de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strLineaGrafica",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGrafica
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGrafica
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="LineaMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strLineaGraficaDetalle"
                                    defaultValue={data.strLineaGraficaDetalle}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGraficaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGraficaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strLineaGraficaNivel"
                                    defaultValue={data.strLineaGraficaNivel}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strLineaGrafica}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGraficaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strLineaGraficaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="LineaMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strIdentidadMarca"
                                    defaultValue={data.strIdentidadMarca}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Identidad de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strIdentidadMarca",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarca
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="IdentidadMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strIdentidadMarcaDetalle"
                                    defaultValue={data.strIdentidadMarcaDetalle}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarcaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strIdentidadMarcaNivel"
                                    defaultValue={data.strIdentidadMarcaNivel}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strIdentidadMarca}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarcaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strIdentidadMarcaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="IdentidadMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <Controller
                                    name="objInfoEvaluacion.strComunicacionMarca"
                                    defaultValue={data.strComunicacionMarca}
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListas
                                            label="Comunicación de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                onChange(e);
                                                handlerChangeData(
                                                    "strComunicacionMarca",
                                                    e.target.value
                                                );
                                            }}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarca
                                                    ?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ComunicacionMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Controller
                                    name="objInfoEvaluacion.strComunicacionMarcaDetalle"
                                    defaultValue={
                                        data.strComunicacionMarcaDetalle
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarcaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                            variant="standard"
                                            multiline
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objInfoEvaluacion.strComunicacionMarcaNivel"
                                    defaultValue={
                                        data.strComunicacionMarcaNivel
                                    }
                                    render={({
                                        field: { name, onChange, value },
                                    }) => (
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={
                                                data.strComunicacionMarca
                                            }
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarcaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strComunicacionMarcaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                            strGrupo="DiagnosticoServicio"
                                            strCodigo="ComunicacionMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEvaluacion;
