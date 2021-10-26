import React, { useState, useEffect, Fragment, lazy } from "react";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Librerias
import {
    Link as RouterLink,
    useParams,
    MemoryRouter,
    Route,
    Switch,
} from "react-router-dom";

//Componentes de Material UI
import {
    Grid,
    Breadcrumbs,
    Button,
    Link,
    Typography,
    Tabs,
    Tab,
    Box,
    Avatar,
} from "@mui/material";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

//Componentes
import ErrorPage from "../../../../common/components/Error";
import Loader from "../../../../common/components/Loader";

//Estilos
import { makeStyles } from "@mui/styles";
import PerfilEmpresario from "../Perfil/homePage";

//Componentes
import ModalDeleteEmpresario from "../../components/modalDeleteEmpresario";

const Comentarios = lazy(() => import("../../../Comentarios/pages/homePage"));

const styles = makeStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const DetailsEmpresario = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objInteresado, setObjInteresado] = useState({
        objEmpresario: {},
        arrEmpresarioSecundario: [],
    });

    const [openModalDelete, setOpenModalDelete] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();
    const { data } = useGetEmpresarios({ autoload: true, intId });

    const [currentTab, setCurrentTab] = useState(`/comentarios/${intId}`);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const handlerChangeOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (data && data.length > 0) {
            setObjInteresado(data[0]);
        }
    }, [data]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!data) {
        return <Loader />;
    }

    if (data.error) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor contacta con soporte técnico para más información."
                title={data.msg}
            />
        );
    }

    return (
        <Fragment>
            <ModalDeleteEmpresario
                open={openModalDelete}
                handleOpenDialog={handlerChangeOpenModalDelete}
                intId={intId}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            color="inherit"
                            component={RouterLink}
                            to="/transforma"
                            className={classes.link}
                        >
                            <HomeIcon className={classes.icon} />
                            Inicio
                        </Link>

                        <Link
                            color="inherit"
                            component={RouterLink}
                            to="/transforma/asesor/empresario/read/all"
                            className={classes.link}
                        >
                            Empresarios
                        </Link>

                        <Typography color="textPrimary">{`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}</Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ width: 120, height: 120, marginRight: "15px" }}
                            alt={`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}
                            src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${objInteresado.objEmpresario.strUrlFoto}`}
                        />

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>
                                {`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}
                            </Typography>

                            <Typography
                                sx={{
                                    textTransform: "uppercase",
                                    color:
                                        objInteresado.objEmpresario
                                            .strEstadoVinculacion === "Activo"
                                            ? "#00BAB3"
                                            : "inherit",
                                }}
                            >
                                {`${objInteresado.objEmpresario.strEstadoVinculacion}`}
                            </Typography>
                        </Box>

                        <Box>
                            <Button
                                component={RouterLink}
                                to={`/transforma/asesor/empresario/edit/${intId}`}
                            >
                                Editar
                            </Button>

                            <Button
                                color="error"
                                onClick={() => handlerChangeOpenModalDelete()}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <MemoryRouter
                        initialEntries={[`/comentarios/${intId}`]}
                        initialIndex={0}
                    >
                        <Tabs value={currentTab} sx={{ marginBottom: "18px" }}>
                            <Tab
                                label="Perfil"
                                value={`/perfil/${intId}`}
                                component={RouterLink}
                                to={`/perfil/${intId}`}
                            />
                            <Tab
                                label="Comentarios"
                                value={`/comentarios/${intId}`}
                                component={RouterLink}
                                to={`/comentarios/${intId}`}
                            />
                            <Tab
                                label="Diagnósticos"
                                value={`/diagnosticos`}
                                component={RouterLink}
                                to={`/diagnosticos`}
                            />
                            <Tab label="Ruta" />
                            <Tab label="Acompañamiento" />
                            <Tab label="Indicadores" />
                            <Tab label="Documentación" />
                        </Tabs>

                        <Switch>
                            <Route path="/comentarios/:intId" exact>
                                {({ location }) => {
                                    setCurrentTab(location.pathname);

                                    return (
                                        <div className="animate__animated animate__fadeIn">
                                            <Comentarios />
                                        </div>
                                    );
                                }}
                            </Route>

                            <Route path="/perfil/:intId" exact>
                                {({ location }) => {
                                    setCurrentTab(location.pathname);

                                    return (
                                        <div className="animate__animated animate__fadeIn">
                                            <PerfilEmpresario values={objInteresado} />
                                        </div>
                                    );
                                }}
                            </Route>


                            <Route path="/diagnosticos/:intId" exact>
                                {({ location }) => {
                                    setCurrentTab(location.pathname);

                                    return (
                                        <div className="animate__animated animate__fadeIn">
                                            <PerfilEmpresario />
                                        </div>
                                    );
                                }}
                            </Route>
                        </Switch>
                    </MemoryRouter>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DetailsEmpresario;
