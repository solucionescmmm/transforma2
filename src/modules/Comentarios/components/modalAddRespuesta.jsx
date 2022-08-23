import React, { useState, useContext } from "react";

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
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const ModalAddComentario = ({ socket, onClose, open, values }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intIdComentario: values?.intIdComentario,
        intIdIdea: values?.intIdIdea,
        strMensaje: "",
        dtmCreacion: null,
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

        socket.emit("mdlComentarios:setRespuesta", {
            ...data,
            intIdComentario: values.intIdComentario,
            intIdIdea: values.intIdIdea,
            strUsuarioCreacion: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
        });

        socket.on("mdlComentarios:setRespuesta", () => {
            onClose();

            setData({
                intIdComentario: values.intIdComentario,
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                dtmCreacion: null,
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });

            reset({
                intIdComentario: values.intIdComentario,
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                dtmCreacion: null,
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });

            setLoading(false);
        });
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Dialog
            open={loading || open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={bitMobile}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Agregar Respuesta</DialogTitle>

            <DialogContent>
                <Grid container component="form" direction="row" spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: "10px" }}>
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
                    responder
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

export default ModalAddComentario;
