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
} from "@material-ui/core";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

//Componentes
import DropdownRequisitosLey from "../../components/dropdownRequisitosLey";
import DropdownRecibirAsesoria from "../../components/dropdownRecibirAsesoria";
import DropdownComoSeEntero from "../../components/dropdownComoSeEntero";
import DropdowMediosComunicacion from "../../components/dropdownMediosComunicacion";

const InformacionPrincipal = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        btNombreMarca: "",
        btLogotipo: "",
        btEtiquetaEmpaque: "",
        btMejorarEtiquetaEmpaque: "",
        strPrincipalesNecesidades: "",
        arrRequisitoLey: [],
        strOtrosRequisitos: "",
        btInteresadoProcesoCMM: "",
        strTemasCapacitacion: "",
        arrComoSeEntero: [],
        strOtrosMediosEntero: "",
        arrMediosDeComunicacion: [],
        strOtroMedioComunicacion: "",
        btRecibirInfoCMM: "",
        strRecomendaciones: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values && isEdit) {
            setData({
                btNombreMarca: "",
                btLogotipo: "",
                btEtiquetaEmpaque: "",
                btMejorarEtiquetaEmpaque: "",
                strPrincipalesNecesidades: "",
                arrRequisitoLey: [],
                strOtrosRequisitos: "",
                btInteresadoProcesoCMM: "",
                strTemasCapacitacion: "",
                arrComoSeEntero: "",
                strOtrosMediosEntero: "",
                arrMediosDeComunicacion: "",
                strOtroMedioComunicacion: "",
                btRecibirInfoCMM: "",
                strRecomendaciones: "",
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
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoAdicional ? "#D33030" : "inherit",
                        }}
                    >
                        Información adicional
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

            <hr
                style={{
                    borderColor: errors?.objInfoAdicional ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btNombreMarca}
                            name="objInfoAdicional.btNombreMarca"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene nombre de la marca?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btNombreMarca
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btNombreMarca
                                            ?.message ||
                                        "Selecciona si la empresa tiene nombre de la marca."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa tiene nombre de la marca.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btLogotipo}
                            name="objInfoAdicional.btLogotipo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene Logotipo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btLogotipo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btLogotipo?.message ||
                                        "Selecciona si la empresa tiene logotipo."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa tiene logotipo.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btEtiquetaEmpaque}
                            name="objInfoAdicional.btEtiquetaEmpaque"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tiene etiqueta o empaque?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btEtiquetaEmpaque
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btEtiquetaEmpaque
                                            ?.message ||
                                        "Selecciona si la empresa tiene etiqueta o empaque."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa tiene etiqueta o empaque.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btMejorarEtiquetaEmpaque}
                            name="objInfoAdicional.btMejorarEtiquetaEmpaque"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Le gustaría mejorar su marca, logotipo o etiqueta/empaque de su negocio?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btMejorarEtiquetaEmpaque
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btMejorarEtiquetaEmpaque
                                            ?.message ||
                                        "Selecciona si la empresa quiere mejorar su marca, logotipo o etiqueta/empaque."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si la empresa quiere mejorar su marca, logotipo o etiqueta/empaque.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPrincipalesNecesidades}
                            name="objInfoAdicional.strPrincipalesNecesidades"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuáles son las principales necesidades e intereses de la unidad productiva o empresa?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    disabled={disabled}
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoAdicional
                                            ?.strPrincipalesNecesidades
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional
                                            ?.strPrincipalesNecesidades?.message ||
                                        "Describa cuales son las principales necesidades e intereses de la unidad productiva o empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrRequisitoLey}
                            name="objInfoAdicional.arrRequisitoLey"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRequisitosLey
                                    label="Requisitos de ley"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.arrRequisitoLey
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.arrRequisitoLey
                                            ?.message ||
                                        "Seleccione los requisitos de ley que cumple actualmente."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtrosRequisitos}
                            name="objInfoAdicional.strOtrosRequisitos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otros requisitos de ley"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.strOtrosRequisitos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strOtrosRequisitos
                                            ?.message ||
                                        "Digite en caso de tener otros requisitos de ley."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.btInteresadoProcesoCMM}
                            name="objInfoAdicional.btInteresadoProcesoCMM"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Estaría interesado en hacer parte del proceso de formación, capacitación 
                                    y asesoría?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btInteresadoProcesoCMM
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btInteresadoProcesoCMM
                                            ?.message ||
                                        "Selecciona si esta interesado en hacer parte del proceso de formación, capacitación y asesoría de la CMMMedellín."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona si esta interesado en hacer parte del proceso de formación, capacitación y asesoría de la CMMMedellín.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTemasCapacitacion}
                            name="objInfoAdicional.strTemasCapacitacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRecibirAsesoria
                                    label="¿En que temas le gustaría recibir asesoría o capacitación y quiere inscribirse?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.strTemasCapacitacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strTemasCapacitacion
                                            ?.message ||
                                        "Seleccione en que temas le gustaría recibir asesoría o capacitación y quiere inscribirse."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrComoSeEntero}
                            name="objInfoAdicional.arrComoSeEntero"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownComoSeEntero
                                    label="¿Cómo se enteró de la Corporación?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.arrComoSeEntero
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.arrComoSeEntero
                                            ?.message ||
                                        "Seleccione el como se entero de la corporación."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtrosRequisitos}
                            name="objInfoAdicional.strOtrosRequisitos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otros ¿Cuáles?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.strOtrosRequisitos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strOtrosRequisitos
                                            ?.message ||
                                        "Digite otras opciones, en caso de que aplique."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDeComunicacion}
                            name="objInfoAdicional.arrMediosDeComunicacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdowMediosComunicacion
                                    label="¿A través de cuál(es) de los siguientes medios le gustaría que se comunicaran con usted?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.arrMediosDeComunicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.arrMediosDeComunicacion
                                            ?.message ||
                                        "Seleccione los medios que le gustaría que la Corporación Mundial de la Mujer Medellín se comunicara con usted."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strOtrosMediosEntero}
                            name="objInfoAdicional.strOtrosMediosEntero"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otro ¿Cuál?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.strOtrosMediosEntero
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strOtrosMediosEntero
                                            ?.message ||
                                        "Digite otras opciones, en caso de que aplique."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.btRecibirInfoCMM}
                            name="objInfoAdicional.btRecibirInfoCMM"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Le gustaría recibir información de la Corporación?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    fullWidth
                                    variant="standard"
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoAdicional?.btRecibirInfoCMM
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.btRecibirInfoCMM
                                            ?.message ||
                                        "Selecciona si le gustaría recibir información de la Corporación."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value === "" || value === undefined) {
                                        return "Por favor, seleccione si le gustaría recibir información de la Corporación Mundial de la Mujer Medellín.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strRecomendaciones}
                            name="objInfoAdicional.strRecomendaciones"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Comentarios positivos, ideas y recomendaciones"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    disabled={disabled}
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.objInfoAdicional?.strRecomendaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strRecomendaciones
                                            ?.message ||
                                        "Describa si tiene comentarios positivos, ideas o recomendaciones."
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

export default InformacionPrincipal;
