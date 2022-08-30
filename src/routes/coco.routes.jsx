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

const Personas = lazy(() =>
    import("../modules/Empresarios/pages/PersonasSecundarias/read")
);

const PersonasCreate = lazy(() =>
    import("../modules/Empresarios/pages/PersonasSecundarias/create&Edit")
);

const Tareas = lazy(() => import("../modules/Empresarios/pages/Tareas"));

const CreateTareas = lazy(() =>
    import("../modules/Empresarios/pages/Tareas/create&Edit")
);

const CocoRoutes = ({ route, onChangeRoute }) => {
    if (route.location === "Personas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Personas
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    openModalRe={route.params.openModalRe}
                />
            </Grid>
        );
    }

    if (route.location === "PersonasRe") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Personas
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    openModalRe={true}
                />
            </Grid>
        );
    }

    if (route.location === "PersonasCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Personas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PersonasCreate onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "PersonasEdit") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Personas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PersonasCreate isEdit onChangeRoute={onChangeRoute} values={route.params} />
            </Grid>
        );
    }

    if (route.location === "Diagnosticos") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Diagnosticos onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarial onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "DiagDesign") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesign onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "DiagComercial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Diagnosticos")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PageCUComercial onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "Rutas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
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

    if (route.location === "Comentarios") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Comentarios onChangeRoute={onChangeRoute} />
            </Grid>
        );
    }

    if (route.location === "CreateComentarios") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Comentarios
                    onChangeRoute={onChangeRoute}
                    openModalCreate={true}
                />
            </Grid>
        );
    }

    if (route.location === "Tareas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Inicio")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Tareas
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "CreateTareas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Tareas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CreateTareas
                    intIdIdea={route.params.intIdIdea}
                    onChangeRoute={onChangeRoute}
                />
            </Grid>
        );
    }

    if (route.location === "EditTareas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Tareas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CreateTareas
                    isEdit
                    intId={route.params.intId}
                    intIdIdea={route.params.intIdIdea}
                    onChangeRoute={onChangeRoute}
                />
            </Grid>
        );
    }
};

export default CocoRoutes;
