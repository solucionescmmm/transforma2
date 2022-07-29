import React, { useState, useEffect, useContext, useCallback, Fragment } from "react";

// Estilos
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { DateRange } from "react-date-range";
import { es } from "react-date-range/dist/locale";
import { toast } from "react-hot-toast";

// Componentes de Material UI
import {
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    useTheme,
    useMediaQuery,
    FormControl,
    FormHelperText,
    FormLabel,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos de Material UI
import { FilterList as FilterListIcon } from "@mui/icons-material";
import DropdownEmpresarios from "../../components/dropdownEmpresarios";
import SelectSedes from "../../components/selectSedes";
import SelectEstadoVinculacion from "../../components/selectEstadoVinculacion";
import SelectCategoriaProducto from "../../components/selectCategoriaProducto";
import SelectCategoriaServicio from "../../components/selectCategoriaServicio";

const FiltersEmpresarios = ({ alterData }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openModal, setOpenModal] = useState(false);

    const [filter, setFilter] = useState();

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [options, setOptions] = useState({
        strEmpresario: null,
        strSede: "",
        strEstadoVinculacion: "",
        strProducto: "",
        strServicio: "",
    });

    const [dtFechaVinculacion, setDtFechaVinculacion] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection",
        },
    ]);

    const [dtFechaServicio, setDtFechaServicio] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handleOpenModal = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);

    const handlerChangeOptions = (key, value) => {
        setOptions((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const onSubmit = () => {
        setFilter({
            strNombres: options.strEmpresario?.strNombres,
            strApellidos: options.strEmpresario?.strApellidos,
            strNroDocto: options.strEmpresario?.strNroDocto,
            strCorreoElectronico: options.strEmpresario?.strCorreoElectronico,
            strSede: options.strSede !== "" ? options.strSede : undefined,
            strEstadoVinculacion:
                options.strEstadoVinculacion !== ""
                    ? options.strEstadoVinculacion
                    : undefined,
            strProducto: options.strProducto !== "" ? options.strProducto : undefined,
            strServicio: options.strServicio !== "" ? options.strServicio : undefined,
        });

        localStorage.setItem(
            "Mdl_Empresarios_Read_filterOptions",
            JSON.stringify(options)
        );

        setFlagSubmit(true);
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_INTERESADOS_GETDATA}`,
                    headers: {
                        token,
                    },
                    params: {
                        ...filter,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    alterData(res.data.data);

                    toast.success("Datos filtrados correctamente");

                    setLoading(false);

                    handleOpenModal();
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

                        setLoading(false);

                        toast.error(msg);
                    }
                });
        },
        [token, filter, alterData, handleOpenModal]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        const options = localStorage.getItem("Mdl_Empresarios_Read_filterOptions");

        if (options) {
            setOptions(JSON.parse(options));
        }
    }, []);

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    //===============================================================================================================================================
    //========================================== Render =============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <Button
                startIcon={<FilterListIcon />}
                onClick={() => handleOpenModal()}
                color="inherit"
            >
                Filtro avanzado
            </Button>

            <Dialog
                open={openModal}
                onClose={handleOpenModal}
                fullScreen={bitMobile}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Buscar persona iniciativa</DialogTitle>

                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <DropdownEmpresarios
                                value={options.strEmpresario}
                                name="strEmpresario"
                                onChange={(e, value) =>
                                    handlerChangeOptions("strEmpresario", value)
                                }
                                disabled={loading}
                                label="Persona"
                                helperText="Puedes filtar a la persona por sus nombres, apellidos o documento de identificación"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SelectSedes
                                name="strSede"
                                value={options.strSede}
                                onChange={(e) =>
                                    handlerChangeOptions(e.target.name, e.target.value)
                                }
                                disabled={loading}
                                label="Sede"
                                helperText="Filtrar por sede"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SelectEstadoVinculacion
                                name="strEstadoVinculacion"
                                disabled={loading}
                                value={options.strEstadoVinculacion}
                                onChange={(e) =>
                                    handlerChangeOptions(e.target.name, e.target.value)
                                }
                                label="Estado de vinculación"
                                helperText="Filtrar por estado de vinculación"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SelectCategoriaProducto
                                name="strProducto"
                                value={options.strProducto}
                                onChange={(e) =>
                                    handlerChangeOptions(e.target.name, e.target.value)
                                }
                                disabled={loading}
                                label="Producto"
                                helperText="Filtrar por producto"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SelectCategoriaServicio
                                name="strServicio"
                                value={options.strServicio}
                                onChange={(e) =>
                                    handlerChangeOptions(e.target.name, e.target.value)
                                }
                                disabled={loading}
                                label="Servicio"
                                helperText="Filtrar por servicio"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl disabled={loading}>
                                <FormLabel
                                    sx={{
                                        position: "absolute",
                                    }}
                                >
                                    Fechas de vinculación
                                </FormLabel>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        pointerEvents: loading ? "none" : "all",
                                    }}
                                >
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) =>
                                            setDtFechaVinculacion([item.selection])
                                        }
                                        moveRangeOnFirstSelection={false}
                                        ranges={dtFechaVinculacion}
                                        locale={es}
                                    />
                                </div>

                                <FormHelperText>
                                    Filtrar por fechas de vinculación
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl disabled={loading}>
                                <FormLabel
                                    sx={{
                                        position: "absolute",
                                    }}
                                >
                                    Fechas de servicio tomado
                                </FormLabel>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        pointerEvents: loading ? "none" : "all",
                                    }}
                                >
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) =>
                                            setDtFechaServicio([item.selection])
                                        }
                                        moveRangeOnFirstSelection={false}
                                        ranges={dtFechaServicio}
                                        locale={es}
                                    />
                                </div>

                                <FormHelperText>
                                    Filtrar por fechas de los servicios tomados
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={() =>
                            setOptions({
                                strEmpresario: null,
                                strSede: "",
                                strEstadoVinculacion: "",
                                strProducto: "",
                                strServicio: "",
                            })
                        }
                    >
                        borrar filtros
                    </Button>

                    <LoadingButton
                        color="primary"
                        onClick={() => onSubmit()}
                        loading={loading}
                    >
                        buscar
                    </LoadingButton>

                    <Button
                        onClick={() => handleOpenModal()}
                        color="inherit"
                        disabled={loading}
                    >
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default FiltersEmpresarios;
