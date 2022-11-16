import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

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
    MenuItem,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

//Componentes
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import ModalAddObjetivo from "./modalAddObjetivo";
import shortid from "shortid";
import ModalAddPaquete from "./modalAddPaquete";

const PaperFase = ({
    values,
    index,
    control,
    disabled,
    errors,
    remove,
    length,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        Id: null,
        intEstado: "",
        intDiagnostico: "",
        strResponsable: "",
        strObservaciones: "",
        arrObjetivos: [],
        arrPaquetes: [],
    });

    const [loading, setLoading] = useState(true);
    const [openCollapese, setOpenCollapse] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalAddObjetivo, setOpenModalAddObjetivo] = useState(false);
    const [openModalAddPaquete, setOpenModalAddPaquete] = useState(false);

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

    const handlerChangeOpenModalAddObjetivo = () => {
        setOpenModalAddObjetivo(!openModalAddObjetivo);
    };

    const handlerChangeOpenModalAddPaquete = () => {
        setOpenModalAddPaquete(!openModalAddPaquete);
    };

    const handlerChangeObjetivo = (value) => {
        const newArrObjetivos = [...data.arrObjetivos];

        newArrObjetivos.push({
            strId: shortid.generate(),
            strObjetivo: value,
        });

        setData((prevState) => ({
            ...prevState,
            arrObjetivos: newArrObjetivos,
        }));
    };

    const handlerChangePaquete = (value) => {
        const newArrPaquetes = [...data.arrPaquetes];

        newArrPaquetes.push({
            strId: shortid.generate(),
            objPaquete: value.objPaquete,
            arrObjetivos: value.arrObjetivos,
        });

        setData((prevState) => ({
            ...prevState,
            arrPaquetes: newArrPaquetes,
        }));
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values) {
            setData({
                Id: values.intId || null || values.Id || values.strId,
                intEstado: values.intEstado || "",
                intDiagnostico: values.intDiagnostico || "",
                strResponsable: values.strResponsable || "",
                strObservaciones: values.strObservaciones || "",
                arrObjetivos: values.arrObjetivos || [],
                arrPaquetes: values.arrPaquetes || [],
            });
        }

        if (!values.id) {
            remove(index);
            setOpenModalDelete(!openModalDelete);
        }

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        Ha ocurrido un error al renderizar el formulario de
                        fases.
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
        <Fragment>
            <ModalAddObjetivo
                open={openModalAddObjetivo}
                handleOpenDialog={handlerChangeOpenModalAddObjetivo}
                onChange={handlerChangeObjetivo}
            />

            <ModalAddPaquete
                open={openModalAddPaquete}
                handleOpenDialog={handlerChangeOpenModalAddPaquete}
                onChange={handlerChangePaquete}
                values={{ arrObjetivos: data.arrObjetivos, intFase: index + 1 }}
            />

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
                        <DialogTitle>{`¿Deseas eliminar la información de la fase #${
                            index + 1
                        }?`}</DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                El proceso es irreversible, recuerde que, al
                                aceptar, no podrá recuperar la información, a
                                excepción de que no guarde los cambios
                                efectuados.
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
                            padding: "15px",
                            backgroundColor: "#F6F6F6",
                        }}
                        elevation={0}
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
                                <p>{`Fase #${index + 1}`}</p>
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
                                        defaultValue={data.intEstado}
                                        name={`arrInfoFases[${index}].intEstado`}
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Estado"
                                                variant="standard"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={disabled}
                                                required
                                                error={
                                                    !!errors?.arrInfoFases?.[
                                                        index
                                                    ]?.intEstado
                                                }
                                                fullWidth
                                                select
                                            >
                                                <MenuItem>En borrador</MenuItem>
                                            </TextField>
                                        )}
                                        control={control}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strResponsable}
                                        name={`arrInfoFases[${index}].strResponsable`}
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DropdownUsuarios
                                                label="Responsable"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={disabled}
                                                required
                                                error={
                                                    !!errors?.arrInfoFases?.[
                                                        index
                                                    ]?.strResponsable
                                                }
                                                helperText={
                                                    errors?.arrInfoFases?.[
                                                        index
                                                    ]?.strResponsable.message ||
                                                    "Selecciona el responsable"
                                                }
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el responsable",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strObservaciones}
                                        name={`arrInfoFases[${index}].strObservaciones`}
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Observaciones"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={disabled}
                                                required
                                                error={
                                                    !!errors?.arrInfoFases?.[
                                                        index
                                                    ]?.strObservaciones
                                                }
                                                helperText={
                                                    errors?.arrInfoFases?.[
                                                        index
                                                    ]?.strObservaciones
                                                        ?.message ||
                                                    "Digita las observaciones"
                                                }
                                                fullWidth
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita las observaciones",
                                        }}
                                    />
                                </Grid>

                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: "14px" }}>
                                                Objetivos
                                            </b>
                                        </Box>

                                        <Box>
                                            <Button
                                                size="small"
                                                style={{ fontSize: "13px" }}
                                                onClick={() =>
                                                    handlerChangeOpenModalAddObjetivo()
                                                }
                                            >
                                                Adicionar objetivo
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    {data.arrObjetivos.map(
                                        (objetivo, index) => (
                                            <Box
                                                key={objetivo.strId}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        paddingRight: "30px",
                                                    }}
                                                >
                                                    Objetivo {index + 1}
                                                </p>
                                                <p>{objetivo.strObjetivo}</p>
                                            </Box>
                                        )
                                    )}
                                </Grid>

                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: "14px" }}>
                                                Paquetes
                                            </b>
                                        </Box>

                                        <Box>
                                            <Button
                                                size="small"
                                                style={{ fontSize: "13px" }}
                                                onClick={() =>
                                                    handlerChangeOpenModalAddPaquete()
                                                }
                                            >
                                                Adicionar paquete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    {data.arrPaquetes.map((paquete, index) => (
                                        <Fragment>
                                            <Box
                                                key={paquete.strId}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        paddingRight: "30px",
                                                    }}
                                                >
                                                    Paquete {index + 1}
                                                </p>
                                                <p>
                                                    Nombre:{" "}
                                                    {
                                                        paquete.objPaquete
                                                            .objInfoPrincipal
                                                            .strNombre
                                                    }
                                                </p>
                                            </Box>

                                            <Box
                                                key={paquete.strId}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontSize: "14px",
                                                    marginLeft: "94.5px",
                                                }}
                                            >
                                                {paquete.arrObjetivos.map(
                                                    (objetivo, index) => (
                                                        <Box
                                                            key={objetivo.strId}
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            <p
                                                                style={{
                                                                    paddingRight:
                                                                        "30px",
                                                                }}
                                                            >
                                                                Objetivo{" "}
                                                                {index + 1}
                                                            </p>
                                                            <p>
                                                                {
                                                                    objetivo.strObjetivo
                                                                }
                                                            </p>
                                                        </Box>
                                                    )
                                                )}
                                            </Box>
                                        </Fragment>
                                    ))}
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
                        disabled={length === 1}
                    >
                        <Tooltip title="Eliminar">
                            <DeleteIcon />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        </Fragment>
    );
};

export default PaperFase;
