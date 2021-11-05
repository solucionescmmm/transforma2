import React, { lazy } from "react";

//Librerias
import {
    Route,
    Link as RouterLink,
    MemoryRouter,
    useRouteMatch,
    Switch,
} from "react-router-dom";

//Componentes de Material UI
import { Tabs, Tab } from "@mui/material";

const Comentarios = lazy(() => import("../../../Comentarios/pages/homePage"));
const PerfilEmpresario = lazy(() => import("../Perfil/homePage"));
const Registro = lazy(() => import("../Registro/homePage"));

const TabsComponent = ({ intId }) => {
    const routeMatch = useRouteMatch([
        "/perfil/:intId",
        "/registro/:intId",
        "/comentarios/:intId",
    ]);

    const currentTab = routeMatch?.path;

    return (
        <Tabs
            value={currentTab}
            sx={{ marginBottom: "18px" }}
            scrollButtons="auto"
            allowScrollButtonsMobile
            variant="scrollable"
        >
            <Tab
                label="Perfil"
                value="/perfil/:intId"
                component={RouterLink}
                to={`/perfil/${intId}`}
            />
            <Tab
                label="Registro"
                value="/registro/:intId"
                component={RouterLink}
                to={`/registro/${intId}`}
            />
            <Tab
                label="Comentarios"
                value="/comentarios/:intId"
                component={RouterLink}
                to={`/comentarios/${intId}`}
            />
            <Tab
                label="Diagnósticos"
                value="/diagnosticos"
                component={RouterLink}
                to={`/diagnosticos`}
            />
            <Tab label="Ruta" />
            <Tab label="Acompañamiento" />
            <Tab label="Indicadores" />
            <Tab label="Documentación" />
        </Tabs>
    );
};

const TabsRoutes = ({ values, intId }) => {
    return (
        <MemoryRouter initialEntries={[`/comentarios/${intId}`]} initialIndex={0}>
            <TabsComponent intId={intId} />
            <Switch>
                <Route
                    path="/perfil/:intId"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PerfilEmpresario values={values} />
                        </div>
                    )}
                />

                <Route path="/registro/:intId" exact>
                    {({ location }) => {
                        return (
                            <div className="animate__animated animate__fadeIn">
                                <Registro values={values} />
                            </div>
                        );
                    }}
                </Route>

                <Route path="/comentarios/:intId" exact>
                    {({ location }) => {
                        return (
                            <div className="animate__animated animate__fadeIn">
                                <Comentarios />
                            </div>
                        );
                    }}
                </Route>
            </Switch>
        </MemoryRouter>
    );
};

export default TabsRoutes;
