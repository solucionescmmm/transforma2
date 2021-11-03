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
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const ModalEditRespuesta = ({ socket, onClose, open, values }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intId: values?.intId,
        intIdComentario: values?.intIdComentario,
        intIdEmpresario: values?.intIdEmpresario,
        strMensaje: "",
        dtFechaCreacion: null,
        strUsuario: "",
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

        socket.emit("mdlComentarios:updateRespuesta", {
            ...data,
            strUsuario: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
            intIdEmpresario: values.intIdEmpresario,
        });

        socket.on("mdlComentarios:updateRespuesta", () => {
            onClose();

            setData({
                intIdComentario: values?.intIdComentario,
                strMensaje: "",
                dtFechaCreacion: null,
                strUsuario: "",
                strURLImagenUsuario: "",
            });

            reset({
                intIdComentario: values?.intIdComentario,
                strMensaje: "",
                dtFechaCreacion: null,
                strUsuario: "",
                strURLImagenUsuario: "",
            });

            setLoading(false);
        });
    };

    useEffect(() => {
        setData({
            intId: values?.intId,
            intIdComentario: values?.intIdComentario,
            intIdEmpresario: values?.intIdEmpresario,
            strMensaje: values.strComentario || "",
            dtFechaCreacion: values.dtFechaCreacion || null,
            strUsuario: values.strUsuario || "",
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
            maxWidth="sm"
            fullWidth
            fullScreen={bitMobile}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Editar Respuesta</DialogTitle>

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
                    guardar
                </LoadingButton>

                <Button onClick={() => onClose()} disabled={loading} color="inherit">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditRespuesta;
