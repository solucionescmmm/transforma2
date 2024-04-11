import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

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
    MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import Dropzone from "../../../../common/components/dropzone";
import SelectLugarOperacion from "../../components/selectLugarOperacion";
import SelectSectorEconomico from "../../components/selectSectorEconomico";
import SelectCategoriaProducto from "../../components/selectCategoriaProducto";
import SelectCategoriaServicio from "../../components/selectCategoriaServicio";
import ModalMediosVetanProductos from "../../components/modalMediosVentaProductos";
import ModalMediosDigitales from "../../components/modalMediosDigitales";
import SelectTiempoDedicacionEmpresa from "../../components/selectTiempoDedicacionEmpresa";
import DropdownCategoriasSecundarias from "../../components/dropdownCategoriasSecundarias";
import SelectCuandoComienzaEmpresa from "../../components/selectCuandoComienzaEmpresa";
import ModalDireccionResidencia from "../../components/modalDireccionResidencia";
import DropdownRequisitosLey from "../../components/dropdownRequisitosLey";
import DropdownLocalizaciones from "../../components/dropdownLocalizaciones";

const InfoEmpresa = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    setError,
    clearErrors,
    isEdit,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strURLFileLogoEmpresa: null,
        strEstadoNegocio: "",
        strCuandoComienzaEmpresa: "",
        strNombreMarca: "",
        dtFechaFundacion: null,
        strLugarOperacion: "",
        strDireccionResidencia: "",
        arrPais: [],
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strSectorEconomico: "",
        strCategoriaProducto: "",
        strCategoriaServicio: "",
        arrCategoriasSecundarias: [],
        strOtraCategoria: "",
        strDescProductosServicios: "",
        strMateriaPrima: "",
        strNombreTecnica: "",
        strTiempoDedicacion: "",
        btGeneraEmpleo: "",
        intNumeroEmpleados: "",
        dblValorVentasMes: "",
        arrRequisitosLey: [],
        strOtrosRequisitosLey: "",
        arrFormasComercializacion: [],
        arrMediosDigitales: [],
        btGrupoAsociativo: "",
        strAsociacionUnidadProdIndividual: "",
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
        if (isEdit) {
            setOpenCollapse(true);
        }
    }, [isEdit]);

    useEffect(() => {
        if (values) {
            setData({
                intId: values.intId,
                strURLFileLogoEmpresa: values.strURLFileLogoEmpresa || null,
                strEstadoNegocio: values.strEstadoNegocio || "",
                strCuandoComienzaEmpresa: values.strCuandoComienzaEmpresa || "",
                strNombreMarca: values.strNombreMarca || "",
                dtFechaFundacion: values.dtFechaFundacion || null,
                strLugarOperacion: values.strLugarOperacion || "",
                strDireccionResidencia: values.strDireccionResidencia || "",
                arrPais: values.arrPais || [],
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
                strBarrio: values.strBarrio || "",
                strSectorEconomico: values.strSectorEconomico || "",
                strCategoriaProducto: values.strCategoriaProducto || "",
                strCategoriaServicio: values.strCategoriaServicio || "",
                arrCategoriasSecundarias: values.arrCategoriasSecundarias || [],
                strOtraCategoria: values.strOtraCategoria || "",
                strDescProductosServicios:
                    values.strDescProductosServicios || "",
                strMateriaPrima: values.strMateriaPrima || "",
                strNombreTecnica: values.strNombreTecnica || "",
                strTiempoDedicacion: values.strTiempoDedicacion || "",
                btGeneraEmpleo:
                    typeof values.btGeneraEmpleo === "boolean"
                        ? values.btGeneraEmpleo
                        : "",
                intNumeroEmpleados: values.intNumeroEmpleados || "",
                dblValorVentasMes: values.valorVentasMes || "",
                arrRequisitosLey: values.arrRequisitosLey || [],
                strOtrosRequisitosLey: values.strOtrosRequisitosLey || "",
                arrFormasComercializacion:
                    values.arrFormasComercializacion || [],
                arrMediosDigitales: values.arrMediosDigitales || [],
                btGrupoAsociativo:
                    typeof values.btGrupoAsociativo === "boolean"
                        ? values.btGrupoAsociativo
                        : "",
                strAsociacionUnidadProdIndividual:
                    values.strAsociacionUnidadProdIndividual || "",
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
                            color: errors?.objInfoEmpresa
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
                    borderColor: errors?.objInfoEmpresa ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strURLFileLogoEmpresa}
                            name="objInfoEmpresa.strURLFileLogoEmpresa"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Logo de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    maxFiles={1}
                                    type="Imagen"
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strURLFileLogoEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strURLFileLogoEmpresa?.message ||
                                        "Selecciona el logo de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstadoNegocio}
                            name="objInfoEmpresa.strEstadoNegocio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estado del negocio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strEstadoNegocio",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmpresa.strCuandoComienzaEmpresa",
                                            ""
                                        );

                                        setValue(
                                            "objInfoEmpresa.dtFechaFundacion",
                                            null
                                        );

                                        setValue(
                                            "objInfoEmpresa.btGeneraEmpleo",
                                            ""
                                        );

                                        setValue(
                                            "objInfoEmpresa.intNumeroEmpleados",
                                            ""
                                        );

                                        setValue(
                                            "objInfoEmpresa.dblValorVentasMes",
                                            0
                                        );
                                    }}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmpresa?.strEstadoNegocio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.strEstadoNegocio?.message ||
                                        "Selecciona una opción"
                                    }
                                >
                                    <MenuItem value="Idea de negocio">
                                        Idea de negocio
                                    </MenuItem>
                                    <MenuItem value="Negocio con ventas realizadas">
                                        Negocio con ventas realizadas
                                    </MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona una opción";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCuandoComienzaEmpresa}
                            name="objInfoEmpresa.strCuandoComienzaEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCuandoComienzaEmpresa
                                    label="Si aún no ha comenzado su empresa ¿Cuándo planea comenzar?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={
                                        data.strEstadoNegocio ===
                                        "Negocio con ventas realizadas"
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strCuandoComienzaEmpresa
                                            ? true
                                            : false
                                    }
                                    required={
                                        data.strEstadoNegocio ===
                                        "Idea de negocio"
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strCuandoComienzaEmpresa
                                            ?.message || "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        data.strEstadoNegocio === "" &&
                                        !value
                                    ) {
                                        return "Por favor, selecciona una opción";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombreMarca}
                            name="objInfoEmpresa.strNombreMarca"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strNombreMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strNombreMarca
                                            ?.message ||
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
                            defaultValue={data.dtFechaFundacion}
                            name="objInfoEmpresa.dtFechaFundacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de fundación"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    format="dd/MM/yyyy"
                                    disabled={
                                        data.strEstadoNegocio ===
                                        "Idea de negocio"
                                            ? true
                                            : disabled
                                    }
                                    slotProps={{
                                        textField: {
                                            name,
                                            variant: "standard",
                                            error: !!errors?.objInfoEmpresa
                                                ?.dtFechaFundacion,
                                            helperText:
                                                errors?.objInfoEmpresa
                                                    ?.dtFechaFundacion
                                                    ?.message ||
                                                "Selecciona la fecha de fundación",
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
                            name="objInfoEmpresa.strLugarOperacion"
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
                                            "objInfoEmpresa.strDireccionResidencia",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmpresa.arrPais",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmpresa.arrDepartamento",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmpresa.arrCiudad",
                                            ""
                                        );
                                        setValue(
                                            "objInfoEmpresa.strBarrio",
                                            ""
                                        );
                                    }}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strLugarOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strLugarOperacion?.message ||
                                        "Selecciona el lugar dónde opera la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el lugar donde opera la unidad productiva de la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrPais}
                            name="objInfoEmpresa.arrPais"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Pais"
                                    strCodigo="paises"
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
                                        handlerChangeData(
                                            "arrPais",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.arrPais
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.arrPais?.message ||
                                        "Selecciona el pais de residencia"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmpresa.arrDepartamento"
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
                                        errors?.objInfoEmpresa?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    strPais={
                                        data.arrPais?.country_name
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.arrDepartamento
                                            ?.message ||
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
                            name="objInfoEmpresa.arrCiudad"
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
                                        errors?.objInfoEmpresa?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={
                                        data.arrDepartamento?.region_name
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.arrCiudad
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
                            name="objInfoEmpresa.strBarrio"
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
                                        errors?.objInfoEmpresa?.strBarrio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strBarrio
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
                            name="objInfoEmpresa.strDireccionResidencia"
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
                                        errors?.objInfoEmpresa
                                            ?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    strPais={
                                        data.arrPais?.country_name
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                            defaultValue={data.strSectorEconomico}
                            name="objInfoEmpresa.strSectorEconomico"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSectorEconomico
                                    label="Sector económico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strSectorEconomico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                            name="objInfoEmpresa.strCategoriaProducto"
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
                                            "objInfoEmpresa.strCategoriaServicio",
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
                            name="objInfoEmpresa.strCategoriaServicio"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectCategoriaServicio
                                    label="Categoría de los servicios"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        setValue(
                                            "objInfoEmpresa.strCategoriaProducto",
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
                            name="objInfoEmpresa.arrCategoriasSecundarias"
                            defaultValue={data.arrCategoriasSecundarias}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownCategoriasSecundarias
                                    label="Categorías secundarias"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.arrCategoriasSecundarias
                                            ? true
                                            : false
                                    }
                                    multiple
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.arrCategoriasSecundarias
                                            ?.message ||
                                        "Selecciona las categorías secundarias en caso de que aplique"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strDescProductosServicios}
                            name="objInfoEmpresa.strDescProductosServicios"
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
                                        errors?.objInfoEmpresa
                                            ?.strDescProductosServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                            defaultValue={data.strMateriaPrima}
                            name="objInfoEmpresa.strMateriaPrima"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Materias primas utilizadas"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmpresa?.strMateriaPrima
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strMateriaPrima
                                            ?.message ||
                                        "Describe detalladamente las materias primas utilizadas"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strNombreTecnica}
                            name="objInfoEmpresa.strNombreTecnica"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la técnica utilizada"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmpresa?.strNombreTecnica
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strNombreTecnica
                                            ?.message ||
                                        "Describe detalladamente la técnica que utiliza"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTiempoDedicacion}
                            name="objInfoEmpresa.strTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiempoDedicacionEmpresa
                                    label="Tiempo de dedicación actual a la idea o negocio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strTiempoDedicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
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
                            defaultValue={data.btGeneraEmpleo}
                            name="objInfoEmpresa.btGeneraEmpleo"
                            disabled={data.strEstadoNegocio ==="Idea de negocio"? true: disabled}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo para otras personas?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlerChangeData(
                                            "btGeneraEmpleo",
                                            e.target.value
                                        );
                                        setValue(
                                            "objInfoEmpresa.intNumeroEmpleados",
                                            ""
                                        );
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={
                                        data.strEstadoNegocio ===
                                        "Idea de negocio"
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmpresa?.btGeneraEmpleo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.btGeneraEmpleo
                                            ?.message ||
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

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intNumeroEmpleados}
                            name="objInfoEmpresa.intNumeroEmpleados"
                            disabled={data.strEstadoNegocio ==="Idea de negocio"? true: disabled}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de empleos generados"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    disabled={
                                        !data.btGeneraEmpleo ? true :
                                            data.strEstadoNegocio ===
                                                "Idea de negocio"
                                                    ? true
                                                    : disabled
                                    }
                                    required={
                                        data.btGeneraEmpleo ? true : false
                                    }
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.intNumeroEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.intNumeroEmpleados?.message ||
                                        "Digita la cantidad de empleos generados"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btGeneraEmpleo) {
                                        if (
                                            value === "" ||
                                            value === undefined
                                        ) {
                                            return "Por favor, digita la cantidad de empleos generados";
                                        }

                                        let intNumeroEmpleados =
                                            parseInt(value);

                                        if (intNumeroEmpleados < 1) {
                                            return "La cantidad de empleados no pueden ser inferiores a 1";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dblValorVentasMes}
                            name="objInfoEmpresa.dblValorVentasMes"
                            disabled={data.strEstadoNegocio ==="Idea de negocio"? true: disabled}
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor promedio de las ventas mensuales"
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
                                    disabled={
                                        data.strEstadoNegocio ===
                                        "Idea de negocio"
                                            ? true
                                            : disabled
                                    }
                                    required
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.dblValorVentasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.dblValorVentasMes?.message ||
                                        "Digita la cantidad promedio de las ventas mensuales"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita la cantidad promedio de las ventas mensuales",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrRequisitosLey}
                            name="objInfoEmpresa.arrRequisitosLey"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRequisitosLey
                                    label="Requerimientos legales que cumple"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.arrRequisitosLey
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.arrRequisitosLey
                                            ?.message ||
                                        "Selecciona los requerimientos legales que cumple actualmente"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtrosRequisitosLey}
                            name="objInfoEmpresa.strOtrosRequisitosLey"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otros requerimientos legales"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strOtrosRequisitosLey
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strOtrosRequisitosLey?.message ||
                                        "Digita en caso de cumplir otros requerimientos legales"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrFormasComercializacion}
                            name="objInfoEmpresa.arrFormasComercializacion"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosVetanProductos
                                    label="Formas de comercialización"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.arrFormasComercializacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.arrFormasComercializacion
                                            ?.message ||
                                        "Selecciona los medios que utilice para la venta de sus productos o servicios"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDigitales}
                            name="objInfoEmpresa.arrMediosDigitales"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosDigitales
                                    label="Medios digitales"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.arrMediosDigitales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.arrMediosDigitales?.message ||
                                        "Selecciona los medios digitales que utilice y registre su ID"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGrupoAsociativo}
                            name="objInfoEmpresa.btGrupoAsociativo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Pertenece algún grupo asociativo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "btGrupoAsociativo",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmpresa.strAsociacionUnidadProdIndividual",
                                            ""
                                        );
                                    }}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.btGrupoAsociativo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.btGrupoAsociativo?.message ||
                                        "Selecciona una opción"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={
                                data.strAsociacionUnidadProdIndividual
                            }
                            name="objInfoEmpresa.strAsociacionUnidadProdIndividual"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cómo desea registrarse?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={
                                        !data?.btGrupoAsociativo
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strAsociacionUnidadProdIndividual
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strAsociacionUnidadProdIndividual
                                            ?.message || "Selecciona una opción"
                                    }
                                    required={
                                        data?.btGrupoAsociativo ? true : false
                                    }
                                >
                                    <MenuItem value="Asociación">
                                        Asociación
                                    </MenuItem>
                                    <MenuItem value="Empresa independiente">
                                        Empresa independiente
                                    </MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        data.btGrupoAsociativo === true &&
                                        (value === "" || value === undefined)
                                    ) {
                                        return "Por favor, selecciona una opción";
                                    }
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEmpresa;
