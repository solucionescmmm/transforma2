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
    MenuItem
} from "@mui/material";

import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import DropdownEmpresarios from "../../../components/dropdownEmpresarios";
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios"
import DropdownLocalizaciones from "../../../../Empresarios/components/dropdownLocalizaciones";
import SelectTipoDocumento from "../../../../Empresarios/components/selectTipoDocumento";
// import SelectNivelEducativo from "../../../../Empresarios/components/selectNivelEducativo";
import ModalDireccionResidencia from "../../../../Empresarios/components/modalDireccionResidencia";

const InfoGeneral = ({
    disabled,
    values,
    errors,
    control,
    intIdIdea,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        objEmpresario: null,
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
                objEmpresario: values.objEmpresario || null,
                dtmFechaSesion: values.dtmFechaSesion || null,
                strLugarSesion: values.strLugarSesion || "",
                strUsuarioCreacion: values.strUsuarioCreacion || "",
                dtActualizacion: values.dtActualizacion || null,
                strUsuarioActualizacion: values.strUsuarioActualizacion || "",
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
                            color: errors?.objInfoGeneral
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información general
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
                    borderColor: errors?.objInfoGeneral ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.objEmpresario}
                            name="objInfoGeneral.objEmpresario"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownEmpresarios
                                    label="Persona empresaria a la cual se le realiza el diagnóstico"
                                    disabled={loading}
                                    name={name}
                                    value={value}
                                    onChange={(target, value) => {
                                        onChange(value);
                                    }}
                                    required
                                    helperText={
                                        errors?.objEmpresario?.message ||
                                        "Selecciona una persona"
                                    }
                                    error={!!errors?.objEmpresario}
                                    intIdIdea={intIdIdea}
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
                            defaultValue={data.dtmFechaSesion}
                            name="objInfoGeneral.dtmFechaSesion"
                            render={({ field: { name, value, onChange } }) => (
                                <DateTimePicker
                                    label="Fecha y hora de la sesión"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled={disabled}
                                    format="dd/MM/yyyy H:mm"
                                    ampm
                                    slotProps={{
                                        textField: {
                                            name,
                                            variant: "standard",
                                            error: !!errors?.objInfoGeneral
                                                ?.dtmFechaSesion,
                                            helperText:
                                                errors?.objInfoGeneral
                                                    ?.dtmFechaSesion?.message ||
                                                "Selecciona la fecha y hora de la sesión",
                                            fullWidth: true,
                                        },
                                    }}
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
                                        errors?.objInfoGeneral?.strLugarSesion
                                            ?.message ||
                                        "Digita el lugar dónde se realizó la sesión"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el lugar dónde se realizó la sesión",
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
                                    format="dd/MM/yyyy"
                                    disabled
                                    slotProps={{
                                        textField: {
                                            name,
                                            variant: "standard",
                                            error: !!errors?.objInfoGeneral
                                                ?.dtActualizacion,
                                            helperText:
                                                errors?.objInfoGeneral
                                                    ?.dtActualizacion
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
                            defaultValue={data.strUsuarioCreacion}
                            name="objInfoGeneral.strUsuarioCreacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownUsuarios
                                    label="Responsable del diagnóstico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    variant="standard"
                                    required
                                    error={
                                        errors?.objInfoGeneral
                                            ?.strUsuarioCreacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral
                                            ?.strUsuarioCreacion?.message ||
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
                                        errors?.objInfoGeneral
                                            ?.strUsuarioActualizacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral
                                            ?.strUsuarioActualizacion
                                            ?.message ||
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
                                    disabled
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strNombres
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strNombres
                                            ?.message ||
                                        "Digita el nombre o nombres de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre o nombres de la persona",

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
                                    disabled
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strApellidos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strApellidos
                                            ?.message ||
                                        "Digita los apellidos de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita los apellidos de la persona",
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
                                    disabled
                                    error={
                                        errors?.objInfoGeneral?.strTipoDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strTipoDocto
                                            ?.message ||
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
                            name="objInfoGeneral.strNroDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoGeneral?.strNroDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strNroDocto
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
                            defaultValue={data.arrPais}
                            name="objInfoGeneral.arrPais"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Pais"
                                    strCodigo="paises"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData(
                                            "arrPais",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoGeneral?.arrPais
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.arrPais
                                            ?.message ||
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
                                        handlerChangeData(
                                            "arrDepartamento",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoGeneral?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    strPais={
                                        data.arrPais?.country_name
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
                                        errors?.objInfoGeneral?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={
                                        data.arrDepartamento?.region_name
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.arrCiudad
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
                            name="objInfoGeneral.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoGeneral?.strBarrio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strBarrio
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

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strDireccionResidencia}
                            name="objInfoEmpresarioPr.strDireccionResidencia"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalDireccionResidencia
                                    label="Dirección de la residencia"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    strPais={
                                        data.arrPais?.country_name
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
                                        errors?.objInfoGeneral?.strEstrato
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strEstrato
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
                                        errors?.objInfoGeneral
                                            ?.strUbicacionVivienda
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral
                                            ?.strUbicacionVivienda?.message ||
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
                                        errors?.objInfoGeneral?.strCelular1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral?.strCelular1
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
                                        errors?.objInfoGeneral
                                            ?.strCorreoElectronico1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoGeneral
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoGeneral;
