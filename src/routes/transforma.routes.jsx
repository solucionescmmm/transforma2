import React, { lazy, Suspense } from "react";

//CSS
import "animate.css";

//Librerias
import { Switch, Route, useLocation } from "react-router-dom";
// import { Can } from "../common/config/Can";

//Componentes
import Loading from "../common/components/Loader";
import ContainerMiddleware from "../common/middlewares/Containers";

//==================================> Otros componentes
import Main from "../common/components/main";
import PrivateRoute from "../common/middlewares/PrivateRoute";
// import ErrorPage from "../common/components/Error";
// import MaintenancePage from "../common/components/Error/503";
import PageNotFound from "../common/components/Error/404";

//===============================================================================================================================================
//========================================== Otros Componentes ==================================================================================
//===============================================================================================================================================
const Home = lazy(() => import("../modules/Home/homePage"));

const Admin = lazy(() => import("../modules/Admin/pages/Main"));

const AdminLists = lazy(() => import("../modules/Admin/pages/Listas/homePage"));

const AdminServices = lazy(() => import("../modules/Admin/pages/Servicios"));

const AdminServicesCreate = lazy(() =>
    import("../modules/Admin/pages/Servicios/Create&Edit")
);

const AdminPaquetes = lazy(() => import("../modules/Admin/pages/Paquetes/"));

const AdminPaquetesCreate = lazy(() =>
    import("../modules/Admin/pages/Paquetes/Create&Edit")
);

const REmpresarios = lazy(() =>
    import("../modules/Empresarios/pages/Read/readEmpresarios")
);

const DetailsEmpresario = lazy(() =>
    import("../modules/Empresarios/pages/Coco/index")
);

const CUEmpresario = lazy(() =>
    import("../modules/Empresarios/pages/Create&Edit")
);

const RoutesTransforma = ({ path }) => {
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const location = useLocation();

    return (
        <ContainerMiddleware>
            <PrivateRoute path={path}>
                <Main>
                    <Suspense fallback={<Loading />}>
                        <Switch location={location}>
                            <Route
                                path="/transforma"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <Home />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/asesor/empresario/read/all"
                                exact
                                component={() => (
                                    <div
                                        className="animate__animated animate__fadeIn"
                                        style={{ width: "100%" }}
                                    >
                                        <REmpresarios />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/asesor/empresario/read/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <DetailsEmpresario />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/asesor/empresario/create"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <CUEmpresario />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/asesor/empresario/edit/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <CUEmpresario isEdit />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <Admin />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/lists"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminLists />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/services"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminServices />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/services/create"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminServicesCreate />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/services/edit/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminServicesCreate isEdit />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/services/preview/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminServicesCreate isPreview />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/paquetes"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminPaquetes />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/paquetes/create"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminPaquetesCreate />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/paquetes/edit/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminPaquetesCreate isEdit />
                                    </div>
                                )}
                            />

                            <Route
                                path="/transforma/admin/paquetes/preview/:intId"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <AdminPaquetesCreate isPreview />
                                    </div>
                                )}
                            />

                            <Route path="*" component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </Main>
            </PrivateRoute>
        </ContainerMiddleware>
    );
};

export default RoutesTransforma;
