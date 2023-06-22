import React, { lazy } from "react";

// Componentes mui
import { Button, Grid } from "@mui/material";

//Iconos
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import PreviewRuta from "../modules/Empresarios/pages/Rutas/previewRuta";
import PreviewAcomp from "../modules/Empresarios/pages/Rutas/previewAcomp";
import CUSesion from "../modules/Empresarios/pages/Rutas/Create&EditSesion";

// Componentes
const Comentarios = lazy(() => import("../modules/Comentarios/pages/homePage"));

const Diagnosticos = lazy(() => import("../modules/Diagnosticos/pages"));

const DiagEmpresarial = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagEmpresarial/homePage")
);

const DiagEmpresarialCreate = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Create&Edit/General/pageCUGeneral"
    )
);

const DiagEmpresarialHumCreate = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Create&Edit/Humanas/pageCUGeneral"
    )
);

const DiagEmpresarialHumRead = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Read/Humanas/homePage"
    )
);

const DiagEmpresarialTecCreate = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Create&Edit/Tecnicas/pageCUGeneral"
    )
);

const DiagDesign = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagDesign/homePage")
);

const DiagDesignCUProducto = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagDesign/Create&Edit/Producto/pageCUProducto"
    )
);

const DiagDesignReadProducto = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagDesign/Read/Producto/homePage")
);

const PageCUServicio = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagDesign/Create&Edit/Servicio/pageCUServicio"
    )
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

const Documentos = lazy(() =>
    import("../modules/Empresarios/pages/Documentos")
);

const DiagnosticosCoco = lazy(() =>
    import("../modules/Empresarios/pages/Diagnosticos")
);

const Rutas = lazy(() => import("../modules/Empresarios/pages/Rutas"));

const CreateRutas = lazy(() =>
    import("../modules/Empresarios/pages/Rutas/Create&EditRuta")
);

const CreateAcomp = lazy(() =>
    import("../modules/Empresarios/pages/Rutas/Create&EditAcom")
);

const CocoRoutes = ({ route, onChangeRoute, refreshGlobal }) => {
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
                    refreshGlobal={refreshGlobal}
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
                    refreshGlobal={refreshGlobal}
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

                <PersonasCreate
                    isEdit
                    onChangeRoute={onChangeRoute}
                    values={route.params}
                />
            </Grid>
        );
    }

    if (route.location === "Diagnosticos") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("DiagnosticoCoco")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Diagnosticos
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("Diagnosticos", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarial
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarialCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                ...route.params,
                            })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarialCreate
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarialHumCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                ...route.params,
                            })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarialHumCreate
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarialHumEdit") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                ...route.params,
                            })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarialHumCreate
                    isEdit
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarialHumRead") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                ...route.params,
                            })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarialHumRead
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagEmpresarialTecCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                ...route.params,
                            })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagEmpresarialTecCreate
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagDesign") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("Diagnosticos", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesign
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagDesignProdCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagDesign", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesignCUProducto
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagDesignProdEdit") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagDesign", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesignCUProducto
                    isEdit
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagDesignProdRead") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagDesign", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <DiagDesignReadProducto
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagDesignServCreate") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagDesign", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PageCUServicio
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
            </Grid>
        );
    }

    if (route.location === "DiagComercial") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            onChangeRoute("Diagnosticos", { ...route.params })
                        }
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PageCUComercial
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdDiagnostico={route.params.intIdDiagnostico}
                />
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

                <Rutas
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "CreateRutas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Rutas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CreateRutas
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "CreateAcomp") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Rutas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CreateAcomp
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "EditRuta") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Rutas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CreateRutas
                    isEdit
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intId={route.params.intId}
                    values={route.params}
                />
            </Grid>
        );
    }

    if (route.location === "ViewRuta") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Rutas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PreviewRuta
                    isEdit
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intId={route.params.intId}
                    values={route.params}
                />
            </Grid>
        );
    }

    if (route.location === "ViewAcomp") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("Rutas")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <PreviewAcomp
                    isEdit
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intId={route.params.intId}
                    values={route.params}
                />
            </Grid>
        );
    }

    if (route.location === "CreateSesion") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChangeRoute("ViewAcomp")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <CUSesion
                    {...route.params}
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    intIdAcompañamiento={route.params.intIdAcompañamiento}
                    intId={route.params.intId}
                />
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

    if (route.location === "Documentos") {
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

                <Documentos
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "CreateDocumentos") {
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

                <Documentos
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    openModalCreateRoute={true}
                />
            </Grid>
        );
    }

    if (route.location === "DiagnosticoCoco") {
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

                <DiagnosticosCoco
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                />
            </Grid>
        );
    }

    if (route.location === "CreateDiagnosticoCoco") {
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

                <DiagnosticosCoco
                    onChangeRoute={onChangeRoute}
                    intIdIdea={route.params.intIdIdea}
                    openModalCreateRoute={true}
                />
            </Grid>
        );
    }
};

export default CocoRoutes;
