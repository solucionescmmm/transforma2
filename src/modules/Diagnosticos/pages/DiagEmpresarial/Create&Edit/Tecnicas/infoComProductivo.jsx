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
    {
        nombre: "strGradoIntervProdServi",
        label: "Grado de intervención en el producto/servicio",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "GradoIntervProdServi",
    },
    {
        nombre: "strGradoIntervProdServiDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "GradoIntervProdServi",
    },
    {
        nombre: "strGradoIntervProdServiNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "GradoIntervProdServi",
    },
    {
        nombre: "strProcProdEst",
        label: "Mis procesos productivos están",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcProdEst",
    },
    {
        nombre: "strProcProdEstDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcProdEst",
    },
    {
        nombre: "strProcProdEstNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcProdEst",
    },
    {
        nombre: "strDefProcComProv",
        label: "Tengo definido los procesos de compra y los proveedores",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DefProcComProv",
    },
    {
        nombre: "strDefProcComProvDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DefProcComProv",
    },
    {
        nombre: "strDefProcComProvNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DefProcComProv",
    },
    {
        nombre: "strContrlRegInv",
        label: "Llevo control y registro de los inventarios",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ContrlRegInv",
    },
    {
        nombre: "strContrlRegInvDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ContrlRegInv",
    },
    {
        nombre: "strContrlRegInvNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ContrlRegInv",
    },
    {
        nombre: "strCapProdRespMer",
        label: "Mi capacidad de producción y respuesta al mercado es",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapProdRespMer",
    },
    {
        nombre: "strCapProdRespMerDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapProdRespMer",
    },
    {
        nombre: "strCapProdRespMerNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapProdRespMer",
    },
    {
        nombre: "strEstadTecProd",
        label: "El estado de la ficha técnica de los productos es",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstadTecProd",
    },
    {
        nombre: "strEstadTecProdDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstadTecProd",
    },
    {
        nombre: "strEstadTecProdNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstadTecProd",
    },
    {
        nombre: "strEquipNecDesProdServi",
        label: "Tengo los equipos necesarios para el desarrollo de mis productos/servicio(s)",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipNecDesProdServi",
    },
    {
        nombre: "strEquipNecDesProdServiDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipNecDesProdServi",
    },
    {
        nombre: "strEquipNecDesProdServiNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipNecDesProdServi",
    },
    {
        nombre: "strProcManAmbiProd",
        label: "Tengo procesos para el manejo ambiental en la unidad productiva",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcManAmbiProd",
    },
    {
        nombre: "strProcManAmbiProdDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcManAmbiProd",
    },
    {
        nombre: "strProcManAmbiProdNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcManAmbiProd",
    },
    {
        nombre: "strConoceTiemposProduccionReferencias",
        label: "Conozco los tiempos de producción de cada una de mis referencias",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ConoceTiemposProduccionReferencias",
    },
    {
        nombre: "strConoceTiemposProduccionReferenciasDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ConoceTiemposProduccionReferencias",
    },
    {
        nombre: "strConoceTiemposProduccionReferenciasNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ConoceTiemposProduccionReferencias",
    },
    {
        nombre: "strDeterminaNumUnidadesInventario",
        label: "Tengo determinado el número de unidades mínimas y máximas de mi inventario",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DeterminaNumUnidadesInventario",
    },
    {
        nombre: "strDeterminaNumUnidadesInventarioDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DeterminaNumUnidadesInventario",
    },
    {
        nombre: "strDeterminaNumUnidadesInventarioNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "DeterminaNumUnidadesInventario",
    },
    {
        nombre: "strProcesoProductivoLoRealiza",
        label: "Mi proceso productivo lo realiza",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcesoProductivoLoRealiza",
    },
    {
        nombre: "strProcesoProductivoLoRealizaDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcesoProductivoLoRealiza",
    },
    {
        nombre: "strProcesoProductivoLoRealizaNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ProcesoProductivoLoRealiza",
    },
    {
        nombre: "strCapacidadRespuestaTerceros",
        label: "Capacidad de respuesta por parte de terceros",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapacidadRespuestaTerceros",
    },
    {
        nombre: "strCapacidadRespuestaTercerosDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapacidadRespuestaTerceros",
    },
    {
        nombre: "strCapacidadRespuestaTercerosNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CapacidadRespuestaTerceros",
    },
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
        strGradoIntervProdServi: "",
        strGradoIntervProdServiDetalle: "",
        strGradoIntervProdServiNivel: "",
        strProcProdEst: "",
        strProcProdEstDetalle: "",
        strProcProdEstNivel: "",
        strDefProcComProv: "",
        strDefProcComProvDetalle: "",
        strDefProcComProvNivel: "",
        strContrlRegInv: "",
        strContrlRegInvDetalle: "",
        strContrlRegInvNivel: "",
        strCapProdRespMer: "",
        strCapProdRespMerDetalle: "",
        strCapProdRespMerNivel: "",
        strEstadTecProd: "",
        strEstadTecProdDetalle: "",
        strEstadTecProdNivel: "",
        strEquipNecDesProdServi: "",
        strEquipNecDesProdServiDetalle: "",
        strEquipNecDesProdServiNivel: "",
        strProcManAmbiProd: "",
        strProcManAmbiProdDetalle: "",
        strProcManAmbiProdNivel: "",
        strConoceTiemposProduccionReferencias: "",
        strConoceTiemposProduccionReferenciasDetalle: "",
        strConoceTiemposProduccionReferenciasNivel: "",
        strDeterminaNumUnidadesInventario: "",
        strDeterminaNumUnidadesInventarioDetalle: "",
        strDeterminaNumUnidadesInventarioNivel: "",
        strProcesoProductivoLoRealiza: "",
        strProcesoProductivoLoRealizaDetalle: "",
        strProcesoProductivoLoRealizaNivel: "",
        strCapacidadRespuestaTerceros: "",
        strCapacidadRespuestaTercerosDetalle: "",
        strCapacidadRespuestaTercerosNivel: "",
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
                strGradoIntervProdServiNivel:
                    values.strGradoIntervProdServiNivel || "",
                strProcProdEst: values.strProcProdEst || "",
                strProcProdEstDetalle: values.strProcProdEstDetalle || "",
                strProcProdEstNivel: values.strProcProdEstNivel || "",
                strDefProcComProv: values.strDefProcComProv || "",
                strDefProcComProvDetalle: values.strDefProcComProvDetalle || "",
                strDefProcComProvNivel: values.strDefProcComProvNivel || "",
                strContrlRegInv: values.strContrlRegInv || "",
                strContrlRegInvDetalle: values.strContrlRegInvDetalle || "",
                strContrlRegInvNivel: values.strContrlRegInvNivel || "",
                strCapProdRespMer: values.strCapProdRespMer || "",
                strCapProdRespMerDetalle: values.strCapProdRespMerDetalle || "",
                strCapProdRespMerNivel: values.strCapProdRespMerNivel || "",
                strEstadTecProd: values.strEstadTecProd || "",
                strEstadTecProdDetalle: values.strEstadTecProdDetalle || "",
                strEstadTecProdNivel: values.strEstadTecProdNivel || "",
                strEquipNecDesProdServi: values.strEquipNecDesProdServi || "",
                strEquipNecDesProdServiDetalle:
                    values.strEquipNecDesProdServiDetalle || "",
                strEquipNecDesProdServiNivel:
                    values.strEquipNecDesProdServiNivel || "",
                strProcManAmbiProd: values.strProcManAmbiProd || "",
                strProcManAmbiProdDetalle:
                    values.strProcManAmbiProdDetalle || "",
                strProcManAmbiProdNivel: values.strProcManAmbiProdNivel || "",
                strConoceTiemposProduccionReferencias:
                    values.strConoceTiemposProduccionReferencias || "",
                strConoceTiemposProduccionReferenciasDetalle:
                    values.strConoceTiemposProduccionReferenciasDetalle || "",
                strConoceTiemposProduccionReferenciasNivel:
                    values.strConoceTiemposProduccionReferenciasNivel || "",
                strDeterminaNumUnidadesInventario:
                    values.strDeterminaNumUnidadesInventario || "",
                strDeterminaNumUnidadesInventarioDetalle:
                    values.strDeterminaNumUnidadesInventarioDetalle || "",
                strDeterminaNumUnidadesInventarioNivel:
                    values.strDeterminaNumUnidadesInventarioNivel || "",
                strProcesoProductivoLoRealiza:
                    values.strProcesoProductivoLoRealiza || "",
                strProcesoProductivoLoRealizaDetalle:
                    values.strProcesoProductivoLoRealizaDetalle || "",
                strProcesoProductivoLoRealizaNivel:
                    values.strProcesoProductivoLoRealizaNivel || "",
                strCapacidadRespuestaTerceros:
                    values.strCapacidadRespuestaTerceros || "",
                strCapacidadRespuestaTercerosDetalle:
                    values.strCapacidadRespuestaTercerosDetalle || "",
                strCapacidadRespuestaTercerosNivel:
                    values.strCapacidadRespuestaTercerosNivel || "",
            });
        }

        setLoading(false);
    }, [values]);

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
                    name={`objInfoComProductivo.${nombre}`}
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
                                    errors?.objInfoComProductivo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComProductivo?.[nombre]
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
                                    errors?.objInfoComProductivo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComProductivo?.[nombre]
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
                                    errors?.objInfoComProductivo?.[nombre]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComProductivo?.[nombre]
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
                    {render(propiedades)}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoComMercadeo;
