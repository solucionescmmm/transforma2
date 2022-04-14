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

import { DateTimePicker, DatePicker } from "@mui/lab";

// Componentes
import SelectListas from "../../../components/selectLista";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const InfoProdServi = ({
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
        intValorPromVentMen: null,
        strListDeProd: "",
        strCantiUniProdActu: "",
        strInventUni: "",
        strRangPreciProd: "",
        strPersoProdMarcaEmpa: "",
        strDescripEmpaq: "",
        strFuncEspeSirvProd: "",
        strPosCodBarrProd: "",
        strClariElemDif: "",
        strPerceElemDif: "",
        strElemDifProd: "",
        strTecMetUtil: "",
        strMaterPrimUti: "",
        strCertiNormaRegProdServi: "",
        strCertiTienActual: ""
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                intValorPromVentMen: values.intValorPromVentMen || null,
                strListDeProd: values.strListDeProd || "",
                strCantiUniProdActu: values.strCantiUniProdActu || "",
                strInventUni: values.strInventUni || "",
                strRangPreciProd: values.strRangPreciProd || "",
                strPersoProdMarcaEmpa: values.strPersoProdMarcaEmpa || "",
                strDescripEmpaq: values.strDescripEmpaq || "",
                strFuncEspeSirvProd: values.strFuncEspeSirvProd || "",
                strPosCodBarrProd: values.strPosCodBarrProd || "",
                strClariElemDif: values.strClariElemDif || "",
                strPerceElemDif: values.strPerceElemDif || "",
                strElemDifProd: values.strElemDifProd || "",
                strTecMetUtil: values.strTecMetUtil || "",
                strMaterPrimUti: values.strMaterPrimUti || "",
                strCertiNormaRegProdServi: values.strCertiNormaRegProdServi || "",
                strCertiTienActual: values.strCertiTienActual || "",
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
                            color: errors?.objInfoProdServi ? "#D33030" : "inherit",
                        }}
                    >
                        Información Productos/Servicios
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
                    borderColor: errors?.objInfoProdServi ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoProdServi.intValorPromVentMen"
                            defaultValue={data.intValorPromVentMen}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Valor promedio de ventas mensuales"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.intValorPromVentMen
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el valor promedio"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoProdServi.strListDeProd"
                            defaultValue={data.strListDeProd}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Listado de productos"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strListDeProd
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el listado"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Controller
                            name="objInfoProdServi.strCantiUniProdActu"
                            defaultValue={data.strCantiUniProdActu}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Cantidad de unidades producidas (mes) actualmente"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strCantiUniProdActu
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la cantidad"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Controller
                            name="objInfoProdServi.strInventUni"
                            defaultValue={data.strInventUni}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Inventario (Unidades)"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strInventUni
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las unidades de tu inventario"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Controller
                            name="objInfoProdServi.strRangPreciProd"
                            defaultValue={data.strRangPreciProd}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Rango de precios de productos"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strRangPreciProd
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el rango de precios"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Controller
                            name="objInfoProdServi.strPersoProdMarcaEmpa"
                            defaultValue={data.strPersoProdMarcaEmpa}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Personalización producto, marca y/o empaque"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strPersoProdMarcaEmpa
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la personalización"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Controller
                            name="objInfoProdServi.strDescripEmpaq"
                            defaultValue={data.strDescripEmpaq}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Descripción del empaque"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strDescripEmpaq
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la descripción"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Controller
                            name="objInfoProdServi.strFuncEspeSirvProd"
                            defaultValue={data.strFuncEspeSirvProd}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Funcionalidad especial (para qué sirven los productos)"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strFuncEspeSirvProd
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la funcionalidad"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strPosCodBarrProd"
                            defaultValue={data.strPosCodBarrProd}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Poseo código de barras para mis productos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strPosCodBarrProd
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProdServi
                                            ?.strPosCodBarrProd?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strClariElemDif"
                            defaultValue={data.strClariElemDif}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tiene claridad de cúales son sus elementos diferenciales"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strClariElemDif
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProdServi
                                            ?.strClariElemDif?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strPerceElemDif"
                            defaultValue={data.strPerceElemDif}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Percepción del elemento diferenciador"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strPerceElemDif
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProdServi
                                            ?.strPerceElemDif?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoProdServi.strElemDifProd"
                            defaultValue={data.strElemDifProd}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuál es el elemento diferencial del producto del mercado?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strElemDifProd
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el elemento diferencial"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoProdServi.strTecMetUtil"
                            defaultValue={data.strTecMetUtil}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Técnica o método utilizado"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strTecMetUtil
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la técnica o método"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strMaterPrimUti"
                            defaultValue={data.strMaterPrimUti}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles Materiales/Materias primas utiliza?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strMaterPrimUti
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las materias primas"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strCertiNormaRegProdServi"
                            defaultValue={data.strCertiNormaRegProdServi}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones o normatividad que regula sus productos o servicios?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strCertiNormaRegProdServi
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las normativas/certificaciones"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoProdServi.strCertiTienActual"
                            defaultValue={data.strCertiTienActual}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que tiene actualmente?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
                                            ?.strCertiTienActual
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las certificaciones"
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

export default InfoProdServi;
