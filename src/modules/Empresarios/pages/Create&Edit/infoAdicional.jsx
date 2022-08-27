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
    MenuItem,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import DropdownRecibirAsesoria from "../../components/dropdownRecibirAsesoria";
import DropdownComoSeEntero from "../../components/dropdownComoSeEntero";
import DropdowMediosComunicacion from "../../components/dropdownMediosComunicacion";
import Dropzone from "../../../../common/components/dropzone";

const InfoAdicional = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    clearErrors,
    setError,
    isEdit
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strPrincipalesNecesidades: "",
        btInteresadoProcesoCMM: "",
        arrTemasCapacitacion: [],
        arrComoSeEntero: [],
        strOtroComoSeEntero: "",
        arrMediosDeComunicacion: [],
        strOtrosMediosComunicacion: "",
        btRecibirInfoCMM: "",
        strURLDocumento: "",
        strRecomendaciones: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlderChangeData = (name, value) => {
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
                strPrincipalesNecesidades: values.strPrincipalesNecesidades || "",
                btInteresadoProcesoCMM:
                    typeof values.btInteresadoProcesoCMM === "boolean"
                        ? values.btInteresadoProcesoCMM
                        : "",
                arrTemasCapacitacion: values.arrTemasCapacitacion || [],
                arrComoSeEntero: values.arrComoSeEntero || [],
                strOtroComoSeEntero: values.strOtroComoSeEntero || "",
                arrMediosDeComunicacion: values.arrMediosDeComunicacion || [],
                strOtrosMediosComunicacion: values.strOtrosMediosComunicacion || "",
                btRecibirInfoCMM:
                    typeof values.btRecibirInfoCMM === "boolean"
                        ? values.btRecibirInfoCMM
                        : "",
                strURLDocumento: values.strURLDocumento || "",
                strRecomendaciones: values.strRecomendaciones || "",
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
                            color: errors?.objInfoAdicional ? "#D33030" : "inherit",
                        }}
                    >
                        Información adicional
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
                    borderColor: errors?.objInfoAdicional ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPrincipalesNecesidades}
                            name="objInfoAdicional.strPrincipalesNecesidades"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuáles son las principales necesidades e intereses de la empresa?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    disabled={disabled}
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoAdicional
                                            ?.strPrincipalesNecesidades
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional
                                            ?.strPrincipalesNecesidades?.message ||
                                        "Describe cuales son las principales necesidades e intereses de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.btInteresadoProcesoCMM}
                            name="objInfoAdicional.btInteresadoProcesoCMM"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene interés en hacer parte del proceso de formación, capacitación y asesoría?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlderChangeData(
                                            "btInteresadoProcesoCMM",
                                            e.target.value
                                        );

                                        handlderChangeData("arrTemasCapacitacion", []);

                                        setValue(
                                            "objInfoAdicional.arrTemasCapacitacion",
                                            []
                                        );
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btInteresadoProcesoCMM
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btInteresadoProcesoCMM
                                            ?.message ||
                                        "Selecciona sí tiene interés en hacer parte del proceso de formación, capacitación y asesoría de De Mis Manos"
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
                                        return "Por favor, selecciona sí tiene interés en hacer parte del proceso de formación, capacitación y asesoría de De Mis Manos";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.arrTemasCapacitacion}
                            name="objInfoAdicional.arrTemasCapacitacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRecibirAsesoria
                                    label="¿En que temas le gustaría recibir asesoría o capacitación y quiere inscribirse?"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={
                                        !data.btInteresadoProcesoCMM ? true : disabled
                                    }
                                    error={
                                        errors?.objInfoAdicional?.arrTemasCapacitacion
                                            ? true
                                            : false
                                    }
                                    required={data.btInteresadoProcesoCMM ? true : false}
                                    helperText={
                                        errors?.objInfoAdicional?.arrTemasCapacitacion
                                            ?.message ||
                                        "Selecciona en que temas le gustaría recibir asesoría o capacitación y quiere inscribirse"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btInteresadoProcesoCMM) {
                                        if (value?.length === 0) {
                                            return "Por favor, Selecciona en que temas le gustaría recibir asesoría o capacitación y quiere inscribirse";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrComoSeEntero}
                            name="objInfoAdicional.arrComoSeEntero"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownComoSeEntero
                                    label="¿Cómo conoció De Mis Manos?"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.arrComoSeEntero
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.arrComoSeEntero
                                            ?.message ||
                                        "Selecciona el cómo conoció De Mis Manos"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtroComoSeEntero}
                            name="objInfoAdicional.strOtroComoSeEntero"
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Otro ¿Cuál?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    error={
                                        errors?.objInfoAdicional?.strOtroComoSeEntero
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strOtroComoSeEntero
                                            ?.message ||
                                        "Digita, en caso de que aplique otro medio por el cuál se enteró de la corporación"
                                    }
                                    variant="standard"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDeComunicacion}
                            name="objInfoAdicional.arrMediosDeComunicacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdowMediosComunicacion
                                    label="¿Qué canales prefiere para el envío de información?"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.arrMediosDeComunicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.arrMediosDeComunicacion
                                            ?.message ||
                                        "Selecciona los medios que te gustarían para que De Mis Manos se comunique contigo"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtrosMediosComunicacion}
                            name="objInfoAdicional.strOtrosMediosComunicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otro ¿Cuál?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional
                                            ?.strOtrosMediosComunicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional
                                            ?.strOtrosMediosComunicacion?.message ||
                                        "Digita otras opciones, en caso de que aplique"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.btRecibirInfoCMM}
                            name="objInfoAdicional.btRecibirInfoCMM"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La persona autoriza a De Mis Manos para el envío de información?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlderChangeData(
                                            "btRecibirInfoCMM",
                                            e.target.value
                                        );
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btRecibirInfoCMM
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btRecibirInfoCMM
                                            ?.message ||
                                        "Selecciona si le gustaría recibir información de De Mis Manos"
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
                                        return "Por favor, Selecciona si le gustaría recibir información de De Mis Manos";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    {data.btRecibirInfoCMM && (
                        <Grid item xs={12}>
                            <Controller
                                defaultValue={data.strURLDocumento}
                                name="objInfoAdicional.strURLDocumento"
                                render={({ field: { name, value, onChange } }) => (
                                    <Dropzone
                                        label="Documento de soporte"
                                        name={name}
                                        value={value}
                                        disabled={disabled}
                                        onChange={onChange}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        maxFiles={1}
                                        type="document"
                                        errors={errors}
                                        error={
                                            errors?.objInfoAdicional?.strURLDocumento
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errors?.objInfoAdicional?.strURLDocumento
                                                ?.message ||
                                            "Adjunte un documento que soporte el uso de datos personales"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value === "" || value === undefined) {
                                            return "Por favor, adjunte un documento que soporte el uso de datos personales.";
                                        }
                                    },
                                }}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strRecomendaciones}
                            name="objInfoAdicional.strRecomendaciones"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Comentarios, ideas y recomendaciones"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    disabled={disabled}
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoAdicional?.strRecomendaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strRecomendaciones
                                            ?.message ||
                                        "Describe si tiene comentarios, ideas o recomendaciones"
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

export default InfoAdicional;
