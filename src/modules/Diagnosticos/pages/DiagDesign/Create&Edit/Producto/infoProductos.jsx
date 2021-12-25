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

const InfoProductos = ({
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
        strCategoriaProductos: "",
        strProductos: "",
        strNombreTecnica: "",
        strMateriaPrima: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strCategoriaProductos: values.strCategoriaProductos || "",
                strProductos: values.strProductos || "",
                strNombreTecnica: values.strNombreTecnica || "",
                strMateriaPrima: values.strMateriaPrima || "",
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
                            color: errors?.objInfoProductos ? "#D33030" : "inherit",
                        }}
                    >
                        Productos evaluados en el diagnóstico
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
                    borderColor: errors?.objInfoProductos ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strCategoriaProductos}
                            name="objInfoProductos.strCategoriaProductos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Categoría de productos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoProductos?.strProductos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProductos?.strProductos?.message ||
                                        "Selecciona la categoría de los productos"
                                    }
                                    required
                                    select
                                >
                                    <MenuItem value="Alimentos">Alimentos</MenuItem>
                                    <MenuItem value="No alimentos">No alimentos</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la categoría de los productos",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strProductos}
                            name="objInfoProductos.strProductos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Producto(s)"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoProductos?.strProductos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProductos?.strProductos?.message ||
                                        "Describe detalladamente los productos que ofrece"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strNombreTecnica}
                            name="objInfoProductos.strNombreTecnica"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la técnica utilizada"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoProductos?.strNombreTecnica
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProductos?.strNombreTecnica
                                            ?.message ||
                                        "Describe detalladamente la técnica que utiliza"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strMateriaPrima}
                            name="objInfoProductos.strMateriaPrima"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Materias primas utilizadas"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoProductos?.strMateriaPrima
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoProductos?.strMateriaPrima
                                            ?.message ||
                                        "Describe detalladamente los materias primas que utiliza"
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

export default InfoProductos;
