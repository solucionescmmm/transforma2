import React from "react";

//Librerias
import { ErrorBoundary } from "react-error-boundary";

//Componentes
import ErrorPage from "../components/Error";

function ErrorFallback({ error }) {
    return (
        <ErrorPage
            msg="Ha ocurrido un error, por favor escala al área de TI para más información."
            title={error.message}
        />
    );
}

const MiddlewareErrorBoundary = ({ children }) => {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

export default MiddlewareErrorBoundary;
