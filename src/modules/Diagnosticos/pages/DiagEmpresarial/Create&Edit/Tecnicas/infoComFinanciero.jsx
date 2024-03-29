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
        strUniProdSosFinanNivel: "",
        strEstrCosUniProdDef: "",
        strEstrCosUniProdDefDetalle: "",
        strEstrCosUniProdDefNivel: "",
        strPrecProdServDef: "",
        strPrecProdServDefDetalle: "",
        strPrecProdServDefNivel: "",
        strDefProcConUniProd: "",
        strDefProcConUniProdDetalle: "",
        strDefProcConUniProdNivel: "",
        strElabPresUniProd: "",
        strElabPresUniProdDetalle: "",
        strElabPresUniProdNivel: "",
        strAdminDinUniProd: "",
        strAdminDinUniProdDetalle: "",
        strAdminDinUniProdNivel: "",
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
                strUniProdSosFinanNivel: values.strUniProdSosFinanNivel || "",
                strEstrCosUniProdDef: values.strEstrCosUniProdDef || "",
                strEstrCosUniProdDefDetalle:
                    values.strEstrCosUniProdDefDetalle || "",
                strEstrCosUniProdDefNivel:
                    values.strEstrCosUniProdDefNivel || "",
                strPrecProdServDef: values.strPrecProdServDef || "",
                strPrecProdServDefDetalle:
                    values.strPrecProdServDefDetalle || "",
                strPrecProdServDefNivel: values.strPrecProdServDefNivel || "",
                strDefProcConUniProd: values.strDefProcConUniProd || "",
                strDefProcConUniProdDetalle:
                    values.strDefProcConUniProdDetalle || "",
                strDefProcConUniProdNivel:
                    values.strDefProcConUniProdNivel || "",
                strElabPresUniProd: values.strElabPresUniProd || "",
                strElabPresUniProdDetalle:
                    values.strElabPresUniProdDetalle || "",
                strElabPresUniProdNivel: values.strElabPresUniProdNivel || "",
                strAdminDinUniProd: values.strAdminDinUniProd || "",
                strAdminDinUniProdDetalle:
                    values.strAdminDinUniProdDetalle || "",
                strAdminDinUniProdNivel: values.strAdminDinUniProdNivel || "",
            });
        }

        setLoading(false);
    }, [values]);

    const propiedades = [
        {
            nombre: "strUniProdSosFinan",
            label: "Mi unidad productiva es sostenible financieramente",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "UniProdSosFinan",
        },
        {
            nombre: "strUniProdSosFinanDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "UniProdSosFinan",
        },
        {
            nombre: "strUniProdSosFinanNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "UniProdSosFinan",
        },
        {
            nombre: "strDefProcConUniProd",
            label: "Tengo definidos los procesos contables de mi unidad productiva",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "DefProcConUniProd",
        },
        {
            nombre: "strDefProcConUniProdDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "DefProcConUniProd",
        },
        {
            nombre: "strDefProcConUniProdNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "DefProcConUniProd",
        },
        {
            nombre: "strElabPresUniProd",
            label: "Elaboro un presupuesto para mi unidad productiva",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ElabPresUniProd",
        },
        {
            nombre: "strElabPresUniProdDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ElabPresUniProd",
        },
        {
            nombre: "strElabPresUniProdNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ElabPresUniProd",
        },
        {
            nombre: "strAdminDinUniProd",
            label: "Sé como administrar el dinero de mi unidad productiva",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AdminDinUniProd",
        },
        {
            nombre: "strAdminDinUniProdDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AdminDinUniProd",
        },
        {
            nombre: "strAdminDinUniProdNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AdminDinUniProd",
        },
    ];

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const render = (datos) => {
        return datos.map(({ nombre, label, strGrupo, strCodigo }) => (
            <Grid
                item
                xs={12}
                md={label === "Detalle" ? 3 : label === "Nivel" ? 2 : 7}
            >
                <Controller
                    name={`objInfoComFinanciero.${nombre}`}
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
                    {render(propiedades)}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoComMercadeo;
