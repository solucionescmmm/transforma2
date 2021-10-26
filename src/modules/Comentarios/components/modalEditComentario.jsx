import React, { useState, useContext, useEffect } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    useMediaQuery,
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
        intIdEmpresario: values?.intIdEmpresario,
        btResuelto: false,
        strTipo: "",
        strMensaje: "",
        strUsuario: "",
        arrUsuarioAsignado: [],
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
            intId: values.intIdComentario,
            intIdEmpresario: values?.intIdEmpresario,
            strUsuario: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
        });

        setData({
            intId: values.intIdComentario,
            intIdEmpresario: values?.intIdEmpresario,
            btResuelto: false,
            strTipo: "",
            strMensaje: "",
            strUsuario: "",
            arrUsuarioAsignado: [],
            strURLImagenUsuario: "",
        });

        reset({
            intId: values.intIdComentario,
            intIdEmpresario: values?.intIdEmpresario,
            btResuelto: false,
            strTipo: "",
            strMensaje: "",
            strUsuario: "",
            arrUsuarioAsignado: [],
            strURLImagenUsuario: "",
        });

        setLoading(false);

        onClose();
    };

    useEffect(() => {
        setData({
            intId: values.intIdComentario,
            intIdEmpresario: values.intIdEmpresario || null,
            btResuelto:
                typeof values.btResuelto === "boolean" ? values.btResuelto : false,
            strTipo: values.strTipo || "",
            strMensaje: values.strMensaje || "",
            strUsuario: values.strUsuario || "",
            arrUsuarioAsignado: values.arrUsuarioAsignado || [],
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
            open={open}
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
                <Grid container component="form" direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTipo}
                            name="strTipo"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Tipo de Comentario"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    disabled={loading}
                                    error={errors?.strTipo ? true : false}
                                    required
                                    helperText={
                                        errors?.strTipo?.message ||
                                        "Seleccione el tipo de comentario."
                                    }
                                    fullWidth
                                    variant="standard"
                                    select
                                >
                                    <MenuItem value="Tarea">Tarea</MenuItem>
                                    <MenuItem value="Sugerencia">Sugerencia</MenuItem>
                                    <MenuItem value="Comentario">Comentario</MenuItem>
                                    <MenuItem value="Alerta">Alerta</MenuItem>
                                    <MenuItem value="Situación Crítica">
                                        Situación Crítica
                                    </MenuItem>
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, seleccione el tipo de comentario",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        Usuario
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

                <Button onClick={() => onClose()} color="inherit">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditComentario;
