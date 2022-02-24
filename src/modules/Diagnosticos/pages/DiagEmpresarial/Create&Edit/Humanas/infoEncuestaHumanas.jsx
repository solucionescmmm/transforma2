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
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";

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
        strMotivaciones: "",
        strNivelVida: "",
        strRedesApoyoOtros: "",
        strProyectoVidaEmpresa: "",
        strHabilidadesAutonomia: "",
        strHabilidadesCapacidad: "",
        strHabilidadesComuniacion: "",
        strProyectoVidaEmprendimiento: "",
        strHabilidadesCreatividad: "",
        strConfianza: "",
        strEquilibrioVida: "",
        strRedesApoyoPropia: "",
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
                strTomaDesiciones: values.strTomaDesiciones || "",
                strMotivaciones: values.strMotivaciones || "",
                strNivelVida: values.strNivelVida || "",
                strRedesApoyoOtros: values.strRedesApoyoOtros || "",
                strProyectoVidaEmpresa: values.strProyectoVidaEmpresa || "",
                strHabilidadesAutonomia: values.strHabilidadesAutonomia || "",
                strHabilidadesCapacidad: values.strHabilidadesCapacidad || "",
                strHabilidadesComuniacion: values.strHabilidadesComuniacion || "",
                strProyectoVidaEmprendimiento: values.strProyectoVidaEmprendimiento || "",
                strHabilidadesCreatividad: values.strHabilidadesCreatividad || "",
                strConfianza: values.strConfianza || "",
                strEquilibrioVida: values.strEquilibrioVida || "",
                strRedesApoyoPropia: values.strRedesApoyoPropia || "",
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
                        Componente financiero
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
                    borderColor: errors?.objInfoEncuestaHumanas ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strTomaDesiciones"
                            defaultValue={data.str}
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
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strMotivaciones"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuál es tú principal motivación para emprender?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strMotivaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strMotivaciones?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="Motivaciones"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strNivelVida"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Desde que inició su empresa hasta hoy, cuánto ha influido en el nivel de vida de su familia(ingresos, salud, educación…)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strNivelVida
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strNivelVida?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="NivelVida"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strRedesApoyoOtros"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿En quiénes usted ha encontrado apoyo para salir adelante con su emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoOtros
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoOtros?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="RedesApoyoOtros"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strProyectoVidaEmpresa"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿En su momento actual de desarrollo, cuánto diría que su empresa se ha convertido en su proyecto de vida?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmpresa?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="ProyectoVidaEmpresa"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesAutonomia"
                            defaultValue={data.str}
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
                                            ?.strHabilidadesAutonomia?.message ||
                                        "Seleccione una opción"
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
                            defaultValue={data.str}
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
                                            ?.strHabilidadesCapacidad?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCapacidad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesComuniacion"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Comunicación efectiva con los clientes, con los empleados, los proveedores"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComuniacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComuniacion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesComunicacion"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strProyectoVidaEmprendimiento"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Consideras que el emprendimiento, te permite cumplir tus aspiraciones y proyectos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmprendimiento?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="ProyectoVidaEmprendimiento"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesCreatividad"
                            defaultValue={data.str}
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
                                            ?.strHabilidadesCreatividad?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCreatividad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strConfianza"
                            defaultValue={data.str}
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
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strEquilibrioVida"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="En tú rutina realizas actividades de descanso y esparcimiento (Ejemplos: leer, tocar un instrumento, bailar, compartir con amistades, estudiar, orar, deportivas, entre otros)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strEquilibrioVida
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strEquilibrioVida?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="EquilibrioVida"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strRedesApoyoPropia"
                            defaultValue={data.str}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Evalúe su capacidad, su actitud para crear redes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoPropia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoPropia?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="RedesApoyoPropia"
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
