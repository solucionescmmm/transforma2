import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

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
    Edit as EditIcon,
} from "@mui/icons-material";

//Componentes
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import ModalAddObjetivo from "./modalAddObjetivo";
import shortid from "shortid";
import ModalAddPaquete from "./modalAddPaquete";
import ModalAddServicio from "./modalAddServicio";
import ModalEditObjetivo from "./modalEditObjetivo";
import ModalDeleteObjetivo from "./modalDeleteObjetivo";
import ModalEditPaquete from "./modalEditPaquete";
import ModalDeletePaquete from "./modalDeletePaquete";
import ModalEditServicio from "./modalEditServicio";
import ModalDeleteServicio from "./modalDeleteServicio";
import SelectEstadosRutas from "../components/selectEstadosRutas";
import toast from "react-hot-toast";

const PaperFase = ({
    values,
    index,
    control,
    disabled,
    setValue,
    errors,
    remove,
    length,
    isEdit,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        Id: values.Id || values.strId || values.intId || null,
        intEstado: values.intEstado || values.intIdEstadoFase || "",
        intDiagnostico: values.intDiagnostico || "",
        strResponsable: values.strResponsable || "",
        strObservaciones: values.strObservaciones || "",
        arrObjetivos: values.arrObjetivos || [],
        arrPaquetes: values.arrPaquetes || [],
        arrServicios: values.arrServicios || [],
        dblValorRef: values.dblValorRef || "",
        dblValorFase: values.dblValorFase || "",
    });

    const [openCollapese, setOpenCollapse] = useState(true);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalAddObjetivo, setOpenModalAddObjetivo] = useState(false);
    const [openModalEditObjetivo, setOpenModalEditObjetivo] = useState(false);
    const [openModalDeleteObjetivo, setOpenModalDeleteObjetivo] =
        useState(false);
    const [openModalAddPaquete, setOpenModalAddPaquete] = useState(false);
    const [openModalEditPaquete, setOpenModalEditPaquete] = useState(false);
    const [openModalDeletePaquete, setOpenModalDeletePaquete] = useState(false);
    const [openModalAddServicio, setOpenModalAddServicio] = useState(false);
    const [openModalEditServicio, setOpenModalEditServicio] = useState(false);
    const [openModalDeleteServicio, setOpenModalDeleteServicio] =
        useState(false);

    const [valueObjetivo, setValueObjetivo] = useState();
    const [valuePaquete, setValuePaquete] = useState();
    const [valueServicio, setValueServicio] = useState();

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

    const handlerChangeOpenModalEditObjetivo = () => {
        setOpenModalEditObjetivo(!openModalEditObjetivo);
    };

    const handlerChangeOpenModalDeleteObjetivo = () => {
        setOpenModalDeleteObjetivo(!openModalDeleteObjetivo);
    };

    const handlerChangeOpenModalAddPaquete = () => {
        setOpenModalAddPaquete(!openModalAddPaquete);
    };

    const handlerChangeOpenModalEditPaquete = () => {
        setOpenModalEditPaquete(!openModalEditPaquete);
    };

    const handlerChangeOpenModalDeletePaquete = () => {
        setOpenModalDeletePaquete(!openModalDeletePaquete);
    };

    const handlerChangeOpenModalAddServicio = () => {
        setOpenModalAddServicio(!openModalAddServicio);
    };

    const handlerChangeOpenModalEditServicio = () => {
        setOpenModalEditServicio(!openModalEditServicio);
    };

    const handlerChangeOpenModalDeleteServicio = () => {
        setOpenModalDeleteServicio(!openModalDeleteServicio);
    };

    const handlerChangeObjetivo = (value, mode) => {
        const newArrObjetivos = [...data.arrObjetivos];

        if (mode.type === "register") {
            newArrObjetivos.push({
                strId: shortid.generate(),
                strObjetivo: value.strNombre,
                intId: value.intId,
            });
        }

        if (mode.type === "edit") {
            newArrObjetivos[mode.index] = {
                strId: value.strId,
                strObjetivo: value.strNombre,
                intId: value.intId,
            };
        }

        if (mode.type === "delete") {
            newArrObjetivos.splice(mode.index, 1);
        }

        setValue(`arrInfoFases[${index}].arrObjetivos`, newArrObjetivos);

        setData((prevState) => ({
            ...prevState,
            arrObjetivos: newArrObjetivos,
        }));
    };

    const handlerChangePaquete = (value, mode) => {
        const newArrPaquetes = [...data.arrPaquetes];

        if (mode.type === "register") {
            if (
                newArrPaquetes.find(
                    (x) =>
                        x.objPaquete.objInfoPrincipal.strNombre ===
                        value.objPaquete.objInfoPrincipal.strNombre
                )
            ) {
                toast.error(
                    "El paquete ya se encuentra agregado, por favor selecciona otro"
                );
            } else {
                newArrPaquetes.push({
                    strId: shortid.generate(),
                    objPaquete: value.objPaquete,
                    objSedeTarifa: value.objSedeTarifa,
                    valor: value.valor,
                    intDuracionHoras: value.intDuracionHoras,
                    arrObjetivos: value.arrObjetivos,
                    valorTotalPaquete: value.valorTotalPaquete,
                });
            }
        }

        if (mode.type === "edit") {
            if (
                newArrPaquetes.find(
                    (x, index) =>
                        x.objPaquete.objInfoPrincipal.strNombre ===
                            value.objPaquete.objInfoPrincipal.strNombre &&
                        mode.index !== index
                )
            ) {
                toast.error(
                    "El paquete ya se encuentra agregado, por favor selecciona otro"
                );
            } else {
                newArrPaquetes[mode.index] = {
                    strId: value.strId,
                    objPaquete: value.objPaquete,
                    objSedeTarifa: value.objSedeTarifa,
                    valor: value.valor,
                    intDuracionHoras: value.intDuracionHoras,
                    arrObjetivos: value.arrObjetivos,
                    valorTotalPaquete: value.valorTotalPaquete,
                };
            }
        }

        if (mode.type === "delete") {
            newArrPaquetes.splice(mode.index, 1);
        }

        setValue(`arrInfoFases[${index}].arrPaquetes`, newArrPaquetes);

        setData((prevState) => ({
            ...prevState,
            arrPaquetes: newArrPaquetes,
        }));
    };

    const handlerChangeServicio = (value, mode) => {
        const newArrServicios = [...data.arrServicios];

        if (mode.type === "register") {
            if (
                newArrServicios.find(
                    (x) =>
                        x.objServicio.objInfoPrincipal.strNombre ===
                        value.objServicio.objInfoPrincipal.strNombre
                )
            ) {
                toast.error(
                    "El servicios ya se encuentra agregado, por favor selecciona otro"
                );
            } else {
                newArrServicios.push({
                    strId: shortid.generate(),
                    objServicio: value.objServicio,
                    objSedeTarifa: value.objSedeTarifa,
                    valor: value.valor,
                    intDuracionHoras: value.intDuracionHoras,
                    arrObjetivos: value.arrObjetivos,
                    valorTotalServicio: value.valorTotalServicio,
                });
            }
        }

        if (mode.type === "edit") {
            if (
                newArrServicios.find(
                    (x) =>
                        x.objServicio.objInfoPrincipal.strNombre ===
                            value.objServicio.objInfoPrincipal.strNombre &&
                        mode.index !== index
                )
            ) {
                toast.error(
                    "El servicios ya se encuentra agregado, por favor selecciona otro"
                );
            } else {
                newArrServicios[mode.index] = {
                    strId: value.strId,
                    objServicio: value.objServicio,
                    objSedeTarifa: value.objSedeTarifa,
                    valor: value.valor,
                    intDuracionHoras: value.intDuracionHoras,
                    arrObjetivos: value.arrObjetivos,
                    valorTotalServicio: value.valorTotalServicio,
                };
            }
        }

        if (mode.type === "delete") {
            newArrServicios.splice(mode.index, 1);
        }

        setValue(`arrInfoFases[${index}].arrServicios`, newArrServicios);

        setData((prevState) => ({
            ...prevState,
            arrServicios: newArrServicios,
        }));
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    // //===============================================================================================================================================
    useEffect(() => {
        let dblValorRef = 0;

        for (let i = 0; i < data.arrPaquetes.length; i++) {
            const { valor } = data.arrPaquetes[i];
            dblValorRef += valor;
        }

        for (let i = 0; i < data.arrServicios.length; i++) {
            const { valor } = data.arrServicios[i];

            dblValorRef += valor;
        }

        setValue(`arrInfoFases[${index}].dblValorRef`, dblValorRef);

        setData((prevState) => ({
            ...prevState,
            dblValorRef,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.arrServicios, data.arrPaquetes]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    if (!data.Id) {
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

    return (
        <Fragment>
            <ModalAddObjetivo
                open={openModalAddObjetivo}
                handleOpenDialog={handlerChangeOpenModalAddObjetivo}
                onChange={handlerChangeObjetivo}
            />

            <ModalEditObjetivo
                open={openModalEditObjetivo}
                handleOpenDialog={handlerChangeOpenModalEditObjetivo}
                onChange={handlerChangeObjetivo}
                values={valueObjetivo}
            />

            <ModalDeleteObjetivo
                open={openModalDeleteObjetivo}
                handleOpenDialog={handlerChangeOpenModalDeleteObjetivo}
                onChange={handlerChangeObjetivo}
                values={valueObjetivo}
            />

            <ModalAddPaquete
                open={openModalAddPaquete}
                handleOpenDialog={handlerChangeOpenModalAddPaquete}
                onChange={handlerChangePaquete}
                values={{
                    arrObjetivos: data.arrObjetivos,
                    intFase: index + 1,
                }}
            />

            <ModalEditPaquete
                open={openModalEditPaquete}
                handleOpenDialog={handlerChangeOpenModalEditPaquete}
                onChange={handlerChangePaquete}
                values={{
                    ...valuePaquete,
                    intFase: index + 1,
                }}
            />

            <ModalDeletePaquete
                open={openModalDeletePaquete}
                handleOpenDialog={handlerChangeOpenModalDeletePaquete}
                onChange={handlerChangePaquete}
                values={valuePaquete}
            />

            <ModalAddServicio
                open={openModalAddServicio}
                handleOpenDialog={handlerChangeOpenModalAddServicio}
                onChange={handlerChangeServicio}
                values={{
                    arrObjetivos: data.arrObjetivos,
                    intFase: index + 1,
                }}
            />

            <ModalEditServicio
                open={openModalEditServicio}
                handleOpenDialog={handlerChangeOpenModalEditServicio}
                onChange={handlerChangeServicio}
                values={{
                    ...valueServicio,
                    intFase: index + 1,
                }}
            />

            <ModalDeleteServicio
                open={openModalDeleteServicio}
                handleOpenDialog={handlerChangeOpenModalDeleteServicio}
                onChange={handlerChangeServicio}
                values={valueServicio}
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
                                {isEdit && (
                                    <Grid item xs={12}>
                                        <Controller
                                            defaultValue={data.intEstado}
                                            name={`arrInfoFases[${index}].intEstado`}
                                            render={({
                                                field: {
                                                    name,
                                                    onChange,
                                                    value,
                                                },
                                            }) => (
                                                <SelectEstadosRutas
                                                    label="Estado"
                                                    name={name}
                                                    value={value}
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                    disabled={disabled}
                                                    required
                                                    error={
                                                        !!errors
                                                            ?.arrInfoFases?.[
                                                            index
                                                        ]?.intEstado
                                                    }
                                                    helperText={
                                                        errors?.arrInfoFases?.[
                                                            index
                                                        ]?.intEstado?.message ||
                                                        "Selecciona el estado de la fase"
                                                    }
                                                />
                                            )}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Por favor, selecciona el estado de la fase",
                                            }}
                                        />
                                    </Grid>
                                )}

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
                                                onChange={(_, value) =>
                                                    onChange(value)
                                                }
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
                                                    ]?.strResponsable
                                                        ?.message ||
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
                                                disabled={disabled}
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
                                                key={
                                                    objetivo.strId ||
                                                    objetivo.intId
                                                }
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontSize: "14px",
                                                    gap: 1,
                                                    alignItems: "center",
                                                    marginBottom: "20px"
                                                }}
                                            >
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <p
                                                        style={{
                                                            paddingRight:
                                                                "30px",
                                                        }}
                                                    >
                                                        Objetivo {index + 1}
                                                    </p>
                                                    <p>
                                                        {objetivo.strObjetivo ||
                                                            objetivo.strNombre}
                                                    </p>
                                                </Box>

                                                <EditIcon
                                                    htmlColor={
                                                        !disabled
                                                            ? "green"
                                                            : "inherit"
                                                    }
                                                    fontSize="small"
                                                    disabled={disabled}
                                                    onClick={() => {
                                                        setValueObjetivo({
                                                            value: objetivo,
                                                            index,
                                                        });
                                                        handlerChangeOpenModalEditObjetivo();
                                                    }}
                                                />

                                                <DeleteIcon
                                                    color={
                                                        !disabled
                                                            ? "error"
                                                            : "inherit"
                                                    }
                                                    fontSize="small"
                                                    disabled={disabled}
                                                    onClick={() => {
                                                        setValueObjetivo({
                                                            value: objetivo,
                                                            index,
                                                        });
                                                        handlerChangeOpenModalDeleteObjetivo();
                                                    }}
                                                />
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
                                                disabled={disabled}
                                            >
                                                Adicionar paquete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    {data.arrPaquetes.map((paquete, index) => (
                                        <Fragment
                                            key={
                                                paquete.strId ||
                                                paquete.intId ||
                                                index
                                            }
                                        >
                                            <Box
                                                key={paquete.strId}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontSize: "14px",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    marginBottom: "20px"
                                                }}
                                            >
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <p
                                                        style={{
                                                            paddingRight:
                                                                "30px",
                                                        }}
                                                    >
                                                        Paquete {index + 1}
                                                    </p>
                                                    <p>
                                                        Nombre:{" "}
                                                        {`${
                                                            paquete.objPaquete
                                                                .objInfoPrincipal
                                                                .strNombre
                                                        } - ${
                                                            paquete
                                                                ?.objSedeTarifa
                                                                ?.strSede
                                                            paquete
                                                                ?.objSedeTarifa
                                                                ?.strSede
                                                        } - ${
                                                            paquete
                                                                .objSedeTarifa
                                                                ?.strTarifa
                                                        } - ${new Intl.NumberFormat(
                                                            "es-ES",
                                                            {
                                                                style: "currency",
                                                                currency: "COP",
                                                            }
                                                        )
                                                            .format(
                                                                paquete.valor
                                                            )
                                                            .toString()}`}
                                                    </p>
                                                    <p>
                                                        Valor:{" "}
                                                        {new Intl.NumberFormat(
                                                            "es-ES",
                                                            {
                                                                style: "currency",
                                                                currency: "COP",
                                                            }
                                                        )
                                                            .format(
                                                                paquete.valorTotalPaquete
                                                            )
                                                            .toString()}
                                                    </p>
                                                </Box>

                                                <EditIcon
                                                    htmlColor={
                                                        !disabled
                                                            ? "green"
                                                            : "inherit"
                                                    }
                                                    fontSize="small"
                                                    disabled={disabled}
                                                    onClick={() => {
                                                        setValuePaquete({
                                                            value: paquete,
                                                            index,
                                                        });
                                                        handlerChangeOpenModalEditPaquete();
                                                    }}
                                                />

                                                <DeleteIcon
                                                    color={
                                                        !disabled
                                                            ? "error"
                                                            : "inherit"
                                                    }
                                                    fontSize="small"
                                                    disabled={disabled}
                                                    onClick={() => {
                                                        setValuePaquete({
                                                            value: paquete,
                                                            index,
                                                        });
                                                        handlerChangeOpenModalDeletePaquete();
                                                    }}
                                                />
                                            </Box>

                                            <Box
                                                key={paquete.strId}
                                                style={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {paquete.arrObjetivos.map(
                                                    (objetivo, index) => (
                                                        <Box
                                                            key={
                                                                objetivo.strId ||
                                                                objetivo.intId ||
                                                                index
                                                            }
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            <li>
                                                                {objetivo.strObjetivo ||
                                                                    objetivo.strNombre}
                                                            </li>
                                                        </Box>
                                                    )
                                                )}
                                            </Box>
                                        </Fragment>
                                    ))}
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
                                                Servicios
                                            </b>
                                        </Box>

                                        <Box>
                                            <Button
                                                size="small"
                                                style={{ fontSize: "13px" }}
                                                onClick={() =>
                                                    handlerChangeOpenModalAddServicio()
                                                }
                                                disabled={disabled}
                                            >
                                                Adicionar servicio
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    {data.arrServicios.map(
                                        (servicio, index) => (
                                            <Fragment
                                                key={
                                                    servicio.strId ||
                                                    servicio.intId ||
                                                    index
                                                }
                                            >
                                                <Box
                                                    key={
                                                        servicio.strId ||
                                                        servicio.intId
                                                    }
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <p
                                                            style={{
                                                                paddingRight:
                                                                    "30px",
                                                            }}
                                                        >
                                                            Servicio {index + 1}
                                                        </p>
                                                        <p>
                                                            Nombre:{" "}
                                                            {`${
                                                                servicio
                                                                    ?.objServicio
                                                                    ?.objInfoPrincipal
                                                                    ?.strNombre
                                                                servicio
                                                                    ?.objServicio
                                                                    ?.objInfoPrincipal
                                                                    ?.strNombre
                                                            } - ${
                                                                servicio
                                                                    ?.objSedeTarifa
                                                                    ?.strSede
                                                                servicio
                                                                    ?.objSedeTarifa
                                                                    ?.strSede
                                                            } - ${
                                                                servicio
                                                                    ?.objSedeTarifa
                                                                    ?.strTarifa
                                                                servicio
                                                                    ?.objSedeTarifa
                                                                    ?.strTarifa
                                                            } - ${new Intl.NumberFormat(
                                                                "es-ES",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "COP",
                                                                }
                                                            )
                                                                .format(
                                                                    servicio?.valor
                                                                )
                                                                .toString()}`}
                                                        </p>

                                                        <p>
                                                            Valor:{" "}
                                                            {new Intl.NumberFormat(
                                                                "es-ES",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "COP",
                                                                }
                                                            )
                                                                .format(
                                                                    servicio.valorTotalServicio
                                                                )
                                                                .toString()}
                                                        </p>
                                                    </Box>

                                                    <EditIcon
                                                        htmlColor={
                                                            !disabled
                                                                ? "green"
                                                                : "inherit"
                                                        }
                                                        fontSize="small"
                                                        disabled={disabled}
                                                        onClick={() => {
                                                            setValueServicio({
                                                                value: servicio,
                                                                index,
                                                            });
                                                            handlerChangeOpenModalEditServicio();
                                                        }}
                                                    />

                                                    <DeleteIcon
                                                        color={
                                                            !disabled
                                                                ? "error"
                                                                : "inherit"
                                                        }
                                                        fontSize="small"
                                                        disabled={disabled}
                                                        onClick={() => {
                                                            setValueServicio({
                                                                value: servicio,
                                                                index,
                                                            });
                                                            handlerChangeOpenModalDeleteServicio();
                                                        }}
                                                    />
                                                </Box>

                                                <Box
                                                    style={{
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {servicio.arrObjetivos.map(
                                                        (objetivo, index) => (
                                                            <Box
                                                                key={
                                                                    objetivo.strId ||
                                                                    objetivo.intId ||
                                                                    index
                                                                }
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "row",
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            >
                                                                <li>
                                                                    {objetivo.strObjetivo ||
                                                                        objetivo.strNombre}
                                                                </li>
                                                            </Box>
                                                        )
                                                    )}
                                                </Box>
                                            </Fragment>
                                        )
                                    )}
                                </Grid>

                                <hr
                                    style={{
                                        width: "100%",
                                    }}
                                />

                                <Grid item xs="12">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: "14px" }}>
                                                Valor Fase
                                            </b>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <NumberFormat
                                        label="Valor de referencia"
                                        value={data.dblValorRef}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        prefix={"$"}
                                        customInput={TextField}
                                        fullWidth
                                        variant="standard"
                                        disabled
                                        required
                                        helperText={
                                            "Valor de referencia de la fase"
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.dblValorFase}
                                        name={`arrInfoFases[${index}].dblValorFase`}
                                        render={({
                                            field: { name, value, onChange },
                                        }) => (
                                            <NumberFormat
                                                label="Valor fase"
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
                                                    !!errors?.arrInfoFases?.[
                                                        index
                                                    ]?.dblValorFase
                                                }
                                                helperText={
                                                    errors?.arrInfoFases?.[
                                                        index
                                                    ]?.dblValorFase?.message ||
                                                    "Digita el valor de la fase"
                                                }
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita el valor de la fase",
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
                        disabled={disabled || length === 1}
                    >
                        <Tooltip title="Eliminar">
                            <DeleteIcon
                                color={!disabled ? "error" : "inherit"}
                            />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        </Fragment>
    );
};

export default PaperFase;
