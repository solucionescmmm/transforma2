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
    MenuItem,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectNivelEducativo from "../../../../../Empresarios/components/selectNivelEducativo";
import SelectListas from "../../../../components/selectLista";

const InfoFamiliar = ({
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
        btCabezaHogar: "",
        intNumPersonasCargo: "",
        intHijos: "",
        intHijosEstudiando: "",
        strMaxNivelEducativoHijos: "",
        strEstadoCivil: "",
        strSituacionVivienda: "",
        strGrupoVulnerable: "",
        strPoblacionEtnica: "",
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
                btCabezaHogar:
                    typeof values.btCabezaHogar === "boolean" ? values.btCabezaHogar : "",
                intNumPersonasCargo: values.intNumPersonasCargo || "",
                intHijos: values.intHijos || "",
                intHijosEstudiando: values.intHijosEstudiando || "",
                strMaxNivelEducativoHijos: values.strMaxNivelEducativoHijos || "",
                strEstadoCivil: values.strEstadoCivil || "",
                strSituacionVivienda: values.strSituacionVivienda || "",
                strGrupoVulnerable: values.strGrupoVulnerable || "",
                strPoblacionEtnica: values.strPoblacionEtnica || "",
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
                            color: errors?.objInfoFamiliar ? "#D33030" : "inherit",
                        }}
                    >
                        Información familiar
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
                    borderColor: errors?.objInfoFamiliar ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btCabezaHogar}
                            name="objInfoFamiliar.btCabezaHogar"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Es cabeza de hogar?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.btCabezaHogar
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.btCabezaHogar?.message ||
                                        "Seleccione, si es cabeza de hogar o no"
                                    }
                                    select
                                >
                                    <MenuItem value="">No aplica</MenuItem>
                                    <MenuItem value={true}>Sí</MenuItem>
                                    <MenuItem value={true}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intNumPersonasCargo}
                            name="objInfoFamiliar.intNumPersonasCargo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de personas que dependen económicamente de usted"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.intNumPersonasCargo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.intNumPersonasCargo
                                            ?.message ||
                                        "Digíta el número de personas que dependen económicamente de usted"
                                    }
                                    type="number"
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta el número de personas que dependen económicamente de usted",
                                validate: (value) => {
                                    if (value < 0) {
                                        return "El valor no puede ser menor a 0";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.intHijos}
                            name="objInfoFamiliar.intHijos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de hijos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);

                                        handlerChangeData("intHijos", e.target.value);

                                        setValue(
                                            "objInfoFamiliar.intHijosEstudiando",
                                            ""
                                        );

                                        setValue(
                                            "objInfoFamiliar.strMaxNivelEducativoHijos",
                                            ""
                                        );
                                    }}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.intHijos ? true : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.intHijos?.message ||
                                        "Digíta el número de hijos"
                                    }
                                    type="number"
                                    required
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digíta el número de hijos",
                                validate: (value) => {
                                    if (value < 0) {
                                        return "El valor no puede ser menor a 0";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.intHijosEstudiando}
                            name="objInfoFamiliar.intHijosEstudiando"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuántos de ellos están estudiando?"
                                    name={name}
                                    value={value}
                                    disabled={
                                        parseInt(data.intHijos) === 0 || !data.intHijos
                                            ? true
                                            : disabled
                                    }
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.intHijosEstudiando
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.intHijosEstudiando
                                            ?.message ||
                                        "Digíta el número de hijos que están estudiando"
                                    }
                                    type="number"
                                    required={
                                        parseInt(data.intHijos) === 0 || !data.intHijos
                                            ? false
                                            : true
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    let intHijos = parseInt(data.intHijos);

                                    if (intHijos > 0) {
                                        if (!value) {
                                            return "Por favor, digíta el número de hijos que están estudiando";
                                        }

                                        if (value < 0) {
                                            return "El valor no puede ser menor a 0";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strMaxNivelEducativoHijos}
                            name="objInfoFamiliar.strMaxNivelEducativoHijos"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectNivelEducativo
                                    label="Nivel educativo máximo de los hijos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={
                                        parseInt(data.intHijos) === 0 || !data.intHijos
                                            ? true
                                            : disabled
                                    }
                                    error={
                                        errors?.objInfoFamiliar?.strMaxNivelEducativoHijos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.strMaxNivelEducativoHijos
                                            ?.message ||
                                        "Selecciona el nivel educativo máximo de los hijos"
                                    }
                                    required={
                                        parseInt(data.intHijos) === 0 || !data.intHijos
                                            ? false
                                            : true
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    let intHijos = parseInt(data.intHijos);

                                    if (intHijos > 0) {
                                        if (!value) {
                                            return "Por favor, selecciona el nivel educativo máximo de los hijos";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strEstadoCivil}
                            name="objInfoFamiliar.strEstadoCivil"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Estado Civil"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.strEstadoCivil
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.strEstadoCivil
                                            ?.message || "Seleccione, el estado civil"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="EstadoCivil"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strSituacionVivienda}
                            name="objInfoFamiliar.strSituacionVivienda"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Situación de vivienda"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.strSituacionVivienda
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.strSituacionVivienda
                                            ?.message ||
                                        "Seleccione, la situación de la vivienda"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="SituacionVivienda"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strGrupoVulnerable}
                            name="objInfoFamiliar.strGrupoVulnerable"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Grupo poblacional vulnerable (no preguntar de observación)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.strGrupoVulnerable
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.strGrupoVulnerable
                                            ?.message ||
                                        "Seleccione, si la persona pertenece a algún grupo vulnerable"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="PoblacionVulnerable"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strPoblacionEtnica}
                            name="objInfoFamiliar.strPoblacionEtnica"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="Población étnica"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoFamiliar?.strPoblacionEtnica
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoFamiliar?.strPoblacionEtnica
                                            ?.message ||
                                        "Seleccione, si la persona pertenece a algúna población étnica"
                                    }
                                    strGrupo="DiagnosticoGeneral"
                                    strCodigo="PoblacionEtnica"
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

export default InfoFamiliar;
