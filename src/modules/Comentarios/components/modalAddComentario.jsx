import React, { useState, useContext, Fragment } from "react";

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

const ModalAddComentario = ({ socket, values, openModalCreate }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intIdIdea: values?.intIdIdea,
        strMensaje: "",
        strUsuarioCreacion: "",
        strURLImagenUsuario: "",
    });

    const [openModal, setOpenModal] = useState(!!openModalCreate);

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

        socket.emit("mdlComentarios:setComentario", {
            ...data,
            intIdIdea: values?.intIdIdea,
            strUsuarioCreacion: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
        });

        socket.on("mdlComentarios:setComentario", () => {
            handlerChangeOpenModal();

            setLoading(false);

            setData({
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });

            reset({
                intIdIdea: values?.intIdIdea,
                strMensaje: "",
                strUsuarioCreacion: "",
                strURLImagenUsuario: "",
            });
        });
    };

    const handlerChangeOpenModal = () => {
        setOpenModal(!openModal);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Fragment>
            <Button onClick={() => handlerChangeOpenModal()} fullWidth>
                Agregar comentario
            </Button>

            <Dialog
                open={loading || openModal}
                onClose={handlerChangeOpenModal}
                maxWidth="lg"
                fullScreen={bitMobile}
                PaperProps={{
                    component: "form",
                    noValidate: "noValidate",
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                <DialogTitle>Agregar Comentario</DialogTitle>

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
                                Todos los campos marcados con (*) son
                                obligatorios.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                defaultValue={data.strMensaje}
                                name="strMensaje"
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <TextField
                                        label="Comentario"
                                        name={name}
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        disabled={loading}
                                        error={
                                            errors?.strMensaje ? true : false
                                        }
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
                        Comentar
                    </LoadingButton>

                    <Button
                        onClick={() => handlerChangeOpenModal()}
                        disabled={loading}
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalAddComentario;
