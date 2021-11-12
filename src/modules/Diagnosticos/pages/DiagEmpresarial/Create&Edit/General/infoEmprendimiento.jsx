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
} from "@mui/material";

import { DatePicker } from "@mui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectLugarOperacion from "../../../../../Empresarios/components/selectLugarOperacion";
import DropdownLocalizaciones from "../../../../../Empresarios/components/dropdownLocalizaciones";
import ModalDireccionResidencia from "../../../../../Empresarios/components/modalDireccionResidencia";

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
        dtFechaInicioOperacion: null,
        strLugarOperacion: "",
        arrDepartamento: [],
        arrCiudad: [],
        strBarrio: "",
        strDireccionResidencia: "",
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
                            color: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
                        }}
                    >
                        Información del emprendimiento/unidad productiva/microempresa
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
                    borderColor: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUnidadProductiva}
                            name="objInfoEmprendimiento.strUnidadProductiva"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la unidad productiva"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strUnidadProductiva
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strUnidadProductiva
                                            ?.message ||
                                        "Digita el nombre de la unidad productiva"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre de la unidad productiva",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaInicioOperacion}
                            name="objInfoEmprendimiento.dtFechaInicioOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="¿En qué año inició la operación?"
                                    value={value}
                                    onChange={(date) => onChange(date)}
                                    disabled
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            name={name}
                                            variant="standard"
                                            error={
                                                errors?.objInfoEmprendimiento
                                                    ?.dtFechaInicioOperacion
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objInfoEmprendimiento
                                                    ?.dtFechaInicioOperacion?.message ||
                                                "Fecha de la última vez que se actualizó el diagnóstico"
                                            }
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strLugarOperacion}
                            name="objInfoEmprendimiento.strLugarOperacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectLugarOperacion
                                    label="Lugar de operación de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento?.strLugarOperacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strLugarOperacion
                                            ?.message ||
                                        "Selecciona el lugar donde opera la empresa"
                                    }
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el lugar donde opera la unidad productiva de la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmprendimiento.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    name={name}
                                    value={value}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrDepartamento", value);
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrDepartamento
                                            ?.message ||
                                        "Selecciona el departamento de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrCiudad}
                            name="objInfoEmprendimiento.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrCiudad", value);
                                    }}
                                    error={
                                        errors?.objInfoEmprendimiento?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={data.arrDepartamento?.region_name}
                                    helperText={
                                        errors?.objInfoEmprendimiento?.arrCiudad
                                            ?.message ||
                                        "Selecciona la ciudad de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strBarrio}
                            name="objInfoEmprendimiento.strBarrio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Barrio/Corregimiento/Vereda"
                                    name={name}
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEmprendimiento?.strBarrio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strBarrio
                                            ?.message ||
                                        "Selecciona el barrio/corregimiento/vereda de la empresa"
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strDireccionResidencia}
                            name="objInfoEmprendimiento.strDireccionResidencia"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalDireccionResidencia
                                    label="Dirección de la empresa"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={
                                        data.strLugarOperacion === "Desde la vivienda"
                                            ? true
                                            : disabled
                                    }
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strDireccionResidencia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strDireccionResidencia?.message ||
                                        "Digita la dirección de la empresa"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strUbicacionUP}
                            name="objInfoEmprendimiento.strUbicacionUP"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Ubicación de la UP (Urbana o Rural)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmprendimiento?.strUbicacionUP
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strUbicacionUP
                                            ?.message ||
                                        "Selecciona la ubicación de la UP (Urbana o Rural)"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la ubicación de la UP (Urbana o Rural)",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEmprendimiento;
