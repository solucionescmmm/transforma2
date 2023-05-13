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

const InfoEmpresa = ({
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
        strHistoriaEmpresa: "",
        strSuenioEmpresa: "",
        strEstudioEmprendimiento: "",
        strExperienciaEmprendimiento: "",
        strTipoContribuyente: "",
        strRut: "",
        strPresupuestoFamiliar: "",
        strIngresosDistintos: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
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
                            color: errors?.objInfoEmpresa ? "#D33030" : "inherit",
                        }}
                    >
                        Profundización información de la empresa
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
                    borderColor: errors?.objInfoEmpresa ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strHistoriaEmpresa}
                            name="objInfoEmpresa.strHistoriaEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cómo nace la empresa? - Historia"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmpresa?.strHistoriaEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strHistoriaEmpresa
                                            ?.message ||
                                        "Digita con detalle como nace la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita con detalle como nace la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strSuenioEmpresa}
                            name="objInfoEmpresa.strSuenioEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cómo sueña su empresa?/¿Cómo se ve usted en cinco años?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoEmpresa?.strSuenioEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strSuenioEmpresa
                                            ?.message ||
                                        "Digita con detalle como sueña la empresa"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita con detalle como sueña la empresa",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstudioEmprendimiento}
                            name="objInfoEmpresa.strEstudioEmprendimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tiene estudio o aprendizaje sobre el tema de emprendimiento? "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strEstudioEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strEstudioEmprendimiento
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
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
                            defaultValue={data.strExperienciaEmprendimiento}
                            name="objInfoEmpresa.strExperienciaEmprendimiento"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tiene experiencia en este tipo de emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa
                                            ?.strExperienciaEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa
                                            ?.strExperienciaEmprendimiento?.message ||
                                        "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
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
                            defaultValue={data.strTipoContribuyente}
                            name="objInfoEmpresa.strTipoContribuyente"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Tipo de contribuyente"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    select
                                    error={
                                        errors?.objInfoEmpresa?.strTipoContribuyente
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strTipoContribuyente
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
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
                            defaultValue={data.strRut}
                            name="objInfoEmpresa.strRut"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="N° de Identificación del RUT (NIT)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.objInfoEmpresa?.strRut ? true : false}
                                    helperText={
                                        errors?.objInfoEmpresa?.strRut?.message ||
                                        "Digita el número del RUT"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPresupuestoFamiliar}
                            name="objInfoEmpresa.strPresupuestoFamiliar"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Los ingresos de esta inicativa son una fuente fundamental para el presupuesto familiar?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    required
                                    error={
                                        errors?.objInfoEmpresa?.strPresupuestoFamiliar
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strPresupuestoFamiliar
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strIngresosDistintos}
                            name="objInfoEmpresa.strIngresosDistintos"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Tu familia recibe ingresos por origen de otras fuentes distintas del emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strIngresosDistintos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strIngresosDistintos
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="IngresosDistintosFamilia"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTrabajanFamiliares}
                            name="objInfoEmpresa.strTrabajanFamiliares"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿En la empresa participan familiares?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresa?.strTrabajanFamiliares
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresa?.strTrabajanFamiliares
                                            ?.message || "Selecciona una opción"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="TrabajanFamiliares"
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",
                            }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEmpresa;
