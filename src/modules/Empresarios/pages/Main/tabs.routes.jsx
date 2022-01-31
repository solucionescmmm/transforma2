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

// import PageMaintenance from "../../../../common/components/Error/503";

const Comentarios = lazy(() => import("../../../Comentarios/pages/homePage"));
const PerfilEmpresario = lazy(() => import("../Perfil/homePage"));
const InfoRegistro = lazy(() => import("../InfoRegistro/homePage"));
const Diagnosticos = lazy(() => import("../../../Diagnosticos/pages/homePage"));

const DiagEmpresarial = lazy(() =>
    import("../../../Diagnosticos/pages/DiagEmpresarial/homePage")
);

const DiagDesign = lazy(() =>
    import("../../../Diagnosticos/pages/DiagDesign/homePage")
);

const PageCUGeneral = lazy(() =>
    import(
        "../../../Diagnosticos/pages/DiagEmpresarial/Create&Edit/General/pageCUGeneral"
    )
);

const PageCUProducto = lazy(() =>
    import(
        "../../../Diagnosticos/pages/DiagDesign/Create&Edit/Producto/pageCUProducto"
    )
);

const PageCUServicio = lazy(() =>
    import(
        "../../../Diagnosticos/pages/DiagDesign/Create&Edit/Servicio/pageCUServicio"
    )
);

const PageResumenProducto = lazy(() =>
    import("../../../Diagnosticos/pages/DiagDesign/Read/Producto/homePage")
);

const PageResumenServicio = lazy(() =>
    import("../../../Diagnosticos/pages/DiagDesign/Read/Servicio/homePage")
);

const TabsComponent = ({ intId }) => {
    const routeMatch = useRouteMatch([
        "/perfil/:intId",
        "/registro/:intId",
        "/comentarios/:intId",
        "/diagnosticos/",
        "/diagnosticos/diagEmpresarial/",
        "/diagnosticos/diagEmpresarial/general/create",
        "/diagnosticos/diagDesign/",
        "/diagnosticos/diagDesign/product/create",
        "/diagnosticos/diagDesign/product/read/:intId",
    ]);

    const currentTab = routeMatch?.path.startsWith("/diagnosticos/")
        ? "/diagnosticos/"
        : routeMatch?.path;

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
                value="/diagnosticos/"
                component={RouterLink}
                to="/diagnosticos/"
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
        <MemoryRouter initialEntries={[`/perfil/${intId}`]} initialIndex={0}>
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

                <Route
                    path="/registro/:intId"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <InfoRegistro values={values} />
                        </div>
                    )}
                />

                <Route
                    path="/comentarios/:intId"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <Comentarios />
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <Diagnosticos intId={intId} />
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagEmpresarial/"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <DiagEmpresarial intId={intId} />
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagEmpresarial/general/create/"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageCUGeneral intId={intId} />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <DiagDesign intId={intId} />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/product/read/:intId"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageResumenProducto />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/product/create"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageCUProducto intId={intId} />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/product/edit"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageCUProducto intId={intId} isEdit />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/service/create"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageCUServicio intId={intId} />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/service/edit"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageCUServicio intId={intId} isEdit />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />

                <Route
                    path="/diagnosticos/diagDesign/service/read/:intId"
                    exact
                    component={() => (
                        <div className="animate__animated animate__fadeIn">
                            <PageResumenServicio />

                            {/* <PageMaintenance /> */}
                        </div>
                    )}
                />
            </Switch>
        </MemoryRouter>
    );
};

export default TabsRoutes;
