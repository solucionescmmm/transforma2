import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./static/css/styles.css"

//Componentes de Material UI
import { StyledEngineProvider, createTheme } from "@mui/material/styles";

import { ThemeProvider } from "@mui/styles";

const themeOptions = createTheme();

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById("root")
);
