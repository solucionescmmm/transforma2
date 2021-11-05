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

import { DateTimePicker } from "@mui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const InfoEncuentro = ({
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

    const handlderChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
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
                            color: errors?.objInfoAdicional ? "#D33030" : "inherit",
                        }}
                    >
                        Información del encuentro
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
                    borderColor: errors?.objInfoEncuentro ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.dtmFechaSesion}
                            name="objInfoEncuentro.dtmFechaSesion"
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
                                                errors?.objInfoEncuentro?.dtmFechaSesion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEncuentro?.dtmFechaSesion
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
                            name="objInfoEncuentro.strLugarSesion"
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
                                        errors?.objInfoEncuentro?.strLugarSesion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuentro?.strLugarSesion
                                            ?.message ||
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEncuentro;
