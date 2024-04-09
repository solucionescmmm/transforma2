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
    MenuItem
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../components/selectLista";

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
        PromedioVentas6Meses: "",
        strRangoVentas: "",
        strEscojaProductoServicio: "",
        ValorVentaProductoEscogido: "",
        strConoceMargenRentaProductoEscogido: "",
        strConoceCostosProductoEscogido: "",
        CostoProduccionProductoEscogido: "",
        intPorcentajeMargenRentaProductoEscogido: "",
        btGeneraEmpleo: "",
        intNumeroEmpleados: "",
        strRangoEmpleados: "",
        strEtapaDllo:"",
        strOperacionesVentas6Meses: "",
        strPrecProdServ: ""
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
            setData({
                PromedioVentas6Meses: values?.PromedioVentas6Meses || "",
                strRangoVentas: values?.strRangoVentas || "",
                strEscojaProductoServicio: values?.strEscojaProductoServicio || "",
                ValorVentaProductoEscogido: values?.ValorVentaProductoEscogido || "",
                strConoceMargenRentaProductoEscogido: values?.strConoceMargenRentaProductoEscogido || "",
                strConoceCostosProductoEscogido: values?.strConoceCostosProductoEscogido || "",
                CostoProduccionProductoEscogido: values?.CostoProduccionProductoEscogido || "",
                intPorcentajeMargenRentaProductoEscogido: values?.intPorcentajeMargenRentaProductoEscogido || "",
                btGeneraEmpleo: values?.btGeneraEmpleo || "",
                intNumeroEmpleados: values?.intNumeroEmpleados || "",
                strRangoEmpleados: values?.strRangoEmpleados || "",
                strEtapaDllo: values?.strEtapaDllo ||"",
                strOperacionesVentas6Meses: values?.strOperacionesVentas6Meses || "",
                strPrecProdServ: values?.strPrecProdServ || ""
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
                                        "Digita la cantidad promedio de las ventas de los últimos 6 meses"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita la cantidad promedio de las ventas de los últimos 6 meses",
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

                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6}>
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
                                    suffix="%"
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

        
                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6}>
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

              
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGeneraEmpleo}
                            name="objInfoPerfilEco.btGeneraEmpleo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo para otras personas?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlerChangeData(
                                            "btGeneraEmpleo",
                                            e.target.value
                                        );
                                        setValue(
                                            "objInfoPerfilEco.intNumeroEmpleados",
                                            ""
                                        );
                                    }}
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
                                        "Selecciona si la empresa genera empleo o no"
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
                                        return "Por favor, selecciona si la empresa genera empleo o no";
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
                                    disabled={
                                        !data.btGeneraEmpleo ? true : disabled
                                    }
                                    required={
                                        data.btGeneraEmpleo ? true : false
                                    }
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.intNumeroEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.intNumeroEmpleados?.message ||
                                        "Digita la cantidad de empleos generados"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btGeneraEmpleo) {
                                        if (
                                            value === "" ||
                                            value === undefined
                                        ) {
                                            return "Por favor, digita la cantidad de empleos generados";
                                        }

                                        let intNumeroEmpleados =
                                            parseInt(value);

                                        if (intNumeroEmpleados < 1) {
                                            return "La cantidad de empleados no pueden ser inferiores a 1";
                                        }
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
                                        errors?.objInfoPerfilEco?.strRangoEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco?.strRangoEmpleados
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="RangoEmpleados"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
{/* 
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEtapaDllo}
                            name="objInfoPerfilEco.strEtapaDllo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Etapa de desarrollo"
                                    name={name}
                                    value={value}
                                    disabled
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strEtapaDllo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strEtapaDllo
                                            ?.message ||
                                        "Etapa de desarrollo"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid> */}

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

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPrecProdServ}
                            name="objInfoPerfilEco.strPrecProdServ"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Cómo están definidos los precios de tus productos/servicios?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoPerfilEco
                                            ?.strPrecProdServ
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPerfilEco
                                            ?.strPrecProdServ
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="PrecProdServDef"
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
                            name="objInfoMercado.strUniProdSosFinan"
                            defaultValue={data.strUniProdSosFinan}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi unidad productiva es sostenible financieramente"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoMercado
                                            ?.strUniProdSosFinan
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoMercado
                                            ?.strUniProdSosFinan?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="UniProdSosFinan"
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

export default InfoPerfilEco;
