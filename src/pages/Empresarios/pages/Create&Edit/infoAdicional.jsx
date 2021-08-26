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
        strRequisitoLey: "",
        strOtrosRequisitos: "",
        btInteresadoProcesoCMM: "",
        strTemasCapacitacion: "",
        strComoSeEntero: "",
        strOtrosMediosEntero: "",
        strMediosDeComunicacion: "",
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
                strRequisitoLey: "",
                strOtrosRequisitos: "",
                btInteresadoProcesoCMM: "",
                strTemasCapacitacion: "",
                strComoSeEntero: "",
                strOtrosMediosEntero: "",
                strMediosDeComunicacion: "",
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
                    <Typography style={{ fontWeight: "bold" }}>
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

            <hr />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btNombreMarca}
                            name="btNombreMarca"
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
                                    error={errors?.btNombreMarca ? true : false}
                                    helperText={
                                        errors?.btNombreMarca?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si la empresa tiene nombre de la marca.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btLogotipo}
                            name="btLogotipo"
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
                                    error={errors?.btLogotipo ? true : false}
                                    helperText={
                                        errors?.btLogotipo?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si la empresa tiene logotipo.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btEtiquetaEmpaque}
                            name="btEtiquetaEmpaque"
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
                                    error={errors?.btEtiquetaEmpaque ? true : false}
                                    helperText={
                                        errors?.btEtiquetaEmpaque?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si la empresa tiene etiqueta o empaque.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btMejorarEtiquetaEmpaque}
                            name="btMejorarEtiquetaEmpaque"
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
                                        errors?.btMejorarEtiquetaEmpaque ? true : false
                                    }
                                    helperText={
                                        errors?.btMejorarEtiquetaEmpaque?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si la empresa quiere mejorar su marca, logotipo o etiqueta/empaque.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strPrincipalesNecesidades}
                            name="strPrincipalesNecesidades"
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
                                        errors?.strPrincipalesNecesidades ? true : false
                                    }
                                    helperText={
                                        errors?.strPrincipalesNecesidades?.messae ||
                                        "Describa cuales son las principales necesidades e intereses de la unidad productiva o empresa."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strRequisitoLey}
                            name="strRequisitoLey"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRequisitosLey
                                    label="Requisitos de ley"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={errors?.strRequisitoLey ? true : false}
                                    helperText={
                                        errors?.strRequisitoLey?.messae ||
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
                            name="strOtrosRequisitos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otros requisitos de ley"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={errors?.strOtrosRequisitos ? true : false}
                                    helperText={
                                        errors?.strOtrosRequisitos?.messae ||
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
                            name="btInteresadoProcesoCMM"
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
                                    error={errors?.btInteresadoProcesoCMM ? true : false}
                                    helperText={
                                        errors?.btInteresadoProcesoCMM?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, selecciona si esta interesado en hacer parte del proceso de formación, capacitación y asesoría de la CMMMedellín.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strTemasCapacitacion}
                            name="strTemasCapacitacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownRecibirAsesoria
                                    label="¿En que temas le gustaría recibir asesoría o capacitación y quiere inscribirse?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={errors?.strTemasCapacitacion ? true : false}
                                    helperText={
                                        errors?.strTemasCapacitacion?.messae ||
                                        "Seleccione en que temas le gustaría recibir asesoría o capacitación y quiere inscribirse."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strComoSeEntero}
                            name="strComoSeEntero"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownComoSeEntero
                                    label="¿Cómo se enteró de la Corporación?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={errors?.strComoSeEntero ? true : false}
                                    helperText={
                                        errors?.strComoSeEntero?.messae ||
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
                            name="strOtrosRequisitos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otros ¿Cuáles?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={errors?.strOtrosRequisitos ? true : false}
                                    helperText={
                                        errors?.strOtrosRequisitos?.messae ||
                                        "Digite otras opciones, en caso de que aplique."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strMediosDeComunicacion}
                            name="strMediosDeComunicacion"
                            render={({ field: { name, onChange, value } }) => (
                                <DropdowMediosComunicacion
                                    label="¿A través de cuál(es) de los siguientes medios le gustaría que se comunicaran con usted?"
                                    name={name}
                                    vlaue={value}
                                    onChange={(e, value) => onChange(value)}
                                    multiple
                                    disabled={disabled}
                                    error={errors?.strMediosDeComunicacion ? true : false}
                                    helperText={
                                        errors?.strMediosDeComunicacion?.messae ||
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
                            name="strOtrosMediosEntero"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Otro ¿Cuál?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={errors?.strOtrosMediosEntero ? true : false}
                                    helperText={
                                        errors?.strOtrosMediosEntero?.messae ||
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
                            name="btRecibirInfoCMM"
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
                                    error={errors?.btRecibirInfoCMM ? true : false}
                                    helperText={
                                        errors?.btRecibirInfoCMM?.messae ||
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
                                    if (value === "") {
                                        return "Por favor, seleccione si le gustaría recibir información de la Corporación Mundial de la Mujer Medellín.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strRecomendaciones}
                            name="strRecomendaciones"
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
                                    error={errors?.strRecomendaciones ? true : false}
                                    helperText={
                                        errors?.strRecomendaciones?.messae ||
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
