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
                strGradoIntervProdServi: values.strGradoIntervProdServi || "",
                strProcProdEst: values.strProcProdEst || "",
                strDefProcComProv: values.strDefProcComProv || "",
                strContrlRegInv: values.strContrlRegInv || "",
                strCapProdRespMer: values.strCapProdRespMer || "",
                strEstadTecProd: values.strEstadTecProd || "",
                strEquipNecDesProdServi: values.strEquipNecDesProdServi || "",
                strProcManAmbiProd: values.strProcManAmbiProd || "",
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
                    borderColor: errors?.objInfoComProductivo ? "#D33030" : "inherit",
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
                                            ?.strGradoIntervProdServi?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProcProdEst"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="DefProcComProv"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ContrlRegInv"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="CapProdRespMer"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="EstadTecProd"
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
                                            ?.strEquipNecDesProdServi?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="EquipNecDesProdServi"
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
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProcManAmbiProd"
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
