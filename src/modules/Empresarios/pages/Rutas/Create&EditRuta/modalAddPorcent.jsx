import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";

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
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { Controller, useForm } from "react-hook-form";

import { makeStyles } from "@mui/styles";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalAddPorcentaje = ({ handleOpenDialog, open, onChange, valor }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        intPorcentaje: "",
    });

    const [intValorPorc, setIntValorPorc] = useState();

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
        watch,
    } = useForm({ mode: "onChange" });

    const watchIntPorcentaje = watch("intPorcentaje");

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            onChange(
                { intPorcentaje: data.intPorcentaje, valorPorce: intValorPorc },
                { type: "register" }
            );
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
        const intValorPorc = valor * (watchIntPorcentaje / 100);
        setIntValorPorc(intValorPorc);
    }, [watchIntPorcentaje, valor]);

    useEffect(() => {
        if (success) {
            handleOpenDialog();
            setData({ intPorcentaje: "" });
            reset({ intPorcentaje: "" });
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
            <DialogTitle>Añadir porcentaje</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            name="intPorcentaje"
                            defaultValue={data.intPorcentaje}
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    name={name}
                                    fullWidth
                                    label="Porcentaje"
                                    value={value}
                                    onValueChange={(v) => {
                                        onChange(v.floatValue);
                                    }}
                                    customInput={TextField}
                                    variant="standard"
                                    error={!!errors.intPorcentaje}
                                    helperText={
                                        errors.intPorcentaje?.message ||
                                        "Digita el porcentaje del pago"
                                    }
                                    required
                                    thousandSeparator
                                    isNumericString
                                    suffix="%"
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita el porcentaje del pago",
                                validate: (value) => {
                                    if(value > 100) {
                                        return "El porcentaje no puede ser mayor a 100"
                                    }
                                }
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <NumberFormat
                            label="Valor"
                            value={intValorPorc}
                            helperText="Porcentaje en dinero"
                            customInput={TextField}
                            fullWidth
                            variant="standard"
                            thousandSeparator={true}
                            allowNegative={false}
                            prefix={"$"}
                            disabled
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Valor de la fase:{" "}
                            {valor
                                ? new Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "COP",
                                  })
                                      .format(valor)
                                      .toString()
                                : ""}
                        </Typography>
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

export default ModalAddPorcentaje;
