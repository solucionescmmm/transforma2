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
} from "@material-ui/core";

import { DatePicker } from "@material-ui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

//Componentes
import SelectEspacioJornada from "../../components/selectEspacioJornada";
import SelectEstadoEmpresario from "../../components/selectEstadoEmpresario";
import SelectSedes from "../../components/selectSedes";
import SelectTipoEmpresario from "../../components/selectTipoEmpresario";

const InfoPrincipal = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strEspacioJornada: "",
        strEstado: "",
        strSede: "",
        strTipoEmpresario: "",
        dtFechaVinculacion: null,
    });

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values && isEdit) {
            setData({
                strEspacioJornada: values.strEspacioJornada || "",
                strEstado: values.strEstado || "",
                strSede: values.strSede || "",
                strTipoEmpresario: values.strTipoEmpresario || "",
                dtFechaVinculacion: values.dtFechaVinculacion || null,
            });
        }

        setLoading(false);
    }, [values, isEdit]);

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
                            color: errors?.objInfoPrincipal ? "#D33030" : "inherit",
                        }}
                    >
                        Información principal
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

            <hr
                style={{
                    borderColor: errors?.objInfoPrincipal ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEspacioJornada}
                            name="objInfoPrincipal.strEspacioJornada"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectEspacioJornada
                                    label="Espacio de la jornada"
                                    name={name}
                                    value={value}
                                    error={
                                        errors?.objInfoPrincipal?.strEspacioJornada
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strEspacioJornada
                                            ?.message ||
                                        "Selecciona el espacio de la jornada."
                                    }
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el espacio de la jornada.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstado}
                            name="objInfoPrincipal.strEstado"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectEstadoEmpresario
                                    label="Estado del empresario"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.strEstado
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strEstado?.message ||
                                        "Selecciona el estado del empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el estado del empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strSede}
                            name="objInfoPrincipal.strSede"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectSedes
                                    label="Sede"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.strSede ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strSede?.message ||
                                        "Selecciona la sede."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona la sede",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strTipoEmpresario}
                            name="objInfoPrincipal.strTipoEmpresario"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectTipoEmpresario
                                    label="Tipo de empresario"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.strTipoEmpresario
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strTipoEmpresario
                                            ?.message ||
                                        "Selecciona el tipo de empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona el tipo de empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.dtFechaVinculacion}
                            name="objInfoPrincipal.dtFechaVinculacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DatePicker
                                    label="Fecha de vinculación"
                                    value={value}
                                    disabled={disabled}
                                    onChange={(date) => onChange(date)}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            fullWidth
                                            required
                                            variant="standard"
                                            error={
                                                errors?.objInfoPrincipal
                                                    ?.dtFechaVinculacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoPrincipal
                                                    ?.dtFechaVinculacion?.message ||
                                                "Selecciona la fecha de vinculación"
                                            }
                                        />
                                    )}
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la fecha de vinculación.",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
