import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import { Grid, Box, CircularProgress, Alert, AlertTitle } from "@mui/material";

//Componentes
import DropwdownRutas from "../../../components/dropdownRutas";
import DropdownFases from "../components/dropdownFases";
import DropdownPaquetes from "../components/dropdownPaquetes";
import DropdownServicios from "../components/dropdownServicios";

const InfoRutaExs = ({
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
        objRuta: null,
        objFase: null,
        objPaquete: null,
        objServicio: null,
    });

    const watchObjRuta = watch("objInfoRutaExs.objRuta");
    const watchObjFase = watch("objInfoRutaExs.objFase");

    useEffect(() => {
        if (values) {
            setData({
                objRuta: values.objRuta || null,
                objFase: values.objFase || null,
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
            <Grid item xs={12} md={3}>
                <Controller
                    defaultValue={data.objRuta}
                    name="objInfoRutaExs.objRuta"
                    render={({ field: { name, value, onChange } }) => (
                        <DropwdownRutas
                            label="Ruta"
                            name={name}
                            value={value}
                            onChange={(_, value) => {
                                setValue("objInfoRutaExs.objFase", null);
                                setValue("objInfoRutaExs.objPaquete", null);
                                setValue("objInfoRutaExs.objServicio", null);
                                onChange(value);
                            }}
                            disabled={disabled}
                            error={!!errors?.objInfoRutaExs?.objRuta}
                            helperText={
                                errors?.objInfoRutaExs?.objRuta?.message ||
                                "Selecciona una ruta"
                            }
                            intIdIdea={intIdIdea}
                            required
                        />
                    )}
                    control={control}
                    rules={{ required: "Por favor, selecciona una ruta" }}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Controller
                    defaultValue={data.objFase}
                    name="objInfoRutaExs.objFase"
                    render={({ field: { name, value, onChange } }) => {
                        if (!watchObjRuta) {
                            return (
                                <Alert title="Fase" severity="info">
                                    <AlertTitle>Fase</AlertTitle>
                                    Por favor selecciona una ruta para continuar
                                </Alert>
                            );
                        }

                        return (
                            <DropdownFases
                                label="Fase"
                                name={name}
                                value={value}
                                onChange={(_, value) => onChange(value)}
                                disabled={disabled}
                                error={!!errors?.objInfoRutaExs?.objFase}
                                helperText={
                                    errors?.objInfoRutaExs?.objFase?.message ||
                                    "Selecciona una fase"
                                }
                                data={watchObjRuta.arrInfoFases}
                                intIdIdea={intIdIdea}
                                required
                            />
                        );
                    }}
                    control={control}
                    rules={{ required: "Por favor, selecciona una fase" }}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Controller
                    defaultValue={data.objPaquete}
                    name="objInfoRutaExs.objPaquete"
                    render={({ field: { name, value, onChange } }) => {
                        if (!watchObjFase) {
                            return (
                                <Alert title="Paquete" severity="info">
                                    <AlertTitle>Paquete</AlertTitle>
                                    Por favor selecciona una fase para continuar
                                </Alert>
                            );
                        }

                        return (
                            <DropdownPaquetes
                                label="Paquete"
                                name={name}
                                value={value}
                                onChange={(_, value) => onChange(value)}
                                disabled={disabled}
                                error={!!errors?.objInfoRutaExs?.objPaquete}
                                helperText={
                                    errors?.objInfoRutaExs?.objPaquete
                                        ?.message || "Selecciona un paquete"
                                }
                                data={watchObjFase.arrPaquetes}
                                intIdIdea={intIdIdea}
                            />
                        );
                    }}
                    control={control}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Controller
                    defaultValue={data.objServicio}
                    name="objInfoRutaExs.objServicio"
                    render={({ field: { name, value, onChange } }) => {
                        if (!watchObjFase) {
                            return (
                                <Alert title="Servicio" severity="info">
                                    <AlertTitle>Servicio</AlertTitle>
                                    Por favor selecciona una fase para continuar
                                </Alert>
                            );
                        }

                        return (
                            <DropdownServicios
                                label="Servicio"
                                name={name}
                                value={value}
                                onChange={(_, value) => onChange(value)}
                                disabled={disabled}
                                error={!!errors?.objInfoRutaExs?.objServicio}
                                helperText={
                                    errors?.objInfoRutaExs?.objServicio
                                        ?.message || "Selecciona un servicio"
                                }
                                data={watchObjFase.arrServicios}
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

export default InfoRutaExs;
