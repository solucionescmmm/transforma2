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

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectTipoServicio from "../../../components/selectTipoServicio";
import SelectProyectoEs from "../../../components/selectProyectoEs";

const InfoPrincipal = ({
    data: dataServicios,
    isEdit,
    disabled,
    values,
    errors,
    control,
    setValue,
    onChangeModules,
    onChangeTipoServicio,
    isPreview,
    watch,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        intId: "",
        intIdTipoServicio: "",
        strNombre: "",
        strDescripcion: "",
        dtFechaInicio: null,
        intTiempo: "",
        intIdProyectoEs: "",
        bitProyectoEs: "",
        bitModulos: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

    const { getUniqueData: getDataTipoServicio } = useGetTiposServicio({
        autoLoad: false,
    });

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        setLoading(true);

        if (Object.keys(values).length > 0) {
            setData({
                intId: values.intId,
                intIdTipoServicio: values.intIdTipoServicio,
                strNombre: values.strNombre,
                strDescripcion: values.strDescripcion,
                dtFechaInicio: values.dtFechaInicio,
                intTiempo: values.intTiempo,
                bitProyectoEs: values.bitProyectoEs,
                bitModulos: values.bitModulos,
            });

            fntGetData(values.intIdTipoServicio);
        }

        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const fntGetData = async (intIdTipoServicio) => {
        const response = await getDataTipoServicio({
            intId: intIdTipoServicio,
        });

        await onChangeTipoServicio(response.data.data[0]);
    };

    const watchBitProyectoEs = watch("objInfoPrincipal.bitProyectoEs");

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
                                    disabled={
                                        isEdit || isPreview ? true : disabled
                                    }
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
                                    required
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

                                validate: (value) => {
                                    if (isEdit) {
                                        if (
                                            dataServicios?.find(
                                                (a) =>
                                                    a.objInfoPrincipal.strNombre.toLowerCase() ===
                                                        value.toLowerCase() &&
                                                    a.objInfoPrincipal.intId !==
                                                        data.intId
                                            )
                                        ) {
                                            return `Ya existe un servicio registrado como ${value}`;
                                        }
                                    } else {
                                        if (
                                            dataServicios?.find(
                                                (a) =>
                                                    a.objInfoPrincipal.strNombre.toLowerCase() ===
                                                    value.toLowerCase()
                                            )
                                        ) {
                                            return `Ya existe un servicio registrado como ${value}`;
                                        }
                                    }
                                },
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
                                    required
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

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoPrincipal.bitProyectoEs"
                            defaultValue={data.bitProyectoEs}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿El servicio contiene un proyecto especial?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        onChangeModules(e.target.value);
                                        setValue("arrModulos", []);
                                    }}
                                    required
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoPrincipal?.bitProyectoEs
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoPrincipal?.bitProyectoEs
                                            ?.message ||
                                        "Selecciona si el servicio contiene un proyecto especial"
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
                                        return "Por favor, selecciona si el servicio contiene un proyecto especial";
                                    }
                                },
                            }}
                            control={control}
                        />
                    </Grid>

                    {watchBitProyectoEs && (
                        <Grid item xs={12}>
                            <Controller
                                name="objInfoPrincipal.intIdProyectoEs"
                                defaultValue={data.intIdProyectoEs}
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <SelectProyectoEs
                                        label="Proyecto especial"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            onChangeModules(e.target.value);
                                            setValue("arrModulos", []);
                                        }}
                                        required
                                        disabled={disabled}
                                        error={
                                            errors?.objInfoPrincipal
                                                ?.bitProyectoEs
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errors?.objInfoPrincipal
                                                ?.bitProyectoEs?.message ||
                                            "Selecciona si el servicio contiene un proyecto especial"
                                        }
                                    />
                                )}
                                rules={{
                                    validate: (value) => {
                                        if (value === "") {
                                            return "Por favor, selecciona si el servicio contiene un proyecto especial";
                                        }
                                    },
                                }}
                                control={control}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12}>
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
                                    required
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
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoPrincipal;
