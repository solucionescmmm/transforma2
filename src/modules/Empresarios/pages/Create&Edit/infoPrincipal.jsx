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
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectModalidadIngreso from "../../components/selectModalidadIngreso";
import SelectEstadoVinculacion from "../../components/selectEstadoVinculacion";
import SelectSedes from "../../../Admin/components/selectSedes";
import SelectTipoVinculacion from "../../components/selectTipoVinculacion";

const InfoPrincipal = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strSede: "",
        strModalidadIngreso: "",
        dtFechaVinculacion: null,
        intIdEstadoVinculacion: "",
        strTipoVinculacion: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (isEdit) {
            setOpenCollapse(true);
        }
    }, [isEdit]);

    useEffect(() => {
        if (values) {
            console.log(values)
            setData({
                strSede: values.strSede || "",
                intIdSede: values.intIdSede || "",
                strModalidadIngreso: values.strModalidadIngreso || "",
                dtFechaVinculacion: values.dtFechaVinculacion || null,
                intIdEstadoVinculacion: values.intIdEstadoVinculacion || "",
                strTipoVinculacion: values.strTipoVinculacion || "",
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
                            color: errors?.objInfoPrincipal
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información principal
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
                    borderColor: errors?.objInfoPrincipal
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={isEdit ? 4 : 6}>
                        <Controller
                            defaultValue={data.intIdSede}
                            name="objInfoPrincipal.intIdSede"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectSedes
                                    label="Sede"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.intIdSede
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.intIdSede
                                            ?.message || "Selecciona la sede"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona la sede",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={isEdit ? 4 : 6}>
                        <Controller
                            defaultValue={data.strModalidadIngreso}
                            name="objInfoPrincipal.strModalidadIngreso"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectModalidadIngreso
                                    label="Modalidad de ingreso"
                                    name={name}
                                    value={value}
                                    error={
                                        errors?.objInfoPrincipal
                                            ?.strModalidadIngreso
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal
                                            ?.strModalidadIngreso?.message ||
                                        "Selecciona la modalidad de ingreso"
                                    }
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la modalidad de ingreso",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={isEdit ? 4 : 6}>
                        <Controller
                            defaultValue={data.dtFechaVinculacion}
                            name="objInfoPrincipal.dtFechaVinculacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DatePicker
                                    label="Fecha de vinculación"
                                    value={value}
                                    disabled={disabled}
                                    format="dd/MM/yyyy"
                                    onChange={(date) => onChange(date)}
                                    slotProps={{
                                        textField: {
                                            name,
                                            variant: "standard",
                                            error: !!errors?.objInfoPrincipal
                                                ?.dtFechaVinculacion,
                                            helperText:
                                                errors?.objInfoPrincipal
                                                    ?.dtFechaVinculacion
                                                    ?.message ||
                                                "Selecciona la fecha de vinculación",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la fecha de vinculación",
                            }}
                        />
                    </Grid>

                    {isEdit ? (
                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.intIdEstadoVinculacion}
                                name="objInfoPrincipal.intIdEstadoVinculacion"
                                render={({ field: { name, onChange, value } }) => (
                                    <SelectEstadoVinculacion
                                        label="Estado de vinculación"
                                        name={name}
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        disabled={disabled}
                                        error={
                                            errors?.objInfoPrincipal
                                                ?.intIdEstadoVinculacion
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errors?.objInfoPrincipal
                                                ?.intIdEstadoVinculacion?.message ||
                                            "Selecciona el estado de vinculación"
                                        }
                                    />
                                )}
                                control={control}
                            />
                        </Grid>
                    ):null}

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTipoVinculacion}
                            name="objInfoPrincipal.strTipoVinculacion"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectTipoVinculacion
                                    label="Tipo de vinculación"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal
                                            ?.strTipoVinculacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal
                                            ?.strTipoVinculacion?.message ||
                                        "Selecciona el tipo de vinculación"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el tipo de vinculación",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
