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

const REmpresarios = lazy(() =>
    import("../modules/Empresarios/pages/Read/readEmpresarios")
);

const DetailsEmpresario = lazy(() =>
    import("../modules/Empresarios/pages/Main/homePage")
);

const CUEmpresario = lazy(() =>
    import("../modules/Empresarios/pages/Create&Edit/pageCUEmpresario")
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

                            <Route path="*" component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </Main>
            </PrivateRoute>
        </ContainerMiddleware>
    );
};

export default RoutesTransforma;
