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

const InfoComMercadeo = ({
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
        strGradoIntervProdServi: "",
        strGradoIntervProdServiDetalle: "",
        strProcProdEst: "",
        strProcProdEstDetalle: "",
        strDefProcComProv: "",
        strDefProcComProvDetalle: "",
        strContrlRegInv: "",
        strContrlRegInvDetalle: "",
        strCapProdRespMer: "",
        strCapProdRespMerDetalle: "",
        strEstadTecProd: "",
        strEstadTecProdDetalle: "",
        strEquipNecDesProdServi: "",
        strEquipNecDesProdServiDetalle: "",
        strProcManAmbiProd: "",
        strProcManAmbiProdDetalle: "",
        strConoceTiemposProduccionReferencias: "",
        strConoceTiemposProduccionReferenciasDetalle: "",
        strDeterminaNumUnidadesInventario: "",
        strDeterminaNumUnidadesInventarioDetalle: "",
        strProcesoProductivoLoRealiza: "",
        strProcesoProductivoLoRealizaDetalle: "",
        strCapacidadRespuestaTerceros: "",
        strCapacidadRespuestaTercerosDetalle: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strGradoIntervProdServi: values.strGradoIntervProdServi || "",
                strGradoIntervProdServiDetalle:
                    values.strGradoIntervProdServiDetalle || "",
                strProcProdEst: values.strProcProdEst || "",
                strProcProdEstDetalle: values.strProcProdEstDetalle || "",
                strDefProcComProv: values.strDefProcComProv || "",
                strDefProcComProvDetalle: values.strDefProcComProvDetalle || "",
                strContrlRegInv: values.strContrlRegInv || "",
                strContrlRegInvDetalle: values.strContrlRegInvDetalle || "",
                strCapProdRespMer: values.strCapProdRespMer || "",
                strCapProdRespMerDetalle: values.strCapProdRespMerDetalle || "",
                strEstadTecProd: values.strEstadTecProd || "",
                strEstadTecProdDetalle: values.strEstadTecProdDetalle || "",
                strEquipNecDesProdServi: values.strEquipNecDesProdServi || "",
                strEquipNecDesProdServiDetalle:
                    values.strEquipNecDesProdServiDetalle || "",
                strProcManAmbiProd: values.strProcManAmbiProd || "",
                strProcManAmbiProdDetalle:
                    values.strProcManAmbiProdDetalle || "",
                strConoceTiemposProduccionReferencias:
                    values.strConoceTiemposProduccionReferencias || "",
                strConoceTiemposProduccionReferenciasDetalle:
                    values.strConoceTiemposProduccionReferenciasDetalle || "",
                strDeterminaNumUnidadesInventario:
                    values.strDeterminaNumUnidadesInventario || "",
                strDeterminaNumUnidadesInventarioDetalle:
                    values.strDeterminaNumUnidadesInventarioDetalle || "",
                strProcesoProductivoLoRealiza:
                    values.strProcesoProductivoLoRealiza || "",
                strProcesoProductivoLoRealizaDetalle:
                    values.strProcesoProductivoLoRealizaDetalle || "",
                strCapacidadRespuestaTerceros:
                    values.strCapacidadRespuestaTerceros || "",
                strCapacidadRespuestaTercerosDetalle:
                    values.strCapacidadRespuestaTercerosDetalle || "",
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
                            color: errors?.objInfoComProductivo
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente productivo
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
                    borderColor: errors?.objInfoComProductivo
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComProductivo.strGradoIntervProdServi"
                            defaultValue={data.strGradoIntervProdServi}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Grado de intervención en el producto/servicio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strGradoIntervProdServi
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strGradoIntervProdServi
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="GradoIntervProdServi"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComProductivo.strProcProdEst"
                            defaultValue={data.strProcProdEst}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mis procesos productivos están"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcProdEst
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strProcProdEst?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ProcProdEst"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComProductivo.strGradoIntervProdServiDetalle"
                            defaultValue={data.strGradoIntervProdServiDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Grado de intervención en el producto/servicio"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strGradoIntervProdServiDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComProductivo.strProcProdEstDetalle"
                            defaultValue={data.strProcProdEstDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Mis procesos productivos están"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcProdEstDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strDefProcComProv"
                            defaultValue={data.strDefProcComProv}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo definido los procesos de compra y los proveedores"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strDefProcComProv
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strDefProcComProv?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="DefProcComProv"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strDefProcComProvDetalle"
                            defaultValue={data.strDefProcComProvDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo definido los procesos de compra y los proveedores"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strDefProcComProvDetalle
                                            ? true
                                            : false
                                    }
                                    value={value}
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strContrlRegInv"
                            defaultValue={data.strContrlRegInv}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Llevo control y registro de los inventarios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strContrlRegInv
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strContrlRegInv?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ContrlRegInv"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strContrlRegInvDetalle"
                            defaultValue={data.strContrlRegInvDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Llevo control y registro de los inventarios"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strContrlRegInvDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strCapProdRespMer"
                            defaultValue={data.strCapProdRespMer}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi capacidad de producción y respuesta al mercado es"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strCapProdRespMer
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strCapProdRespMer?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="CapProdRespMer"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strCapProdRespMerDetalle"
                            defaultValue={data.strCapProdRespMerDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Mi capacidad de producción y respuesta al mercado es"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strCapProdRespMerDetalle
                                            ? true
                                            : false
                                    }
                                    value={value}
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strEstadTecProd"
                            defaultValue={data.strEstadTecProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="El estado de la ficha técnica de los productos es"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strEstadTecProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strEstadTecProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstadTecProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strEstadTecProdDetalle"
                            defaultValue={data.strEstadTecProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="El estado de la ficha técnica de los productos es"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strEstadTecProdDetalle
                                            ? true
                                            : false
                                    }
                                    value={value}
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strEquipNecDesProdServi"
                            defaultValue={data.strEquipNecDesProdServi}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo los equipos necesarios para el desarrollo de mis productos/servicio(s)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strEquipNecDesProdServi
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strEquipNecDesProdServi
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EquipNecDesProdServi"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strEquipNecDesProdServiDetalle"
                            defaultValue={data.strEquipNecDesProdServiDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo los equipos necesarios para el desarrollo de mis productos/servicio(s)"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strEquipNecDesProdServiDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strProcManAmbiProd"
                            defaultValue={data.strProcManAmbiProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo procesos para el manejo ambiental en la unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcManAmbiProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strProcManAmbiProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ProcManAmbiProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strProcManAmbiProdDetalle"
                            defaultValue={data.strProcManAmbiProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo procesos para el manejo ambiental en la unidad productiva"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    value={value}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcManAmbiProdDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strConoceTiemposProduccionReferencias"
                            defaultValue={
                                data.strConoceTiemposProduccionReferencias
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Conozco los tiempos de producción de cada una de mis referencias"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strConoceTiemposProduccionReferencias
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strConoceTiemposProduccionReferencias
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ConoceTiemposProduccionReferencias"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strConoceTiemposProduccionReferenciasDetalle"
                            defaultValue={
                                data.strConoceTiemposProduccionReferenciasDetalle
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Conozco los tiempos de producción de cada una de mis referencias"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    value={value}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strConoceTiemposProduccionReferenciasDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strDeterminaNumUnidadesInventario"
                            defaultValue={
                                data.strDeterminaNumUnidadesInventario
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo determinado el número de unidades mínimas y máximas de mi inventario"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strDeterminaNumUnidadesInventario
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strDeterminaNumUnidadesInventario
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="DeterminaNumUnidadesInventario"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strDeterminaNumUnidadesInventarioDetalle"
                            defaultValue={
                                data.strDeterminaNumUnidadesInventarioDetalle
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo determinado el número de unidades mínimas y máximas de mi inventario"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    value={value}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strDeterminaNumUnidadesInventarioDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strProcesoProductivoLoRealiza"
                            defaultValue={data.strProcesoProductivoLoRealiza}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi proceso productivo lo realiza"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcesoProductivoLoRealiza
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strProcesoProductivoLoRealiza
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ProcesoProductivoLoRealiza"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strProcesoProductivoLoRealizaDetalle"
                            defaultValue={
                                data.strProcesoProductivoLoRealizaDetalle
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Mi proceso productivo lo realiza"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    value={value}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strProcesoProductivoLoRealizaDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strCapacidadRespuestaTerceros"
                            defaultValue={data.strCapacidadRespuestaTerceros}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Capacidad de respuesta por parte de terceros"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strCapacidadRespuestaTerceros
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComProductivo
                                            ?.strCapacidadRespuestaTerceros
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="CapacidadRespuestaTerceros"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComProductivo.strCapacidadRespuestaTercerosDetalle"
                            defaultValue={
                                data.strCapacidadRespuestaTercerosDetalle
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Capacidad de respuesta por parte de terceros"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    value={value}
                                    error={
                                        errors?.objInfoComProductivo
                                            ?.strCapacidadRespuestaTercerosDetalle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el detalle"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoComMercadeo;
