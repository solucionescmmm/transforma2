import React, { useCallback, useState, useEffect, useContext, Fragment } from "react";

//Context
import { AuthContext } from "../middlewares/Auth";

//Librerias
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import styled from "@emotion/styled";
import axios from "axios";

//Componentes de Material UI
import {
    Button,
    Paper,
    FormControl,
    FormHelperText,
    InputLabel,
    IconButton,
    Tooltip,
    Box,
    CircularProgress,
    Grid,
} from "@material-ui/core";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";

//Componentes de @emotion
const Div = styled.div`
    min-height: 250px;
    border-style: dotted;
    border-color: gray;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

//Estilos de Material ui
const styles = makeStyles((theme) => ({
    FormControl: {
        "&:hover": {
            borderColor: "#30C7C1",
        },
    },
    file: {
        width: "auto",
        height: "200px",
        [theme.breakpoints.down("sm")]: {
            height: "100px",
        },
    },
    titleFile: {
        [theme.breakpoints.down("sm")]: {
            marginTop: "35px",
        },
    },
}));

const Dropzone = ({
    id,
    label,
    name,
    value,
    required,
    disabled,
    error,
    helperText,
    onChange,
    setError,
    errors,
    maxFiles,
    type,
    clearErrors,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [flagSubmit, setFlagSubmit] = useState(false);
    const [files, setFiles] = useState([]);

    //===============================================================================================================================================
    //========================================== Funciones  =========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const validator = useCallback(
        (file) => {
            const extension = file.name.substring(
                file.name.lastIndexOf("."),
                file.name.length
            );

            if (type === "Imagen") {
                if (
                    extension !== ".jpeg" &&
                    extension !== ".jpg" &&
                    extension !== ".png"
                ) {
                    setError(name, {
                        type: "imagen-no-valida",
                        message:
                            "Solo se permiten imagenes de tipo jpg, jpeg o png, por favor revisa e intenta nuevamente",
                    });

                    return {
                        code: "imagen-no-valida",
                        message:
                            "Solo se permiten imagenes de tipo jpg, jpeg o png, por favor revisa e intenta nuevamente",
                    };
                }
            }

            return null;
        },
        [setError, name, type]
    );

    const onSubmitFile = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            setError(name, {
                type: "cargando-archivo",
                message: `En este momento se esta cargando el archivo, por favor espere.`,
            });

            const bodyFormData = new FormData();

            bodyFormData.append("fileFormInteresados", files[0]);

            await axios(
                {
                    method: "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_EMPRESARIOS_UPLOADFILE}`,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token,
                    },
                    data: bodyFormData,
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    let url = res.data.data.path;

                    setLoading(false);

                    onChange(url);
                    clearErrors(name);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        console.error(error);
                        setLoading(false);

                        toast.error(msg);
                        setError(name, error.message);
                    }
                });
        },
        [token, files, setError, name, onChange, clearErrors]
    );

    const onDropAccepted = useCallback(
        (files) => {
            if (maxFiles) {
                if (files.length > maxFiles) {
                    setError(name, {
                        type: "imagen-no-valida",
                        message: `Solo se permite subir un maximo de ${maxFiles} archivos, por favor revisa e intenta nuevamente.`,
                    });

                    return;
                }
            }

            setFlagSubmit(true);
        },
        [maxFiles, setError, name]
    );

    const onDropRejected = useCallback(() => {}, []);

    const removeFile = (file) => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        disabled,
        validator,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            onSubmitFile(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, onSubmitFile]);

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const archivos = files.map((archivo, i) => {
        return (
            <Grid item xs={4}>
                <Paper key={i} style={{ padding: "10px", marginBottom: "5px" }}>
                    <img
                        className={classes.file}
                        alt="Dropzone-preview-img"
                        src={archivo.preview}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p>{archivo.path}</p>

                        <IconButton
                            color="error"
                            onClick={removeFile(archivo)}
                            disabled={disabled}
                        >
                            <Tooltip title="Eliminar archivo">
                                <DeleteIcon />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Paper>
            </Grid>
        );
    });

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <FormControl
            error={error}
            fullWidth
            className={classes.FormControl}
            disabled={disabled}
        >
            <InputLabel htmlFor={`${name}-dropzone`}>{label}</InputLabel>
            <Div
                {...getRootProps()}
                disabled={disabled}
                id={`${name}-dropzone`}
                style={{ borderColor: error ? "#D64342" : "gray" }}
            >
                <input {...getInputProps()} />
                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <CircularProgress size={30} />
                    </Box>
                ) : files.length > 0 ? (
                    <Fragment>
                        <h4 className={classes.titleFile}>Archivos</h4>
                        <Grid
                            container
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                        >
                            {archivos}
                        </Grid>
                    </Fragment>
                ) : isDragActive ? (
                    <p>Suelta el archivo</p>
                ) : (
                    <Fragment>
                        <p>Selecciona un archivo y arrastralo aqui.</p>
                        <Button variant="contained" disabled={disabled}>
                            Seleccionar archivo
                        </Button>
                    </Fragment>
                )}
            </Div>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default Dropzone;
