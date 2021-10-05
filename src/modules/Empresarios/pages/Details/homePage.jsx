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
import { Grid, Breadcrumbs, Link, Typography, Tabs, Tab } from "@mui/material";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

//Componentes
import ErrorPage from "../../../../common/components/Error";
import Loader from "../../../../common/components/Loader";
import CardInfoEmpresario from "./cardInfoEmpresario";

//Estilos
import { makeStyles } from "@mui/styles";

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

                <Grid item xs={12} md={3} style={{ marginTop: "65px" }}>
                    <CardInfoEmpresario values={objInteresado} />
                </Grid>

                <Grid item xs={12} md={9} style={{ marginTop: "30px" }}>
                    <MemoryRouter
                        initialEntries={[`/comentarios/${intId}`]}
                        initialIndex={0}
                    >
                        <Tabs value={currentTab} sx={{marginBottom: "18px"}}>
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
                        </Switch>
                    </MemoryRouter>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DetailsEmpresario;
