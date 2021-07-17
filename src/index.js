import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

//Componentes de Material UI
import { StyledEngineProvider, createTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";

const themeOptions = createTheme();

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById("root")
);
