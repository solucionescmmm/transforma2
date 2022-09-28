/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useCallback,
    useState,
    useEffect,
    useContext,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../middlewares/Auth";

//Librerias
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import styled from "@emotion/styled";
import axios from "axios";
import { FileIcon, defaultStyles } from "react-file-icon";

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
} from "@mui/material";

import { Delete as DeleteIcon } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";

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
        [theme.breakpoints.down("md")]: {
            height: "100px",
        },
    },
    titleFile: {
        [theme.breakpoints.down("md")]: {
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

            if (files.length > maxFiles) {
                setError(name, {
                    type: "imagen-no-valida",
                    message: `Solo se permite subir un maximo de ${maxFiles} archivos, por favor revisa e intenta nuevamente.`,
                });

                return {
                    code: "imagen-no-valida",
                    message: `Solo se permite subir un maximo de ${maxFiles} archivos, por favor revisa e intenta nuevamente.`,
                };
            }

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
        [setError, name, type, files, maxFiles]
    );

    const onSubmitFile = useCallback(async (signalSubmitData) => {
        setLoading(true);

        setFlagSubmit(false);

        setError(name, {
            type: "cargando-archivo",
            message: `En este momento se esta cargando el archivo, por favor espere.`,
        });

        let bitCont = 0;
        const arrFiles = value ? value.split(";") : [];

        files.forEach(async (file) => {
            const bodyFormData = new FormData();
            bodyFormData.append("fileFormInteresados", file);

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

                    arrFiles.push(url);
                    setLoading(false);
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
                        setError(name, msg);
                    }
                });

            bitCont++;

            if (bitCont === files.length) {
                onChange(
                    arrFiles.length === 1 ? arrFiles[0] : arrFiles.join(";")
                );

                clearErrors(name);
            }
        });
    }, []);

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

        const arrValues = value.split(";");

        const arrNewValues = arrValues.filter((e) => !e.includes(file.name));

        onChange(arrNewValues.join(";"));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        disabled,
        validator,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const newArrFiles = files.length > 0 ? [...files] : [];

                const arrFiles = acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );

                arrFiles.forEach((file) => {
                    newArrFiles.push(file);
                });

                setFiles(newArrFiles);
            }
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

    useEffect(() => {
        if (value) {
            setLoading(true);

            const arrImages = value.split(";");
            const getImagesPreview = async () => {
                const arrBlobImages = [];

                for (let i = 0; i < arrImages.length; i++) {
                    const url = arrImages[i];
                    let type = "";

                    const result = await fetch(
                        `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${url}`
                    )
                        .then((res) => {
                            type = res.headers.get("Content-Type");
                            return res.blob();
                        })
                        .then(async (objBlob) => {
                            const name =
                                `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${url}`.match(
                                    /.*\/(.*)$/
                                )[1];

                            const file = new File([objBlob], name, { type });

                            Object.assign(file, {
                                path: name,
                                preview: URL.createObjectURL(file),
                            });

                            return file;
                        });

                    arrBlobImages.push(result);
                }

                if (arrBlobImages.length > 0) {
                    setFiles(arrBlobImages);
                }

                setLoading(false);
            };

            getImagesPreview();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    useEffect(() => {
        if (files.length > maxFiles) {
            setError(name, {
                type: "imagen-no-valida",
                message: `Solo se permite subir un maximo de ${maxFiles} archivos, por favor revisa e intenta nuevamente.`,
            });
        }
    }, [files, maxFiles]);

    const archivos = files.map((archivo, i) => {
        let extension = archivo.name
            .substring(archivo.name.lastIndexOf("."), archivo.name.length)
            .replace(".", "");

        return (
            <Grid item xs={4} key={i}>
                <Paper style={{ padding: "10px", marginBottom: "5px" }}>
                    {extension === "jpeg" ||
                    extension === "jpg" ||
                    extension === "png" ? (
                        <img
                            className={classes.file}
                            alt="Dropzone-preview-img"
                            src={archivo.preview}
                            onLoad={() => {
                                URL.revokeObjectURL(archivo.preview);
                            }}
                        />
                    ) : (
                        <div style={{ width: "80px", margin: "auto" }}>
                            <FileIcon
                                extension={extension}
                                {...defaultStyles[extension]}
                            />
                        </div>
                    )}

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
                            disabled={disabled || loading}
                            size="large"
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
            disabled={disabled || loading}
        >
            <InputLabel htmlFor={`${name}-dropzone`}>{label}</InputLabel>
            <Div
                {...getRootProps()}
                disabled={disabled || loading}
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
                        <p>Selecciona un archivo o arrástralo aquí.</p>
                        <Button
                            variant="contained"
                            disabled={disabled || loading}
                        >
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
