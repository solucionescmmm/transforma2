import React from "react";

//Hooks
import useGetListas from "../hooks/useGetListas";

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

const SelectListas = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
    strGrupo,
    strCodigo,
}) => {
    const { data, refreshGetData } = useGetListas({
        strGrupo,
        strCodigo,
    });

    if (data === undefined) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                            refreshGetData({
                                strGrupo,
                                strCodigo,
                            });
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
                No existen datos de por mostrar del servicio de listas
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
                            refreshGetData({
                                strGrupo,
                                strCodigo,
                            });
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
                Ha ocurrido un error al obtener los datos del listado
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
                <MenuItem value={e.strCodigoRetorno} key={i}>
                    {e.strCodigoRetorno}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SelectListas;
