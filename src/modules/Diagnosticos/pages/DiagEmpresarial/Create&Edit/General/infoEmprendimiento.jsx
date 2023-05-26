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
    MenuItem,
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
import ModalMediosDigitales from "../../../../../Empresarios/components/modalMediosDigitales";
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
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strDireccionResidencia: "",
        strCelular: "",
        strCorreoElectronico: "",
        strRedesSociales: "",
        arrMediosDigitales: [],
        strRegistroCamaraComercio: "",
        strTiempoDedicacion: "",
        strSectorEconomico: "",
        strCategoriaProducto: "",
        strCategoriaServicio: "",
        arrCategoriasSecundarias: [],
        strOtraCategoria: "",
        strListadoProdServ: "",
        btGeneraEmpleo: "",
        strDefinineLineasProductoServicios: "",
        strLineaProductoServicioDestacada: "",
        strProductoServiciosEnValidacion: "",
        strNivelDlloProductoServicios: "",
        strEtapaValidProductoServicios: "",
        MinimoValorProducto: "",
        MaximoValorProducto: "",
        intCantidadUnidadesProducidasMes: "",
        strEscojaProductoServicio: "",
        ValorVentaProductoEscogido: "",
        strConoceMargenRentaProductoEscogido: "",
        intPorcentajeMargenRentaProductoEscogido: "",
        strConoceCostosProductoEscogido: "",
        CostoProduccionProductoEscogido: "",
        strPorcentajeIntermediacionVentas: "",
        strDefinePorcentajesCanal: "",
        intRangoPorcentajeIntermediacionVentas: "",
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
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
                strBarrio: values.strBarrio || "",
                strDireccionResidencia: values.strDireccionResidencia || "",
                strCelular: values.strCelular || "",
                strCorreoElectronico: values.strCorreoElectronico || "",
                strRedesSociales: values.strRedesSociales || "",
                arrMediosDigitales: values.arrMediosDigitales || [],
                strRegistroCamaraComercio:
                    values.strRegistroCamaraComercio || "",
                strTiempoDedicacion: values.strTiempoDedicacion || "",
                strSectorEconomico: values.strSectorEconomico || "",
                strCategoriaProducto: values.strCategoriaProducto || "",
                strCategoriaServicio: values.strCategoriaServicio || "",
                arrCategoriasSecundarias: values.arrCategoriasSecundarias || [],
                strListadoProdServ: values.strListadoProdServ || "",
                btGeneraEmpleo: values.btGeneraEmpleo || "",
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
                strEscojaProductoServicio:
                    values.strEscojaProductoServicio || "",
                ValorVentaProductoEscogido:
                    values.ValorVentaProductoEscogido || "",
                strConoceMargenRentaProductoEscogido:
                    values.strConoceMargenRentaProductoEscogido || "",
                intPorcentajeMargenRentaProductoEscogido:
                    values.intPorcentajeMargenRentaProductoEscogido || "",
                strConoceCostosProductoEscogido:
                    values.strConoceCostosProductoEscogido || "",
                CostoProduccionProductoEscogido:
                    values.CostoProduccionProductoEscogido || "",
                strPorcentajeIntermediacionVentas:
                    values.strPorcentajeIntermediacionVentas || "",
                strDefinePorcentajesCanal:
                    values.strDefinePorcentajesCanal || "",
                intRangoPorcentajeIntermediacionVentas:
                    values.intRangoPorcentajeIntermediacionVentas || "",
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
                        Información del emprendimiento
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
                                    disabled
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
                                                "Fecha de la última vez que se actualizó el diagnóstico",
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
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrDepartamento?.message ||
                                        "Selecciona el departamento de la empresa"
                                    }
                                />
                            )}
                            control={control}
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
                                        "Selecciona la ubicación de la UP (Urbana o Rural)"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="UbicacionViviendaEmpresa"
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la ubicación de la UP (Urbana o Rural)",
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
                            defaultValue={data.strRedesSociales}
                            name="objInfoEmprendimiento.strRedesSociales"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tiene presencia en redes sociales?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strRedesSociales",
                                            e.target.value
                                        );
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strRedesSociales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strRedesSociales?.message ||
                                        "Selecciona si la empresa tiene presencia en redes sociales"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDigitales}
                            name="objInfoEmprendimiento.arrMediosDigitales"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosDigitales
                                    label="Medios digitales"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={
                                        data.strRedesSociales === "NO"
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrMediosDigitales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrMediosDigitales?.message ||
                                        "Selecciona los medios digitales que utilice y coloque su ID"
                                    }
                                    required={
                                        data.strRedesSociales ? true : false
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.strRedesSociales === "SI") {
                                        if (value.length === 0) {
                                            return "Por favor, selecciona los medios digitales que utilice y coloque su ID";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
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
                                            ?.message ||
                                        "Selecciona si la empresa cuenta con registro en la cámara de comercio"
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
                                        errors?.objInfoEmpresa
                                            ?.strCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                                        errors?.objInfoEmpresa
                                            ?.strCategoriaServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                                    label="Categorías secundarias"
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
                                        "Selecciona las categorías secundarias en caso de que aplique"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strOtraCategoria}
                            name="objInfoEmpresa.strOtraCategoria"
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
                                        errors?.objInfoEmpresa?.strOtraCategoria
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strOtraCategoria
                                            ?.message ||
                                        "En caso de que aplique, digita cuál sería la otra categoría del producto o servicio"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strListadoProdServ}
                            name="objInfoEmprendimiento.strListadoProdServ"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Listado de los productos o servicios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strListadoProdServ
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strListadoProdServ?.message ||
                                        "Digita los productos o servicios que ofrece la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGeneraEmpleo}
                            name="objInfoEmprendimiento.btGeneraEmpleo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo para otras personas?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.btGeneraEmpleo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.btGeneraEmpleo?.message ||
                                        "Selecciona si la empresa genera empleo o no"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa genera empleo o no";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strDefinineLineasProductoServicios
                            }
                            name="objInfoEmpresa.strDefinineLineasProductoServicios"
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
                                        errors?.objInfoEmpresa
                                            ?.strDefinineLineasProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.MinimoValorProducto}
                            name="objInfoEmprendimiento.MinimoValorProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Rango de precios de productos mínimo"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.MinimoValorProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.MinimoValorProducto?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.MaximoValorProducto}
                            name="objInfoEmprendimiento.MaximoValorProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Rango de precios de productos máximo"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.MaximoValorProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.MaximoValorProducto?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intCantidadUnidadesProducidasMes}
                            name="objInfoEmprendimiento.intCantidadUnidadesProducidasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Cantidad de unidades producidas al mes actualmente"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.intCantidadUnidadesProducidasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.intCantidadUnidadesProducidasMes
                                            ?.message || "Digita tu respuesta"
                                    }
                                    type="number"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEscojaProductoServicio}
                            name="objInfoEmprendimiento.strEscojaProductoServicio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Escoja uno de los productos/servicios de su empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strEscojaProductoServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strEscojaProductoServicio
                                            ?.message || "Digita tu respuesta"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.ValorVentaProductoEscogido}
                            name="objInfoEmprendimiento.ValorVentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="De acuerdo con el producto/servicio escogido ¿Cuál es el precio de venta de este?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.ValorVentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.ValorVentaProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strConoceMargenRentaProductoEscogido
                            }
                            name="objInfoEmprendimiento.strConoceMargenRentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Del producto escogido ¿Tiene conocimiento de cuál es el margen de rentabilidad?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strConoceMargenRentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strConoceMargenRentaProductoEscogido
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
                                data.intPorcentajeMargenRentaProductoEscogido
                            }
                            name="objInfoEmprendimiento.intPorcentajeMargenRentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿Cuál es el margen de utilidad de este producto?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"%"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.intPorcentajeMargenRentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.intPorcentajeMargenRentaProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strConoceCostosProductoEscogido}
                            name="objInfoEmprendimiento.strConoceCostosProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Conoce los costos de producción de este producto?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strConoceCostosProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strConoceCostosProductoEscogido
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
                            defaultValue={data.CostoProduccionProductoEscogido}
                            name="objInfoEmprendimiento.CostoProduccionProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿Cuáles son los costos de producción asociados a este producto?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.CostoProduccionProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.CostoProduccionProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strPorcentajeIntermediacionVentas
                            }
                            name="objInfoEmprendimiento.strPorcentajeIntermediacionVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Tiene porcentaje(s) estimados para la intermediación en ventas?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strPorcentajeIntermediacionVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strPorcentajeIntermediacionVentas
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
                            defaultValue={data.strDefinePorcentajesCanal}
                            name="objInfoEmprendimiento.strDefinePorcentajesCanal"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿tiene definido este porcentaje, de acuerdo con cada canal?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinePorcentajesCanal
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinePorcentajesCanal
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
                                data.intRangoPorcentajeIntermediacionVentas
                            }
                            name="objInfoEmprendimiento.intRangoPorcentajeIntermediacionVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="¿De cuánto es el rango o porcentaje definido?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"%"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.intRangoPorcentajeIntermediacionVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.intRangoPorcentajeIntermediacionVentas
                                            ?.message || "Digita la cantidad"
                                    }
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
