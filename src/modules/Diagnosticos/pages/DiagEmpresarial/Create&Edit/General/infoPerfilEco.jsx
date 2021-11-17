import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

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

const InfoPerfilEco = ({
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
        strOperacionesVentas: "",
        strEtapaValidacion: "",
        strPromedioVentas6Meses: "",
        dblValorVentasMes: "",
        strRangoVentas: "",
        intNumeroEmpleados: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({});
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
                            color: errors?.objInfoPerfilEco ? "#D33030" : "inherit",
                        }}
                    >
                        Perfil económico y productivo
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
                    borderColor: errors?.objInfoPerfilEco ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOperacionesVentas}
                            name="objInfoPerfilEco.strOperacionesVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa tiene operaciones de producción y venta en los últimos 6 meses de manera continúa?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    select
                                    error={
                                        errors?.objInfoPerfilEco?.strOperacionesVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strOperacionesVentas
                                            ?.message || "Selecciona una opción"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value="">
                                        <em>No aplica</em>
                                    </MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEtapaValidacion}
                            name="objInfoPerfilEco.strEtapaValidacion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿En qué etapa de validación se encuentra tu producto?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strEtapaValidacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strEtapaValidacion
                                            ?.message || "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strPromedioVentas6Meses}
                            name="objInfoPerfilEco.strPromedioVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Promedio de ventas de los últimos 6 meses"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strPromedioVentas6Meses
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strPromedioVentas6Meses
                                            ?.message || "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dblValorVentasMes}
                            name="objInfoPerfilEco.dblValorVentasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor promedio de las ventas mensuales"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPerfilEco?.dblValorVentasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.dblValorVentasMes
                                            ?.message ||
                                        "Digita la cantidad promedio de las ventas mensuales"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita la cantidad promedio de las ventas mensuales",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRangoVentas}
                            name="objInfoPerfilEco.strRangoVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Rango de ventas"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strRangoVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strRangoVentas
                                            ?.message || "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intNumeroEmpleados}
                            name="objInfoPerfilEco.intNumeroEmpleados"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de empleos generados"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPerfilEco?.intNumeroEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.intNumeroEmpleados
                                            ?.message ||
                                        "Digita la cantidad de empleos generados"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, digita la cantidad de empleos generados";
                                    }

                                    let intNumeroEmpleados = parseInt(value);

                                    if (intNumeroEmpleados < 1) {
                                        return "La cantidad de empleados no pueden ser inferiores a 1";
                                    }
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPerfilEco;
