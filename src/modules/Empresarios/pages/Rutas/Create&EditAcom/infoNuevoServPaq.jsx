import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import { Grid, Box, CircularProgress, Alert } from "@mui/material";

//Componentes
import DropdownServicios from "../../../../Admin/components/dropdownServicios";
import DropdownSedeTarifa from "../components/dropdownSedeTarifa";

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
        objServicio: null,
    });

    const watchServicio = watch("objNuevoServPaq.objServicio");

    useEffect(() => {
        if (values) {
            setData({
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
                    defaultValue={data.objServicio}
                    name="objNuevoServPaq.objServicio"
                    render={({ field: { name, value, onChange } }) => {
                        return (
                            <DropdownServicios
                                label="Servicio"
                                name={name}
                                value={value}
                                notInclude
                                onChange={(_, value) => {
                                    setValue("objSedeTarifa", null);
                                    onChange(value);
                                }}
                                disabled={disabled}
                                error={!!errors?.objNuevoServPaq?.objServicio}
                                helperText={
                                    errors?.objNuevoServPaq?.objServicio
                                        ?.message || "Selecciona un servicio"
                                }
                                intIdIdea={intIdIdea}
                            />
                        );
                    }}
                    rules={{
                        required:
                            "Por favor, selcciona un servicio.",
                    }}
                    control={control}
                />
            </Grid>

                    {!watchServicio?.arrSedesTarifas && (
                        <Grid item xs={12} md={6}>
                            <Alert severity="info">
                                Selecciona un servicio para listar las sedes y
                                tarifas
                            </Alert>
                        </Grid>
                    )}

                    {watchServicio && (
                        <Fragment>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="objNuevoServPaq.objSedeTarifa"
                                    defaultValue={data.objSedeTarifa}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownSedeTarifa
                                            label="Sedes y tarifas (Referencia)"
                                            name={name}
                                            required
                                            data={watchServicio.arrSedesTarifas}
                                            value={value}
                                            onChange={(e, value) => {
                                                setValue(
                                                    "valor",
                                                    value?.Valor || ""
                                                );
                                                onChange(value);
                                            }}
                                            disabled={loading}
                                            error={
                                                errors?.objNuevoServPaq?.objSedeTarifa
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.objNuevoServPaq?.objSedeTarifa
                                                    ?.message ||
                                                "Selecciona la sede tarifa"
                                            }
                                        />
                                    )}
                                    rules={{
                                        required:
                                            "Por favor, selcciona la sede tarifa",
                                    }}
                                    control={control}
                                />
                            </Grid>
                        </Fragment>
                    )}
        </Fragment>
    );
};

export default InfoNuevoServPaq;
