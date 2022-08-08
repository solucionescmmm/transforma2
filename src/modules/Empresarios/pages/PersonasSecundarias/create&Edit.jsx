import {
    Container,
    Grid,
    LinearProgress,
    Paper,
    Box,
    Typography,
    Alert,
    TextField,
    MenuItem,
} from "@mui/material";

import validator from "validator";

import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../../../common/middlewares/Auth";

// Componentes
import SelectTipoDocumento from "../../components/selectTipoDocumento";
import SelectGenero from "../../components/selectGenero";
import SelectNivelEducativo from "../../components/selectNivelEducativo";
import SelectTiposDiscapacidad from "../../components/selectTipoDiscapacidad";
import Dropzone from "../../../../common/components/dropzone";
import ModalDireccionResidencia from "../../components/modalDireccionResidencia";
import DropdownLocalizaciones from "../../components/dropdownLocalizaciones";

//Estilos
import { makeStyles } from "@mui/styles";
import { DatePicker, LoadingButton } from "@mui/lab";
import NumberFormat from "react-number-format";

const styles = makeStyles((theme) => ({
    containerPR: {
        marginTop: "20px",
        [theme.breakpoints.down("sm")]: {
            paddingRigth: "0px",
            paddingLeft: "0px",
        },
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const CreateEditPersonasSec = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        strNombres: "",
        strApellidos: "",
        strTipoDocto: "",
        strNroDocto: "",
        strLugarExpedicionDocto: "",
        dtFechaExpedicionDocto: null,
        dtFechaNacimiento: null,
        strGenero: "",
        strCelular1: "",
        strCelular2: "",
        strCorreoElectronico1: "",
        strCorreoElectronico2: "",
        strNivelEducativo: "",
        strTitulos: "",
        strCondicionDiscapacidad: "",
        strEstrato: "",
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strDireccionResidencia: "",
        strURLFileFoto: "",
    });

    const handlerChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        clearErrors,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    return (
        <Container className={classes.containerPR}>
            <Paper className={classes.paper}>
                {loading ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : null}

                <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "25px" }}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    align="center"
                                    style={{ fontWeight: "bold" }}
                                    color="primary"
                                    variant="h6"
                                >
                                    {isEdit
                                        ? "EDITAR PERSONA SECUNDARIA"
                                        : "REGISTRAR PERSONA SECUNDARIA"}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombres}
                            name="objInfoEmpresarioPr.strNombres"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombres"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strNombres
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strNombres
                                            ?.message ||
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
                            name="objInfoEmpresarioPr.strApellidos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Apellidos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strApellidos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strApellidos?.message ||
                                        "Digíta los apellidos de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta los apellidos de la persona",
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
                            name="objInfoEmpresarioPr.strTipoDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTipoDocumento
                                    label="Tipo de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strTipoDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strTipoDocto?.message ||
                                        "Selecciona el tipo de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el tipo de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNroDocto}
                            name="objInfoEmpresarioPr.strNroDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strNroDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strNroDocto
                                            ?.message ||
                                        "Digita el número de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarExpedicionDocto}
                            name="objInfoEmpresarioPr.strLugarExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Lugar de expedición del documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strLugarExpedicionDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strLugarExpedicionDocto
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
                            name="objInfoEmpresarioPr.dtFechaExpedicionDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de expedición del documento"
                                    value={value}
                                    disabled={loading}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.objInfoEmpresarioPr
                                                    ?.dtFechaExpedicionDocto
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEmpresarioPr
                                                    ?.dtFechaExpedicionDocto
                                                    ?.message ||
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
                            name="objInfoEmpresarioPr.dtFechaNacimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de nacimiento"
                                    value={value}
                                    disabled={loading}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.objInfoEmpresarioPr
                                                    ?.dtFechaNacimiento
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEmpresarioPr
                                                    ?.dtFechaNacimiento
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
                            name="objInfoEmpresarioPr.strGenero"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectGenero
                                    label="Género"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    required
                                    error={
                                        errors?.objInfoEmpresarioPr?.strGenero
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strGenero
                                            ?.message ||
                                        "Selecciona el género de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el género de la persona",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular1}
                            name="objInfoEmpresarioPr.strCelular1"
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
                                    disabled={loading}
                                    required
                                    error={
                                        errors?.objInfoEmpresarioPr?.strCelular1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strCelular1
                                            ?.message ||
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

                                    if (
                                        !validator.isMobilePhone(
                                            strValue,
                                            "es-CO"
                                        )
                                    ) {
                                        return "El número ingresado no corresponde a un operador válido en Colombia";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular2}
                            name="objInfoEmpresarioPr.strCelular2"
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
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr?.strCelular2
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strCelular2
                                            ?.message ||
                                        "Digita el número celular de la persona"
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
                            defaultValue={data.strCorreoElectronico1}
                            name="objInfoEmpresarioPr.strCorreoElectronico1"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico1?.message ||
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
                            name="objInfoEmpresarioPr.strCorreoElectronico2"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico alterno"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico2
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico2?.message ||
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

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNivelEducativo}
                            name="objInfoEmpresarioPr.strNivelEducativo"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectNivelEducativo
                                    label="Nivel educativo"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strNivelEducativo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strNivelEducativo?.message ||
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
                            name="objInfoEmpresarioPr.strTitulos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Título(s)"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strTitulos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strTitulos
                                            ?.message ||
                                        "Digita los títulos o título del empresario, en caso de poseer alguno"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCondicionDiscapacidad}
                            name="objInfoEmpresarioPr.strCondicionDiscapacidad"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiposDiscapacidad
                                    label="Condición de discapacidad"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCondicionDiscapacidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCondicionDiscapacidad
                                            ?.message ||
                                        "Selecciona la discapacidad de la persona, en caso de padecer alguna"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstrato}
                            name="objInfoEmpresarioPr.strEstrato"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estrato socioeconómico"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    select
                                    required
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strEstrato
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strEstrato
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
                            rules={{
                                require:
                                    "Por favor, selecciona el estrato socioeconómico de la persona",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmpresarioPr.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData(
                                            "arrDepartamento",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.arrDepartamento?.message ||
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
                            name="objInfoEmpresarioPr.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrCiudad", value);
                                    }}
                                    error={
                                        errors?.objInfoEmpresarioPr?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={
                                        data.arrDepartamento?.region_name
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.arrCiudad
                                            ?.message ||
                                        "Selecciona la ciudad de residencia"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strBarrio}
                            name="objInfoEmpresarioPr.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEmpresarioPr?.strBarrio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strBarrio
                                            ?.message ||
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
                            defaultValue={data.strDireccionResidencia}
                            name="objInfoEmpresarioPr.strDireccionResidencia"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalDireccionResidencia
                                    label="Dirección de residencia"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strDireccionResidencia?.message ||
                                        "Digita la dirección de residencia de la persona"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strURLFileFoto}
                            name="objInfoEmpresarioPr.strURLFileFoto"
                            render={({ field: { name, value, onChange } }) => (
                                <Dropzone
                                    label="Foto de la persona"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={onChange}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    maxFiles={1}
                                    type="Imagen"
                                    errors={errors}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strURLFileFoto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strURLFileFoto?.message ||
                                        "Selecciona una foto de la persona"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    {errors && (
                        <Grid item xs={12}>
                            <Alert severity="error">
                                Lo sentimos, tienes campos pendientes por
                                diligenciar en el formulario, revisa e intentalo
                                nuevamente.
                            </Alert>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                            }}
                        >
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={loading}
                            >
                                {isEdit ? "guardar" : "registrar"}
                            </LoadingButton>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CreateEditPersonasSec;
