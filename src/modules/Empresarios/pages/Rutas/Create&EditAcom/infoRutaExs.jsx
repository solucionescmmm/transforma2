import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import { Grid, Box, CircularProgress, TextField, Button } from "@mui/material";

//Componentes
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import { DatePicker, TimePicker } from "@mui/lab";
import SelectTipoAct from "../../../components/selectTipoAct";

const InfoRutaExs = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        objRuta: {},
        objFase: {},
        objPaquetes: {},
        objServicios: {},
        strLugarActividad: "",
        intTipoActividad: "",
        objResponsable: {},
        strObjetivoActividad: "",
        strActividades: "",
        strLogros: "",
        dtmFechaProx: null,
        intHoraInicio: null,
        strRetroAlim: "",
    });

    useEffect(() => {
        if (values) {
            setData({
                objRuta: values.objRuta || {},
                objFase: values.objFase || {},
                objPaquetes: values.objPaquetes || {},
                objServicios: values.objServicios || {},
                strLugarActividad: values.strLugarActividad || "",
                intTipoActividad: values.intTipoActividad || "",
                objResponsable: values.objResponsable || {},
                strObjetivoActividad: values.strObjetivoActividad || "",
                strActividades: values.strActividades || "",
                strLogros: values.strLogros || "",
                dtmFechaProx: values.dtmFechaProx || null,
                intHoraInicio: values.intHoraInicio || null,
                strRetroAlim: values.strRetroAlim || "",
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
            <Grid item xs={12} md={10}>
                Ruta
            </Grid>

            <Grid item xs={12} md={2}>
                Fase
            </Grid>

            <Grid item xs={12} md={6}>
                Paquetes
            </Grid>

            <Grid item xs={12} md={6}>
                Servicios
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strLugarActividad}
                    name="objInfoRutaExs.strLugarActividad"
                    render={({ field: { name, onChange, value } }) => (
                        <TextField
                            label="Lugar actividad"
                            variant="standard"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            required
                            error={!!errors?.objInfoRutaExs?.strLugarActividad}
                            helperText={
                                errors?.objInfoRutaExs?.strLugarActividad
                                    ?.message ||
                                "Digita el lugar donde se  realizo la actividad"
                            }
                            fullWidth
                        />
                    )}
                    control={control}
                    rules={{
                        required: "Por favor, selecciona el responsable",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.intTipoActividad}
                    name="objInfoRutaExs.intTipoActividad"
                    render={({ field: { name, onChange, value } }) => (
                        <SelectTipoAct
                            label="Tipo de actividad"
                            variant="standard"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            required
                            error={!!errors?.objInfoRutaExs?.intTipoActividad}
                            helperText={
                                errors?.objInfoRutaExs?.intTipoActividad
                                    ?.message ||
                                "Selecciona el tipo de actividad"
                            }
                        />
                    )}
                    control={control}
                    rules={{
                        required: "Por favor, selecciona el tipo de actividad",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strResponsable}
                    name="objInfoRutaExs.strResponsable"
                    render={({ field: { name, onChange, value } }) => (
                        <DropdownUsuarios
                            label="Responsable"
                            name={name}
                            value={value}
                            onChange={(_, value) => onChange(value)}
                            disabled={disabled}
                            required
                            error={!!errors?.objInfoRutaExs?.strResponsable}
                            helperText={
                                errors?.objInfoRutaExs?.strResponsable
                                    ?.message || "Selecciona el responsable"
                            }
                        />
                    )}
                    control={control}
                    rules={{
                        required: "Por favor, selecciona el responsable",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strObjetivoActividad}
                    name="objInfoRutaExs.strObjetivoActividad"
                    render={({ field: { name, onChange, value } }) => (
                        <TextField
                            label="Objetivo actividad"
                            variant="outlined"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            required
                            error={
                                !!errors?.objInfoRutaExs?.strObjetivoActividad
                            }
                            helperText={
                                errors?.objInfoRutaExs?.strObjetivoActividad
                                    ?.message ||
                                "Digita el objetivo de la actividad"
                            }
                            fullWidth
                            multiline
                            rows={4}
                        />
                    )}
                    control={control}
                    rules={{
                        required:
                            "Por favor, digita el objetivo de la actividad",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strActividades}
                    name="objInfoRutaExs.strActividades"
                    render={({ field: { name, onChange, value } }) => (
                        <TextField
                            label="Temas y/o actividades a desarrollar"
                            variant="outlined"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            required
                            error={!!errors?.objInfoRutaExs?.strActividades}
                            helperText={
                                errors?.objInfoRutaExs?.strActividades
                                    ?.message ||
                                "Digita las actividades a desarrollar"
                            }
                            fullWidth
                            multiline
                            rows={4}
                        />
                    )}
                    control={control}
                    rules={{
                        required:
                            "Por favor, digita las actividad a desarrollar",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strLogros}
                    name="objInfoRutaExs.strLogros"
                    render={({ field: { name, onChange, value } }) => (
                        <TextField
                            label="Logros/avances a desarrollar"
                            variant="outlined"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            required
                            error={!!errors?.objInfoRutaExs?.strObservaciones}
                            helperText={
                                errors?.objInfoRutaExs?.strObservaciones
                                    ?.message || "Digita las observaciones"
                            }
                            fullWidth
                            multiline
                            rows={4}
                        />
                    )}
                    control={control}
                    rules={{
                        required: "Por favor, digita las observaciones",
                    }}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Controller
                    defaultValue={data.dtmFechaProx}
                    name="objInfoRutaExs.dtmFechaProx"
                    render={({ field: { name, onChange, value } }) => (
                        <DatePicker
                            label="Fecha próxima actividad"
                            value={value}
                            onChange={(date) => onChange(date)}
                            disabled={loading}
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    name={name}
                                    variant="standard"
                                    error={
                                        !!errors?.objInfoRutaExs?.dtmFechaProx
                                    }
                                    helperText={
                                        errors?.objInfoRutaExs?.dtmFechaProx
                                            ?.message ||
                                        "Selecciona la fecha de la próxima reunión"
                                    }
                                    fullWidth
                                />
                            )}
                        />
                    )}
                    control={control}
                    rules={{
                        required:
                            "Por favor, selecciona la fecha de la próxima reunión",
                    }}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Controller
                    defaultValue={data.intHoraInicio}
                    name="objInfoRutaExs.intHoraInicio"
                    render={({ field: { name, onChange, value } }) => (
                        <TimePicker
                            label="Hora inicio"
                            value={value}
                            onChange={(value) => onChange(value)}
                            ampm
                            disabled={loading}
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    name={name}
                                    variant="standard"
                                    error={
                                        !!errors?.objInfoRutaExs?.intHoraInicio
                                    }
                                    helperText={
                                        errors?.objInfoRutaExs?.intHoraInicio
                                            ?.message ||
                                        "Selecciona la hora de inicio de la próxima reunión"
                                    }
                                    fullWidth
                                />
                            )}
                        />
                    )}
                    control={control}
                    rules={{
                        required:
                            "Por favor, selecciona la hora de inicio de la próxima reunión",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Controller
                    defaultValue={data.strRetroAlim}
                    name="objInfoRutaExs.strRetroAlim"
                    render={({ field: { name, onChange, value } }) => (
                        <TextField
                            label="Retroalimentación y observaciones"
                            variant="outlined"
                            name={name}
                            value={value}
                            onChange={(e) => onChange(e)}
                            disabled={disabled}
                            error={!!errors?.objInfoRutaExs?.strRetroAlim}
                            helperText={
                                errors?.objInfoRutaExs?.strRetroAlim
                                    ?.message || "Digita la retroalimentación u observaciones en caso de tener"
                            }
                            fullWidth
                            multiline
                            rows={4}
                        />
                    )}
                    control={control}
                    rules={{
                        required: "Por favor, digita la retroalimentación u observaciones en caso de tener",
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                Compromisos
            </Grid>

            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        gap: 1,
                    }}
                >
                    <Button variant="contained" type="button" loading={loading}>
                        agregar tareas
                    </Button>
                </Box>
            </Grid>
        </Fragment>
    );
};

export default InfoRutaExs;
