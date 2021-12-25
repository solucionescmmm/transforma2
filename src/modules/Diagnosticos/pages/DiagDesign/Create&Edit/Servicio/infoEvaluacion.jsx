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

    useEffect(() => {
        if (values) {
            setData({
                strServicio: values.strServicio || "",
                strHerramientasServicio: values.strHerramientasServicio || "",
                strObjetivoProposito: values.strObjetivoProposito || "",
                strObjetivoPropositoDetalle: values.strObjetivoPropositoDetalle || "",
                strObjetivoPropositoNivel: values.strObjetivoPropositoNivel || "",
                strRenovacionPortafolio: values.strRenovacionPortafolio || "",
                strRenovacionPortafolioDetalle:
                    values.strRenovacionPortafolioDetalle || "",
                strRenovacionPortafolioNivel: values.strRenovacionPortafolioNivel || "",
                strProcesoInteraccion: values.strProcesoInteraccion || "",
                strProcesoInteraccionDetalle: values.strProcesoInteraccionDetalle || "",
                strProcesoInteraccionNivel: values.strProcesoInteraccionNivel || "",
                strPuntosContacto: values.strPuntosContacto || "",
                strPuntosContactoDetalle: values.strPuntosContactoDetalle || "",
                strExperienciaDiseñada: values.strExperienciaDiseñada || "",
                strExperienciaDiseñadaDetalle: values.strExperienciaDiseñadaDetalle || "",
                strExperienciaDiseñadaNivel: values.strExperienciaDiseñadaNivel || "",
                strRecursosServicio: values.strRecursosServicio || "",
                strRecursosServicioDetalle: values.strRecursosServicioDetalle || "",
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
                strComunicacionMarcaDetalle: values.strComunicacionMarcaDetalle || "",
                strComunicacionMarcaNivel: values.strComunicacionMarcaNivel || "",
            });
        }

        setLoading(false);
    }, [values]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                            color: errors?.objInfoEvaluacion ? "#D33030" : "inherit",
                        }}
                    >
                        Servicios evaluados en el diagnóstico
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()} size="large">
                        <Tooltip
                            title={
                                openCollapese ? "Contraer detalle" : "Expandir detalle"
                            }
                        >
                            {openCollapese ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.objInfoEvaluacion ? "#D33030" : "inherit",
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
                                        errors?.objInfoEvaluacion?.strServicio?.message ||
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
                                        errors?.objInfoEvaluacion?.strHerramientasServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEvaluacion?.strHerramientasServicio
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
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strObjetivoProposito"
                                    defaultValue={data.strLineaGrafica}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Objetivo o propósito"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoProposito
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strObjetivoProposito?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strObjetivoPropositoDetalle"
                                    defaultValue={data.strObjetivoPropositoDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strObjetivoPropositoNivel"
                                    defaultValue={data.strObjetivoPropositoNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strObjetivoPropositoNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strObjetivoPropositoNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strRenovacionPortafolio"
                                    defaultValue={data.strRenovacionPortafolio}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Renovación de portafolio"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRenovacionPortafolio?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strRenovacionPortafolioDetalle"
                                    defaultValue={data.strRenovacionPortafolioDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strRenovacionPortafolioNivel"
                                    defaultValue={data.strRenovacionPortafolioNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strProcesoInteraccion"
                                    defaultValue={data.strProcesoInteraccion}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Procesos de interacción"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strProcesoInteraccion?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strProcesoInteraccionDetalle"
                                    defaultValue={data.strProcesoInteraccionDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strProcesoInteraccionNivel"
                                    defaultValue={data.strProcesoInteraccionNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProcesoInteraccionNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProcesoInteraccionNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strPuntosContacto"
                                    defaultValue={data.strPuntosContacto}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Puntos de contacto"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContacto
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strPuntosContacto?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strPuntosContactoDetalle"
                                    defaultValue={data.strPuntosContactoDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                                    ?.strPuntosContactoDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strPuntosContactoNivel"
                                    defaultValue={data.strPuntosContactoNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strPuntosContactoNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strPuntosContactoNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
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
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strExperienciaDiseñada"
                                    defaultValue={data.strExperienciaDiseñada}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Experiencia diseñada"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñada
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strExperienciaDiseñada?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strExperienciaDiseñadaDetalle"
                                    defaultValue={data.strExperienciaDiseñadaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strExperienciaDiseñadaNivel"
                                    defaultValue={data.strExperienciaDiseñadaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strExperienciaDiseñadaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strExperienciaDiseñadaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strRecursosServicio"
                                    defaultValue={data.strRecursosServicio}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Recursos del servicio"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion
                                                    ?.strRecursosServicio?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strRecursosServicioDetalle"
                                    defaultValue={data.strRecursosServicioDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strRecursosServicioNivel"
                                    defaultValue={data.strRecursosServicioNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strRecursosServicioNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strRecursosServicioNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strPostVenta"
                                    defaultValue={data.strPostVenta}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Post venta"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoEvaluacion?.strPostVenta
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEvaluacion?.strPostVenta
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoEvaluacion.strPostVentaDetalle"
                                    defaultValue={data.strPostVentaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
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
                                                    ?.strPostVentaDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strPostVentaNivel"
                                    defaultValue={data.strPostVentaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strPostVentaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strPostVentaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
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
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strLineaGrafica"
                                    defaultValue={data.strLineaGrafica}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Línea gráfica de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2?.strLineaGrafica
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2?.strLineaGrafica
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strLineaGraficaDetalle"
                                    defaultValue={data.strLineaGraficaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2
                                                    ?.strLineaGraficaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2
                                                    ?.strLineaGraficaDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strLineaGraficaNivel"
                                    defaultValue={data.strLineaGraficaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strLineaGraficaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strLineaGraficaNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strIdentidadMarca"
                                    defaultValue={data.strIdentidadMarca}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Identidad de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2?.strIdentidadMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2?.strIdentidadMarca
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strIdentidadMarcaDetalle"
                                    defaultValue={data.strIdentidadMarcaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2
                                                    ?.strIdentidadMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2
                                                    ?.strIdentidadMarcaDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strIdentidadMarcaNivel"
                                    defaultValue={data.strIdentidadMarcaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strIdentidadMarcaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strIdentidadMarcaNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strComunicacionMarca"
                                    defaultValue={data.strComunicacionMarca}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Comunicación de la marca"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2
                                                    ?.strComunicacionMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2
                                                    ?.strComunicacionMarca?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria2.strComunicacionMarcaDetalle"
                                    defaultValue={data.strComunicacionMarcaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria2
                                                    ?.strComunicacionMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria2
                                                    ?.strComunicacionMarcaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strComunicacionMarcaNivel"
                                    defaultValue={data.strComunicacionMarcaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strComunicacionMarcaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strComunicacionMarcaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
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
