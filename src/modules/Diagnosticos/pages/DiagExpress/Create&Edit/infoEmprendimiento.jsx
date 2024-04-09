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
    TextField,
    CircularProgress,
    MenuItem,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectLugarOperacion from "../../../../Empresarios/components/selectLugarOperacion";
import ModalMediosVetanProductos from "../../../../Empresarios/components/modalMediosVentaProductos";
import ModalMediosDigitales from "../../../../Empresarios/components/modalMediosDigitales";
import SelectSectorEconomico from "../../../../Empresarios/components/selectSectorEconomico";
import SelectCategoriaServicio from "../../../../Empresarios/components/selectCategoriaServicio";
import SelectCategoriaProducto from "../../../../Empresarios/components/selectCategoriaProducto";
import SelectTiempoDedicacionEmpresa from "../../../../Empresarios/components/selectTiempoDedicacionEmpresa";
import DropdownCategoriasSecundarias from "../../../../Empresarios/components/dropdownCategoriasSecundarias";
import SelectListas from "../../../components/selectLista";

const InfoEmprendimiento = ({
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
        strUnidadProductiva: "",
        strLugarOperacion: "",
        arrFormasComercializacion: [],
        arrMediosDigitales: [],
        strTiempoDedicacion: "",
        strRegistroCamaraComercio: "",
        strSectorEconomico: "",
        strCategoriaProducto: "",
        strCategoriaServicio: "",
        strDefinineLineasProductoServicios: "",
        arrCategoriasSecundarias: [],
        strListadoProdServ: "",
        strLineaProductoServicioDestacada: "",
        btTieneProdServUltimoAn: "",
        strProductosNuevos: "",
        strProductoServiciosEnValidacion: "",
        strNivelDlloProductoServicios: "",
        strEtapaValidProductoServicios: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

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
            console.log(values)
            setData({
                strUnidadProductiva: values.strUnidadProductiva || "",
                strLugarOperacion: values.strLugarOperacion || "",
                arrFormasComercializacion: values.arrFormasComercializacion || [],
                arrMediosDigitales: values.arrMediosDigitales || [],
                strTiempoDedicacion: values.strTiempoDedicacion || "",
                strRegistroCamaraComercio:
                    values.strRegistroCamaraComercio || "",
                strSectorEconomico: values.strSectorEconomico || "",
                strCategoriaProducto: values.strCategoriaProducto || "",
                strCategoriaServicio: values.strCategoriaServicio || "",
                strDefinineLineasProductoServicios:
                    values.strDefinineLineasProductoServicios || "",
                arrCategoriasSecundarias: values.arrCategoriasSecundarias || [],
                strListadoProdServ:
                    values.strDescProductosServicios || "",
                strLineaProductoServicioDestacada:
                    values.strLineaProductoServicioDestacada || "",
                btTieneProdServUltimoAn: values.btTieneProdServUltimoAn || "",
                strProductosNuevos:
                    values.strProductosNuevos || "",
                strProductoServiciosEnValidacion:
                    values.strProductoServiciosEnValidacion || "",
                strNivelDlloProductoServicios:
                    values.strNivelDlloProductoServicios || "",
                strEtapaValidProductoServicios:
                    values.strEtapaValidProductoServicios || "",
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
                            color: errors?.objInfoEmprendimiento
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información del emprendimiento
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
                    borderColor: errors?.objInfoEmprendimiento
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    {/* strUnidadProductiva */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUnidadProductiva}
                            name="objInfoEmprendimiento.strUnidadProductiva"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strUnidadProductiva
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strUnidadProductiva?.message ||
                                        "Digita el nombre de la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre de la empresa",
                            }}
                        />
                    </Grid>
                    {/* strLugarOperacion */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarOperacion}
                            name="objInfoEmprendimiento.strLugarOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectLugarOperacion
                                    label="Lugar de operación de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strLugarOperacion",
                                            e.target.value
                                        );
                                    }}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strLugarOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strLugarOperacion?.message ||
                                        "Selecciona el lugar donde opera la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el lugar donde opera la empresa",
                            }}
                        />
                    </Grid>
                    {/* arrMediosDigitales */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDigitales}
                            name="objInfoEmprendimiento.arrMediosDigitales"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosDigitales
                                    label="Medios digitales"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrMediosDigitales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrMediosDigitales?.message ||
                                        "Selecciona los medios digitales que utilice y registre su ID"
                                    }
                                    required
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* arrFormasComercializacion */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrFormasComercializacion}
                            name="objInfoEmprendimiento.arrFormasComercializacion"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosVetanProductos
                                    label="Formas de comercialización"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrFormasComercializacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrFormasComercializacion
                                            ?.message ||
                                        "Selecciona los medios que utilice para la venta de sus productos o servicios"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strRegistroCamaraComercio */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRegistroCamaraComercio}
                            name="objInfoEmprendimiento.strRegistroCamaraComercio"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Cuenta con registro en cámara de comercio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strRegistroCamaraComercio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strRegistroCamaraComercio
                                            ?.message ||
                                        "Selecciona si la empresa cuenta con registro en la cámara de comercio"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strTiempoDedicacion */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTiempoDedicacion}
                            name="objInfoEmprendimiento.strTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiempoDedicacionEmpresa
                                    label="Tiempo de dedicación actual a la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion?.message ||
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
                    {/* strSectorEconomico */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strSectorEconomico}
                            name="objInfoEmprendimiento.strSectorEconomico"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSectorEconomico
                                    label="Sector económico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strSectorEconomico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strSectorEconomico?.message ||
                                        "Selecciona el sector económico de la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el sector económico de la empresa",
                            }}
                        />
                    </Grid>
                    {/* strCategoriaProducto */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCategoriaProducto}
                            name="objInfoEmprendimiento.strCategoriaProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCategoriaProducto
                                    label="Categoría de los productos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strCategoriaProducto",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmprendimiento.strCategoriaServicio",
                                            ""
                                        );
                                    }}
                                    disabled={
                                        data.strCategoriaServicio !== ""
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaProducto?.message ||
                                        "Selecciona la categoría de los productos"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strCategoriaServicio */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCategoriaServicio}
                            name="objInfoEmprendimiento.strCategoriaServicio"
                            render={({ field: { name, onChange, value } }) => (
                                <SelectCategoriaServicio
                                    label="Categoría de los servicios"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strCategoriaServicio",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoEmprendimiento.strCategoriaProducto",
                                            ""
                                        );
                                    }}
                                    disabled={
                                        data.strCategoriaProducto !== ""
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCategoriaServicio?.message ||
                                        "Selecciona la categoría de los servicios"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* Listado Prod/Serv */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strListadoProdServ}
                            name="objInfoEmprendimiento.strListadoProdServ"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Listado de los productos o servicios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strListadoProdServ
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strListadoProdServ?.message ||
                                        "Digita los productos o servicios que ofrece la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strDefinineLineasProductoServicios */}
     
                    {/* arrCategoriasSecundarias */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEmprendimiento.arrCategoriasSecundarias"
                            defaultValue={data.arrCategoriasSecundarias}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownCategoriasSecundarias
                                    label="Categorías secundarias"
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.arrCategoriasSecundarias
                                            ? true
                                            : false
                                    }
                                    multiple
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.arrCategoriasSecundarias
                                            ?.message ||
                                        "Selecciona las categorías secundarias en caso de que aplique"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={
                                data.strDefinineLineasProductoServicios
                            }
                            name="objInfoEmprendimiento.strDefinineLineasProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tiene definidas las líneas de productos/servicios del negocio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinineLineasProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDefinineLineasProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strLineaProductoServicioDestacada */}
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={
                                data.strLineaProductoServicioDestacada
                            }
                            name="objInfoEmprendimiento.strLineaProductoServicioDestacada"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuál es la línea de productos/servicios más destacada?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strLineaProductoServicioDestacada
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strLineaProductoServicioDestacada
                                            ?.message || "Digita tu respuesta"
                                    }
                                    multiline
                                    rows={4}
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    {/* strProductoServiciosNuevosUltimoAño */}
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.btTieneProdServUltimoAn}
                            name="objInfoEmprendimiento.btTieneProdServUltimoAn"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene productos/servicios nuevos en el último año o se encuentra renovando los productos actuales? "
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.btTieneProdServUltimoAn
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.btTieneProdServUltimoAn?.message ||
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
                    {/* strListaProductoServiciosNuevosUltimoAño */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={
                                data.strProductosNuevos
                            }
                            name="objInfoEmprendimiento.strProductosNuevos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuáles son estos productos nuevos?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductosNuevos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductosNuevos
                                            ?.message || "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strProductoServiciosEnValidacion}
                            name="objInfoEmprendimiento.strProductoServiciosEnValidacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Cuenta con productos/servicios en prototipado?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductoServiciosEnValidacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductoServiciosEnValidacion
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
                            defaultValue={data.strNivelDlloProductoServicios}
                            name="objInfoEmprendimiento.strNivelDlloProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Nivel de desarrollo del producto/servicio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strNivelDlloProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strNivelDlloProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="NivelDlloProductoServicio"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEtapaValidProductoServicios}
                            name="objInfoEmprendimiento.strEtapaValidProductoServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿En qué etapa de validación se encuentra el producto/servicio?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strEtapaValidProductoServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strEtapaValidProductoServicios
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="EtapaValidProductoServicios"
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

export default InfoEmprendimiento;
