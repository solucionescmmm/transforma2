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

// Componentes
import SelectListas from "../../../components/selectLista";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const InfoMercado = ({
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
        strDesClieUserConoEll: "",
        strGenDelCli: "",
        strGrupEdadLosCli: "",
        strNivIngreLosCli: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strDesClieUserConoEll: values.strDesClieUserConoEll || "",
                strGenDelCli: values.strGenDelCli || "",
                strGrupEdadLosCli: values.strGrupEdadLosCli || "",
                strNivIngreLosCli: values.strNivIngreLosCli || "",
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
                            color: errors?.objInfoMercado ? "#D33030" : "inherit",
                        }}
                    >
                        Información del Mercado
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
                    borderColor: errors?.objInfoMercado ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Controller
                            name="objInfoMercado.strDesClieUserConoEll"
                            defaultValue={data.strDesClieUserConoEll}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Describir los clientes/usuarios y lo qué conoces de ellos"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strDesClieUserConoEll
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe la descripcion"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Controller
                            name="objInfoMercado.strGenDelCli"
                            defaultValue={data.strGenDelCli}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Genero del cliente"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strGenDelCli
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el genero"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strGrupEdadLosCli"
                            defaultValue={data.strGrupEdadLosCli}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Grupo de edad de los clientes"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strGrupEdadLosCli
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el grupo de edad"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoMercado.strNivIngreLosCli"
                            defaultValue={data.strNivIngreLosCli}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Nivel de ingresos de los clientes (alto, medio, bajo)"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strNivIngreLosCli
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe el nivel"
                                    fullWidth
                                    multiline
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

export default InfoMercado;
