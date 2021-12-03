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
    CircularProgress,
    TextField,
    MenuItem,
} from "@mui/material";

import { DateTimePicker, DatePicker } from "@mui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectTipoDocumento from "../../../../../Empresarios/components/selectTipoDocumento";
import SelectGenero from "../../../../../Empresarios/components/selectGenero";
import SelectNivelEducativo from "../../../../../Empresarios/components/selectNivelEducativo";
import ModalDireccionResidencia from "../../../../../Empresarios/components/modalDireccionResidencia";
import DropdownLocalizaciones from "../../../../../Empresarios/components/dropdownLocalizaciones";

const InfoGeneral = ({
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
        dtmFechaSesion: null,
        strLugarSesion: "",
        strUsuarioCreacion: "",
        dtActualizacion: null,
        strUsuarioActualizacion: "",
        strNombres: "",
        strApellidos: "",
        strTipoDocto: "",
        strNroDocto: "",
        strLugarExpedicionDocto: "",
        dtFechaExpedicionDocto: null,
        dtFechaNacimiento: null,
        strGenero: "",
        strNivelEducativo: "",
        strTitulos: "",
        strEstrato: "",
        arrDepartamento: [],
        arrCiudad: [],
        strDireccionResidencia: "",
        strBarrio: "",
        strUbicacionVivienda: "",
        strCelular1: "",
        strCelular2: "",
        strCorreoElectronico1: "",
        strCorreoElectronico2: "",
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
                intId: values.intId || null,
                dtmFechaSesion: values.dtmFechaSesion || null,
                strLugarSesion: values.strLugarSesion || "",
                strUsuarioCreacion: values.strUsuarioCreacion || "",
                dtActualizacion: values.dtActualizacion || null,
                strUsuarioActualizacion: values.strUsuarioActualizacion || "",
                strNombres: values.strNombres || "",
                strApellidos: values.strApellidos || "",
                strTipoDocto: values.strTipoDocto || "",
                strNroDocto: values.strNroDocto || "",
                strLugarExpedicionDocto: values.strLugarExpedicionDocto || "",
                dtFechaExpedicionDocto: values.dtFechaExpedicionDocto || null,
                dtFechaNacimiento: values.dtFechaNacimiento || null,
                strGenero: values.strGenero || "",
                strNivelEducativo: values.strNivelEducativo || "",
                strTitulos: values.strTitulos || "",
                strEstrato: values.strEstrato || "",
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
                strDireccionResidencia: values.strDireccionResidencia || "",
                strBarrio: values.strBarrio || "",
                strUbicacionVivienda: values.strUbicacionVivienda || "",
                strCelular1: values.strCelular1 || "",
                strCelular2: values.strCelular2 || "",
                strCorreoElectronico1: values.strCorreoElectronico1 || "",
                strCorreoElectronico2: values.strCorreoElectronico2 || "",
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
                            color: errors?.objInfoGeneral ? "#D33030" : "inherit",
                        }}
                    >
                        Información general
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
                    borderColor: errors?.objInfoGeneral ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.dtmFechaSesion}
                            name="objInfoGeneral.dtmFechaSesion"
                            render={({ field: { name, value, onChange } }) => (
                                <DateTimePicker
                                    label="Fecha y hora de la sesión"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled={disabled}
                                    ampm
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            variant="standard"
                                            required
                                            error={
                                                errors?.objInfoGeneral?.dtmFechaSesion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoGeneral?.dtmFechaSesion
                                                    ?.message ||
                                                "Selecciona la fecha y hora de la sesión"
                                            }
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la fecha y hora de la sesión",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strLugarSesion}
                            name="objInfoGeneral.strLugarSesion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Lugar de la sesión"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strLugarSesion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strLugarSesion?.message ||
                                        "Digita el lugar donde se realizo la sesión"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el lugar donde se realizo la sesión",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.dtActualizacion}
                            name="objInfoGeneral.dtActualizacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de ultima actualización"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            variant="standard"
                                            error={
                                                errors?.objInfoGeneral?.dtActualizacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoGeneral?.dtActualizacion
                                                    ?.message ||
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
                            defaultValue={data.strUsuarioCreacion}
                            name="objInfoGeneral.strUsuarioCreacion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Responsable del diagnóstico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strUsuarioCreacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strUsuarioCreacion
                                            ?.message ||
                                        "Seleccione el responsable del diagnóstico"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, seleccione el responsable del diagnóstico",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUsuarioActualizacion}
                            name="objInfoGeneral.strUsuarioActualizacion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Responsable de actualizar la información"
                                    name={name}
                                    value={value}
                                    disabled
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strUsuarioActualizacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strUsuarioActualizacion?.message ||
                                        "Persona que estuvo encargada de actualizar la información del diagnóstico en la última fecha"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombres}
                            name="objInfoGeneral.strNombres"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombres"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strNombres ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strNombres?.message ||
                                        "Digíta el nombre o nombres de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta el nombre o nombres de la persona",

                                validate: (value) => {
                                    if (
                                        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                            value
                                        )
                                    ) {
                                        return "El nombre no debe contener números ni caracteres especiales";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strApellidos}
                            name="objInfoGeneral.strApellidos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Apellidos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strApellidos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strApellidos?.message ||
                                        "Digíta los apellidos de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digíta los apellidos de la persona",
                                validate: (value) => {
                                    if (
                                        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                            value
                                        )
                                    ) {
                                        return "Los apellidos no deben contener números ni caracteres especiales";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTipoDocto}
                            name="objInfoGeneral.strTipoDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTipoDocumento
                                    label="Tipo de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoGeneral?.strTipoDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strTipoDocto?.message ||
                                        "Selecciona el tipo de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona el tipo de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNroDocto}
                            name="objInfoGeneral.strNroDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strNroDocto ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strNroDocto?.message ||
                                        "Digita el número de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita el número de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarExpedicionDocto}
                            name="objInfoGeneral.strLugarExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Lugar de expedición del documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strLugarExpedicionDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strLugarExpedicionDocto
                                            ?.message ||
                                        "Digita el lugar de expedición del documento"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaExpedicionDocto}
                            name="objInfoGeneral.dtFechaExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de expedición del documento"
                                    value={value}
                                    disabled={disabled}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.objInfoGeneral
                                                    ?.dtFechaExpedicionDocto
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoGeneral
                                                    ?.dtFechaExpedicionDocto?.message ||
                                                "Selecciona la fecha de expedición del documento"
                                            }
                                        />
                                    )}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaNacimiento}
                            name="objInfoGeneral.dtFechaNacimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de nacimiento"
                                    value={value}
                                    disabled={disabled}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.objInfoGeneral?.dtFechaNacimiento
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoGeneral?.dtFechaNacimiento
                                                    ?.message ||
                                                "Selecciona la fecha de nacimiento"
                                            }
                                        />
                                    )}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strGenero}
                            name="objInfoGeneral.strGenero"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectGenero
                                    label="Género"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoGeneral?.strGenero ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strGenero?.message ||
                                        "Selecciona el género de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona el género de la persona",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNivelEducativo}
                            name="objInfoGeneral.strNivelEducativo"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectNivelEducativo
                                    label="Nivel educativo"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoGeneral?.strNivelEducativo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strNivelEducativo
                                            ?.message ||
                                        "Selecciona el nivel educativo de la persona"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTitulos}
                            name="objInfoGeneral.strTitulos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Título(s)"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strTitulos ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strTitulos?.message ||
                                        "Digita los títulos o título del empresario, en caso de poseer alguno"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstrato}
                            name="objInfoGeneral.strEstrato"
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
                                        errors?.objInfoGeneral?.strEstrato ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strEstrato?.message ||
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
                            defaultValue={data.arrDepartamento}
                            name="objInfoGeneral.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrDepartamento", value);
                                    }}
                                    error={
                                        errors?.objInfoGeneral?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.arrDepartamento
                                            ?.message ||
                                        "Selecciona el departamento de residencia"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrCiudad}
                            name="objInfoGeneral.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrCiudad", value);
                                    }}
                                    error={
                                        errors?.objInfoGeneral?.arrCiudad ? true : false
                                    }
                                    strDepartamento={data.arrDepartamento?.region_name}
                                    helperText={
                                        errors?.objInfoGeneral?.arrCiudad?.message ||
                                        "Selecciona la ciudad de residencia"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strDireccionResidencia}
                            name="objInfoGeneral.strDireccionResidencia"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalDireccionResidencia
                                    label="Dirección de residencia"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strDireccionResidencia
                                            ?.message ||
                                        "Digita la dirección de residencia de la persona"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strBarrio}
                            name="objInfoGeneral.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoGeneral?.strBarrio ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strBarrio?.message ||
                                        "Selecciona el barrio/corregimiento/vereda de residencia"
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
                            defaultValue={data.strUbicacionVivienda}
                            name="objInfoGeneral.strUbicacionVivienda"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Ubicación de la vivienda"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strUbicacionVivienda
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strUbicacionVivienda
                                            ?.message ||
                                        "Seleccione la ubicación de la vivienda"
                                    }
                                    select
                                >
                                    <MenuItem value="">No aplica</MenuItem>
                                    <MenuItem value="Urbano">Urbano</MenuItem>
                                    <MenuItem value="Rural">Rural</MenuItem>
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular1}
                            name="objInfoGeneral.strCelular1"
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
                                        errors?.objInfoGeneral?.strCelular1 ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strCelular1?.message ||
                                        "Digita el número celular de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número celular de la persona",
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
                            defaultValue={data.strCelular2}
                            name="objInfoGeneral.strCelular2"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    format="### ### ####"
                                    value={value}
                                    customInput={TextField}
                                    name={name}
                                    onChange={(e) => onChange(e)}
                                    label="Celular alterno"
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoGeneral?.strCelular2 ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strCelular2?.message ||
                                        "Digita el número celular de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value) {
                                        let strValue = value.replace(/\s/g, "");

                                        if (!validator.isMobilePhone(strValue, "es-CO")) {
                                            return "El número ingresado no corresponde a un operador válido en Colombia";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCorreoElectronico1}
                            name="objInfoGeneral.strCorreoElectronico1"
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
                                        errors?.objInfoGeneral?.strCorreoElectronico1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strCorreoElectronico1
                                            ?.message ||
                                        "Digita el correo electrónico de la persona"
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
                            defaultValue={data.strCorreoElectronico2}
                            name="objInfoGeneral.strCorreoElectronico2"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico alterno"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoGeneral?.strCorreoElectronico2
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strCorreoElectronico2
                                            ?.message ||
                                        "Digita el correo electrónico alterno de la persona"
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoGeneral;
