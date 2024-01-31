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

    useEffect(() => {
        if (values) {
            setData({
                strUniProdSosFinan: values.strUniProdSosFinan || "",
                strUniProdSosFinanDetalle:
                    values.strUniProdSosFinanDetalle || "",
                strEstrCosUniProdDef: values.strEstrCosUniProdDef || "",
                strEstrCosUniProdDefDetalle:
                    values.strEstrCosUniProdDefDetalle || "",
                strPrecProdServDef: values.strPrecProdServDef || "",
                strPrecProdServDefDetalle:
                    values.strPrecProdServDefDetalle || "",
                strDefProcConUniProd: values.strDefProcConUniProd || "",
                strDefProcConUnirPodDetalle:
                    values.strDefProcConUniProdDetalle || "",
                strElabPresUniProd: values.strElabPresUniProd || "",
                strElabPresUniProdDetalle:
                    values.strElabPresUniProdDetalle || "",
                strAdminDinUniProd: values.strAdminDinUniProd || "",
                strAdminDinUniProdDetalle:
                    values.strAdminDinUniProdDetalle || "",
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
                    borderColor: errors?.objInfoComFinanciero
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={12}>
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
                                            ?.strUniProdSosFinan
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
                                            ?.strUniProdSosFinan?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="UniProdSosFinan"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComFinanciero.strUniProdSosFinanDetalle"
                            defaultValue={data.strUniProdSosFinanDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Mi unidad productiva es sostenible financieramente"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strUniProdSosFinanDetalle
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
                                            ?.strDefProcConUniProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
                                            ?.strDefProcConUniProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="DefProcConUniProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComFinanciero.strDefProcConUniProdDetalle"
                            defaultValue={data.strDefProcConUniProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Tengo definidos los procesos contables de mi unidad productiva"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strDefProcConUniProdDetalle
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
                                            ?.strElabPresUniProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
                                            ?.strElabPresUniProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="ElabPresUniProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComFinanciero.strElabPresUniProdDetalle"
                            defaultValue={data.strElabPresUniProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Elaboro un presupuesto para mi unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strElabPresUniProdDetalle
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
                                            ?.strAdminDinUniProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComFinanciero
                                            ?.strAdminDinUniProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="AdminDinUniProd"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComFinanciero.strAdminDinUniProdDetalle"
                            defaultValue={data.strAdminDinUniProdDetalle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Sé como administrar el dinero de mi unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComFinanciero
                                            ?.strAdminDinUniProdDetalle
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
