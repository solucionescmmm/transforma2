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
        strUniProdSosFinan: "",
        strUniProdSosFinanDetalle: "",
        strEstrCosUniProdDef: "",
        strEstrCosUniProdDefDetalle: "",
        strPrecProdServDef: "",
        strPrecProdServDefDetalle: "",
        strDefProcConUniProd: "",
        strDefProcConUniProdDetalle: "",
        strElabPresUniProd: "",
        strElabPresUniProdDetalle: "",
        strAdminDinUniProd: "",
        strAdminDinUniProdDetalle: "",
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
                strUniProdSosFinan: values.strUniProdSosFinan || "",
                strEstrCosUniProdDef: values.strEstrCosUniProdDef || "",
                strPrecProdServDef: values.strPrecProdServDef || "",
                strDefProcConUniProd: values.strDefProcConUniProd || "",
                strElabPresUniProd: values.strElabPresUniProd || "",
                strAdminDinUniProd: values.strAdminDinUniProd || "",
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
                            color: errors?.objInfoComFinanciero
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente financiero
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
                    borderColor: errors?.objInfoComFinanciero ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComFinanciero.strUniProdSosFinan"
                            defaultValue={data.strUniProdSosFinan}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi unidad productiva es sostenible financieramente"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
                            name="objInfoComFinanciero.strEstrCosUniProdDef"
                            defaultValue={data.strEstrCosUniProdDef}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="La estructura de costos de mi unidad productiva está definida"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
                            name="objInfoComFinanciero.strPrecProdServDef"
                            defaultValue={data.strPrecProdServDef}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Los precios de mis productos/servicio(s) están definidos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
                            name="objInfoComFinanciero.strDefProcConUniProd"
                            defaultValue={data.strDefProcConUniProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo definidos los procesos contables de mi unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
                            name="objInfoComFinanciero.strElabPresUniProd"
                            defaultValue={data.strElabPresUniProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Elaboro un presupuesto para mi unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
                            name="objInfoComFinanciero.strAdminDinUniProd"
                            defaultValue={data.strAdminDinUniProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Sé como administrar el dinero de mi unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
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
