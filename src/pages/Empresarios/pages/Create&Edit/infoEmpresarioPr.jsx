import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import validator from "validator";

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
} from "@material-ui/core";

import NumberFormat from "react-number-format";

import { DatePicker } from "@material-ui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

//Componentes
import SelectTipoDocumento from "../../components/selectTipoDocumento";
import SelectSexo from "../../components/selectSexo";
import SelectNivelEducativo from "../../components/selectNivelEducativo";
import SelectTiposDiscapacidad from "../../components/selectTipoDiscapacidad";
import Dropzone from "../../../../common/components/dropzone";

const InformacionEmpresarioPr = ({ disabled, values, errors, control, setError }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strNombres: "",
        strApellidos: "",
        intIdTipoDocto: "",
        strNroDocto: "",
        strLugarExpedicionDocto: "",
        dtFechaExpedicionDocto: null,
        dtFechaNacimiento: null,
        intIdSexo: "",
        strCelular: "",
        strCorreoElectronico: "",
        intIdNivelEducativo: "",
        intIdCondicionDiscapacidad: "",
        strTitulos: "",
        fileFoto: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strNombres: values.strNombres || "",
                strApellidos: values.strApellidos || "",
                intIdTipoDocto: values.intIdTipoDocto || "",
                strNroDocto: values.strNroDocto || "",
                strLugarExpedicionDocto: values.strLugarExpedicionDocto || "",
                dtFechaExpedicionDocto: values.dtFechaExpedicionDocto || null,
                dtFechaNacimiento: values.dtFechaNacimiento || null,
                intIdSexo: values.intIdSexo || null,
                strCelular: values.strCelular || "",
                strCorreoElectronico: values.strCorreoElectronico || "",
                intIdNivelEducativo: values.intIdNivelEducativo || "",
                intIdCondicionDiscapacidad: values.intIdCondicionDiscapacidad || "",
                strTitulos: values.strTitulos || "",
                fileFoto: values.fileFoto || "",
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
                    <Typography style={{ fontWeight: "bold" }}>
                        Información del empresario principal
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()}>
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

            <hr />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombres}
                            name="strNombres"
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
                                    error={errors?.strNombres ? true : false}
                                    helperText={
                                        errors?.strNombres?.message ||
                                        "Digíta el nombre del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digíta el nombre del empresario.",
                                validate: (value) => {
                                    if (!validator.isAlpha(value)) {
                                        return "El nombre no debe contener números ni caracteres especiales.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strApellidos}
                            name="strApellidos"
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
                                    error={errors?.strApellidos ? true : false}
                                    helperText={
                                        errors?.strApellidos?.message ||
                                        "Digíta los apellidos del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta los apellidos del empresario.",
                                validate: (value) => {
                                    if (!/^[a-z ,.'-]+$/i.test(value)) {
                                        return "Los apellidos no deben contener números ni caracteres especiales.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdTipoDocto}
                            name="intIdTipoDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTipoDocumento
                                    label="Tipo de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    error={errors?.intIdTipoDocto ? true : false}
                                    helperText={
                                        errors?.intIdTipoDocto?.message ||
                                        "Selecciona el tipo de documento."
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
                            name="strNroDocto"
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
                                    error={errors?.strNroDocto ? true : false}
                                    helperText={
                                        errors?.strNroDocto?.message ||
                                        "Digita el número de documento del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número de documento del empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarExpedicionDocto}
                            name="strLugarExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Lugar de expredición del documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.strLugarExpedicionDocto ? true : false}
                                    helperText={
                                        errors?.strLugarExpedicionDocto?.message ||
                                        "Digita el lugar de expedición del documento del empresario."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaExpedicionDocto}
                            name="dtFechaExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de expedición del documento"
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.dtFechaExpedicionDocto
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.dtFechaExpedicionDocto?.message ||
                                                "Selecciona la fecha de expedición del documento del empresario."
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
                            name="dtFechaNacimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de nacimiento"
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.dtFechaNacimiento ? true : false
                                            }
                                            helperText={
                                                errors?.dtFechaNacimiento?.message ||
                                                "Selecciona la fecha de expedición del documento del empresario."
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
                            defaultValue={data.intIdSexo}
                            name="intIdSexo"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSexo
                                    label="Sexo del empresario"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={errors?.intIdSexo ? true : false}
                                    helperText={
                                        errors?.intIdSexo?.message ||
                                        "Selecciona el sexo del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona el sexo del empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular}
                            name="strCelular"
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
                                    error={errors?.strCelular ? true : false}
                                    helperText={
                                        errors?.strCelular?.message ||
                                        "Digita el número celular del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número celular del empresario.",
                                validate: (value) => {
                                    let strValue = value.replace(/\s/g, "");

                                    if (!validator.isMobilePhone(strValue, "es-CO")) {
                                        return "El número ingresado no corresponde a un operador válido en Colombia.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCorreoElectronico}
                            name="strCorreoElectronico"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={errors?.strCorreoElectronico ? true : false}
                                    helperText={
                                        errors?.strCorreoElectronico?.message ||
                                        "Digita el correo electrónico del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value) {
                                        if (!validator.isEmail(value)) {
                                            return "El valor ingresado no corresponde a un correo electrónico válido.";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdNivelEducativo}
                            name="intIdNivelEducativo"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectNivelEducativo
                                    label="Nivel educativo"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={errors?.intIdNivelEducativo ? true : false}
                                    helperText={
                                        errors?.intIdNivelEducativo?.message ||
                                        "Selecciona el nivel educativo del empresario."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdCondicionDiscapacidad}
                            name="intIdCondicionDiscapacidad"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiposDiscapacidad
                                    label="Condición de discapacidad"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.intIdCondicionDiscapacidad ? true : false
                                    }
                                    helperText={
                                        errors?.intIdCondicionDiscapacidad?.message ||
                                        "Selecciona la discapacidad del empresario, en caso de padecer alguna."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTitulos}
                            name="strTitulos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Título(s)"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.strTitulos ? true : false}
                                    helperText={
                                        errors?.strTitulos?.message ||
                                        "Digita los títulos o título del empresario, en caso de poseer alguno."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.fileFoto}
                            name="fileFoto"
                            render={({ field: { name, value, onChange } }) => (
                                <Dropzone
                                    label="Foto del empresario"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    setError={setError}
                                    error={errors?.fileFoto ? true : false}
                                    helperText={
                                        errors?.fileFoto?.message ||
                                        "Por favor selecciona una foto del empresario."
                                    }
                                    errors={errors}
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

export default InformacionEmpresarioPr;
