import React, { lazy, Suspense } from "react";

//Librerias
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Middlewares
import Auth from "./common/middlewares/Auth";
import ErrorBoundary from "./common/middlewares/ErrorBoundary";

//Componentes
import Loading from "./common/components/Loader";

//===============================================================================================================================================
//========================================== Rutas principales  =================================================================================
//===============================================================================================================================================
const RoutesTransforma = lazy(() => import("./routes/transforma.routes"));

//===============================================================================================================================================
//========================================== Otras rutas ========================================================================================
//===============================================================================================================================================
const PageNotFound = lazy(() => import("./common/components/Error/404"));
const Login = lazy(() => import("./modules/Login/homePage"));

const Routes = () => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Auth>
            <Router>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/" exact component={Login} />

                            <RoutesTransforma path="/transforma" />

                            <Route path="*" component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Router>
        </Auth>
    );
};

export default Routes;
