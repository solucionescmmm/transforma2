import React, { useState, useContext, useEffect } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    useMediaQuery,
    Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const ModalEditComentario = ({ socket, values, onClose, open }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intId: values.intIdComentario,
        intIdIdea: values?.intIdIdea,
        strMensaje: "",
        strUsuarioCreacion: "",
        strURLImagenUsuario: "",
    });

    const [loading, setLoading] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const onSubmit = (data) => {
        setLoading(true);

        socket.emit("mdlComentarios:updateComentario", {
            ...data,
            intId: values.intId,
            intIdIdea: values?.intIdIdea,
            strUsuarioCreacion: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
        });

        socket.on("mdlComentarios:updateComentario", () => {
            onClose();

            setData({
                intId: values.intId,
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });

            reset({
                intId: values.intId,
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });

            setLoading(false);
        });
    };

    useEffect(() => {
        setData({
            intId: values.intId,
            intIdIdea: values.intIdIdea || null,
            strMensaje: values.strMensaje || "",
            strUsuarioCreacion: values.strUsuarioCreacion || "",
            strURLImagenUsuario: values.strURLImagenUsuario || "",
        });
    }, [values]);

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Dialog
            open={loading || open}
            onClose={onClose}
            maxWidth="md"
            fullScreen={bitMobile}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Editar Comentario</DialogTitle>

            <DialogContent>
                <Grid
                    container
                    component="form"
                    direction="row"
                    spacing={2}
                    sx={{ minWidth: "500px" }}
                >
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strMensaje}
                            name="strMensaje"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Comentario"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    error={errors?.strMensaje ? true : false}
                                    required
                                    helperText={
                                        errors?.strMensaje?.message ||
                                        "Digite el comentario."
                                    }
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digite el comentario",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton loading={loading} type="submit">
                    guardar
                </LoadingButton>

                <Button
                    onClick={() => onClose()}
                    disabled={loading}
                    color="inherit"
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditComentario;
