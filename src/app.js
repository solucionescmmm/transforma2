import React, {
    useMemo,
    useState,
    useEffect,
    createContext,
    Fragment,
} from "react";

//Librerias
import Routes from "./router";
import { isIE } from "react-device-detect";
import Player from "react-lottie-player";
import { Toaster, ToastBar, toast } from "react-hot-toast";

//Componentes de Material UI
import {
    CssBaseline,
    Typography,
    useMediaQuery,
    Button,
    adaptV4Theme,
} from "@mui/material";
import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";

//Componente de Material Lab
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

//Componentes de DateFns
import { es } from "date-fns/locale";

//Componente de Permisos
import { AbilityContext } from "./common/config/Can";
import { Ability } from "@casl/ability";
import CacheBuster from "./common/middlewares/CacheBuster";

const ability = new Ability();
export const AppContext = createContext();

const App = () => {
    const [bitDarkMode, setBitDarkMode] = useState(true);

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        let bitDarkMode = prefersDarkMode;

        setBitDarkMode(bitDarkMode);
    }, [prefersDarkMode]);

    const themeOptions = useMemo(
        () =>
            createTheme(
                adaptV4Theme(
                    {
                        palette: {
                            mode: "light",
                            primary: {
                                main: "#00BAB3",
                                dark: "#007c6a",
                                light: "#0288D1",
                                contrastText: "#ffff",
                            },
                            secondary: {
                                main: "#FF4160",
                            },
                            divider: "#BDBDBD",
                        },
                    },
                    esES
                )
            ),
        []
    );

    if (isIE) {
        return (
            <div className="container">
                <div className="item">
                    <Player
                        play
                        loop
                        animationData={require("./static/json/animationMaintenance.json")}
                        style={{ height: "400px", width: "800px" }}
                    />
                </div>

                <div>
                    <Typography
                        component="h5"
                        variant="h5"
                        gutterBottom
                        style={{ color: "#459fc2" }}
                    >
                        <b>Navegador no soportado.</b>
                    </Typography>
                </div>

                <div>
                    <Typography component="p" variant="subtitle1">
                        Lo sentimos, está aplicación solo puede ser ejecutada en
                        navegadores de ultima generación, por favor intenta
                        abrirla en un navegador diferente.
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;

                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }

                return (
                    <Fragment>
                        <CssBaseline />

                        <Toaster
                            position="bottom-center"
                            toastOptions={{
                                style: {
                                    fontFamily:
                                        '"Roboto","Helvetica","Arial",sans-serif',
                                    fontSize: "0.875rem",
                                    fontWeight: "400",
                                    lineHeight: "1.43",
                                },
                                duration: 5000,
                                error: {
                                    style: {
                                        backgroundColor: "#D32F2F",
                                        color: "white",
                                    },
                                },
                            }}
                        >
                            {(t) => (
                                <ToastBar toast={t}>
                                    {({ icon, message }) => (
                                        <>
                                            {icon}
                                            {message}
                                            {t.type !== "loading" && (
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        toast.dismiss(t.id)
                                                    }
                                                >
                                                    <b>
                                                        <span
                                                            style={{
                                                                color: t.style
                                                                    .color,
                                                            }}
                                                        >
                                                            cerrar
                                                        </span>
                                                    </b>
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </ToastBar>
                            )}
                        </Toaster>

                        <AppContext.Provider
                            value={{
                                setBitDarkMode,
                                bitDarkMode,
                            }}
                        >
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={themeOptions}>
                                    <AbilityContext.Provider value={ability}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                            locale={es}
                                        >
                                            <Routes />
                                        </LocalizationProvider>
                                    </AbilityContext.Provider>
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </AppContext.Provider>
                    </Fragment>
                );
            }}
        </CacheBuster>
    );
};

export default App;
