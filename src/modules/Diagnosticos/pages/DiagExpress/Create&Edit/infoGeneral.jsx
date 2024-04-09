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
    TextField
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
        dtmActualizacion: null,
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
                objEmpresario: values.objEmpresario || null,
                dtmFechaSesion: values.dtmFechaSesion || null,
                strLugarSesion: values.strLugarSesion || "",
                strUsuarioCreacion: values.strUsuarioCreacion || "",
                dtmActualizacion: values.dtmActualizacion || null,
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
                                        errors?.objInfoGeneral?.objEmpresario?.message ||
                                        "Selecciona una persona"
                                    }
                                    error={!!errors?.objInfoGeneral?.objEmpresario}
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
                            defaultValue={data.dtmActualizacion}
                            name="objInfoGeneral.dtmActualizacion"
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
                                                ?.dtmActualizacion,
                                            helperText:
                                                errors?.objInfoGeneral
                                                    ?.dtmActualizacion
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoGeneral;
