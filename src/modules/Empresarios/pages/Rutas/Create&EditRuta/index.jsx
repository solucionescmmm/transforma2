/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    LinearProgress,
    Container,
    Alert,
    Button,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoFases from "./infoFases";
import PageError from "../../../../../common/components/Error";
import ModalPreview from "./modalPreview";
import useGetRutas from "../../../hooks/useGetRutas";
import Loader from "../../../../../common/components/Loader";

const styles = makeStyles((theme) => ({
    containerPR: {
        [theme.breakpoints.down("sm")]: {
            paddingRigth: "0px",
            paddingLeft: "0px",
        },
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const CURuta = ({ isEdit, intId, intIdIdea, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { data: values } = useGetRutas({
        autoLoad: !!isEdit,
        intIdIdea,
        intId,
    });

    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
        arrInfoFases: [],
    });

    const [openModalPreview, setOpenModalPreview] = useState(false);

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues,
        clearErrors,
        watch,
    } = useForm({ mode: "onChange" });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "arrInfoFases",
        keyName: "Id",
    });

    const [valorTotalRuta, setValorTotalRuta] = useState(0);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: isEdit ? "PUT" : "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${
                        isEdit
                            ? process.env.REACT_APP_API_TRANSFORMA_RUTAS_PUT
                            : process.env.REACT_APP_API_TRANSFORMA_RUTAS_SET
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            const newData = {
                                ...data,
                                objInfoPrincipal: {
                                    ...data.objInfoPrincipal,
                                    intIdIdea,
                                    valorTotalRuta,
                                },
                            };

                            return JSON.stringify(newData);
                        },
                    ],
                    headers: {
                        token,
                        "Content-Type": "application/json;charset=UTF-8",
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
        [token, data, isEdit]
    );

    const handlerChangeOpenModalPreview = () => {
        setOpenModalPreview(!openModalPreview);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (isEdit && values) {
            setData({
                ...values[0],
                objInfoPrincipal: {
                    ...values[0].objInfoPrincipal,
                    intEstado: values[0].intIdEstadoRuta,
                },
            });
            reset({
                ...values,
                objInfoPrincipal: {
                    ...values[0].objInfoPrincipal,
                    intEstado: values[0].intIdEstadoRuta,
                },
            });
        }
    }, [isEdit, values]);

    useEffect(() => {
        const subscription = watch((value) => {
            const watchArrInfoFases = value.arrInfoFases;

            if (watchArrInfoFases) {
                watchArrInfoFases.forEach((e, index) => {
                    if (e.dblValorRef === undefined)
                        watchArrInfoFases.splice(index, 1);
                });

                let cont = 0;

                for (let index = 0; index < watchArrInfoFases.length; index++) {
                    const dblValorFase = getValues(
                        `arrInfoFases[${index}].dblValorFase`
                    );

                    if (dblValorFase) cont += dblValorFase;
                }

                setValorTotalRuta(cont);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (values) {
            setData(values[0]);
            reset(values[0]);
        }
    }, [values]);

    useEffect(() => {
        if (isEdit) {
            reset(data);
        }
    }, [data, reset, isEdit]);

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (success) {
        onChangeRoute("Rutas");
    }

    if (data?.error) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos de la ruta seleccionada, por favor escala al área de TI para más información."
                title={data.msg}
            />
        );
    }

    if (isEdit && !values) {
        return <Loader />;
    }

    return (
        <Fragment>
            <ModalPreview
                open={openModalPreview}
                handleOpenDialog={handlerChangeOpenModalPreview}
                values={{ ...getValues(), valorTotalRuta }}
            />

            <Grid
                container
                direction="row"
                spacing={0}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    marginTop: "10px",
                }}
            >
                <Grid item xs={12}>
                    <Container className={classes.containerPR}>
                        <Paper className={classes.paper}>
                            {loading ? (
                                <LinearProgress
                                    className={classes.linearProgress}
                                />
                            ) : null}

                            <Grid
                                container
                                direction="row"
                                spacing={2}
                                style={{ padding: "25px" }}
                            >
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                style={{ fontWeight: "bold" }}
                                                color="primary"
                                                variant="h6"
                                            >
                                                {isEdit
                                                    ? "EDITAR RUTA"
                                                    : "REGISTRAR RUTA"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        Todos los campos marcados con (*) son
                                        obligatorios.
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoPrincipal
                                        control={control}
                                        values={data.objInfoPrincipal}
                                        disabled={loading}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        isEdit={isEdit}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoFases
                                        control={control}
                                        values={data.arrInfoFases}
                                        disabled={loading}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        isEdit={isEdit}
                                        fields={fields}
                                        append={append}
                                        remove={remove}
                                        watch={watch}
                                    />
                                </Grid>

                                {(errors.objInfoPrincipal ||
                                    errors.arrInfoFases) && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            Lo sentimos, tienes campos
                                            pendientes por diligenciar en el
                                            formulario, revisa e intentalo
                                            nuevamente.
                                        </Alert>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 1,
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            Valor total de la ruta:{" "}
                                            {new Intl.NumberFormat("es-ES", {
                                                style: "currency",
                                                currency: "COP",
                                            }).format(valorTotalRuta)}
                                        </p>
                                        <Button
                                            type="button"
                                            disabled={loading}
                                            onClick={() =>
                                                handlerChangeOpenModalPreview()
                                            }
                                        >
                                            Previsualizar
                                        </Button>
                                        <LoadingButton
                                            variant="contained"
                                            type="submit"
                                            loading={loading}
                                        >
                                            {isEdit ? "guardar" : "registrar"}
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default CURuta;
