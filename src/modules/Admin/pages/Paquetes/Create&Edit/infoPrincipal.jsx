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

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import DropdownServicios from "../../../components/dropdownServicios";

const InfoPrincipal = ({
    data: dataPaquetes,
    isEdit,
    disabled,
    values,
    errors,
    control,
    isPreview,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        intId: "",
        intIdServicio: [],
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (isEdit || isPreview) {
            handlerChangeOpenCollapse();
        }
        // eslint-disable-next-line
    }, [isEdit, isPreview]);

    useEffect(() => {
        setLoading(true);

        if (Object.keys(values).length > 0) {
            setData({
                intId: values.intId,
                intIdServicio: values.intIdServicio || [],
            });
        }

        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.strNombre"
                            defaultValue={data.strNombre}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre del paquete"
                                    name={name}
                                    required
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.strNombre
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strNombre
                                            ?.message ||
                                        "Digita el nombre del paquete"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita el nombre del servicio",

                                validate: (value) => {
                                    if (isEdit) {
                                        if (
                                            dataPaquetes?.find(
                                                (a) =>
                                                    a.objInfoPrincipal.strNombre.toLowerCase() ===
                                                        value.toLowerCase() &&
                                                    a.objInfoPrincipal.intId !==
                                                        data.intId
                                            )
                                        ) {
                                            return `Ya existe un paquete registrado como ${value}`;
                                        }
                                    } else {
                                        if (
                                            dataPaquetes?.find(
                                                (a) =>
                                                    a.objInfoPrincipal.strNombre.toLowerCase() ===
                                                    value.toLowerCase()
                                            )
                                        ) {
                                            return `Ya existe un paquete registrado como ${value}`;
                                        }
                                    }
                                },
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.strDescripcion"
                            defaultValue={data.strDescripcion}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Descripción del paquete"
                                    name={name}
                                    value={value}
                                    required
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.strDescripcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strDescripcion
                                            ?.message ||
                                        "Digita la descripción del paquete"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita la descripción del paquete",
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.intIdServicio"
                            defaultValue={data.intIdServicio}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownServicios
                                    multiple
                                    label="Servicios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(_, value) => onChange(value)}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.intIdServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.intIdServicio
                                            ?.message ||
                                        "Selecciona uno o varios servicios"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, selecciona uno o varios servicios",
                            }}
                            control={control}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
