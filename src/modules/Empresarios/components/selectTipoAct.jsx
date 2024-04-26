import React, { useEffect, useState } from "react";

//Hooks
import usegetTipoAct from "../hooks/usegetTipoAct";

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

const SelectTipoAct = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
}) => {
    const { data, refreshGetData } = usegetTipoAct();

    const [objValueInactivo, setObjValueInactivo] = useState(null)

    useEffect(() => {
        if (value) {
            const objValue = data?.find((s) => s.intId === value)
            console.log(objValue)
            setObjValueInactivo(objValue)
        }
    }, [data, value]);

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
                            refreshGetData();
                        }}
                        size="large">
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>Sin datos</b>
                </AlertTitle>
                No existen datos de tipos de actividad.
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
                        size="large">
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos de tipos de actividad.
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
            {disabled ? (
                <MenuItem value={objValueInactivo?.intId} key={0}>
                    {objValueInactivo?.strNombre}
                </MenuItem>
            ) : null}
            {data.map((e, i) => (
                e.strNombre !== "Evento" ?
                    <MenuItem value={e.intId} key={i}>
                        {e.strNombre}
                    </MenuItem> : null
            ))}
        </TextField>
    );
};

export default SelectTipoAct;
