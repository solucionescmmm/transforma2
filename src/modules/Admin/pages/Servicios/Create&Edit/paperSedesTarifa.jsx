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
import SelectSedes from "../../../components/selectSedes";
import SelectEstados from "../../../components/selectEstado";
import SelectTipoTarifas from "../../../components/selectTipoTarifa";
import NumberFormat from "react-number-format";

const PaperSedesTarifa = ({
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
        intIdSede: "",
        intIdTipoTarifa: "",
        intIdEstado: "",
        dblValor: "",
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
                intIdSede: values.intIdSede,
                intIdTipoTarifa: values.intIdTipoTarifa,
                intIdEstado: values.intIdEstado,
                dblValor: values.dblValor,
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
                        sedes y tarifas
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
                    <DialogTitle>{`¿Deseas eliminar la sede y tarifa #${
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
                            <p>{`Sede y tarifa #${index + 1}`}</p>
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
                                    name={`arrSedesTarifas[${index}].intIdSede`}
                                    defaultValue={data.intIdSede}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectSedes
                                            label="Sede"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                            disabled={loading}
                                            required
                                            error={
                                                !!errors?.arrSedesTarifas?.[
                                                    index
                                                ]?.intIdSede
                                            }
                                            helperText={
                                                errors?.arrSedesTarifas?.[index]
                                                    ?.intIdSede?.message ||
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

                            <Grid item xs={12}>
                                <Controller
                                    name={`arrSedesTarifas[${index}].intIdTipoTarifa`}
                                    defaultValue={data.intIdTipoTarifa}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectTipoTarifas
                                            label="Tipo de tarifa"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                            disabled={loading}
                                            required
                                            error={
                                                !!errors?.arrSedesTarifas?.[
                                                    index
                                                ]?.intIdTipoTarifa
                                            }
                                            helperText={
                                                errors?.arrSedesTarifas?.[index]
                                                    ?.intIdTipoTarifa
                                                    ?.message ||
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
                                    name={`arrSedesTarifas[${index}].intIdEstado`}
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
                                                !!errors?.arrSedesTarifas?.[
                                                    index
                                                ]?.intIdEstado
                                            }
                                            helperText={
                                                errors?.arrSedesTarifas?.[index]
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
                                    defaultValue={data.dblValor}
                                    name={`arrSedesTarifas[${index}].dblValor`}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <NumberFormat
                                            label="Valor"
                                            name={name}
                                            value={value}
                                            onValueChange={(v) => {
                                                onChange(v.floatValue);
                                            }}
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            prefix={"$"}
                                            customInput={TextField}
                                            fullWidth
                                            variant="standard"
                                            disabled={disabled}
                                            required
                                            error={
                                                !!errors?.arrSedesTarifas?.[
                                                    index
                                                ]?.dblValor
                                            }
                                            helperText={
                                                errors?.arrSedesTarifas?.[index]
                                                    ?.dblValor?.message ||
                                                "Digita el valor"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required: "Por favor, digita el valor",
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

export default PaperSedesTarifa;
