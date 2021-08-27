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

//===============================================================================================================================================
//========================================== Otros Componentes ==================================================================================
//===============================================================================================================================================
const Home = lazy(() => import("../pages/Home"));
const CUEmpresario = lazy(() =>
    import("../pages/Empresarios/pages/Create&Edit/pageCUEmpresario")
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
                                path="/transforma/asesor/empresario/create"
                                exact
                                component={() => (
                                    <div className="animate__animated animate__fadeIn">
                                        <CUEmpresario />
                                    </div>
                                )}
                            />
                        </Switch>
                    </Suspense>
                </Main>
            </PrivateRoute>
        </ContainerMiddleware>
    );
};

export default RoutesTransforma;
