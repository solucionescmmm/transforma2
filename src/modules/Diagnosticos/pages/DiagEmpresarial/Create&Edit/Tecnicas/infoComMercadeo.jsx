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
                            color: errors?.objInfoGeneral
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
                    borderColor: errors?.objInfoGeneral ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComMercadeo.strProceComerciEsta"
                            defaultValue={data.strProceComerciEsta}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mis procesos comerciales están:"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComMercadeo.strNumLugMedComerProd"
                            defaultValue={data.strNumLugMedComerProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="El número de lugares y medios en los que comercializo mis productos es:"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComMercadeo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
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
