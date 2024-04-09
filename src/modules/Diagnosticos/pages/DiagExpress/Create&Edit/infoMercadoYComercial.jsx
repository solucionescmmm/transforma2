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
import SelectListas from "../../../components/selectLista";

const InfoMercadoYComercial = ({
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
        strTieneBaseDatosClientes: "",
        strActivIncreVentClient: "",
        strPlanAtraccionRelacionamientoFidelizacionClientes: "",
        strEquipTrabEstruct: "",
        strEmprFormaAcuerNormLab: "",
        strPlaneaEstraEmpPlanPlani: "",
        strIdentidadMarca: "",
        strComunicacionMarca: "",
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
                strTieneBaseDatosClientes: values?.strTieneBaseDatosClientes || "",
                strActivIncreVentClient: values?.strActivIncreVentClient || "",
                strPlanAtraccionRelacionamientoFidelizacionClientes: values?.strPlanAtraccionRelacionamientoFidelizacionClientes || "",
                strEquipTrabEstruct: values?.strEquipTrabEstruct || "",
                strEmprFormaAcuerNormLab: values?.strEmprFormaAcuerNormLab || "",
                strPlaneaEstraEmpPlanPlani: values?.strPlaneaEstraEmpPlanPlani || "",
                strIdentidadMarca: values?.strIdentidadMarca || "",
                strComunicacionMarca: values?.strComunicacionMarca || "",
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
                            color: errors?.objInfoMercado ? "#D33030" : "inherit",
                        }}
                    >
                        Perfil de mercado y comercial
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
                    borderColor: errors?.objInfoMercado ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strTieneBaseDatosClientes"
                            defaultValue={data.strTieneBaseDatosClientes}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Cuento con una base de datos de clientes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strTieneBaseDatosClientes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strTieneBaseDatosClientes
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="TieneBaseDatosClientes"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strActivIncreVentClient"
                            defaultValue={data.strActivIncreVentClient}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Realizo actividades enfocadas en incrementar el nivel de ventas y clientes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strActivIncreVentClient
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strActivIncreVentClient
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ActivIncreVentClient"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strPlanAtraccionRelacionamientoFidelizacionClientes"
                            defaultValue={
                                data.strPlanAtraccionRelacionamientoFidelizacionClientes
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo un plan de atracción, relacionamiento y fidelización con mis clientes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strPlanAtraccionRelacionamientoFidelizacionClientes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strPlanAtraccionRelacionamientoFidelizacionClientes
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PlanAtraccionRelacionamientoFidelizacionClientes"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strEquipTrabEstruct"
                            defaultValue={data.strEquipTrabEstruct}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo un equipo de trabajo estructurado"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strEquipTrabEstruct
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strEquipTrabEstruct?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EquipTrabEstruct"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strEmprFormaAcuerNormLab"
                            defaultValue={data.strEmprFormaAcuerNormLab}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi empresa está formalizada de acuerdo con la normatividad laboral"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strEmprFormaAcuerNormLab
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strEmprFormaAcuerNormLab
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EmprFormaAcuerNormLab"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strPlaneaEstraEmpPlanPlani"
                            defaultValue={data.strPlaneaEstraEmpPlanPlani}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strPlaneaEstraEmpPlanPlani
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strPlaneaEstraEmpPlanPlani
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PlaneaEstraEmpPlanPlani"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strIdentidadMarca"
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
                                            "strIdentidadMarca",
                                            e.target.value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoMercado?.strIdentidadMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado?.strIdentidadMarca
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="IdentidadMarca"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strComunicacionMarca"
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
                                        errors?.objInfoMercado
                                            ?.strComunicacionMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
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

                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoMercadoYComercial;
