import React, { lazy } from "react";

// Componentes mui
import { Button, Grid } from "@mui/material";

//Iconos
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

// Componentes
const Comentarios = lazy(() => import("../modules/Comentarios/pages/homePage"));

const Diagnosticos = lazy(() =>
    import("../modules/Diagnosticos/pages/homePage")
);

const DiagEmpresarial = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagEmpresarial/homePage")
);

const DiagDesign = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagDesign/homePage")
);

const PageCUComercial = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagComercial/Create&Edit/pageCUComercial"
    )
);

const CocoRoutes = ({ route, onChange }) => {
    if (route === "Personas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid>Personas</Grid>
            </Grid>
        );
    }

    if (route === "Diagnosticos") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Diagnosticos onChange={onChange} />
            </Grid>
        );
    }

    if (route === "DiagEmpresarial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarial onChange={onChange} />
            </Grid>
        );
    }

    if (route === "DiagDesign") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesign onChange={onChange} />
            </Grid>
        );
    }

    if (route === "DiagComercial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PageCUComercial onChange={onChange} />
            </Grid>
        );
    }

    if (route === "Rutas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid>Rutas</Grid>
            </Grid>
        );
    }

    if (route === "Comentarios") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Comentarios onChange={onChange} />
            </Grid>
        );
    }
};

export default CocoRoutes;
