import React, { useState, useEffect, useCallback } from "react";

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
import DropdownPaquetes from "../../../../Admin/components/dropdownPaquetes";
import DropdownObjetivos from "../components/dropdownObjetivos";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalEditPaquete = ({ handleOpenDialog, open, onChange, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { intFase } = values;

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        objPaquete: values?.value ? values.value?.objPaquete : null,
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
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            onChange(data, { type: "edit", index: values?.index });
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
            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        setData({
            objPaquete: values?.value ? values.value?.objPaquete : null,
            arrObjetivos: values?.value ? values.value?.arrObjetivos : [],
        });
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
            <DialogTitle>Editar paquete de la fase #{intFase}</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={1}>
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
                                    onChange={(e, value) => onChange(value)}
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

export default ModalEditPaquete;
