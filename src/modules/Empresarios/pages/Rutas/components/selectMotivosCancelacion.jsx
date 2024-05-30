import React from "react";

//Hooks
import useGetMotivosCancelacion from "../hooks/useGetMotivosCancelacion";

//Componentes de Material UI
import {
    TextField,
    MenuItem,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    IconButton,
    Tooltip,
} from "@mui/material";

//Iconos
import { Refresh as RefreshIcon } from "@mui/icons-material";

const SelectMotivosCancelacion = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
}) => {
    const { data, refreshGetData } = useGetMotivosCancelacion();

    if (data === undefined) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (data === null) {
        return (
            <Alert
                severity="info"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData();
                        }}
                        size="large"
                    >
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>Sin datos</b>
                </AlertTitle>
                No existen datos por mostrar de los motivos de cancelación
            </Alert>
        );
    }

    if (data.error) {
        return (
            <Alert
                severity="error"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData();
                        }}
                        size="large"
                    >
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos del listado de los motivos de cancelación
            </Alert>
        );
    }

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            helperText={helperText}
            error={error}
            disabled={disabled}
            required={required}
            variant="standard"
            fullWidth
            select
        >
            {data.map((e, i) => (
                <MenuItem value={e.intId} key={i}>
                    {e.strNombre}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SelectMotivosCancelacion;