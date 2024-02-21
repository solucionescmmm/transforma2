import React, { useState, useEffect, useCallback, useContext } from "react";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

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
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../../../../common/middlewares/Auth";
import DropdownTerceros from "../../../../../common/components/dropdowTerceros";
import DropdownEmpresarios from "../../../../../common/components/dropdownEmpresarios";
import SelectTipoTarifas from "../../../components/selectTipoTarifa";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCEdit = ({ handleOpenDialog, open, refresh, intIdEvento }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        intIdTarifa: null,
        arrTerceros: [],
        arrEmpresarios: [],
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({ mode: "onChange" });

    const watchTerceros = watch("arrTerceros");
    const watchEmpresarios = watch("arrEmpresarios");
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const onSubmit = (data) => {
        setData((prevState) => ({
            intIdEvento: Number(intIdEvento),
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
                    method: "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_MATRICULAS_SET}`,
                    data,
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
        [token, data]
    );

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
        if (success) {
            refresh({ intIdEvento: Number(intIdEvento) });
            handleOpenDialog();

            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Dialog
            fullScreen={bitMobile}
            open={loading ? true : open}
            onClose={handleOpenDialog}
            fullWidth
            maxWidth="md"
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>{`Matricular asistentes`}</DialogTitle>

            <DialogContent>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "25px" }}
                >
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Se debe diligenciar minimamente alguno de los
                            siguientes campos.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="intIdTarifa"
                            defaultValue={data.intIdTarifa}
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTipoTarifas
                                intIdEvento={intIdEvento}
                                    label="Tarifa"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={!!errors?.intIdTarifa}
                                    helperText={
                                        errors?.intIdTarifa?.message ||
                                        "Selecciona los responsables de la sesion"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name={`arrTerceros`}
                            defaultValue={data.arrTerceros}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownTerceros
                                    label="Terceros a matricular"
                                    multiple
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    variant="standard"
                                    error={!!errors?.arrTerceros}
                                    helperText={
                                        errors?.arrTerceros?.message ||
                                        "Selecciona los responsables de la sesion"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        watchEmpresarios?.length === 0 &&
                                        value?.length === 0
                                    ) {
                                        return "Por favor, selecciona las personas a matricular";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name={`arrEmpresarios`}
                            defaultValue={data.arrEmpresarios}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownEmpresarios
                                    label="Empresarios a matricular"
                                    multiple
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    variant="standard"
                                    error={!!errors?.arrEmpresarios}
                                    helperText={
                                        errors?.arrEmpresarios?.message ||
                                        "Selecciona los empresarios que asistiran al evento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (
                                        watchTerceros?.length === 0 &&
                                        value?.length === 0
                                    ) {
                                        return "Por favor, selecciona las personas a matricular";
                                    }
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton
                    color="primary"
                    loading={loading}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    registrar
                </LoadingButton>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    type="button"
                    disabled={loading}
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCEdit;
