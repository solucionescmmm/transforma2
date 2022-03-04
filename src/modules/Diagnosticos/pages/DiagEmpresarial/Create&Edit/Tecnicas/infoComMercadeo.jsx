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
    TextField
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
        strCaractEmpresaComp: "",
        strCaractEmpresaCompDetalle: "",
        strAnalizoObjetivoEmpresa: "",
        strAnalizoObjetivoEmpresaDetalle: "",
        strAnalizoCompetiEmpresa: "",
        strAnalizoCompetiEmpresaDetalle: "",
        strActivIncreVentClient: "",
        strActivIncreVentClientDetalle: "",
        strPlanRelFideClient: "",
        strPlanRelFideClientDetalle: "",
        strProceComerciEsta: "",
        strProceComerciEstaDetalle: "",
        strDefiniPortProd: "",
        strDefiniPortProdDetalle: "",
        strNumLugMedComerProd: "",
        strNumLugMedComerProdDetalle: "",
        strPartiRedesEmpreComer: "",
        strPartiRedesEmpreComerDetalle: "",
        strPreseMedDigital: "",
        strPreseMedDigitalDetalle: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
                strCaractEmpresaComp: values.strCaractEmpresaComp || "",
                strAnalizoObjetivoEmpresa:
                    values.strAnalizoObjetivoEmpresa || "",
                strAnalizoCompetiEmpresa: values.strAnalizoCompetiEmpresa || "",
                strActivIncreVentClient: values.strActivIncreVentClient || "",
                strPlanRelFideClient: values.strPlanRelFideClient || "",
                strProceComerciEsta: values.strProceComerciEsta || "",
                strDefiniPortProd: values.strDefiniPortProd || "",
                strNumLugMedComerProd: values.strNumLugMedComerProd || "",
                strPartiRedesEmpreComer: values.strPartiRedesEmpreComer || "",
                strPreseMedDigital: values.strPreseMedDigital || "",
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
                            color: errors?.objInfoComMercadeo
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente mercadeo
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
                    borderColor: errors?.objInfoComMercadeo ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strCaractEmpresaComp"
                            defaultValue={data.strCaractEmpresaComp}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Reconozco las características que hacen diferente a mi empresa frente a la competencia"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strCaractEmpresaComp
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strCaractEmpresaComp?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="CaractEmpresaComp"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strCaractEmpresaCompDetalle"
                            defaultValue={data.strCaractEmpresaCompDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Reconozco las características que hacen diferente a mi empresa frente a la competencia"
                                    autoFocus
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strCaractEmpresaCompDetalle
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
                            name="objInfoComMercadeo.strAnalizoObjetivoEmpresa"
                            defaultValue={data.strAnalizoObjetivoEmpresa}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Conozco y analizo el público objetivo de mi empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoObjetivoEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoObjetivoEmpresa?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="AnalizoObjetivoEmpresa"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strAnalizoObjetivoEmpresaDetalle"
                            defaultValue={data.strAnalizoObjetivoEmpresaDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Conozco y analizo el público objetivo de mi empresa"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoObjetivoEmpresaDetalle
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
                            name="objInfoComMercadeo.strAnalizoCompetiEmpresa"
                            defaultValue={data.strAnalizoCompetiEmpresa}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Conozco y analizo los competidores de mi empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoCompetiEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoCompetiEmpresa?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="AnalizoCompetiEmpresa"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strAnalizoCompetiEmpresaDetalle"
                            defaultValue={data.strAnalizoCompetiEmpresaDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Conozco y analizo los competidores de mi empresa"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strAnalizoCompetiEmpresaDetalle
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
                            name="objInfoComMercadeo.strActivIncreVentClient"
                            defaultValue={data.strActivIncreVentClient}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Realizo actividades enfocadas en incrementar el nivel de ventas y clientes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strActivIncreVentClient
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strActivIncreVentClient?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ActivIncreVentClient"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strActivIncreVentClientDetalle"
                            defaultValue={data.strActivIncreVentClientDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Realizo actividades enfocadas en incrementar el nivel de ventas y clientes"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strActivIncreVentClientDetalle
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
                            name="objInfoComMercadeo.strPlanRelFideClient"
                            defaultValue={data.strPlanRelFideClient}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo un plan de relacionamiento y fidelización con mis clientes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPlanRelFideClient
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strPlanRelFideClient?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PlanRelFideClient"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strPlanRelFideClientDetalle"
                            defaultValue={data.strPlanRelFideClientDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo un plan de relacionamiento y fidelización con mis clientes"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPlanRelFideClientDetalle
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
                            name="objInfoComMercadeo.strProceComerciEsta"
                            defaultValue={data.strProceComerciEsta}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mis procesos comerciales están"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strProceComerciEsta
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProceComerciEsta?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ProceComerciEsta"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComMercadeo.strDefiniPortProd"
                            defaultValue={data.strDefiniPortProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo definido el portafolio de productos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strDefiniPortProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strDefiniPortProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="DefiniPortProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComMercadeo.strProceComerciEstaDetalle"
                            defaultValue={data.strProceComerciEstaDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Mis procesos comerciales están"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strProceComerciEstaDetalle
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
                            name="objInfoComMercadeo.strDefiniPortProdDetalle"
                            defaultValue={data.strDefiniPortProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo definido el portafolio de productos"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strDefiniPortProdDetalle
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
                            name="objInfoComMercadeo.strNumLugMedComerProd"
                            defaultValue={data.strNumLugMedComerProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="El número de lugares y medios en los que comercializo mis productos es"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strNumLugMedComerProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strNumLugMedComerProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="NumLugMedComerProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strNumLugMedComerProdDetalle"
                            defaultValue={data.strNumLugMedComerProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="El número de lugares y medios en los que comercializo mis productos es"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strNumLugMedComerProdDetalle
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
                            name="objInfoComMercadeo.strPartiRedesEmpreComer"
                            defaultValue={data.strPartiRedesEmpreComer}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Pertenezco y participo en redes empresariales para la comercialización"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPartiRedesEmpreComer
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strPartiRedesEmpreComer?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PartiRedesEmpreComer"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strPartiRedesEmpreComerDetalle"
                            defaultValue={data.strPartiRedesEmpreComerDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Pertenezco y participo en redes empresariales para la comercialización"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPartiRedesEmpreComerDetalle
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
                            name="objInfoComMercadeo.strPreseMedDigital"
                            defaultValue={data.strPreseMedDigital}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo presencia en medios digitales"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPreseMedDigital
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strPreseMedDigital?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PreseMedDigital"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComMercadeo.strPreseMedDigitalDetalle"
                            defaultValue={data.strPreseMedDigitalDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo presencia en medios digitales"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strPreseMedDigitalDetalle
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
