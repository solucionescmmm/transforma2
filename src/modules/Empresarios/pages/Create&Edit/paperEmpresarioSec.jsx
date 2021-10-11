import React, { useState, useEffect } from "react";

//Librerias
import { Controller } from "react-hook-form";
import validator from "validator";

//Componentes de Material UI
import {
    Box,
    Paper,
    Collapse,
    IconButton,
    Grid,
    CircularProgress,
    TextField,
    Tooltip,
    Alert,
    AlertTitle,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { DatePicker } from "@mui/lab";

import NumberFormat from "react-number-format";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

//Componentes
import SelectTipoDocumento from "../../components/selectTipoDocumento";
import SelectGenero from "../../components/selectGenero";
import SelectTipoRelacion from "../../components/selectTipoRelacion";

const PaperEmpresarioSec = ({ values, index, control, disabled, errors, remove }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        Id: null,
        strTipoRelacion: "",
        strNombres: "",
        strApellidos: "",
        strTipoDocto: "",
        strNroDocto: "",
        strLugarExpedicionDocto: "",
        dtFechaExpedicionDocto: null,
        dtFechaNacimiento: null,
        strGenero: "",
        strCelular: "",
        strCorreoElectronico: "",
    });

    const [loading, setLoading] = useState(true);
    const [openCollapese, setOpenCollapse] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values) {
            setData({
                Id: values.intId || values.strId || null,
                strTipoRelacion: values.strTipoRelacion || "",
                strNombres: values.strNombres || "",
                strApellidos: values.strApellidos || "",
                strTipoDocto: values.strTipoDocto || "",
                strNroDocto: values.strNroDocto || "",
                strLugarExpedicionDocto: values.strLugarExpedicionDocto || "",
                dtFechaExpedicionDocto: values.dtFechaExpedicionDocto || null,
                dtFechaNacimiento: values.dtFechaNacimiento || null,
                strGenero: values.strGenero || "",
                strCelular: values.strCelular || "",
                strCorreoElectronico: values.strCorreoElectronico || "",
            });
        }

        setLoading(false);
    }, [values]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (!data.Id) {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    alignItems: {
                        xs: "flex-end",
                        md: "center",
                    },
                    marginBottom: "15px",
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error" style={{ marginBottom: "15px" }}>
                        <AlertTitle>
                            <b>Se esperaba un identificador</b>
                        </AlertTitle>
                        Ha ocurrido un error al renderizar el formulario de personas
                        empresarias secundarias.
                    </Alert>
                </Box>

                <Box>
                    <IconButton color="error" onClick={() => remove(index)} size="large">
                        <Tooltip title="Eliminar">
                            <DeleteIcon />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                alignItems: {
                    xs: "flex-end",
                    md: "center",
                },
                marginBottom: "15px",
            }}
        >
            <Box>
                <Dialog
                    fullScreen={bitMobile}
                    open={openModalDelete}
                    onClose={handlerChangeOpenModalDelete}
                    fullWidth
                    PaperProps={{
                        style: {
                            backgroundColor: "#FDEDED",
                        },
                    }}
                >
                    <DialogTitle>{`¿Deseas eliminar la información de la persona empresaria secundaria #${index+1}?`}</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            El proceso es irreversible, recuerde que, al aceptar, no podrá
                            recuperar la información, a excepción de que no guarde los cambios efectuados.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => handlerChangeOpenModalDelete()}
                            color="inherit"
                        >
                            cancelar
                        </Button>

                        <Button
                            onClick={() => {
                                remove(index);
                                handlerChangeOpenModalDelete();
                            }}
                            color="error"
                        >
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Paper
                    style={{
                        backgroundColor: "#F6F6F6",
                        padding: "15px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <p>{`Persona empresaria secundaria #${index + 1}`}</p>
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

                    <Collapse in={openCollapese} timeout="auto">
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue={data.strTipoRelacion}
                                    name={`arrInfoEmpresarioSec[${index}].strTipoRelacion`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <SelectTipoRelacion
                                            label="Tipo de relación con la persona principal"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            required
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoRelacion
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoRelacion?.message ||
                                                "Selecciona la relación que tiene con la persona principal."
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona la relación que tiene con la persona principal.",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strNombres}
                                    name={`arrInfoEmpresarioSec[${index}].strNombres`}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Nombres"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strNombres
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strNombres?.message ||
                                                "Digita los nombres de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita los nombres de la persona.",
                                        validate: (value) => {
                                            if (
                                                !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                                    value
                                                )
                                            ) {
                                                return "Los nombres no pueden contener números ni caracteres especiales.";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strApellidos}
                                    name={`arrInfoEmpresarioSec[${index}].strApellidos`}
                                    render={({ field: { name, onChange, value } }) => (
                                        <TextField
                                            label="Apellidos"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strApellidos
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strApellidos?.message ||
                                                "Digita apellidos de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita apellidos de la persona",
                                        validate: (value) => {
                                            if (
                                                !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                                    value
                                                )
                                            ) {
                                                return "Los apellidos no pueden contener números ni caracteres especiales.";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strTipoDocto}
                                    name={`arrInfoEmpresarioSec[${index}].strTipoDocto`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <SelectTipoDocumento
                                            label="Tipo de documento"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            required
                                            disabled={disabled}
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoDocto
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoDocto?.message ||
                                                "Selecciona el tipo de documento de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strNroDocto}
                                    name={`arrInfoEmpresarioSec[${index}].strNroDocto`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <TextField
                                            label="Número de documento"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            required
                                            disabled={disabled}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoDocto
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strTipoDocto?.message ||
                                                "Selecciona el tipo de documento de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strLugarExpedicionDocto}
                                    name={`arrInfoEmpresarioSec[${index}].strLugarExpedicionDocto`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <TextField
                                            label="Lugar de expedición del documento"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strLugarExpedicionDocto
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strLugarExpedicionDocto?.message ||
                                                "Digita el lugar de expedición del documento de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.dtFechaExpedicionDocto}
                                    name={`arrInfoEmpresarioSec[${index}].dtFechaExpedicionDocto`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <DatePicker
                                            label="Fecha de expedición del documento"
                                            value={value}
                                            disabled={disabled}
                                            onChange={(date) => onChange(date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    name={name}
                                                    fullWidth
                                                    variant="standard"
                                                    error={
                                                        !!errors?.arrInfoEmpresarioSec?.[
                                                            index
                                                        ]?.dtFechaExpedicionDocto
                                                    }
                                                    helperText={
                                                        errors?.arrInfoEmpresarioSec?.[
                                                            index
                                                        ]?.dtFechaExpedicionDocto
                                                            ?.message ||
                                                        "Digita el lugar de expedición del documento de la persona."
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.dtFechaNacimiento}
                                    name={`arrInfoEmpresarioSec[${index}].dtFechaNacimiento`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <DatePicker
                                            label="Fecha de nacimiento"
                                            value={value}
                                            disabled={disabled}
                                            onChange={(date) => onChange(date)}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    name={name}
                                                    fullWidth
                                                    variant="standard"
                                                    error={
                                                        !!errors?.arrInfoEmpresarioSec?.[
                                                            index
                                                        ]?.dtFechaNacimiento
                                                    }
                                                    helperText={
                                                        errors?.arrInfoEmpresarioSec?.[
                                                            index
                                                        ]?.dtFechaNacimiento?.message ||
                                                        "Selecciona la fecha de nacimiento de la persona."
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strGenero}
                                    name={`arrInfoEmpresarioSec[${index}].strGenero`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <SelectGenero
                                            label="Género"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            disabled={disabled}
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strGenero
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strGenero?.message ||
                                                "Selecciona el genéro de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strCelular}
                                    name={`arrInfoEmpresarioSec[${index}].strCelular`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <NumberFormat
                                            format="### ### ####"
                                            value={value}
                                            customInput={TextField}
                                            name={name}
                                            onChange={(e) => onChange(e)}
                                            label="Celular"
                                            fullWidth
                                            variant="standard"
                                            disabled={disabled}
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strCelular
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strCelular?.message ||
                                                "Digita el número celular de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (value) {
                                                let strValue = value.replace(/\s/g, "");

                                                if (
                                                    !validator.isMobilePhone(
                                                        strValue,
                                                        "es-CO"
                                                    )
                                                ) {
                                                    return "El número ingresado no corresponde a un operador válido en Colombia.";
                                                }
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strCorreoElectronico}
                                    name={`arrInfoEmpresarioSec[${index}].strCorreoElectronico`}
                                    render={({ field: { name, value, onChange } }) => (
                                        <TextField
                                            label="Correo electrónico"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="standard"
                                            disabled={disabled}
                                            error={
                                                !!errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strCorreoElectronico
                                            }
                                            helperText={
                                                errors?.arrInfoEmpresarioSec?.[index]
                                                    ?.strCorreoElectronico?.message ||
                                                "Digita el correo electrónico de la persona."
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (value) {
                                                if (!validator.isEmail(value)) {
                                                    return "El valor ingresado no corresponde a un correo electrónico válido.";
                                                }
                                            }
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                </Paper>
            </Box>

            <Box>
                <IconButton
                    color="error"
                    onClick={() => handlerChangeOpenModalDelete()}
                    size="large"
                >
                    <Tooltip title="Eliminar">
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            </Box>
        </Box>
    );
};

export default PaperEmpresarioSec;
