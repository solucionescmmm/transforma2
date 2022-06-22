import React, { useState, useEffect } from "react";

//Librerias
import { Controller } from "react-hook-form";
import "animate.css";

//Componentes de Material UI
import {
    Box,
    Paper,
    Collapse,
    IconButton,
    Grid,
    CircularProgress,
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
    TextField,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

//Componentes
import SelectEstados from "../../../components/selectEstado";
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";

const PaperModulo = ({
    values,
    index,
    control,
    disabled,
    errors,
    remove,
    size,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        id: "",
        intIdEstado: "",
        intHoras: "",
        strNombre: "",
        arrResponsables: [],
        strEntregables: " ",
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
                id: values.id,
                intIdEstado: values.intIdEstado,
                intHoras: values.intHoras,
                strNombre: values.strNombre,
                arrResponsables: values.arrResponsables,
                strEntregables: values.strEntregables,
            });
        }

        setLoading(false);
    }, [values]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
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

    if (!data.id) {
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
                        Ha ocurrido un error al renderizar el formulario de
                        módulos
                    </Alert>
                </Box>

                <Box>
                    <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        size="large"
                    >
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
                    <DialogTitle>{`¿Deseas eliminar el módulo #${
                        index + 1
                    }?`}</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            El proceso es irreversible, recuerde que, al
                            aceptar, no podrá recuperar la información, a
                            excepción de que no guarde los cambios efectuados.
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
                            <p>{`Módulo #${index + 1}`}</p>
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
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name={`arrModulos[${index}].intIdEstado`}
                                    defaultValue={data.intIdEstado}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectEstados
                                            label="Estado"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                                setData((prevState) => ({
                                                    ...prevState,
                                                    intIdEstado: e.target.value,
                                                }));
                                            }}
                                            disabled={loading}
                                            required
                                            error={
                                                !!errors?.arrModulos?.[index]
                                                    ?.intIdEstado
                                            }
                                            helperText={
                                                errors?.arrModulos?.[index]
                                                    ?.intIdEstado?.message ||
                                                "Selecciona una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona una opción",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name={`arrModulos[${index}].intHoras`}
                                    defaultValue={data.intHoras}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <TextField
                                            label="Duración en horas"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={
                                                !!errors?.arrModulos?.[index]
                                                    ?.intHoras
                                            }
                                            helperText={
                                                errors?.arrModulos?.[index]
                                                    ?.intHoras?.message ||
                                                "Digita la duración del módulo"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita la duración del módulo",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name={`arrModulos[${index}].strNombre`}
                                    defaultValue={data.strNombre}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <TextField
                                            label="Nombre del módulo"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={
                                                !!errors?.arrModulos?.[index]
                                                    ?.strNombre
                                            }
                                            helperText={
                                                errors?.arrModulos?.[index]
                                                    ?.strNombre?.message ||
                                                "Digita el nombre del módulo"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita el nombre del módulo",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name={`arrModulos[${index}].arrResponsables`}
                                    defaultValue={data.arrResponsables}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownUsuarios
                                            label="Responsables"
                                            multiple
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e, value) =>
                                                onChange(value)
                                            }
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={
                                                !!errors?.arrModulos?.[index]
                                                    ?.arrResponsables
                                            }
                                            helperText={
                                                errors?.arrModulos?.[index]
                                                    ?.arrResponsables
                                                    ?.message ||
                                                "Selecciona los responsables del módulo"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (value?.length === 0) {
                                                return "Por favor, selecciona los responsables del módulo";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name={`arrModulos[${index}].strEntregables`}
                                    defaultValue={data.strEntregables}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <TextField
                                            label="Entregables del módulo"
                                            name={name}
                                            value={value}
                                            disabled={disabled}
                                            onChange={(e) => onChange(e)}
                                            fullWidth
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            required
                                            error={
                                                !!errors?.arrModulos?.[index]
                                                    ?.strEntregables
                                            }
                                            helperText={
                                                errors?.arrModulos?.[index]
                                                    ?.strEntregables?.message ||
                                                "Digita los entregables del módulo"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita los entregables del módulo",
                                    }}
                                />
                            </Grid>

                            {data.intIdEstado === 1 && (
                                <Grid item xs={12}>
                                    <Alert severity="warning">
                                        Al seleccionar el estado activo, no
                                        podras editar ni eliminar está
                                        información
                                    </Alert>
                                </Grid>
                            )}
                        </Grid>
                    </Collapse>
                </Paper>
            </Box>

            <Box>
                <IconButton
                    color="error"
                    onClick={() => handlerChangeOpenModalDelete()}
                    size="large"
                    disabled={size === 1 ? true : disabled}
                >
                    <Tooltip title="Eliminar">
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            </Box>
        </Box>
    );
};

export default PaperModulo;
