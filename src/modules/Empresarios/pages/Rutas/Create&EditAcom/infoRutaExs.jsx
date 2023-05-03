/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import { Grid, Box, CircularProgress, Alert, AlertTitle } from "@mui/material";

//Componentes
import DropwdownRutas from "../../../components/dropdownRutas";
import DropdownFases from "../components/dropdownFases";
import DropdownServicios from "../components/dropdownServicios";
import useGetRutas from "../../../hooks/useGetRutas";

const InfoRutaExs = ({
    disabled,
    values,
    errors,
    control,
    isEdit,
    intIdIdea,
    watch,
    setValue,
    setDataObj,
}) => {
    const [loading, setLoading] = useState(true);

    const { getUniqueData } = useGetRutas({ autoLoad: false });
    const [arrServicios, setArrServicios] = useState();

    const [data, setData] = useState({
        objRuta: null,
        objFase: null,
        objPaquete: null,
        objServicio: null,
    });

    const watchObjRuta = watch("objInfoRutaExs.objRuta");
    const watchObjFase = watch("objInfoRutaExs.objFase");
    const watchObServicio = watch("objInfoRutaExs.objServicio");

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

    useEffect(() => {
        if (watchObjRuta?.objInfoPrincipal?.intId && watchObjFase?.intId) {
            async function getData() {
                const response = await getUniqueData({
                    intId: watchObjRuta.objInfoPrincipal.intId,
                    intIdIdea,
                });

                const dataRuta = response?.data?.data?.[0];

                const arrFase = dataRuta?.arrInfoFases?.find(
                    (x) => x.intId === watchObjFase.intId
                );

                const { arrServicios } = arrFase;

                setArrServicios(arrServicios);
            }

            getData();
        }
    }, [watchObjRuta, intIdIdea, watchObjFase]);

    useEffect(() => {
        if (watchObServicio) {
            const { arrObjetivos } = watchObServicio;
            setDataObj(arrObjetivos);
        }
    }, [watchObServicio]);

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
            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
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

                        if (!arrServicios) {
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
                                data={arrServicios}
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
