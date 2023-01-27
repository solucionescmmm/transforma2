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

const ModalAddServicio = ({ handleOpenDialog, open, onChange, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { arrObjetivos, intFase, intIdTipoTarifa } = values;

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        objServicio: null,
        objSedeTarifa: null,
        arrObjetivos: [],
        valorTotalServicio: "",
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
    } = useForm({ mode: "onChange" });

    const watchServicio = watch("objServicio");

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
                objServicio: null,
                objSedeTarifa: null,
                arrObjetivos: [],
                valorTotalServicio: "",
            });
            reset({
                objServicio: null,
                objSedeTarifa: null,
                arrObjetivos: [],
                valorTotalServicio: "",
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
            <DialogTitle>Añadir servicio a la fase #{intFase}</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={1}>
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
                                            label="Sedes y tarifas"
                                            name={name}
                                            required
                                            data={watchServicio.arrSedesTarifas}
                                            value={value}
                                            onChange={(e, value) => {
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

                            <Grid item xs={12}>
                                <Controller
                                    name="valorTotalServicio"
                                    defaultValue={data.valorTotalServicio}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <NumberFormat
                                            label="Valor real del servicio"
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
                                            error={!!errors?.valorTotalServicio}
                                            helperText={
                                                errors?.valorTotalServicio
                                                    ?.message ||
                                                "Digita el valor total del servicio"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, digita el valor total del servicio",
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

export default ModalAddServicio;
