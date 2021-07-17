import React, { Fragment } from "react";

//Componentes
import TimeOut from "./TimeOut";
import VerifyToken from "./VerifyToken";

const ContainerMiddleware = ({ children }) => {
    return (
        <Fragment>
            <TimeOut />
            <VerifyToken />

            {children}
        </Fragment>
    );
};

export default ContainerMiddleware;
