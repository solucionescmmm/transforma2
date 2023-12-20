import React, {useEffect, useState} from "react";

//Hooks
import useGetTarifas from "../hooks/useGetTarifas";

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

const SelectTipoTarifa = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
}) => {
    const { data, refreshGetData } = useGetTarifas();

    const [objValueInactivo, setObjValueInactivo] = useState(null)

    const onFocus = () => {
        setObjValueInactivo(null)
    }

    useEffect(() => {
        if (value) {
            const objValue = data?.find((s) => s.intId === value)
            if (objValue?.intIdEstado === 3) {
                setObjValueInactivo(objValue)
            }
        }
    }, [data, value]);

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
                No existen datos por mostrar del servicio de listado de tipos de tarifa
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
                Ha ocurrido un error al obtener los datos del listado de tipos de tarifa
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
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            variant="standard"
            fullWidth
            select
        >
            {objValueInactivo ? (
                <MenuItem value={objValueInactivo.intId} key={0}>
                    {objValueInactivo.strNombre}
                </MenuItem>
            ) : null}

            {data.map((e, i) => (
                e.intIdEstado === 1 ? (
                    <MenuItem value={e.intId} key={i}>
                        {e.strNombre}
                    </MenuItem>
                ) : null
            ))}
        </TextField>
    );
};

export default SelectTipoTarifa;
