import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import { Grid, Box, CircularProgress } from "@mui/material";

//Componentes
import DropdownPaquetes from "../../../../Admin/components/dropdownPaquetes";
import DropdownServicios from "../../../../Admin/components/dropdownServicios";

const InfoNuevoServPaq = ({
    disabled,
    values,
    errors,
    control,
    isEdit,
    intIdIdea,
    watch,
    setValue,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        objPaquete: null,
        objServicio: null,
    });

    const watchPaquete = watch("objNuevoServPaq.objPaquete");
    const watchServicio = watch("objNuevoServPaq.objServicio");

    useEffect(() => {
        if (values) {
            setData({
                objPaquete: values.objPaquete || null,
                objServicio: values.objServicio || null,
            });
        }

        setLoading(false);
    }, [values]);

    if (loading) {
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

    return (
        <Fragment>
            <Grid item xs={12} md={6}>
                <Controller
                    defaultValue={data.objPaquete}
                    name="objNuevoServPaq.objPaquete"
                    render={({ field: { name, value, onChange } }) => {
                        return (
                            <DropdownPaquetes
                                label="Paquete"
                                name={name}
                                value={value}
                                onChange={(_, value) => {
                                    setValue(
                                        "objNuevoServPaq.objServicio",
                                        null
                                    );
                                    onChange(value);
                                }}
                                disabled={watchServicio || disabled}
                                error={!!errors?.objNuevoServPaq?.objPaquete}
                                helperText={
                                    errors?.objNuevoServPaq?.objPaquete
                                        ?.message || "Selecciona un paquete"
                                }
                                intIdIdea={intIdIdea}
                            />
                        );
                    }}
                    control={control}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Controller
                    defaultValue={data.objServicio}
                    name="objNuevoServPaq.objServicio"
                    render={({ field: { name, value, onChange } }) => {
                        return (
                            <DropdownServicios
                                label="Servicio"
                                name={name}
                                value={value}
                                onChange={(_, value) => {
                                    setValue(
                                        "objNuevoServPaq.objPaquete",
                                        null
                                    );
                                    onChange(value);
                                }}
                                disabled={watchPaquete || disabled}
                                error={!!errors?.objNuevoServPaq?.objServicio}
                                helperText={
                                    errors?.objNuevoServPaq?.objServicio
                                        ?.message || "Selecciona un servicio"
                                }
                                intIdIdea={intIdIdea}
                            />
                        );
                    }}
                    control={control}
                />
            </Grid>
        </Fragment>
    );
};

export default InfoNuevoServPaq;
