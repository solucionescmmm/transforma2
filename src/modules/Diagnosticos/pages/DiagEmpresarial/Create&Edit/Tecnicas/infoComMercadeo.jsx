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

export const propiedades = [
    { nombre: "strCaractEmpresaComp", label: "Reconozco las características que hacen diferente a mi empresa frente a la competencia", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strCaractEmpresaCompDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strCaractEmpresaCompNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strAnalizoObjetivoEmpresa", label: "Conozco y analizo el público objetivo de mi empresa", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strAnalizoObjetivoEmpresaDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strAnalizoObjetivoEmpresaNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "CaractEmpresaComp" },
    { nombre: "strAnalizoCompetiEmpresa", label: "Conozco y analizo los competidores de mi empresa", strGrupo: "DiagnosticoTecnico", strCodigo: "AnalizoCompetiEmpresa" },
    { nombre: "strAnalizoCompetiEmpresaDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "AnalizoCompetiEmpresa" },
    { nombre: "strAnalizoCompetiEmpresaNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "AnalizoCompetiEmpresa" },
    { nombre: "strActivIncreVentClient", label: "Realizo actividades enfocadas en incrementar el nivel de ventas y clientes", strGrupo: "DiagnosticoTecnico", strCodigo: "ActivIncreVentClient" },
    { nombre: "strActivIncreVentClientDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "ActivIncreVentClient" },
    { nombre: "strActivIncreVentClientNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "ActivIncreVentClient" },
    { nombre: "strProceComerciEsta", label: "Mis procesos comerciales están", strGrupo: "DiagnosticoTecnico", strCodigo: "ProceComerciEsta" },
    { nombre: "strProceComerciEstaDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "ProceComerciEsta" },
    { nombre: "strProceComerciEstaNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "ProceComerciEsta" },
    { nombre: "strDefiniPortProd", label: "Tengo definido el portafolio de productos", strGrupo: "DiagnosticoTecnico", strCodigo: "DefiniPortProd" },
    { nombre: "strDefiniPortProdDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "DefiniPortProd" },
    { nombre: "strDefiniPortProdNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "DefiniPortProd" },
    { nombre: "strNumLugMedComerProd", label: "El número de lugares y medios en los que comercializo mis productos es", strGrupo: "DiagnosticoTecnico", strCodigo: "NumLugMedComerProd" },
    { nombre: "strNumLugMedComerProdDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "NumLugMedComerProd" },
    { nombre: "strNumLugMedComerProdNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "NumLugMedComerProd" },
    { nombre: "strPartiRedesEmpreComer", label: "Pertenezco y participo en redes empresariales para la comercialización", strGrupo: "DiagnosticoTecnico", strCodigo: "PartiRedesEmpreComer" },
    { nombre: "strPartiRedesEmpreComerDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "PartiRedesEmpreComer" },
    { nombre: "strPartiRedesEmpreComerNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "PartiRedesEmpreComer" },
    { nombre: "strPreseMedDigital", label: "Tengo presencia en medios digitales", strGrupo: "DiagnosticoTecnico", strCodigo: "PreseMedDigital" },
    { nombre: "strPreseMedDigitalDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "PreseMedDigital" },
    { nombre: "strPreseMedDigitalNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "PreseMedDigital" },
    { nombre: "strDefineDiscursoComercialClientes", label: "Tengo definido un discurso comercial atractivo para mis clientes", strGrupo: "DiagnosticoTecnico", strCodigo: "DefineDiscursoComercialClientes" },
    { nombre: "strDefineDiscursoComercialClientesDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "DefineDiscursoComercialClientes" },
    { nombre: "strDefineDiscursoComercialClientesNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "DefineDiscursoComercialClientes" },
    { nombre: "strPlanAtraccionRelacionamientoFidelizacionClientes", label: "Tengo un plan de atracción, relacionamiento y fidelización con mis clientes", strGrupo: "DiagnosticoTecnico", strCodigo: "PlanAtraccionRelacionamientoFidelizacionClientes" },
    { nombre: "strPlanAtraccionRelacionamientoFidelizacionClientesDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "PlanAtraccionRelacionamientoFidelizacionClientes" },
    { nombre: "strPlanAtraccionRelacionamientoFidelizacionClientesNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "PlanAtraccionRelacionamientoFidelizacionClientes" },
    { nombre: "strFormatosGestionComercial", label: "Cuento con formatos para realizar mi gestión comercial", strGrupo: "DiagnosticoTecnico", strCodigo: "FormatosGestionComercial" },
    { nombre: "strFormatosGestionComercialDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "FormatosGestionComercial" },
    { nombre: "strFormatosGestionComercialNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "FormatosGestionComercial" },
    { nombre: "strTieneBaseDatosClientes", label: "Cuento con una base de datos de clientes", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneBaseDatosClientes" },
    { nombre: "strTieneBaseDatosClientesDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneBaseDatosClientes" },
    { nombre: "strTieneBaseDatosClientesNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneBaseDatosClientes" },
    { nombre: "strTieneLogisticaTransporteClientes", label: "Cuento con capacidad logística y de transporte para llegar a mis clientes", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneLogisticaTransporteClientes" },
    { nombre: "strTieneLogisticaTransporteClientesDetalle", label: "Detalle", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneLogisticaTransporteClientes" },
    { nombre: "strTieneLogisticaTransporteClientesNivel", label: "Nivel", strGrupo: "DiagnosticoTecnico", strCodigo: "TieneLogisticaTransporteClientes" }
];

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
        strCaractEmpresaCompNivel: "",
        strAnalizoObjetivoEmpresa: "",
        strAnalizoObjetivoEmpresaDetalle: "",
        strAnalizoObjetivoEmpresaNivel: "",
        strAnalizoCompetiEmpresa: "",
        strAnalizoCompetiEmpresaDetalle: "",
        strAnalizoCompetiEmpresaNivel: "",
        strActivIncreVentClient: "",
        strActivIncreVentClientDetalle: "",
        strActivIncreVentClientNivel: "",
        strProceComerciEsta: "",
        strProceComerciEstaDetalle: "",
        strProceComerciEstaNivel: "",
        strDefiniPortProd: "",
        strDefiniPortProdDetalle: "",
        strDefiniPortProdNivel: "",
        strNumLugMedComerProd: "",
        strNumLugMedComerProdDetalle: "",
        strNumLugMedComerProdNivel: "",
        strPartiRedesEmpreComer: "",
        strPartiRedesEmpreComerDetalle: "",
        strPartiRedesEmpreComerNivel: "",
        strPreseMedDigital: "",
        strPreseMedDigitalDetalle: "",
        strPreseMedDigitalNivel: "",
        strDefineDiscursoComercialClientes: "",
        strDefineDiscursoComercialClientesDetalle: "",
        strDefineDiscursoComercialClientesNivel: "",
        strPlanAtraccionRelacionamientoFidelizacionClientes: "",
        strPlanAtraccionRelacionamientoFidelizacionClientesDetalle: "",
        strPlanAtraccionRelacionamientoFidelizacionClientesNivel: "",
        strFormatosGestionComercial: "",
        strFormatosGestionComercialDetalle: "",
        strFormatosGestionComercialNivel: "",
        strTieneBaseDatosClientes: "",
        strTieneBaseDatosClientesDetalle: "",
        strTieneBaseDatosClientesNivel: "",
        strTieneLogisticaTransporteClientes: "",
        strTieneLogisticaTransporteClientesDetalle: "",
        strTieneLogisticaTransporteClientesNivel: ""
    });



    const render = (datos) => {
        return datos.map(({ nombre, label, strGrupo, strCodigo }) => (
            <Grid
                item
                xs={12}
                md={label === "Detalle" ? 3 : label === "Nivel" ? 2 : 7}
            >
                <Controller
                    name={`objInfoComMercadeo.${nombre}`}
                    defaultValue={data[nombre]}
                    render={({ field: { name, value, onChange } }) =>
                        label === "Detalle" ? (
                            <TextField
                                label={label}
                                autoFocus
                                name={name}
                                value={value}
                                disabled={disabled}
                                onChange={(e) => onChange(e)}
                                error={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ?.message ||
                                    "Digita el detalle en caso de que aplique"
                                }
                                fullWidth
                                variant="standard"
                            />
                        ) : label === "Nivel" ? (
                            <SelectListasNivel
                                label={label}
                                name={name}
                                value={value}
                                valueList={data[nombre]}
                                onChange={(e) => onChange(e)}
                                error={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ?.message || "Nivel"
                                }
                                strGrupo={strGrupo}
                                strCodigo={strCodigo}
                            />
                        ) : (
                            <SelectListas
                                label={label}
                                name={name}
                                value={value}
                                disabled={disabled}
                                onChange={(e) => {
                                    onChange(e);
                                    handlerChangeData(strGrupo, e.target.value);
                                }}
                                error={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComMercadeo?.[nombre]
                                        ?.message || "Seleccione una opción"
                                }
                                strGrupo={strGrupo}
                                strCodigo={strCodigo}
                            />
                        )
                    }
                    control={control}
                />
            </Grid>
        ));
    };

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
                strCaractEmpresaComp: values.strCaractEmpresaComp || "",
                strCaractEmpresaCompDetalle: values.strCaractEmpresaCompDetalle || "",
                strCaractEmpresaCompNivel: values.strCaractEmpresaCompNivel || "",
    
                strAnalizoObjetivoEmpresa: values.strAnalizoObjetivoEmpresa || "",
                strAnalizoObjetivoEmpresaDetalle: values.strAnalizoObjetivoEmpresaDetalle || "",
                strAnalizoObjetivoEmpresaNivel: values.strAnalizoObjetivoEmpresaNivel || "",
    
                strAnalizoCompetiEmpresa: values.strAnalizoCompetiEmpresa || "",
                strAnalizoCompetiEmpresaDetalle: values.strAnalizoCompetiEmpresaDetalle || "",
                strAnalizoCompetiEmpresaNivel: values.strAnalizoCompetiEmpresaNivel || "",
    
                strActivIncreVentClient: values.strActivIncreVentClient || "",
                strActivIncreVentClientDetalle: values.strActivIncreVentClientDetalle || "",
                strActivIncreVentClientNivel: values.strActivIncreVentClientNivel || "",
    
                strProceComerciEsta: values.strProceComerciEsta || "",
                strProceComerciEstaDetalle: values.strProceComerciEstaDetalle || "",
                strProceComerciEstaNivel: values.strProceComerciEstaNivel || "",
    
                strDefiniPortProd: values.strDefiniPortProd || "",
                strDefiniPortProdDetalle: values.strDefiniPortProdDetalle || "",
                strDefiniPortProdNivel: values.strDefiniPortProdNivel || "",
    
                strNumLugMedComerProd: values.strNumLugMedComerProd || "",
                strNumLugMedComerProdDetalle: values.strNumLugMedComerProdDetalle || "",
                strNumLugMedComerProdNivel: values.strNumLugMedComerProdNivel || "",
    
                strPartiRedesEmpreComer: values.strPartiRedesEmpreComer || "",
                strPartiRedesEmpreComerDetalle: values.strPartiRedesEmpreComerDetalle || "",
                strPartiRedesEmpreComerNivel: values.strPartiRedesEmpreComerNivel || "",
    
                strPreseMedDigital: values.strPreseMedDigital || "",
                strPreseMedDigitalDetalle: values.strPreseMedDigitalDetalle || "",
                strPreseMedDigitalNivel: values.strPreseMedDigitalNivel || "",
    
                strDefineDiscursoComercialClientes: values.strDefineDiscursoComercialClientes || "",
                strDefineDiscursoComercialClientesDetalle: values.strDefineDiscursoComercialClientesDetalle || "",
                strDefineDiscursoComercialClientesNivel: values.strDefineDiscursoComercialClientesNivel || "",
    
                strPlanAtraccionRelacionamientoFidelizacionClientes: values.strPlanAtraccionRelacionamientoFidelizacionClientes || "",
                strPlanAtraccionRelacionamientoFidelizacionClientesDetalle: values.strPlanAtraccionRelacionamientoFidelizacionClientesDetalle || "",
                strPlanAtraccionRelacionamientoFidelizacionClientesNivel: values.strPlanAtraccionRelacionamientoFidelizacionClientesNivel || "",
    
                strFormatosGestionComercial: values.strFormatosGestionComercial || "",
                strFormatosGestionComercialDetalle: values.strFormatosGestionComercialDetalle || "",
                strFormatosGestionComercialNivel: values.strFormatosGestionComercialNivel || "",
    
                strTieneBaseDatosClientes: values.strTieneBaseDatosClientes || "",
                strTieneBaseDatosClientesDetalle: values.strTieneBaseDatosClientesDetalle || "",
                strTieneBaseDatosClientesNivel: values.strTieneBaseDatosClientesNivel || "",
    
                strTieneLogisticaTransporteClientes: values.strTieneLogisticaTransporteClientes || "",
                strTieneLogisticaTransporteClientesDetalle: values.strTieneLogisticaTransporteClientesDetalle || "",
                strTieneLogisticaTransporteClientesNivel: values.strTieneLogisticaTransporteClientesNivel || "",
         
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
                        Componente mercadeo - comercial
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
                    borderColor: errors?.objInfoComMercadeo
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                  {render(propiedades)}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoComMercadeo;
