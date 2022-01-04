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
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";
import SelectListasNivel from "../../../../components/selectListasNivel";

const InfoCategoria2 = ({
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
                            color: errors?.objInfoCategoria2 ? "#D33030" : "inherit",
                        }}
                    >
                        Categoría # 2: Diseño Desde lo Conceptual, lo Abstracto y lo
                        Intangible
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
                    borderColor: errors?.objInfoCategoria2 ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row-reverse" spacing={2}>
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
                                    name="objInfoCategoria2.strLineaGrafica"
                                    defaultValue={data.strLineaGrafica}
                                    render={({ field: { name, onChange, value } }) => (
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
                                                errors?.objInfoCategoria2?.strLineaGrafica
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2?.strLineaGrafica
                                                    ?.message || "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoProducto"
                                            strCodigo="LineaGraficaMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoCategoria2.strLineaGraficaDetalle"
                                    defaultValue={data.strLineaGraficaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoCategoria2
                                                    ?.strLineaGraficaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2
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
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strLineaGrafica}
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
                                            strGrupo="DiagnosticoProducto"
                                            strCodigo="LineaGraficaMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoCategoria2.strIdentidadMarca"
                                    defaultValue={data.strIdentidadMarca}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Identidad de la marca"
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
                                                errors?.objInfoCategoria2?.strIdentidadMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2?.strIdentidadMarca
                                                    ?.message || "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoProducto"
                                            strCodigo="IdentidadMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoCategoria2.strIdentidadMarcaDetalle"
                                    defaultValue={data.strIdentidadMarcaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoCategoria2
                                                    ?.strIdentidadMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2
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
                                        <SelectListasNivel
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            valueList={data.strIdentidadMarca}
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
                                            strGrupo="DiagnosticoProducto"
                                            strCodigo="IdentidadMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoCategoria2.strComunicacionMarca"
                                    defaultValue={data.strComunicacionMarca}
                                    render={({ field: { name, onChange, value } }) => (
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
                                                errors?.objInfoCategoria2
                                                    ?.strComunicacionMarca
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2
                                                    ?.strComunicacionMarca?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="DiagnosticoProducto"
                                            strCodigo="ComunicacionMarca"
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objInfoCategoria2.strComunicacionMarcaDetalle"
                                    defaultValue={data.strComunicacionMarcaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objInfoCategoria2
                                                    ?.strComunicacionMarcaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoCategoria2
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
                                        <SelectListasNivel
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
                                            strGrupo="DiagnosticoProducto"
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

export default InfoCategoria2;
