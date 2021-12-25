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
} from "@mui/material";

import { DateTimePicker, DatePicker } from "@mui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

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
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
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
                                        errors?.objInfoGeneral?.strUsuarioActualizacion
                                            ?.message ||
                                        "Persona que estuvo encargada de actualizar la información del diagnóstico en la última fecha"
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

export default InfoGeneral;
