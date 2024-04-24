import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import validator from "validator";

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

//Componentes
import SelectListas from "../../../../components/selectLista";
import DropdownLista from "../../../../components/dropdownLista";

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
        PromedioVentas6Meses: "",
        dblValorVentasMes: "",
        strRangoVentas: "",
        intNumeroEmpleados: "",
        strRangoEmpleados: "",
        strTipoEmpleoGenerado: "",
        strDlloAcitividadesContratados: "",
        strPromedioTiempoInvertido: "",
        strRolesEmprendimiento: [],
        strDiasProduccion: "",
        strGeneraEmpleoRiesgoPobreza: "",
        strActivos: "",
        dblValorActivos: "",
        dblValorGananciasMes: "",
        MinimoValorProducto: "",
        MaximoValorProducto: "",
        strHistoriaEmpresa: "",
        intCantidadUnidadesProducidasMes: "",
        strEscojaProductoServicio: "",
        ValorVentaProductoEscogido: "",
        strConoceMargenRentaProductoEscogido: "",
        intPorcentajeMargenRentaProductoEscogido: "",
        strConoceCostosProductoEscogido: "",
        CostoProduccionProductoEscogido: "",
        strPorcentajeIntermediacionVentas: "",
        strDefinePorcentajesCanal: "",
        intRangoPorcentajeIntermediacionVentas: "",
        btGeneraEmpleo: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strOperacionesVentas6Meses:
                    values.strOperacionesVentas6Meses || "",
                strEtapaValidacion: values.strEtapaValidacion || "",
                PromedioVentas6Meses: values.PromedioVentas6Meses || "",
                dblValorVentasMes: values.dblValorVentasMes || "",
                strRangoVentas: values.strRangoVentas || "",
                intNumeroEmpleados: values.intNumeroEmpleados || "",
                strRangoEmpleados: values.strRangoEmpleados || "",
                strTipoEmpleoGenerado: values.strTipoEmpleoGenerado || "",
                strDlloAcitividadesContratados:
                    values.strDlloAcitividadesContratados || "",
                strPromedioTiempoInvertido:
                    values.strPromedioTiempoInvertido || "",
                strRolesEmprendimiento: values.strRolesEmprendimiento || [],
                strDiasProduccion: values.strDiasProduccion || "",
                strGeneraEmpleoRiesgoPobreza:
                    values.strGeneraEmpleoRiesgoPobreza || "",
                strActivos: values.strActivos || "",
                dblValorActivos: values.dblValorActivos || "",
                dblValorGananciasMes: values.dblValorGananciasMes || "",
                MinimoValorProducto: values.MinimoValorProducto || "",
                MaximoValorProducto: values.MaximoValorProducto || "",
                intCantidadUnidadesProducidasMes:
                    values.intCantidadUnidadesProducidasMes || "",
                strEscojaProductoServicio:
                    values.strEscojaProductoServicio || "",
                ValorVentaProductoEscogido:
                    values.ValorVentaProductoEscogido || "",
                strConoceMargenRentaProductoEscogido:
                    values.strConoceMargenRentaProductoEscogido || "",
                intPorcentajeMargenRentaProductoEscogido:
                    values.intPorcentajeMargenRentaProductoEscogido || "",
                strConoceCostosProductoEscogido:
                    values.strConoceCostosProductoEscogido || "",
                CostoProduccionProductoEscogido:
                    values.CostoProduccionProductoEscogido || "",
                strPorcentajeIntermediacionVentas:
                    values.strPorcentajeIntermediacionVentas || "",
                strDefinePorcentajesCanal:
                    values.strDefinePorcentajesCanal || "",
                intRangoPorcentajeIntermediacionVentas:
                    values.intRangoPorcentajeIntermediacionVentas || "",
                btGeneraEmpleo: values.btGeneraEmpleo || "",
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
                            color: errors?.objInfoPerfilEco
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Perfil económico y productivo
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
                    borderColor: errors?.objInfoPerfilEco
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strOperacionesVentas6Meses}
                            name="objInfoPerfilEco.strOperacionesVentas6Meses"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿La empresa tiene operaciones de producción y venta en los últimos 6 meses de manera continua?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strOperacionesVentas6Meses
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strOperacionesVentas6Meses
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEtapaValidacion}
                            name="objInfoPerfilEco.strEtapaValidacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿En qué etapa de validación se encuentra tu producto?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    required
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strEtapaValidacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strEtapaValidacion?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="EtapaValidacionProducto"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid> */}

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.PromedioVentas6Meses}
                            name="objInfoPerfilEco.PromedioVentas6Meses"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Promedio de ventas de los últimos 6 meses"
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
                                        errors?.objInfoPerfilEco
                                            ?.PromedioVentas6Meses
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.PromedioVentas6Meses?.message ||
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
                            defaultValue={data.dblValorVentasMes}
                            name="objInfoPerfilEco.dblValorVentasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor de ventas del último mes"
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
                                        errors?.objInfoPerfilEco
                                            ?.dblValorVentasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.dblValorVentasMes?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita la cantidad",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                                        errors?.objInfoPerfilEco
                                            ?.dblValorGananciasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.dblValorGananciasMes?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita la cantidad",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRangoVentas}
                            name="objInfoPerfilEco.strRangoVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
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
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="RangoVentas"
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
                            defaultValue={data.strActivos}
                            name="objInfoPerfilEco.strActivos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Qué activos tiene la unidad productiva a la fecha?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    multiline
                                    minRows={3}
                                    error={
                                        errors?.objInfoPerfilEco?.strActivos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strActivos
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
                            defaultValue={data.dblValorActivos}
                            name="objInfoPerfilEco.dblValorActivos"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor estimado de los activos"
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
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.dblValorActivos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.dblValorActivos?.message ||
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
                            defaultValue={data.MinimoValorProducto}
                            name="objInfoPerfilEco.MinimoValorProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Rango de precios de productos mínimo"
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
                                        errors?.objInfoPerfilEco
                                            ?.MinimoValorProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.MinimoValorProducto?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.MaximoValorProducto}
                            name="objInfoPerfilEco.MaximoValorProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Rango de precios de productos máximo"
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
                                        errors?.objInfoPerfilEco
                                            ?.MaximoValorProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.MaximoValorProducto?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intCantidadUnidadesProducidasMes}
                            name="objInfoPerfilEco.intCantidadUnidadesProducidasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Cantidad de unidades producidas al mes actualmente"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.intCantidadUnidadesProducidasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.intCantidadUnidadesProducidasMes
                                            ?.message || "Digita la cantidad"
                                    }
                                    type="number"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEscojaProductoServicio}
                            name="objInfoPerfilEco.strEscojaProductoServicio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Escoja uno de los productos/servicios de su empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strEscojaProductoServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strEscojaProductoServicio
                                            ?.message || "Digita tu respuesta"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.ValorVentaProductoEscogido}
                            name="objInfoPerfilEco.ValorVentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="De acuerdo con el producto/servicio escogido ¿Cuál es el precio de venta de este?"
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
                                        errors?.objInfoPerfilEco
                                            ?.ValorVentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.ValorVentaProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strConoceMargenRentaProductoEscogido
                            }
                            name="objInfoPerfilEco.strConoceMargenRentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Del producto escogido ¿Tiene conocimiento de cuál es el margen de rentabilidad?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strConoceMargenRentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strConoceMargenRentaProductoEscogido
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.intPorcentajeMargenRentaProductoEscogido
                            }
                            name="objInfoPerfilEco.intPorcentajeMargenRentaProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿Cuál es el margen de utilidad de este producto?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    suffix={"%"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.intPorcentajeMargenRentaProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.intPorcentajeMargenRentaProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strConoceCostosProductoEscogido}
                            name="objInfoPerfilEco.strConoceCostosProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Conoce los costos de producción de este producto?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strConoceCostosProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strConoceCostosProductoEscogido
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.CostoProduccionProductoEscogido}
                            name="objInfoPerfilEco.CostoProduccionProductoEscogido"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿Cuáles son los costos de producción asociados a este producto?"
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
                                        errors?.objInfoPerfilEco
                                            ?.CostoProduccionProductoEscogido
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.CostoProduccionProductoEscogido
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strPorcentajeIntermediacionVentas
                            }
                            name="objInfoPerfilEco.strPorcentajeIntermediacionVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Tiene porcentaje(s) estimados para la intermediación en ventas?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strPorcentajeIntermediacionVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strPorcentajeIntermediacionVentas
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strDefinePorcentajesCanal}
                            name="objInfoPerfilEco.strDefinePorcentajesCanal"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="En caso de que la pregunta anterior sea afirmativa, ¿tiene definido este porcentaje, de acuerdo con cada canal?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strDefinePorcentajesCanal
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strDefinePorcentajesCanal
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.intRangoPorcentajeIntermediacionVentas
                            }
                            name="objInfoPerfilEco.intRangoPorcentajeIntermediacionVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="¿De cuánto es el rango o porcentaje definido?"
                                    name={name}
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    suffix="%"
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.intRangoPorcentajeIntermediacionVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.intRangoPorcentajeIntermediacionVentas
                                            ?.message || "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGeneraEmpleo}
                            name="objInfoPerfilEco.btGeneraEmpleo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo para otras personas?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPerfilEco?.btGeneraEmpleo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.btGeneraEmpleo
                                            ?.message ||
                                        "Selecciona una opción"
                                    }
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona una opción";
                                    }
                                },
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
                                        errors?.objInfoPerfilEco
                                            ?.intNumeroEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.intNumeroEmpleados?.message ||
                                        "Digita la cantidad"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, digita la cantidad";
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
                                <SelectListas
                                    label="Rango de empleados"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strRangoEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strRangoEmpleados?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="RangoEmpleados"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTipoEmpleoGenerado}
                            name="objInfoPerfilEco.strTipoEmpleoGenerado"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Qué tipo de empleo genera?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strTipoEmpleoGenerado
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strTipoEmpleoGenerado?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="TipoEmpleoGenera"
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
                                            ?.strDlloAcitividadesContratados
                                            ?.message ||
                                        "Digita tu respuesta"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        validator.isLength(value, { min: 100 })
                                    ) {
                                        return "El número maximo de carácteres es de 100";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPromedioTiempoInvertido}
                            name="objInfoPerfilEco.strPromedioTiempoInvertido"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
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
                                            ?.strPromedioTiempoInvertido
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="PromedioTiempoInvertido"
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
                                <DropdownLista
                                    label="¿Cuál son tus roles en la operación de tú emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strRolesEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strRolesEmprendimiento?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="RolesOperacion"
                                    multiple
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
                                <SelectListas
                                    label="¿En promedio al día cuántas horas dispones para la producción?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strDiasProduccion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strDiasProduccion?.message ||
                                        "Digita tu respuesta"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="PromedioDiaHorasProduccion"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, degita tu respuesta",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strGeneraEmpleoRiesgoPobreza}
                            name="objInfoPerfilEco.strGeneraEmpleoRiesgoPobreza"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Genera empleo o ingresos para personas que se encuentren en riesgo de pobreza o de exclusión social?"
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
                                            ?.strGeneraEmpleoRiesgoPobreza
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="GeneraEmpleoRiesgoPobreza"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPerfilEco;
