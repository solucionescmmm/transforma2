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
    Divider,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";

const InfoCategoria1 = ({
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
        strFuncionalidad: "",
        strFuncionalidadDetalle: "",
        strFuncionalidadNivel: "",
        strMetodologia: "",
        strMetodologiaDetalle: "",
        strMetodologiaNivel: "",
        strRenovacionPortafolio: "",
        strRenovacionPortafolioDetalle: "",
        strRenovacionPortafolioNivel: "",
        strSostenibilidad: "",
        strSostenibilidadDetalle: "",
        strSostenibilidadNivel: "",
        strAtributosValor: "",
        strAtributosValorDetalle: "",
        strAtributosValorNivel: "",
        strUsoMateriales: "",
        strUsoMaterialesDetalle: "",
        strUsoMaterialesNivel: "",
        strMenajoTecnicaAlim: "",
        strMenajoTecnicaAlimDetalle: "",
        strMenajoTecnicaAlimNivel: "",
        strProcesosPreparacion: "",
        strProcesosPreparacionDetalle: "",
        strProcesosPreparacionNivel: "",
        strPresentacionApariencia: "",
        strPresentacionAparienciaDetalle: "",
        strPresentacionAparienciaNivel: "",
        strProporcionAlim: "",
        strProporcionAlimDetalle: "",
        strProporcionAlimNivel: "",
        strConservacion: "",
        strConservacionDetalle: "",
        strConservacionNivel: "",
        strInocuidad: "",
        strInocuidadDetalle: "",
        strInocuidadNivel: "",
        strEmpaqueEtiquetaAlim: "",
        strEmpaqueEtiquetaAlimDetalle: "",
        strEmpaqueEtiquetaAlimNivel: "",
        strMenajoTecnica: "",
        strMenajoTecnicaDetalle: "",
        strMenajoTecnicaNivel: "",
        strAcabadosFactura: "",
        strAcabadosFacturaDetalle: "",
        strAcabadosFacturaNivel: "",
        strDurabilidad: "",
        strDurabilidadDetalle: "",
        strDurabilidadNivel: "",
        strUsoColores: "",
        strUsoColoresDetalle: "",
        strUsoColoresNivel: "",
        strProporcion: "",
        strProporcionDetalle: "",
        strProporcionNivel: "",
        strRiesgoUso: "",
        strRiesgoUsoDetalle: "",
        strRiesgoUsoNivel: "",
        strEmpaqueEtiqueta: "",
        strEmpaqueEtiquetaDetalle: "",
        strEmpaqueEtiquetaNivel: "",
        strUsabilidad: "",
        strUsabilidadDetalle: "",
        strUsabilidadNivel: "",
        strDiseñoExperiencia: "",
        strDiseñoExperienciaDetalle: "",
        strDiseñoExperienciaNivel: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strFuncionalidad: values.strFuncionalidad || "",
                strFuncionalidadDetalle: values.strFuncionalidadDetalle || "",
                strFuncionalidadNivel: values.strFuncionalidadNivel || "",
                strMetodologia: values.strMetodologia || "",
                strMetodologiaDetalle: values.strMetodologiaDetalle || "",
                strMetodologiaNivel: values.strMetodologiaNivel || "",
                strRenovacionPortafolio: values.strRenovacionPortafolio || "",
                strRenovacionPortafolioDetalle:
                    values.strRenovacionPortafolioDetalle || "",
                strRenovacionPortafolioNivel: values.strRenovacionPortafolioNivel || "",
                strSostenibilidad: values.strSostenibilidad || "",
                strSostenibilidadDetalle: values.strSostenibilidadDetalle || "",
                strSostenibilidadNivel: values.strSostenibilidadNivel || "",
                strAtributosValor: values.strAtributosValor || "",
                strAtributosValorDetalle: values.strAtributosValorDetalle || "",
                strAtributosValorNivel: values.strAtributosValorNivel || "",
                strUsoMateriales: values.strUsoMateriales || "",
                strUsoMaterialesDetalle: values.strUsoMaterialesDetalle || "",
                strUsoMaterialesNivel: values.strUsoMaterialesNivel || "",
                strMenajoTecnicaAlim: values.strMenajoTecnicaAlim || "",
                strMenajoTecnicaAlimDetalle: values.strMenajoTecnicaAlimDetalle || "",
                strMenajoTecnicaAlimNivel: values.strMenajoTecnicaAlimNivel || "",
                strProcesosPreparacion: values.strProcesosPreparacion || "",
                strProcesosPreparacionDetalle: values.strProcesosPreparacionDetalle || "",
                strProcesosPreparacionNivel: values.strProcesosPreparacionNivel || "",
                strPresentacionApariencia: values.strPresentacionApariencia || "",
                strPresentacionAparienciaDetalle:
                    values.strPresentacionAparienciaDetalle || "",
                strPresentacionAparienciaNivel:
                    values.strPresentacionAparienciaNivel || "",
                strProporcionAlim: values.strProporcionAlim || "",
                strProporcionAlimDetalle: values.strProporcionAlimDetalle || "",
                strProporcionAlimNivel: values.strProporcionAlimNivel || "",
                strConservacion: values.strConservacion || "",
                strConservacionDetalle: values.strConservacionDetalle || "",
                strConservacionNivel: values.strConservacionNivel || "",
                strInocuidad: values.strInocuidad || "",
                strInocuidadDetalle: values.strInocuidadDetalle || "",
                strInocuidadNivel: values.strInocuidadNivel || "",
                strEmpaqueEtiquetaAlim: values.strEmpaqueEtiquetaAlim || "",
                strEmpaqueEtiquetaAlimDetalle: values.strEmpaqueEtiquetaAlimDetalle || "",
                strEmpaqueEtiquetaAlimNivel: values.strEmpaqueEtiquetaAlimNivel || "",
                strMenajoTecnica: values.strMenajoTecnica || "",
                strMenajoTecnicaDetalle: values.strMenajoTecnicaDetalle || "",
                strMenajoTecnicaNivel: values.strMenajoTecnicaNivel || "",
                strAcabadosFactura: values.strAcabadosFactura || "",
                strAcabadosFacturaDetalle: values.strAcabadosFacturaDetalle || "",
                strAcabadosFacturaNivel: values.strAcabadosFacturaNivel || "",
                strDurabilidad: values.strDurabilidad || "",
                strDurabilidadDetalle: values.strDurabilidadDetalle || "",
                strDurabilidadNivel: values.strDurabilidadNivel || "",
                strUsoColores: values.strUsoColores || "",
                strUsoColoresDetalle: values.strUsoColoresDetalle || "",
                strUsoColoresNivel: values.strUsoColoresNivel || "",
                strProporcion: values.strProporcion || "",
                strProporcionDetalle: values.strProporcionDetalle || "",
                strProporcionNivel: values.strProporcionNivel || "",
                strRiesgoUso: values.strRiesgoUso || "",
                strRiesgoUsoDetalle: values.strRiesgoUsoDetalle || "",
                strRiesgoUsoNivel: values.strRiesgoUsoNivel || "",
                strEmpaqueEtiqueta: values.strEmpaqueEtiqueta || "",
                strEmpaqueEtiquetaDetalle: values.strEmpaqueEtiquetaDetalle || "",
                strEmpaqueEtiquetaNivel: values.strEmpaqueEtiquetaNivel || "",
                strUsabilidad: values.strUsabilidad || "",
                strUsabilidadDetalle: values.strUsabilidadDetalle || "",
                strUsabilidadNivel: values.strUsabilidadNivel || "",
                strDiseñoExperiencia: values.strDiseñoExperiencia || "",
                strDiseñoExperienciaDetalle: values.strDiseñoExperienciaDetalle || "",
                strDiseñoExperienciaNivel: values.strDiseñoExperienciaNivel || "",
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
                            color: errors?.objCategoria1 ? "#D33030" : "inherit",
                        }}
                    >
                        Categoría # 1: Diseño Desde lo Físico, lo Técnico y lo Tangible.
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
                    borderColor: errors?.objCategoria1 ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row-reverse" spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Innovación
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strFuncionalidad"
                                    defaultValue={data.strFuncionalidad}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Funcionalidad"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strFuncionalidad
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strFuncionalidad
                                                    ?.message || "Seleccione una opción"
                                            }
                                            disabled={disabled}
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strFuncionalidadDetalle"
                                    defaultValue={data.strFuncionalidadDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strFuncionalidadDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strFuncionalidadDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strFuncionalidadNivel"
                                    defaultValue={data.strFuncionalidadNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strFuncionalidadNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strFuncionalidadNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMetodologia"
                                    defaultValue={data.strMetodologia}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Metodología para la creación de producto"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            error={
                                                errors?.objCategoria1?.strMetodologia
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strMetodologia
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMetodologiaDetalle"
                                    defaultValue={data.strMetodologiaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMetodologiaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMetodologiaDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strMetodologiaNivel"
                                    defaultValue={data.strMetodologiaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strMetodologiaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strMetodologiaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strRenovacionPortafolio"
                                    defaultValue={data.strRenovacionPortafolio}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Renovación del portafolio"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolio?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strRenovacionPortafolioDetalle"
                                    defaultValue={data.strRenovacionPortafolioDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strRenovacionPortafolioNivel"
                                    defaultValue={data.strRenovacionPortafolioNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strRenovacionPortafolioNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strSostenibilidad"
                                    defaultValue={data.strSostenibilidad}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Sostenibilidad"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strSostenibilidad
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strSostenibilidad
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strSostenibilidadDetalle"
                                    defaultValue={data.strSostenibilidadDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strSostenibilidadDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strSostenibilidadDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strSostenibilidadNivel"
                                    defaultValue={data.strSostenibilidadNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strSostenibilidadNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strSostenibilidadNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strAtributosValor"
                                    defaultValue={data.strAtributosValor}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Atributos de valor"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strAtributosValor
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strAtributosValor
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strAtributosValorDetalle"
                                    defaultValue={data.strAtributosValorDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strAtributosValorNivel"
                                    defaultValue={data.strAtributosValorNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsoMateriales"
                                    defaultValue={data.strUsoMateriales}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Uso de los materiales"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strUsoMateriales
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strUsoMateriales
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsoMaterialesDetalle"
                                    defaultValue={data.strUsoMaterialesDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strAtributosValorDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strUsoMaterialesNivel"
                                    defaultValue={data.strUsoMaterialesNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strUsoMaterialesNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strUsoMaterialesNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Percepción y calidad
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnicaAlim"
                                    defaultValue={data.strMenajoTecnicaAlim}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Manejo que tengo de la(s) técnica(s)"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlim
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlim?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnicaAlimDetalle"
                                    defaultValue={data.strMenajoTecnicaAlimDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            disabled={disabled}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlimDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlimDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnicaAlimNivel"
                                    defaultValue={data.strMenajoTecnicaAlimNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlimNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaAlimNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProcesosPreparacion"
                                    defaultValue={data.strProcesosPreparacion}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Procesos de preparación"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacion?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProcesosPreparacionDetalle"
                                    defaultValue={data.strProcesosPreparacionDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacionDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacionDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strProcesosPreparacionNivel"
                                    defaultValue={data.strProcesosPreparacionNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacionNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProcesosPreparacionNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strPresentacionApariencia"
                                    defaultValue={data.strPresentacionApariencia}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Presentación y apariencia"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strPresentacionApariencia
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strPresentacionApariencia
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strPresentacionAparienciaDetalle"
                                    defaultValue={data.strPresentacionAparienciaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strPresentacionAparienciaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strPresentacionAparienciaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strPresentacionAparienciaNivel"
                                    defaultValue={data.strPresentacionAparienciaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strPresentacionAparienciaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strPresentacionAparienciaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProporcionAlim"
                                    defaultValue={data.strProporcionAlim}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Proporción"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strProporcionAlim
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strProporcionAlim
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProporcionAlimDetalle"
                                    defaultValue={data.strProporcionAlimDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProporcionAlimDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProporcionAlimDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strProporcionAlimNivel"
                                    defaultValue={data.strProporcionAlimNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProporcionAlimNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProporcionAlimNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strConservacion"
                                    defaultValue={data.strConservacion}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Conservación"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strConservacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strConservacion
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strConservacionDetalle"
                                    defaultValue={data.strConservacionDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strConservacionDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strConservacionDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strConservacionNivel"
                                    defaultValue={data.strConservacionNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strConservacionNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strConservacionNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strInocuidad"
                                    defaultValue={data.strInocuidad}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Inocuidad"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strInocuidad
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strInocuidad
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strInocuidadDetalle"
                                    defaultValue={data.strInocuidadDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strInocuidadDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strInocuidadDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strInocuidadNivel"
                                    defaultValue={data.strInocuidadNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strInocuidadNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strInocuidadNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiquetaAlim"
                                    defaultValue={data.strEmpaqueEtiquetaAlim}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Empaque, Envase y Etiqueta"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlim
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlim?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiquetaAlimDetalle"
                                    defaultValue={data.strEmpaqueEtiquetaAlimDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlimDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlimDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiquetaAlimNivel"
                                    defaultValue={data.strEmpaqueEtiquetaAlimNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlimNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaAlimNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Estética
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnica"
                                    defaultValue={data.strMenajoTecnica}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Manejo que tengo de la(s) técnica(s)"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strMenajoTecnica
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strMenajoTecnica
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnicaDetalle"
                                    defaultValue={data.strMenajoTecnicaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strMenajoTecnicaNivel"
                                    defaultValue={data.strMenajoTecnicaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strMenajoTecnicaNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strAcabadosFactura"
                                    defaultValue={data.strAcabadosFactura}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Acabados y Factura"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strAcabadosFactura
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strAcabadosFactura
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strAcabadosFacturaDetalle"
                                    defaultValue={data.strAcabadosFacturaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strAcabadosFacturaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strAcabadosFacturaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strAcabadosFacturaNivel"
                                    defaultValue={data.strAcabadosFacturaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strAcabadosFacturaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strAcabadosFacturaNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strDurabilidad"
                                    defaultValue={data.strDurabilidad}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Durabilidad"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strDurabilidad
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strDurabilidad
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strDurabilidadDetalle"
                                    defaultValue={data.strDurabilidadDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strDurabilidadDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strDurabilidadDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strDurabilidadNivel"
                                    defaultValue={data.strDurabilidadNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strDurabilidadNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strDurabilidadNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsoColores"
                                    defaultValue={data.strUsoColores}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Uso de los colores"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strUsoColores
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strUsoColores
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsoColoresDetalle"
                                    defaultValue={data.strUsoColoresDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strUsoColoresDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strUsoColoresDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strUsoColoresNivel"
                                    defaultValue={data.strUsoColoresNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strUsoColoresNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strUsoColoresNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProporcion"
                                    defaultValue={data.strProporcion}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Proporción"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strProporcion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strProporcion
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strProporcionDetalle"
                                    defaultValue={data.strProporcionDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strProporcionDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strProporcionDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strProporcionNivel"
                                    defaultValue={data.strProporcionNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strProporcionNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strProporcionNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#F5B335",
                            }}
                        >
                            Experiencia
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strRiesgoUso"
                                    defaultValue={data.strRiesgoUso}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Riesgo de Uso"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strRiesgoUso
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strRiesgoUso
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strRiesgoUsoDetalle"
                                    defaultValue={data.strRiesgoUsoDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strRiesgoUsoDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strRiesgoUsoDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strRiesgoUsoNivel"
                                    defaultValue={data.strRiesgoUsoNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strRiesgoUsoNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strRiesgoUsoNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiqueta"
                                    defaultValue={data.strEmpaqueEtiqueta}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Empaque, Envase y Etiqueta"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strEmpaqueEtiqueta
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strEmpaqueEtiqueta
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiquetaDetalle"
                                    defaultValue={data.strEmpaqueEtiquetaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strEmpaqueEtiquetaNivel"
                                    defaultValue={data.strEmpaqueEtiquetaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strEmpaqueEtiquetaNivel?.message ||
                                                "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsabilidad"
                                    defaultValue={data.strUsabilidad}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Usabilidad"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strUsabilidad
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strUsabilidad
                                                    ?.message || "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strUsabilidadDetalle"
                                    defaultValue={data.strUsabilidadDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strUsabilidadDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strUsabilidadDetalle?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strUsabilidadNivel"
                                    defaultValue={data.strUsabilidadNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1?.strUsabilidadNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1?.strUsabilidadNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strDiseñoExperiencia"
                                    defaultValue={data.strDiseñoExperiencia}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Diseño de Experiencia"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperiencia
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperiencia?.message ||
                                                "Seleccione una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Controller
                                    name="objCategoria1.strDiseñoExperienciaDetalle"
                                    defaultValue={data.strDiseñoExperienciaDetalle}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Detalle"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperienciaDetalle
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperienciaDetalle
                                                    ?.message ||
                                                "Digite el detalle en caso de que aplique"
                                            }
                                            fullWidth
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Controller
                                    name="objCategoria1.strDiseñoExperienciaNivel"
                                    defaultValue={data.strDiseñoExperienciaNivel}
                                    render={({ field: { name, onChange, value } }) => (
                                        <SelectListas
                                            label="Nivel"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperienciaNivel
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objCategoria1
                                                    ?.strDiseñoExperienciaNivel
                                                    ?.message || "Nivel"
                                            }
                                            disabled
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoCategoria1;
