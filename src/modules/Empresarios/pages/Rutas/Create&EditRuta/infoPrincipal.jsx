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
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";

const InfoPrincipal = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strNombre: "",
        intEstado: "",
        strResponsable: "",
        strObservaciones: "",
        strCodigoDoc: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

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
            setData({
                strNombre: values.strNombre || "",
                intEstado: values.intEstado || values.intIdEstadoRuta || "",
                strResponsable: values.strResponsable || "",
                strObservaciones: values.strObservaciones || "",
                strCodigoDoc: values.strCodigoDoc || "",
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
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strResponsable}
                            name="objInfoPrincipal.strResponsable"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownUsuarios
                                    label="Responsable"
                                    name={name}
                                    value={value}
                                    onChange={(_, value) => onChange(value)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal?.strResponsable
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strResponsable
                                            ?.message ||
                                        "Selecciona el responsable"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el responsable",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strObservaciones}
                            name="objInfoPrincipal.strObservaciones"
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Observaciones"
                                    variant="outlined"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal
                                            ?.strObservaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal
                                            ?.strObservaciones?.message ||
                                        "Digita las observaciones"
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
