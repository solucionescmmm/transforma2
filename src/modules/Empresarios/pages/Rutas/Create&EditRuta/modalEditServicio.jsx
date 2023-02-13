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
import DropdownServicios from "../../../../Admin/components/dropdownServicios";
import DropdownObjetivos from "../components/dropdownObjetivos";
import DropdownSedeTarifa from "../components/dropdownSedeTarifa";
import NumberFormat from "react-number-format";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalEditServicio = ({ handleOpenDialog, open, onChange, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { intFase, intIdTipoTarifa } = values;

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        objServicio: values?.value ? values.value?.objServicio : null,
        objSedeTarifa: values?.value ? values.value?.objSedeTarifa : null,
        valor: values?.value ? values.value?.Valor : "",
        intDuracionHoras: values?.value ? values.value?.intDuracionHoras : "",
        arrObjetivos: values?.value ? values.value?.arrObjetivos : [],
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
        watch,
        setValue,
    } = useForm({ mode: "onChange" });

    const watchServicio = watch("objServicio");

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            onChange(data, { type: "edit", index: values.index });
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
            setData({ objServicio: null, arrObjetivos: [] });
            reset({ objServicio: null, arrObjetivos: [] });
            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        setData({
            objServicio: values?.value ? values.value?.objServicio : null,
            arrObjetivos: values?.value ? values.value?.arrObjetivos : [],
            valor: values?.value ? values.value?.Valor : "",
            intDuracionHoras: values?.value
                ? values.value?.intDuracionHoras
                : "",
            objSedeTarifa: values?.value ? values.value?.objSedeTarifa : null,
            valorTotalServicio: values?.value
                ? values.value?.valorTotalServicio
                : "",
        });

        reset({
            objServicio: values?.value ? values.value?.objServicio : null,
            arrObjetivos: values?.value ? values.value?.arrObjetivos : [],
            valor: values?.value ? values.value?.Valor : "",
            intDuracionHoras: values?.value
                ? values.value?.intDuracionHoras
                : "",
            objSedeTarifa: values?.value ? values.value?.objSedeTarifa : null,
            valorTotalServicio: values?.value
                ? values.value?.valorTotalServicio
                : "",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

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
            <DialogTitle>Editar servicio de la fase #{intFase}</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objServicio"
                            defaultValue={data.objServicio}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownServicios
                                    label="Servicio"
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
                                    error={errors?.objServicio ? true : false}
                                    helperText={
                                        errors?.objServicio?.message ||
                                        "Selecciona el servicio"
                                    }
                                    intIdTipoTarifa={intIdTipoTarifa}
                                />
                            )}
                            rules={{
                                required: "Por favor, selcciona el servicio",
                            }}
                            control={control}
                        />
                    </Grid>

                    {!watchServicio && (
                        <Grid item xs={12}>
                            <Alert severity="info">
                                Selecciona un servicio para listar las sedes y
                                tarifas
                            </Alert>
                        </Grid>
                    )}

                    {watchServicio && (
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
                                            data={watchServicio.arrSedesTarifas}
                                            value={value}
                                            onChange={(e, value) => {
                                                setValue(
                                                    "valor",
                                                    value?.Valor || ""
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
                                            "Por favor, selcciona la sede tarifa",
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
                                                "Digita el valor real del servicio"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, digita un valor a este servicio",
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
                                    data={values?.value.arrObjetivos || []}
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
                    guardar
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

export default ModalEditServicio;
