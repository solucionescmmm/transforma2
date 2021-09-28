import React, { useState, useContext } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import { Paper, Grid, TextField, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const PaperAddComentario = ({ socket }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        strTipo: "",
        srtMensaje: "",
        strUsuario: "",
        strUsuarioAsignado: "",
        strURLImagenUsuario: "",
    });

    const [loading, setLoading] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const onSubmit = (data) => {
        setLoading(true);

        socket.emit("mdlComentarios:setComentario", {
            ...data,
            strUsuario: strInfoUser.strUsuario,
            strURLImagenUsuario: strInfoUser.strURLImagen,
        });

        setLoading(false);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Paper sx={{ padding: "15px" }}>
            <Grid
                container
                component="form"
                noValidate
                direction="row"
                onSubmit={handleSubmit(onSubmit)}
                spacing={2}
            >
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

                <Grid item xs={12} md={6}></Grid>

                <Grid item xs={12}>
                    <Controller
                        defaultValue={data.srtMensaje}
                        name="srtMensaje"
                        render={({ field: { name, value, onChange } }) => (
                            <TextField
                                label="Comentario"
                                name={name}
                                value={value}
                                onChange={(e) => onChange(e)}
                                disabled={loading}
                                error={errors?.srtMensaje ? true : false}
                                required
                                helperText={
                                    errors?.srtMensaje?.message || "Digite el comentario."
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

                <Grid item xs={12}>
                    <LoadingButton fullWidth loading={loading} type="submit">
                        Comentar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PaperAddComentario;
