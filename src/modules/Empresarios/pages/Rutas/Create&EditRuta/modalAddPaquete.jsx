import React, { useState, useEffect, useCallback, Fragment } from "react";

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
    Alert,
    TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import DropdownPaquetes from "../../../../Admin/components/dropdownPaquetes";
import DropdownObjetivos from "../components/dropdownObjetivos";
import DropdownSedeTarifa from "../components/dropdownSedeTarifa";
import NumberFormat from "react-number-format";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalAddPaquete = ({ handleOpenDialog, open, onChange, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { arrObjetivos, intFase } = values;

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        objPaquete: null,
        objSedeTarifa: null,
        valor: "",
        intDuracionHoras: "",
        arrObjetivos: [],
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
        reset,
        setValue,
        watch,
    } = useForm({ mode: "onChange" });

    const watchPaquete = watch("objPaquete");

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            onChange(data, { type: "register" });
            setFlagSubmit(false);
            setLoading(false);
            setSucces(true);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    const onSubmit = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    useEffect(() => {
        if (flagSubmit) {
            submitData();
        }
    }, [flagSubmit, submitData]);

    useEffect(() => {
        if (success) {
            handleOpenDialog();
            setData({
                objPaquete: null,
                objSedeTarifa: null,
                arrObjetivos: [],
                valor: "",
                intDuracionHoras: "",
            });
            reset({
                objPaquete: null,
                objSedeTarifa: null,
                arrObjetivos: [],
                valor: "",
                intDuracionHoras: "",
            });
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
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>Añadir paquete a la fase #{intFase}</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objPaquete"
                            defaultValue={data.objPaquete}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownPaquetes
                                    label="Paquete"
                                    name={name}
                                    required
                                    value={value}
                                    onChange={(e, value) => {
                                        setValue(
                                            "intDuracionHoras",
                                            value?.objInfoPrincipal
                                                ?.intDuracionHoras || ""
                                        );
                                        setValue("valor", "");
                                        setValue("objSedeTarifa", null);
                                        onChange(value);
                                    }}
                                    disabled={loading}
                                    error={errors?.objPaquete ? true : false}
                                    helperText={
                                        errors?.objPaquete?.message ||
                                        "Selecciona el paquete"
                                    }
                                />
                            )}
                            rules={{
                                required: "Por favor, selcciona el paquete",
                            }}
                            control={control}
                        />
                    </Grid>

                    {!watchPaquete && (
                        <Grid item xs={12}>
                            <Alert severity="info">
                                Selecciona un paquete para listar las sedes y
                                tarifas
                            </Alert>
                        </Grid>
                    )}

                    {watchPaquete && (
                        <Fragment>
                            <Grid item xs={12}>
                                <Controller
                                    name="objSedeTarifa"
                                    defaultValue={data.objSedeTarifa}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownSedeTarifa
                                            label="Sedes y tarifas (Referencia)"
                                            name={name}
                                            required
                                            data={watchPaquete.arrSedesTarifas}
                                            value={value}
                                            onChange={(e, value) => {
                                                setValue(
                                                    "valor",
                                                    value?.Valor || ""
                                                );
                                                setValue(
                                                    "intDuracionHoras",
                                                    value?.intDuracionHoras ||
                                                        ""
                                                );
                                                onChange(value);
                                            }}
                                            disabled={loading}
                                            error={
                                                errors?.objSedeTarifa
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objSedeTarifa
                                                    ?.message ||
                                                "Selecciona la sede tarifa"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, selecciona la sede tarifa",
                                    }}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="valor"
                                    defaultValue={data.valor}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <NumberFormat
                                            label="Valor real"
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
                                            disabled={loading}
                                            required
                                            error={!!errors?.valor?.message}
                                            helperText={
                                                errors?.valor?.message ||
                                                "Digita el valor real del paquete"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, digita un valor a este paquete",
                                    }}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Controller
                                    name="intDuracionHoras"
                                    defaultValue={data.intDuracionHoras}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <TextField
                                            label="Duración en horas"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                            type="number"
                                            fullWidth
                                            variant="standard"
                                            disabled={loading}
                                            required
                                            error={
                                                !!errors?.intDuracionHoras
                                                    ?.message
                                            }
                                            helperText={
                                                errors?.intDuracionHoras
                                                    ?.message ||
                                                "Digita la duración en horas"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, digita la duración en horas",
                                    }}
                                    control={control}
                                />
                            </Grid>
                        </Fragment>
                    )}

                    <Grid item xs={12}>
                        <Controller
                            name="arrObjetivos"
                            defaultValue={data.arrObjetivos}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownObjetivos
                                    label="Objetivos"
                                    name={name}
                                    required
                                    value={value}
                                    onChange={(e, value) => onChange(value)}
                                    disabled={loading}
                                    error={errors?.arrObjetivos ? true : false}
                                    helperText={
                                        errors?.arrObjetivos?.message ||
                                        "Selecciona los objetivos"
                                    }
                                    data={arrObjetivos}
                                    multiple
                                />
                            )}
                            rules={{
                                required: "Por favor, selecciona los objetivos",
                            }}
                            control={control}
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
                    añadir
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

export default ModalAddPaquete;
