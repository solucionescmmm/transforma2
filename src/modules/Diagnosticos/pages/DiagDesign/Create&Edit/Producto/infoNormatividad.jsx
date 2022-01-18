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
                strCertificadosRequeridos:
                    values.strCertificadosRequeridos || "",
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
                            color: errors?.objInfoNormatividad
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Normatividad
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
                    borderColor: errors?.objInfoNormatividad
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="objInfoNormatividad.strPermisoFuncionamiento"
                            defaultValue={data.strPermisoFuncionamiento}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿La unidad productiva o empresa requiere algún permiso, registro, licencia de funcionamiento o similares para su operación?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strPermisoFuncionamiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strPermisoFuncionamiento
                                            ?.message || "Seleccione una opción"
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
                            name="objInfoNormatividad.strCertificadosRequeridos"
                            defaultValue={data.strCertificadosRequeridos}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que requieren?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strCertificadosRequeridos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strCertificadosRequeridos
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
                            name="objInfoNormatividad.strCertificadosActuales"
                            defaultValue={data.strCertificadosActuales}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las certificaciones que tiene actualmente?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strCertificadosActuales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strCertificadosActuales
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
                            name="objInfoNormatividad.strRegistroMarca"
                            defaultValue={data.strRegistroMarca}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuenta con registro de marca?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strRegistroMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strRegistroMarca?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoNormatividad.strPatentesUtilidad"
                            defaultValue={data.strPatentesUtilidad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuenta con patentes de modelo de utilidad?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData(
                                            "strPatentesUtilidad",
                                            e.target.value
                                        );

                                        setValue(
                                            "objInfoNormatividad.strCualPatenteUtilidad",
                                            ""
                                        );

                                        handlerChangeData(
                                            "strCualPatenteUtilidad",
                                            ""
                                        );
                                    }}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strPatentesUtilidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strPatentesUtilidad?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoNormatividad.strCualPatenteUtilidad"
                            defaultValue={data.strCualPatenteUtilidad}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuál?"
                                    name={name}
                                    value={value}
                                    disabled={
                                        !data.strPatentesUtilidad ||
                                        data.strPatentesUtilidad === "NO"
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoNormatividad
                                            ?.strCualPatenteUtilidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoNormatividad
                                            ?.strCualPatenteUtilidad?.message ||
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
