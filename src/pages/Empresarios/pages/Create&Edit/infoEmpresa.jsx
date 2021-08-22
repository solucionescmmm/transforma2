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

const InfoEmpresa = ({ disabled, values, errors, control, isEdit, setValue }) => {
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
                    <Typography style={{ fontWeight: "bold" }}>
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

            <hr />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.fileLogoEmpresa}
                            name="fileLogoEmpresa"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Logo de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    error={errors?.fileLogoEmpresa ? true : false}
                                    helperText={
                                        errors?.fileLogoEmpresa?.message ||
                                        "Selecciona el logo de la empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombreMarca}
                            name="strNombreMarca"
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
                                    error={errors?.strNombreMarca ? true : false}
                                    helperText={
                                        errors?.strNombreMarca?.message ||
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
                            name="dtFechaFundacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    value={value}
                                    onChange={(e, date) => onChange(date)}
                                    disabled={disabled}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            label="Fecha de fundación"
                                            variant="standard"
                                            required
                                            error={
                                                errors?.dtFechaFundacion ? true : false
                                            }
                                            helperText={
                                                errors?.dtFechaFundacion?.message ||
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
                            name="intIdUnidadProdOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectUnidadOperativa
                                    label="Unidad operativa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.intIdUnidadProdOperacion ? true : false
                                    }
                                    helperText={
                                        errors?.intIdUnidadProdOperacion?.messae ||
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
                                    error={errors?.strDireccion ? true : false}
                                    helperText={
                                        errors?.strDireccion?.messae ||
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
                            name="strMunicipio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Municipio de la empresa"
                                    disabled={disabled}
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.strMunicipio ? true : false}
                                    helperText={
                                        errors?.strMunicipio?.messae ||
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
                            name="strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda de la empresa"
                                    name={name}
                                    disabled={disabled}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.strBarrio ? true : false}
                                    helperText={
                                        errors?.strBarrio?.messae ||
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
                            name="intIdSectorEconomico"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectSectorEconomico
                                    label="Sector económico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={errors?.intIdSectorEconomico ? true : false}
                                    helperText={
                                        errors?.intIdSectorEconomico?.messae ||
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
                            name="intEstrato"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estrato socioeconómico de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.intEstrato ? true : false}
                                    helperText={
                                        errors?.intEstrato?.messae ||
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
                            name="intIdCategoriaProducto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCategoriaProducto
                                    label="Categoría de producto"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlderChangeData(e.target.name, e.target.value);
                                        setValue("strOtraCategoriaProducto", "");
                                    }}
                                    disabled={disabled}
                                    error={errors?.intIdCategoriaProducto ? true : false}
                                    helperText={
                                        errors?.intIdCategoriaProducto?.messae ||
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
                            name="strOtraCategoriaProducto"
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
                                        errors?.strOtraCategoriaProducto ? true : false
                                    }
                                    helperText={
                                        errors?.strOtraCategoriaProducto?.messae ||
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
                                        if (value === "") {
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
                            name="intIdCategoriaServicio"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownCategoriaServicio
                                    label="Categoría de servicio"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={errors?.intIdCategoriaServicio ? true : false}
                                    helperText={
                                        errors?.intIdCategoriaServicio?.messae ||
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
                            name="btGeneraEmpleo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿La empresa genera empleo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlderChangeData(e.target.name, e.target.value);
                                        setValue("intNumeroEmpleados", "");
                                    }}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={errors?.btGeneraEmpleo ? true : false}
                                    helperText={
                                        errors?.btGeneraEmpleo?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si la empresa genera empleo o no.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intNumeroEmpleados}
                            name="intNumeroEmpleados"
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
                                    error={errors?.intNumeroEmpleados ? true : false}
                                    helperText={
                                        errors?.intNumeroEmpleados?.messae ||
                                        "Digita la cantidad de empleos generados."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.btGeneraEmpleo) {
                                        if (value === "") {
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
                            name="valorVentasMes"
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
                                    error={errors?.valorVentasMes ? true : false}
                                    helperText={
                                        errors?.valorVentasMes?.messae ||
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
                            name="objMediosUtilizadosVentas"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdrownMediosComunicacion
                                    label="Medios que utilice para la venta de sus productos o servicios"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objMediosUtilizadosVentas ? true : false
                                    }
                                    helperText={
                                        errors?.objMediosUtilizadosVentas?.messae ||
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
