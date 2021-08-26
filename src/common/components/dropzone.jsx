import React, { useCallback } from "react";

//Librerias
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";

//Componentes
import {
    Button,
    Paper,
    FormControl,
    FormHelperText,
    InputLabel,
} from "@material-ui/core";
import { Fragment } from "react";

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
}) => {
    const validator = useCallback(
        (file) => {
            const extension = file.name.substring(
                file.name.lastIndexOf("."),
                file.name.length
            );

            if (extension !== ".jpeg" && extension !== ".jpg" && extension !== ".png") {
                setError(name, {
                    type: "imagen-no-valida",
                    message: "Solo se permiten imagenes de tipo jpg, jpeg o png.",
                });

                return {
                    code: "imagen-no-valida",
                    message: "Solo se permiten imagenes de tipo jpg, jpeg o png.",
                };
            }

            return null;
        },
        [setError, name]
    );

    const onDropAccepted = useCallback((files) => {}, []);

    const onDropRejected = useCallback((files) => {}, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDropAccepted,
        onDropRejected,
        disabled,
        validator,
    });

    const archivos = acceptedFiles.map((archivo, i) => {
        return (
            <Paper key={i} style={{ padding: "10px", marginBottom: "5px" }}>
                {archivo.path}
            </Paper>
        );
    });

    return (
        <FormControl error={error} fullWidth>
            <InputLabel htmlFor={`${name}-dropzone`}>{label}</InputLabel>
            <Div
                {...getRootProps()}
                id={`${name}-dropzone`}
                style={{ borderColor: error ? "#D64342" : "gray" }}
            >
                <input {...getInputProps()} />
                {acceptedFiles.length > 0 ? (
                    <Fragment>
                        <h4>Archivos</h4>
                        {archivos}
                    </Fragment>
                ) : isDragActive ? (
                    <p>Suelta el archivo</p>
                ) : (
                    <Fragment>
                        <p>Selecciona un archivo y arrastralo aqui.</p>
                        <Button variant="contained">Seleccionar archivo</Button>
                    </Fragment>
                )}
            </Div>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default Dropzone;
