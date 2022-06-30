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
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

//Componentes
import SelectAreas from "../../../components/selectAreas";

const PaperResponsables = ({
    getValues,
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
        intIdArea: "",
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
        setLoading(true);

        if (values) {
            setData({
                id: values.id,
                intIdArea: values.intIdArea,
            });
        }

        if (!values.id) {
            remove(index);
            setOpenModalDelete(!openModalDelete);
        }

        setLoading(false);

        // eslint-disable-next-line
    }, [values]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading || !data.id) {
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
                        responsables del servicio
                    </Alert>
                </Box>

                <Box>
                    <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        size="large"
                        type="button"
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
                    <DialogTitle>{`¿Deseas eliminar el responsable del servicio #${
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
                            type="button"
                        >
                            cancelar
                        </Button>

                        <Button
                            onClick={() => {
                                remove(index);
                                handlerChangeOpenModalDelete();
                            }}
                            color="error"
                            type="button"
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
                            <p>{`Responsable del servicio #${index + 1}`}</p>
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
                                    name={`arrResponsables[${index}].intIdArea`}
                                    defaultValue={data.intIdArea}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectAreas
                                            label="Área"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                            disabled={loading}
                                            required
                                            error={
                                                !!errors?.arrResponsables?.[
                                                    index
                                                ]?.intIdArea
                                            }
                                            helperText={
                                                errors?.arrResponsables?.[index]
                                                    ?.intIdArea?.message ||
                                                "Selecciona una opción"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona una opción",
                                        validate: (value) => {
                                            const x =
                                                getValues("arrResponsables");

                                            if (
                                                x.find(
                                                    (x, i) =>
                                                        x.intIdArea === value &&
                                                        i !== index
                                                )
                                            ) {
                                                return "El área ya se encuentra seleccionada";
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
                    type="button"
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

export default PaperResponsables;
