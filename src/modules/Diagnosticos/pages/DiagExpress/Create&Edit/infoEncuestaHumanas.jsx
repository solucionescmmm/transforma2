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
    CardContent,
    Card,
} from "@mui/material";

import { blue } from "@mui/material/colors";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../components/selectLista";

const InfoEncuestaHumanas = ({
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
        strTomaDesiciones: "",
        strHabilidadesAutonomia: "",
        strHabilidadesCapacidad: "",
        strHabilidadesComunicacion: "",
        strHabilidadesCreatividad: "",
        strConfianza: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strTomaDesiciones: values.strTomaDesiciones || "",
                strHabilidadesAutonomia: values.strHabilidadesAutonomia || "",
                strHabilidadesCapacidad: values.strHabilidadesCapacidad || "",
                strHabilidadesComunicacion:
                    values.strHabilidadesComunicacion || "",
                strHabilidadesCreatividad:
                    values.strHabilidadesCreatividad || "",
                strConfianza: values.strConfianza || "",
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
                            color: errors?.objInfoEncuestaHumanas
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente humano
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
                    borderColor: errors?.objInfoEncuestaHumanas
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Toma de decisiones
                                </Typography>
                                <Typography variant="body2">
                                    Los negocios se enfrentan a permanentes
                                    cambios, a innovaciones y no siempre es
                                    fácil tomar e implementar las decisiones con
                                    oportunidad.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strTomaDesiciones"
                            defaultValue={data.strTomaDesiciones}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cómo se siente al momento de tomar las decisiones en su emprendimiento? "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strTomaDesiciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strTomaDesiciones?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="TomaDesiciones"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px"
                                    }}
                                >
                                    Habilidades personales para emprender
                                </Typography>
                                <Typography variant="body2">
                                    Las personas empresarias siempre desean
                                    contar con todas las habilidades que se
                                    requieren para su desarrollo empresarial,
                                    sin embargo, el desarrollo de estas es un
                                    proceso que está en permanente desarrollo{" "}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesAutonomia"
                            defaultValue={data.strHabilidadesAutonomia}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Autonomía para el manejo de su negocio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesAutonomia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesAutonomia
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesAutonomia"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesCapacidad"
                            defaultValue={data.strHabilidadesCapacidad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Capacidad de adaptarse a los cambios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCapacidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCapacidad
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCapacidad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesCreatividad"
                            defaultValue={data.strHabilidadesCreatividad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Creatividad en productos y en procesos productivos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCreatividad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCreatividad
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCreatividad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesComunicacion"
                            defaultValue={data.strHabilidadesComunicacion}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Comunicación efectiva con los clientes, con los empleados, los proveedores"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComunicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComunicacion
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesComunicacion"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px"
                                    }}
                                >
                                    Confianza
                                </Typography>
                                <Typography variant="body2">
                                    La capacitación, el conocimiento, y las
                                    experiencias adquiridas, van generando
                                    certezas que permiten construir confianza y
                                    facilitan el actuar certero de la persona
                                    empresaria
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strConfianza"
                            defaultValue={data.strConfianza}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="De acuerdo con las experiencias y el conocimiento adquirido en su actuar empresarial, en la siguiente escala en qué nivel confianza se ubicaría"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strConfianza
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strConfianza?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="Confianza"
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

export default InfoEncuestaHumanas;
