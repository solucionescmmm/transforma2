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

import { DatePicker } from "@mui/lab";

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
import DropdownCategoriasSecundarias from "../../../../../Empresarios/components/dropdownCategoriasSecundarias";

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
        dtFechaInicioOperacion: null,
        strLugarOperacion: "",
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strDireccionResidencia: "",
        strEstrato: "",
        strCelular: "",
        strCorreoElectronico: "",
        btRedesSociales: "",
        arrMediosDigitales: [],
        btRegistroCamaraComercio: "",
        strTiempoDedicacion: "",
        strSectorEconomico: "",
        strCategoriaProducto: "",
        strCategoriaServicio: "",
        arrCategoriasSecundarias: [],
        strListadoProdServ: "",
        btGeneraEmpleo: "",
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
                dtFechaInicioOperacion: values.dtFechaInicioOperacion || null,
                strLugarOperacion: values.strLugarOperacion || "",
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
                strBarrio: values.strBarrio || "",
                strDireccionResidencia: values.strDireccionResidencia || "",
                strEstrato: values.strEstrato || "",
                strCelular: values.strCelular || "",
                strCorreoElectronico: values.strCorreoElectronico || "",
                btRedesSociales: values.btRedesSociales || "",
                arrMediosDigitales: values.arrMediosDigitales || [],
                btRegistroCamaraComercio: values.btRegistroCamaraComercio || "",
                strTiempoDedicacion: values.strTiempoDedicacion || "",
                strSectorEconomico: values.strSectorEconomico || "",
                strCategoriaProducto: values.strCategoriaProducto || "",
                strCategoriaServicio: values.strCategoriaServicio || "",
                arrCategoriasSecundarias: values.arrCategoriasSecundarias || [],
                strListadoProdServ: values.strListadoProdServ || "",
                btGeneraEmpleo: values.btGeneraEmpleo || "",
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
                            color: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
                        }}
                    >
                        Información del emprendimiento/unidad productiva/microempresa
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
                    borderColor: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
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
                                    label="Nombre de la unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strUnidadProductiva
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strUnidadProductiva
                                            ?.message ||
                                        "Digita el nombre de la unidad productiva"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre de la unidad productiva",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaInicioOperacion}
                            name="objInfoEmprendimiento.dtFechaInicioOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="¿En qué año inició la operación?"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            variant="standard"
                                            error={
                                                errors?.objInfoEmprendimiento
                                                    ?.dtFechaInicioOperacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEmprendimiento
                                                    ?.dtFechaInicioOperacion?.message ||
                                                "Fecha de la última vez que se actualizó el diagnóstico"
                                            }
                                            fullWidth
                                        />
                                    )}
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
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento?.strLugarOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strLugarOperacion
                                            ?.message ||
                                        "Selecciona el lugar donde opera la empresa"
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
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmprendimiento.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrDepartamento", value);
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrDepartamento
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
                            name="objInfoEmprendimiento.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
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
                                    strDepartamento={data.arrDepartamento?.region_name}
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
                                        data.strLugarOperacion === "Desde la vivienda"
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
                                        data.strLugarOperacion === "Desde la vivienda"
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
                                <TextField
                                    label="Ubicación de la UP (Urbana o Rural)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strUbicacionUP
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strUbicacionUP
                                            ?.message ||
                                        "Selecciona la ubicación de la UP (Urbana o Rural)"
                                    }
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
                            defaultValue={data.strEstrato}
                            name="objInfoEmprendimiento.strEstrato"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estrato socioeconómico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    select
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strEstrato
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strEstrato
                                            ?.message ||
                                        "Selecciona el estrato socioeconómico de la persona"
                                    }
                                >
                                    {(() => {
                                        let arrItem = [
                                            { value: 1 },
                                            { value: 2 },
                                            { value: 3 },
                                            { value: 4 },
                                            { value: 5 },
                                            { value: 6 },
                                            { value: "Rural" },
                                        ];

                                        return arrItem.map((e, i) => (
                                            <MenuItem key={i} value={e.value}>
                                                {e.value}
                                            </MenuItem>
                                        ));
                                    })()}
                                </TextField>
                            )}
                            control={control}
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
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento?.strCelular
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strCelular
                                            ?.message ||
                                        "Digita el número celular de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número celular de la empresa",
                                validate: (value) => {
                                    let strValue = value.replace(/\s/g, "");

                                    if (!validator.isMobilePhone(strValue, "es-CO")) {
                                        return "El número ingresado no corresponde a un operador válido en Colombia";
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
                            defaultValue={data.btRedesSociales}
                            name="objInfoEmprendimiento.btRedesSociales"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene presencia en redes sociales?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "btRedesSociales",
                                            e.target.value
                                        );
                                    }}
                                    select
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.btRedesSociales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.btRedesSociales
                                            ?.message ||
                                        "Selecciona si la empresa tiene presencia en redes sociales"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value="">
                                        <em>No aplica</em>
                                    </MenuItem>
                                </TextField>
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
                                    disabled={!data.btRedesSociales ? true : disabled}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrMediosDigitales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrMediosDigitales
                                            ?.message ||
                                        "Selecciona los medios digitales que utilice y coloque su ID"
                                    }
                                    required={data.btRedesSociales ? true : false}
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btRedesSociales) {
                                        if (value.length === 0) {
                                            return "Por favor, selecciona los medios digitales que utilice y coloque su ID";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btRegistroCamaraComercio}
                            name="objInfoEmprendimiento.btRegistroCamaraComercio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuenta con registro en cámara de comercio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.btRegistroCamaraComercio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.btRegistroCamaraComercio?.message ||
                                        "Selecciona si la empresa cuenta con registro en la cámara de comercio"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value="">
                                        <em>No aplica</em>
                                    </MenuItem>
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTiempoDedicacion}
                            name="objInfoEmprendimiento.strTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuánto tiempo dedica actualmente a la idea/ unidad productiva / empresa?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strTiempoDedicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strTiempoDedicacion
                                            ?.message ||
                                        "Selecciona cuanto tiempo dedica a la empresa"
                                    }
                                />
                            )}
                            control={control}
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
                                        errors?.objInfoEmprendimiento?.strSectorEconomico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strSectorEconomico
                                            ?.message ||
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
                                        data.strCategoriaServicio !== "" ? true : disabled
                                    }
                                    error={
                                        errors?.objInfoEmpresa?.strCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strCategoriaProducto
                                            ?.message ||
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
                                    onChange={(e, value) => {
                                        onChange(value);

                                        setValue(
                                            "objInfoEmprendimiento.strCategoriaProducto",
                                            ""
                                        );
                                    }}
                                    disabled={
                                        data.strCategoriaProducto !== "" ? true : disabled
                                    }
                                    error={
                                        errors?.objInfoEmpresa?.strCategoriaServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strCategoriaServicio
                                            ?.message ||
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
                                            ?.arrCategoriasSecundarias?.message ||
                                        "Selecciona las categorías secundarias en caso de que aplique"
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
                                        errors?.objInfoEmprendimiento?.strListadoProdServ
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strListadoProdServ
                                            ?.message ||
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
                                        errors?.objInfoEmprendimiento?.btGeneraEmpleo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.btGeneraEmpleo
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEmprendimiento;
