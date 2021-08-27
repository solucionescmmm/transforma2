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
} from "@material-ui/core";

import { DatePicker } from "@material-ui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

//Componentes
import Dropzone from "../../../../common/components/dropzone";
import SelectUnidadOperativa from "../../components/selectUnidadOperativa";
import SelectSectorEconomico from "../../components/selectSectorEconomico";
import SelectCategoriaProducto from "../../components/selectCategoriaProducto";
import DropdownCategoriaServicio from "../../components/dropdownCategoriaServicio";
import DropdrownMediosComunicacion from "../../components/dropdownMediosComunicacion";

const InfoEmpresa = ({
    disabled,
    values,
    errors,
    control,
    isEdit,
    setValue,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        fileLogoEmpresa: null,
        strNombreMarca: "",
        dtFechaFundacion: null,
        intIdUnidadProdOperacion: "",
        strDireccion: "",
        strMunicipio: "",
        strBarrio: "",
        intIdSectorEconomico: "",
        intEstrato: "",
        intIdCategoriaProducto: "",
        strOtraCategoriaProducto: "",
        intIdCategoriaServicio: [],
        btGeneraEmpleo: "",
        intNumeroEmpleados: "",
        valorVentasMes: "",
        objMediosUtilizadosVentas: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlderChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (values && isEdit) {
            setData({
                intIdEspacioJornada: values.intIdEspacioJornada || "",
                intIdEstado: values.intIdEstado || "",
                intIdSede: values.intIdSede || "",
                intIdTipoEmpresario: values.intIdTipoEmpresario || "",
                dtFechaVinculacion: values.dtFechaVinculacion || null,
            });
        }

        setLoading(false);
    }, [values, isEdit]);

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
                            color: errors?.objInfoEmpresa ? "#D33030" : "inherit",
                        }}
                    >
                        Información de la empresa
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()}>
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
                    borderColor: errors?.objInfoEmpresa ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.fileLogoEmpresa}
                            name="objInfoEmpresa.fileLogoEmpresa"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Logo de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    error={
                                        errors?.objInfoEmpresa?.fileLogoEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.fileLogoEmpresa
                                            ?.message ||
                                        "Selecciona el logo de la empresa."
                                    }
                                    setError={setError}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombreMarca}
                            name="objInfoEmpresa.strNombreMarca"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la marca"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strNombreMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strNombreMarca?.message ||
                                        "Digita el nombre de la marca."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita el nombre de la marca.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaFundacion}
                            name="objInfoEmpresa.dtFechaFundacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de fundación"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled={disabled}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            variant="standard"
                                            required
                                            error={
                                                errors?.objInfoEmpresa?.dtFechaFundacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEmpresa?.dtFechaFundacion
                                                    ?.message ||
                                                "Selecciona la fecha de fundación."
                                            }
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona la fecha de fundación.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdUnidadProdOperacion}
                            name="objInfoEmpresa.intIdUnidadProdOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectUnidadOperativa
                                    label="Unidad operativa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.intIdUnidadProdOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intIdUnidadProdOperacion
                                            ?.message ||
                                        "Selecciona el lugar donde opera la unidad operativa del empresario."
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el lugar donde opera la unidad operativa del empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strDireccion}
                            name="strDireccion"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Dirección de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strDireccion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strDireccion?.message ||
                                        "Digite la dirección de la empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strMunicipio}
                            name="objInfoEmpresa.strMunicipio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Municipio de la empresa"
                                    disabled={disabled}
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strMunicipio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strMunicipio?.message ||
                                        "Digite el municipio de la empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strBarrio}
                            name="objInfoEmpresa.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda de la empresa"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strBarrio ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strBarrio?.message ||
                                        "Digite el Barrio/Corregimiento/Vereda de la empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdSectorEconomico}
                            name="objInfoEmpresa.intIdSectorEconomico"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSectorEconomico
                                    label="Sector económico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.intIdSectorEconomico
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intIdSectorEconomico
                                            ?.message ||
                                        "Selecciona el sector económico de la empresa."
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el sector económico de la empresa.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intEstrato}
                            name="objInfoEmpresa.intEstrato"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estrato socioeconómico de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.intEstrato ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intEstrato?.message ||
                                        "Seleccione el estrato socioeconómico de la empresa"
                                    }
                                >
                                    {(() => {
                                        let arrItems = [6];

                                        return arrItems.map((e, i) => (
                                            <MenuItem key={i} value={i}>
                                                {i}
                                            </MenuItem>
                                        ));
                                    })()}
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdCategoriaProducto}
                            name="objInfoEmpresa.intIdCategoriaProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCategoriaProducto
                                    label="Categoría de producto"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlderChangeData(e.target.name, e.target.value);
                                        setValue(
                                            "objInfoEmpresa.strOtraCategoriaProducto",
                                            ""
                                        );
                                    }}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.intIdCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intIdCategoriaProducto
                                            ?.message ||
                                        "Selecciona la categoría del producto."
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la categoría del producto.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtraCategoriaProducto}
                            name="objInfoEmpresa.strOtraCategoriaProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otro ¿cuál?"
                                    name={name}
                                    value={value}
                                    disabled={
                                        data.intIdCategoriaProducto !== "Otro"
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strOtraCategoriaProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strOtraCategoriaProducto
                                            ?.message ||
                                        "En caso de que aplique, digita cual seria la otra categoría del producto."
                                    }
                                    required={
                                        data.intIdCategoriaProducto === "Otro"
                                            ? true
                                            : false
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.intIdCategoriaProducto !== "Otro") {
                                        if (value === "" || value === undefined) {
                                            return "Por favor, digita cual seria la otra categoría del producto.";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdCategoriaServicio}
                            name="objInfoEmpresa.intIdCategoriaServicio"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownCategoriaServicio
                                    label="Categoría de servicio"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.intIdCategoriaServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intIdCategoriaServicio
                                            ?.message ||
                                        "Selecciona la categoría del servicio."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGeneraEmpleo}
                            name="objInfoEmpresa.btGeneraEmpleo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlderChangeData(e.target.name, e.target.value);
                                        setValue("objInfoEmpresa.intNumeroEmpleados", "");
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.btGeneraEmpleo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.btGeneraEmpleo?.message ||
                                        "Selecciona si la empresa genera empleo o no."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa genera empleo o no.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intNumeroEmpleados}
                            name="objInfoEmpresa.intNumeroEmpleados"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de empleos generados"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    type="numeric"
                                    fullWidth
                                    variant="standard"
                                    disabled={data.btGeneraEmpleo ? false : disabled}
                                    required={data.btGeneraEmpleo ? true : false}
                                    error={
                                        errors?.objInfoEmpresa?.intNumeroEmpleados
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.intNumeroEmpleados
                                            ?.message ||
                                        "Digita la cantidad de empleos generados."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btGeneraEmpleo) {
                                        if (value === "" || value === undefined) {
                                            return "Por favor, digita la cantidad de empleos generados.";
                                        }

                                        let intNumeroEmpleados = parseInt(value);

                                        if (intNumeroEmpleados < 1) {
                                            return "La cantidad de empleados no pueden ser inferiores a 1.";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.valorVentasMes}
                            name="objInfoEmpresa.valorVentasMes"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    label="Valor promedio de las ventas mensuales"
                                    name={name}
                                    value={value}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={"$"}
                                    customInput={TextField}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmpresa?.valorVentasMes
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.valorVentasMes?.message ||
                                        "Digita la cantidad promedio de las ventas mensuales."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita la cantidad promedio de las ventas mensuales.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.objMediosUtilizadosVentas}
                            name="objInfoEmpresa.objMediosUtilizadosVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdrownMediosComunicacion
                                    label="Medios que utilice para la venta de sus productos o servicios"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresa?.objMediosUtilizadosVentas
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.objMediosUtilizadosVentas
                                            ?.message ||
                                        "Seleccione los medios que utilice para la venta de sus productos o servicios."
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

export default InfoEmpresa;
