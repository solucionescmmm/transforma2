import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

// Hooks
import useGetTiposServicio from "../../../hooks/useGetTiposServicio";

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

import { DatePicker } from "@mui/lab";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectTipoServicio from "../../../components/selectTipoServicio";
import SelectEstados from "../../../components/selectEstado";

const InfoPrincipal = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    onChangeModules,
    onChangeTipoServicio,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        intIdEstado: "",
        intIdTipoServicio: "",
        strNombre: "",
        strDescripcion: "",
        dtFechaInicio: null,
        intTiempo: "",
        bitModulos: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const { getUniqueData: getDataTipoServicio } = useGetTiposServicio({
        autoLoad: false,
    });

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (Object.keys(values).length > 0) {
            setData({
                intIdEstado: values.intIdEstado,
                intIdTipoServicio: values.intIdTipoServicio,
                strNombre: values.strNombre,
                strDescripcion: values.strDescripcion,
                dtFechaInicio: values.dtFechaInicio,
                intTiempo: values.intTiempo,
                bitModulos: values.bitModulos,
            });
        }

        setLoading(false);
    }, [values]);

    const fntGetData = async (intIdTipoServicio) => {
        const response = await getDataTipoServicio({
            intId: intIdTipoServicio,
        });

        onChangeTipoServicio(response.data.data[0]);
    };

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
                            color: errors?.objInfoPrincipal
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información principal
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
                    borderColor: errors?.objInfoPrincipal
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoPrincipal.intIdEstado"
                            defaultValue={data.intIdEstado}
                            render={({ field: { name, value, onChange } }) => (
                                <SelectEstados
                                    label="Estado"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        setData((prevState) => ({
                                            ...prevState,
                                            intIdEstado: e.target.value,
                                        }));
                                    }}
                                    disabled={disabled}
                                    required
                                    error={
                                        !!errors.objInfoPrincipal?.intIdEstado
                                    }
                                    helperText={
                                        errors.objInfoPrincipal?.intIdEstado
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
                            name="objInfoPrincipal.bitModulos"
                            defaultValue={data.bitModulos}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿El servicio contiene módulos?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        onChangeModules(e.target.value);
                                        setValue("arrModulos", []);
                                    }}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.bitModulos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.bitModulos
                                            ?.message ||
                                        "Selecciona si el servicio contiene módulos"
                                    }
                                    select
                                >
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            rules={{
                                validate: (value) => {
                                    if (value === "") {
                                        return "Por favor, selecciona si el servicio contiene módulos";
                                    }
                                },
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.intIdTipoServicio"
                            defaultValue={data.intIdTipoServicio}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectTipoServicio
                                    label="Tipo de servicio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        fntGetData(e.target.value);
                                    }}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoPrincipal
                                            ?.intIdTipoServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal
                                            ?.intIdTipoServicio?.message ||
                                        "Selecciona un tipo de servicio"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, selecciona un tipo de servicio",
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.strNombre"
                            defaultValue={data.strNombre}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre del servicio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.strNombre
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strNombre
                                            ?.message ||
                                        "Digita el nombre del servicio"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita el nombre del servicio",
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.strDescripcion"
                            defaultValue={data.strDescripcion}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Descripción del servicio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.strDescripcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.strDescripcion
                                            ?.message ||
                                        "Digita la descripción del servicio"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita la descripción del servicio",
                            }}
                            control={control}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
