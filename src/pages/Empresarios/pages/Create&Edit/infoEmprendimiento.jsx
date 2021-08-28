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
        strCuandoComienzaEmpresa: "",
        strTiempoDedicacion: "",
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
                strCuandoComienzaEmpresa: values.strCuandoComienzaEmpresa || "",
                strTiempoDedicacion: values.strTiempoDedicacion || "",
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
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
                        }}
                    >
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

            <hr
                style={{
                    borderColor: errors?.objInfoEmprendimiento ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btElaboraProductoServicio}
                            name="objInfoEmprendimiento.btElaboraProductoServicio"
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
                                        errors?.objInfoEmprendimiento
                                            ?.btElaboraProductoServicio
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.btElaboraProductoServicio?.message ||
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
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona una opción.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.btTieneSoloIdea}
                            name="objInfoEmprendimiento.btTieneSoloIdea"
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
                                    error={
                                        errors?.objInfoEmprendimiento?.btTieneSoloIdea
                                            ? true
                                            : false
                                    }
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
                                    if (value === "" || value === undefined) {
                                        return "Por favor, selecciona una opción.";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCuandoComienzaEmpresa}
                            name="objInfoEmprendimiento.strCuandoComienzaEmpresa"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectCuandoComienzaEmpresa
                                    label="Si aún no ha comenzado su empresa ¿Cuándo planea comenzar?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strCuandoComienzaEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strCuandoComienzaEmpresa?.message ||
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
                            defaultValue={data.strTiempoDedicacion}
                            name="objInfoEmprendimiento.strTiempoDedicacion"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTiempoDedicacionEmpresa
                                    label="Tiempo de dedicación actual a la idea o negocio"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strTiempoDedicacion?.message ||
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
                            name="objInfoEmprendimiento.btGrupoAsociativo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Pertenece algún grupo asociativo?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlerChangeData(e.target.name, e.target.value);
                                        setValue(
                                            "objInfoEmprendimiento.btAsociacionUnidadProdIndividual",
                                            ""
                                        );
                                    }}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmprendimiento?.btGrupoAsociativo
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.btGrupoAsociativo
                                            ?.message || "Selecciona una opción."
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
                            name="objInfoEmprendimiento.btAsociacionUnidadProdIndividual"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Desea registrarse como asociación o cómo unidad productiva individual?"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    select
                                    variant="standard"
                                    fullWidth
                                    disabled={!data?.btGrupoAsociativo ? true : disabled}
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.btAsociacionUnidadProdIndividual
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.btAsociacionUnidadProdIndividual?.message ||
                                        "Selecciona una opción."
                                    }
                                    required={data?.btGrupoAsociativo ? true : false}
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
                                        (value === "" || value === undefined)
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
                            name="objInfoEmprendimiento.strProductosServicios"
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
                                    error={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductosServicios
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento
                                            ?.strProductosServicios?.message ||
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
                            name="objInfoEmprendimiento.strMateriaPrima"
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
                                    error={
                                        errors?.objInfoEmprendimiento?.strMateriaPrima
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strMateriaPrima
                                            ?.message ||
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
                            name="objInfoEmprendimiento.strNombreTecnica"
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
                                    error={
                                        errors?.objInfoEmprendimiento?.strNombreTecnica
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmprendimiento?.strNombreTecnica
                                            ?.message ||
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
