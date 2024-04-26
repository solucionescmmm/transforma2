import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import validator from "validator";
import NumberFormat from "react-number-format";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    TextField,
    CircularProgress,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectLugarOperacion from "../../../../../Empresarios/components/selectLugarOperacion";
import DropdownLocalizaciones from "../../../../../Empresarios/components/dropdownLocalizaciones";
import ModalDireccionResidencia from "../../../../../Empresarios/components/modalDireccionResidencia";
// import ModalMediosDigitales from "../../../../../Empresarios/components/modalMediosDigitales";
import SelectSectorEconomico from "../../../../../Empresarios/components/selectSectorEconomico";
import SelectCategoriaServicio from "../../../../../Empresarios/components/selectCategoriaServicio";
import SelectCategoriaProducto from "../../../../../Empresarios/components/selectCategoriaProducto";
import SelectTiempoDedicacionEmpresa from "../../../../../Empresarios/components/selectTiempoDedicacionEmpresa";
import DropdownCategoriasSecundarias from "../../../../../Empresarios/components/dropdownCategoriasSecundarias";
import SelectListas from "../../../../components/selectLista";

const InfoEmprendimiento = ({
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
        strUnidadProductiva: "",
        intAñoInicioOperacion: null,
        strLugarOperacion: "",
        arrPais: [],
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strDireccionResidencia: "",
        strUbicacionUP: "",
        strCelular: "",
        strCorreoElectronico: "",
        strRegistroCamaraComercio: "",
        strTiempoDedicacion: "",
        strSectorEconomico: "",
        strCategoriaProducto: "",
        strCategoriaServicio: "",
        arrCategoriasSecundarias: [],
        strOtraCategoria: "",
        strDefinineLineasProductoServicios: "",
        strLineaProductoServicioDestacada: "",
        strProductoServiciosEnValidacion: "",
        strNivelDlloProductoServicios: "",
        strEtapaValidProductoServicios: "",
        strHistoriaEmpresa: "",
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
                strUnidadProductiva: values.strUnidadProductiva || "",
                intAñoInicioOperacion: values.intAñoInicioOperacion || null,
                strLugarOperacion: values.strLugarOperacion || "",
                arrPais: values.arrPais || [],
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
                strBarrio: values.strBarrio || "",
                strDireccionResidencia: values.strDireccionResidencia || "",
                strUbicacionUP: values.strUbicacionUP || "",
                strCelular: values.strCelular || "",
                strCorreoElectronico: values.strCorreoElectronico || "",
                strRegistroCamaraComercio:
                    values.strRegistroCamaraComercio || "",
                strTiempoDedicacion: values.strTiempoDedicacion || "",
                strSectorEconomico: values.strSectorEconomico || "",
                strCategoriaProducto: values.strCategoriaProducto || "",
                strCategoriaServicio: values.strCategoriaServicio || "",
                arrCategoriasSecundarias: values.arrCategoriasSecundarias || [],
                strOtraCategoria: values.strOtraCategoria || "",
                strListadoProdServ: values.strListadoProdServ || "",
                btGeneraEmpleo: values.btGeneraEmpleo || "",
                strHistoriaEmpresa: values.strHistoriaEmpresa || "",
                strDefinineLineasProductoServicios:
                    values.strDefinineLineasProductoServicios || "",
                strLineaProductoServicioDestacada:
                    values.strLineaProductoServicioDestacada || "",
                strProductoServiciosEnValidacion:
                    values.strProductoServiciosEnValidacion || "",
                strNivelDlloProductoServicios:
                    values.strNivelDlloProductoServicios || "",
                strEtapaValidProductoServicios:
                    values.strEtapaValidProductoServicios || "",
                MinimoValorProducto: values.MinimoValorProducto || "",
                MaximoValorProducto: values.MaximoValorProducto || "",
                intCantidadUnidadesProducidasMes:
                    values.intCantidadUnidadesProducidasMes || "",
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
                            color: errors?.objInfoEmprendimiento
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información de la empresa
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
                    borderColor: errors?.objInfoEmprendimiento
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUnidadProductiva}
                            name="objInfoEmprendimiento.strUnidadProductiva"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strUnidadProductiva
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strUnidadProductiva?.message ||
                                        "Digita el nombre de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre de la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intAñoInicioOperacion}
                            name="objInfoEmprendimiento.intAñoInicioOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="¿En qué año inició la operación?"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    views={["year"]}
                                    format="yyyy"
                                    openTo="year"
                                    slotProps={{
                                        textField: {
                                            name,
                                            variant: "standard",
                                            error: !!errors
                                                ?.objInfoEmprendimiento
                                                ?.intAñoInicioOperacion,
                                            helperText:
                                                errors?.objInfoEmprendimiento
                                                    ?.intAñoInicioOperacion
                                                    ?.message ||
                                                "Ingrese el año de inicio de operación de la empresa",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarOperacion}
                            name="objInfoEmprendimiento.strLugarOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectLugarOperacion
                                    label="Lugar de operación de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strLugarOperacion",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmprendimiento.strDireccionResidencia",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmprendimiento.arrPais",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmprendimiento.arrDepartamento",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmprendimiento.arrCiudad",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmprendimiento.strBarrio",
                                            ""
                                        );
                                    }}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strLugarOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strLugarOperacion?.message ||
                                        "Selecciona el lugar donde opera la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el lugar donde opera la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrPais}
                            name="objInfoEmprendimiento.arrPais"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Pais"
                                    strCodigo="paises"
                                    name={name}
                                    required
                                    value={value}
                                    disabled={
                                        data.strLugarOperacion ===
                                        "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrPais", value);
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrPais
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrPais
                                            ?.message ||
                                        "Selecciona el pais de residencia"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    data.strLugarOperacion ===
                                    "Desde la vivienda"
                                        ? null
                                        : "Por favor, selecciona el pais de residencia",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmprendimiento.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    disabled={
                                        data.strLugarOperacion ===
                                        "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    name={name}
                                    required
                                    value={value}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData(
                                            "arrDepartamento",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    strPais={data.arrPais?.country_name}
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrDepartamento?.message ||
                                        "Selecciona el departamento de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    data.strLugarOperacion ===
                                    "Desde la vivienda"
                                        ? null
                                        : "Por favor, selecciona el departamento de residencia",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrCiudad}
                            name="objInfoEmprendimiento.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    required
                                    disabled={
                                        data.strLugarOperacion ===
                                        "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrCiudad", value);
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={
                                        data.arrDepartamento?.region_name
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrCiudad
                                            ?.message ||
                                        "Selecciona la ciudad de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    data.strLugarOperacion ===
                                    "Desde la vivienda"
                                        ? null
                                        : "Por favor, selecciona la ciudad de residencia",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strBarrio}
                            name="objInfoEmprendimiento.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda"
                                    name={name}
                                    disabled={
                                        data.strLugarOperacion ===
                                        "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEmprendimiento?.strBarrio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strBarrio
                                            ?.message ||
                                        "Selecciona el barrio/corregimiento/vereda de la empresa"
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strDireccionResidencia}
                            name="objInfoEmprendimiento.strDireccionResidencia"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalDireccionResidencia
                                    label="Dirección de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={
                                        data.strLugarOperacion ===
                                        "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    fullWidth
                                    strPais={
                                        data.arrPais?.country_name
                                    }
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDireccionResidencia?.message ||
                                        "Digita la dirección de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUbicacionUP}
                            name="objInfoEmprendimiento.strUbicacionUP"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Ubicación de la UP (Urbana o Rural)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strUbicacionUP
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strUbicacionUP?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="UbicacionViviendaEmpresa"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular}
                            name="objInfoEmprendimiento.strCelular"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    format="### ### ####"
                                    value={value}
                                    customInput={TextField}
                                    name={name}
                                    onChange={(e) => onChange(e)}
                                    label="Celular"
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCelular
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCelular?.message ||
                                        "Digita el número celular de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value) {
                                        let strValue = value.replace(/\s/g, "");

                                        if (
                                            !validator.isMobilePhone(
                                                strValue,
                                                "es-CO"
                                            )
                                        ) {
                                            return "El número ingresado no corresponde a un operador válido en Colombia";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCorreoElectronico}
                            name="objInfoEmprendimiento.strCorreoElectronico"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCorreoElectronico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCorreoElectronico?.message ||
                                        "Digita el correo electrónico de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value) {
                                        if (!validator.isEmail(value)) {
                                            return "El valor ingresado no corresponde a un correo electrónico válido";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRegistroCamaraComercio}
                            name="objInfoEmprendimiento.strRegistroCamaraComercio"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Cuenta con registro en cámara de comercio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strRegistroCamaraComercio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strRegistroCamaraComercio
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strHistoriaEmpresa}
                            name="objInfoEmprendimiento.strHistoriaEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cómo nace la empresa? - Historia"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strHistoriaEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strHistoriaEmpresa?.message ||
                                        "Digita con detalle como nace la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita con detalle como nace la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTiempoDedicacion}
                            name="objInfoEmprendimiento.strTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiempoDedicacionEmpresa
                                    label="Tiempo de dedicación actual a la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion?.message ||
                                        "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strSectorEconomico}
                            name="objInfoEmprendimiento.strSectorEconomico"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSectorEconomico
                                    label="Sector económico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strSectorEconomico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strSectorEconomico?.message ||
                                        "Selecciona el sector económico de la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el sector económico de la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCategoriaProducto}
                            name="objInfoEmprendimiento.strCategoriaProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCategoriaProducto
                                    label="Categoría de los productos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strCategoriaProducto",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmprendimiento.strCategoriaServicio",
                                            ""
                                        );
                                    }}
                                    disabled={
                                        data.strCategoriaServicio !== ""
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaProducto?.message ||
                                        "Selecciona la categoría de los productos"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCategoriaServicio}
                            name="objInfoEmprendimiento.strCategoriaServicio"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectCategoriaServicio
                                    label="Categoría de los servicios"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strCategoriaServicio",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmprendimiento.strCategoriaProducto",
                                            ""
                                        );
                                    }}
                                    disabled={
                                        data.strCategoriaProducto !== ""
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaServicio?.message ||
                                        "Selecciona la categoría de los servicios"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEmprendimiento.arrCategoriasSecundarias"
                            defaultValue={data.arrCategoriasSecundarias}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownCategoriasSecundarias
                                    label="Categorías alternas"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrCategoriasSecundarias
                                            ? true
                                            : false
                                    }
                                    multiple
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrCategoriasSecundarias
                                            ?.message ||
                                        "Selecciona las Categorías alternas en caso de que aplique"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strOtraCategoria}
                            name="objInfoEmprendimiento.strOtraCategoria"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otra categoría ¿cuál?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strOtraCategoria
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strOtraCategoria?.message ||
                                        "En caso de que aplique, digita cuál sería la otra categoría del producto o servicio"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strDescProductosServicios}
                            name="objInfoEmprendimiento.strDescProductosServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Describe los productos o servicios que ofrece"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    required
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDescProductosServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDescProductosServicios
                                            ?.message ||
                                        "Describe detalladamente los servicios que ofrece la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, describe detalladamente los servicios que ofrece la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strDefinineLineasProductoServicios
                            }
                            name="objInfoEmprendimiento.strDefinineLineasProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tiene definidas las líneas de productos/servicios del negocio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinineLineasProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinineLineasProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strLineaProductoServicioDestacada
                            }
                            name="objInfoEmprendimiento.strLineaProductoServicioDestacada"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuál es la línea de productos/servicios más destacada?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strLineaProductoServicioDestacada
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strLineaProductoServicioDestacada
                                            ?.message || "Digita tu respuesta"
                                    }
                                    multiline
                                    rows={4}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strProductoServiciosEnValidacion}
                            name="objInfoEmprendimiento.strProductoServiciosEnValidacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Cuenta con productos/servicios en validación?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductoServiciosEnValidacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductoServiciosEnValidacion
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strNivelDlloProductoServicios}
                            name="objInfoEmprendimiento.strNivelDlloProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Nivel de desarrollo del producto/servicio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strNivelDlloProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strNivelDlloProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="NivelDlloProductoServicio"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strEtapaValidProductoServicios}
                            name="objInfoEmprendimiento.strEtapaValidProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿En qué etapa de validación se encuentra el producto/servicio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strEtapaValidProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strEtapaValidProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="EtapaValidProductoServicios"
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

export default InfoEmprendimiento;
