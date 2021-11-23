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
        strOperacionesVentas6Meses: "",
        strEtapaValidacion: "",
        strPromedioVentas6Meses: "",
        dblValorVentasMes: "",
        strRangoVentas: "",
        intNumeroEmpleados: "",
        strRangoEmpleados: "",
        strTipoEmpleoGenerado: "",
        strDlloAcitividadesContratados: "",
        strPromedioTiempoInvertido: "",
        strRolesEmprendimiento: "",
        strDiasProduccion: "",
        strGeneraEmpleoRiesgoPobreza: "",
        strActivos: "",
        dblValorActivos: "",
        dblValorGananciasMes: "",
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
                            defaultValue={data.strOperacionesVentas6Meses}
                            name="objInfoPerfilEco.strOperacionesVentas6Meses"
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
                                        errors?.objInfoPerfilEco
                                            ?.strOperacionesVentas6Meses
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strOperacionesVentas6Meses?.message ||
                                        "Selecciona una opción"
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
                            name="objInfoPerfilEco.strPromedioVentas6Meses"
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

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRangoEmpleados}
                            name="objInfoPerfilEco.strRangoEmpleados"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Rango de empleados"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strRangoEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strRangoEmpleados
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
                            defaultValue={data.strTipoEmpleoGenerado}
                            name="objInfoPerfilEco.strTipoEmpleoGenerado"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Qué tipo de empleo genera?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strTipoEmpleoGenerado
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strTipoEmpleoGenerado
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
                            defaultValue={data.strDlloAcitividadesContratados}
                            name="objInfoPerfilEco.strDlloAcitividadesContratados"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuáles actividades desarrollan las personas contratadas?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    multiline
                                    row={4}
                                    variant="outlined"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strDlloAcitividadesContratados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strDlloAcitividadesContratados?.message ||
                                        "Digita detalladamente tu respuesta"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita detalladamente tu respuesta",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPromedioTiempoInvertido}
                            name="objInfoPerfilEco.strPromedioTiempoInvertido"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="En promedio, cuánto tiempo durante el día puede invertir para su emprendimiento entre las diferentes activiades que realiza"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strPromedioTiempoInvertido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strPromedioTiempoInvertido?.message ||
                                        "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strRolesEmprendimiento}
                            name="objInfoPerfilEco.strRolesEmprendimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuál son tus roles en la operación de tú emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strRolesEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strRolesEmprendimiento
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

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strDiasProduccion}
                            name="objInfoPerfilEco.strDiasProduccion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿En promedio al día cuántas horas dispones para la producción:?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strDiasProduccion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strDiasProduccion
                                            ?.message || "Digita detalladamente"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, degita detalladamente",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strGeneraEmpleoRiesgoPobreza}
                            name="objInfoPerfilEco.strGeneraEmpleoRiesgoPobreza"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Genera empleo o ingresos para personas que se encuentren en riesgo de pobreza o de exclusión socia?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strGeneraEmpleoRiesgoPobreza
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strGeneraEmpleoRiesgoPobreza?.message ||
                                        "Selecciona una opción"
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
                            defaultValue={data.strActivos}
                            name="objInfoPerfilEco.strGeneraEmpleoRiesgoPobreza"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Qué activos tiene la unidad productiva a la fecha?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.strActivos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strActivos?.message ||
                                        "Digita una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dblValorActivos}
                            name="objInfoPerfilEco.dblValorActivos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Valor estimado de los activos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco?.dblValorActivos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.dblValorActivos
                                            ?.message || "Digita una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.dblValorGananciasMes}
                            name="objInfoPerfilEco.dblValorGananciasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor de las ganancias mensuales"
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
                                        "Digita la cantidad promedio de las ganancias mensuales"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita la cantidad promedio de las ganancias mensuales",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPerfilEco;
