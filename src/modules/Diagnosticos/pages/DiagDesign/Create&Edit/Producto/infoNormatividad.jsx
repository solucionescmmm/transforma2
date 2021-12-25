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
    CircularProgress,
    TextField,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";

const InfoNormatividad = ({
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
        strPermisoFuncionamiento: "",
        strCertificadosRequeridos: "",
        strCertificadosActuales: "",
        strRegistroMarca: "",
        strPatentesUtilidad: "",
        strCualPatenteUtilidad: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
                strPermisoFuncionamiento: values.strPermisoFuncionamiento || "",
                strCertificadosRequeridos: values.strCertificadosRequeridos || "",
                strCertificadosActuales: values.strCertificadosActuales || "",
                strRegistroMarca: values.strRegistroMarca || "",
                strPatentesUtilidad: values.strPatentesUtilidad || "",
                strCualPatenteUtilidad: values.strCualPatenteUtilidad || "",
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
                            color: errors?.objNormatividad ? "#D33030" : "inherit",
                        }}
                    >
                        Normatividad
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
                    borderColor: errors?.objNormatividad ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="objNormatividad.strPermisoFuncionamiento"
                            defaultValue={data.strPermisoFuncionamiento}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿La unidad productiva o empresa requiere algún permiso, registro, licencia de funcionamiento o similares para su operación?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strPermisoFuncionamiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strPermisoFuncionamiento
                                            ?.message || "Seleccione una opción"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objNormatividad.strCertificadosRequeridos"
                            defaultValue={data.strCertificadosRequeridos}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que requieren?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strCertificadosRequeridos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strCertificadosRequeridos
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objNormatividad.strCertificadosActuales"
                            defaultValue={data.strCertificadosActuales}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que tiene actualmente?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strCertificadosActuales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strCertificadosActuales
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objNormatividad.strCertificadosActuales"
                            defaultValue={data.strCertificadosActuales}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que tiene actualmente?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strCertificadosActuales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strCertificadosActuales
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objNormatividad.strRegistroMarca"
                            defaultValue={data.strRegistroMarca}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuenta con registro de marca?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strRegistroMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strRegistroMarca
                                            ?.message || "Seleccione una opción"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objNormatividad.strPatentesUtilidad"
                            defaultValue={data.strPatentesUtilidad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuenta con patentes de modelo de utilidad?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(name, e.target.value);

                                        setValue(
                                            "objNormatividad.strCualPatenteUtilidad",
                                            ""
                                        );

                                        handlerChangeData("strCualPatenteUtilidad", "");
                                    }}
                                    error={
                                        errors?.objNormatividad?.strPatentesUtilidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strPatentesUtilidad
                                            ?.message || "Seleccione una opción"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objNormatividad.strCualPatenteUtilidad"
                            defaultValue={data.strCualPatenteUtilidad}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuál?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objNormatividad?.strCualPatenteUtilidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objNormatividad?.strCualPatenteUtilidad
                                            ?.message ||
                                        "Digite el detalle en caso de que aplique"
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (data.strPatentesUtilidad === "Sí") {
                                        if (!value) {
                                            return "Por favor, digite cual";
                                        }
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

export default InfoNormatividad;
