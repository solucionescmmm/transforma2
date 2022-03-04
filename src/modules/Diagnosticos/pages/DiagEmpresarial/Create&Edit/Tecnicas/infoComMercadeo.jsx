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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="CaractEmpresaComp"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="AnalizoObjetivoEmpresa"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="AnalizoCompetiEmpresa"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ActivIncreVentClient"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="PlanRelFideClient"
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
                                    strGrupo="DiagnosticoProducto"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="DefiniPortProd"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="NumLugMedComerProd"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="PartiRedesEmpreComer"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="PreseMedDigital"
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
