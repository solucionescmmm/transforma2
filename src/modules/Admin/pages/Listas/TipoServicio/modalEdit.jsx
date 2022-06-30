import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import shortid from "shortid";

//Componentes de Material UI
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    Grid,
    Typography,
    TextField,
    Box,
    CircularProgress,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";

// Componentes
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PaperAtributo from "./paperAtributo";
import ModalPreview from "./modalPreview";
import useGetAtributos from "../../../hooks/useGetAtributos";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalEdit = ({ handleOpenDialog, open, values, refresh, data }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [state, setState] = useState({
        intId: "",
        strNombre: "",
        arrAtributos: [],
    });

    const [formData, setFormData] = useState();

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [openModalPreview, setOpenModalPreview] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        formState: { errors },
        getValues,
        reset,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "arrAtributos",
        keyName: "id",
    });

    const { data: dataAtributos } = useGetAtributos({ autoLoad: true });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: "PUT",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_TIPOSERVICIO_UPDATE}`,
                    data: { ...state },
                    headers: {
                        token,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    toast.success(res.data.msg);

                    setLoading(false);
                    setSucces(true);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        console.error(error);
                        setLoading(false);

                        toast.error(msg);
                    }
                });
        },
        [token, state]
    );

    const onSubmit = (data) => {
        setState((prevState) => ({
            ...prevState,
            ...data,
        }));
        setFlagSubmit(true);
    };

    const handlerChangeOpenModalPreview = () => {
        setOpenModalPreview(!openModalPreview);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    useEffect(() => {
        if (values) {
            const arrAtributos = values.arrAtributos.map((a) => {
                return {
                    id: a.id || shortid.generate(),
                    intIdAtributo: a.intIdAtributo,
                };
            });

            setState({
                intId: values.intId,
                intIdEstado: values.intIdEstado,
                strNombre: values.strNombre,
                arrAtributos: arrAtributos,
            });

            reset({
                intId: values.intId,
                intIdEstado: values.intIdEstado,
                strNombre: values.strNombre,
                arrAtributos: arrAtributos,
            });
        }
    }, [values, reset]);

    useEffect(() => {
        if (values?.length === 0 && fields.length === 0) {
            append({
                id: shortid.generate(),
                intIdAtributo: "",
            });
        }

        // eslint-disable-next-line
    }, [values]);

    useEffect(() => {
        if (success) {
            refresh();
            handleOpenDialog();

            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!dataAtributos) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={loading ? true : open}
                onClose={handleOpenDialog}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    component: "form",
                    noValidate: true,
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                <DialogTitle>Editar tipo de servicio</DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => handleOpenDialog()}
                        color="inherit"
                        type="button"
                    >
                        cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Fragment>
            <ModalPreview
                handleOpenDialog={handlerChangeOpenModalPreview}
                open={openModalPreview}
                values={formData}
                dataAttributes={dataAtributos}
            />

            <Dialog
                fullScreen={bitMobile}
                open={loading ? true : open}
                onClose={handleOpenDialog}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    component: "form",
                    noValidate: true,
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                {loading ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : null}
                <DialogTitle>Editar tipo de servicio</DialogTitle>

                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Todos los elementos marcados con *, son
                                obligatorios
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                defaultValue={state.strNombre}
                                name="strNombre"
                                render={({
                                    field: { onChange, value, name },
                                }) => (
                                    <TextField
                                        label="Nombre"
                                        variant="standard"
                                        name={name}
                                        value={value}
                                        disabled={loading}
                                        onChange={(e) => onChange(e)}
                                        required
                                        fullWidth
                                        error={errors[name] ? true : false}
                                        helperText={
                                            errors[name]?.message ||
                                            "Digita el nombre de la sede"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required:
                                        "Por favor, digita el nombre de la sede",
                                    validate: (value) => {
                                        if (
                                            data?.find(
                                                (a) =>
                                                    a.strNombre.toLowerCase() ===
                                                        value.toLowerCase() &&
                                                    a.intId !== state.intId
                                            )
                                        ) {
                                            return `Ya existe un tipo de servicio registrado como ${value}`;
                                        }
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    fontWeight: "bold",
                                    color: errors?.arrAtributos
                                        ? "#D33030"
                                        : "inherit",
                                }}
                            >
                                Atributos
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TransitionGroup>
                                {fields.map((e, i) => (
                                    <CSSTransition
                                        timeout={800}
                                        classNames={{
                                            enter: "animate__animated",
                                            enterActive:
                                                "animate__animated animate__bounceInLeft",
                                            enterDone: "animate__bounceInLeft",
                                            exit: "animate__animated",
                                            exitActive:
                                                "animate__animated animate__bounceOutRight",
                                            exitDone: "animate__bounceOutRight",
                                        }}
                                        key={e.id}
                                    >
                                        <PaperAtributo
                                            control={control}
                                            index={i}
                                            values={e}
                                            errors={errors}
                                            disabled={loading}
                                            remove={remove}
                                            length={fields.length}
                                            getValues={getValues}
                                            isEdit
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                disabled={loading}
                                fullWidth
                                type="button"
                                onClick={() =>
                                    append({
                                        id: shortid.generate(),
                                        intIdAtributo: "",
                                    })
                                }
                            >
                                Agregar atributo
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setFormData(getValues());
                            handlerChangeOpenModalPreview();
                        }}
                        color="primary"
                        disabled={loading}
                        type="button"
                        sx={{
                            flexGrow: 1,
                            justifyContent: "left",
                        }}
                    >
                        previsualizar formulario
                    </Button>

                    <LoadingButton
                        color="primary"
                        loading={loading}
                        type="submit"
                    >
                        guardar
                    </LoadingButton>

                    <Button
                        onClick={() => handleOpenDialog()}
                        color="inherit"
                        disabled={loading}
                        type="button"
                    >
                        cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalEdit;
