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
import SelectCuandoComienzaEmpresa from "../../components/selectCuandoComienzaEmpresa";
import SelectTiempoDedicacionEmpresa from "../../components/selectTiempoDedicacionEmpresa";

const InformacionPrincipal = ({
    disabled,
    values,
    errors,
    control,
    isEdit,
    setValue,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        btElaboraProductoServicio: "",
        btTieneSoloIdea: "",
        intIdCuandoComienzaEmpresa: "",
        intIdTiempoDedicacion: "",
        btGrupoAsociativo: "",
        btAsociacionUnidadProdIndividual: "",
        strProductosServicios: "",
        strMateriaPrima: "",
        strNombreTecnica: "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);

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
        if (values && isEdit) {
            setData({
                btElaboraProductoServicio: values.btElaboraProductoServicio || "",
                btTieneSoloIdea: values.btTieneSoloIdea || "",
                intIdCuandoComienzaEmpresa: values.intIdCuandoComienzaEmpresa || "",
                intIdTiempoDedicacion: values.intIdTiempoDedicacion || "",
                btGrupoAsociativo: values.btGrupoAsociativo || "",
                btAsociacionUnidadProdIndividual:
                    values.btAsociacionUnidadProdIndividual || "",
                strProductosServicios: values.strProductosServicios || "",
                strMateriaPrima: values.strMateriaPrima || "",
                strNombreTecnica: values.strNombreTecnica || "",
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
                        Información del emprendimiento
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
                            defaultValue={data.btElaboraProductoServicio}
                            name="btElaboraProductoServicio"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Elabora usted un producto o servicio?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.btElaboraProductoServicio ? true : false
                                    }
                                    helperText={
                                        errors?.btElaboraProductoServicio?.message ||
                                        "Selecciona una opción."
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
                                        return "Por favor, selecciona una opción.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btTieneSoloIdea}
                            name="btTieneSoloIdea"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Tengo solo la idea?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    required
                                    error={errors?.btTieneSoloIdea ? true : false}
                                    helperText={
                                        errors?.btTieneSoloIdea?.message ||
                                        "Selecciona una opción."
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
                                        return "Por favor, selecciona una opción.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdCuandoComienzaEmpresa}
                            name="intIdCuandoComienzaEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCuandoComienzaEmpresa
                                    label="Si aún no ha comenzado su empresa ¿Cuándo planea comenzar?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.intIdCuandoComienzaEmpresa ? true : false
                                    }
                                    helperText={
                                        errors?.intIdCuandoComienzaEmpresa?.message ||
                                        "Selecciona una opción."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdTiempoDedicacion}
                            name="intIdTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiempoDedicacionEmpresa
                                    label="Tiempo de dedicación actual a la idea o negocio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={errors?.intIdTiempoDedicacion ? true : false}
                                    helperText={
                                        errors?.intIdTiempoDedicacion?.message ||
                                        "Selecciona una opción."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btGrupoAsociativo}
                            name="btGrupoAsociativo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Pertenece algún grupo asociativo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlerChangeData(e.target.name, e.target.value);
                                        setValue("btAsociacionUnidadProdIndividual", "");
                                    }}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    error={errors?.btGrupoAsociativo ? true : false}
                                    helperText={
                                        errors?.btGrupoAsociativo?.message ||
                                        "Selecciona una opción."
                                    }
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btAsociacionUnidadProdIndividual}
                            name="btAsociacionUnidadProdIndividual"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Desea registrarse como asociación o cómo unidad productiva individual?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={!data.btGrupoAsociativo ? true : disabled}
                                    error={
                                        errors?.btAsociacionUnidadProdIndividual
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.btAsociacionUnidadProdIndividual
                                            ?.message || "Selecciona una opción."
                                    }
                                    required={data.btGrupoAsociativo ? true : false}
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        data.btGrupoAsociativo === false &&
                                        value === ""
                                    ) {
                                        return "Por favor, selecciona una opción.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strProductosServicios}
                            name="strProductosServicios"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Describa los productos o servicios que ofrece"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    required
                                    multiline
                                    rows={4}
                                    error={errors?.strProductosServicios ? true : false}
                                    helperText={
                                        errors?.strProductosServicios?.message ||
                                        "Describe detalladamente los servicios que ofrece el empresario."
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, describe detalladamente los servicios que ofrece el empresario.",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strMateriaPrima}
                            name="strMateriaPrima"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Materias primas utilizadas"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={errors?.strMateriaPrima ? true : false}
                                    helperText={
                                        errors?.strMateriaPrima?.message ||
                                        "Describe detalladamente los materias primas que utiliza el empresario."
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strNombreTecnica}
                            name="strNombreTecnica"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre de la técnica utilizada"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={errors?.strNombreTecnica ? true : false}
                                    helperText={
                                        errors?.strNombreTecnica?.message ||
                                        "Describe detalladamente la técnica que utiliza el empresario."
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
