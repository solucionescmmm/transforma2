import React, { lazy } from "react";

// Componentes mui
import { Button, Grid } from "@mui/material";

//Iconos
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import PreviewRuta from "../modules/Empresarios/pages/Rutas/previewRuta";
import PreviewAcomp from "../modules/Empresarios/pages/Rutas/previewAcomp";
import CUSesion from "../modules/Empresarios/pages/Rutas/Create&EditSesion";
import { TabPanel } from "@mui/lab";

// Componentes
const Comentarios = lazy(() => import("../modules/Comentarios/pages/homePage"));

const Diagnosticos = lazy(() => import("../modules/Diagnosticos/pages"));
const DiagnosticoExpress = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagExpress/homePage")
);

const DiagnosticoExpressCU = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagExpress/Create&Edit/pageCUGeneral"
    )
);

const DiagEmpresarial = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagEmpresarial/homePage")
);

const DiagEmpresarialRead = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Read/Empresarial/homePage"
    )
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

const DiagEmpresarialTecRead = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagEmpresarial/Read/Tecnicas/homePage"
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

const DiagDesignCUServicio = lazy(() =>
    import(
        "../modules/Diagnosticos/pages/DiagDesign/Create&Edit/Servicio/pageCUServicio"
    )
);

const DiagDesignReadServicio = lazy(() =>
    import("../modules/Diagnosticos/pages/DiagDesign/Read/Servicio/homePage")
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
const Acomp = lazy(() =>
    import("../modules/Empresarios/pages/Rutas/indexAcom")
);

const CreateRutas = lazy(() =>
    import("../modules/Empresarios/pages/Rutas/Create&EditRuta")
);

const CreateAcomp = lazy(() =>
    import("../modules/Empresarios/pages/Rutas/Create&EditAcom")
);

const CocoRoutes = ({ route, onChangeRoute, refreshGlobal }) => {
    if (route.location === "Personas") {
        return (
            <TabPanel value="Personas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Personas
                        onChangeRoute={onChangeRoute}
                        intIdIdea={route.params.intIdIdea}
                        openModalRe={route.params.openModalRe}
                        refreshGlobal={refreshGlobal}
                    />
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "PersonasRe") {
        return (
            <TabPanel value="Personas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Personas
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            openModalRe={true}
                            refreshGlobal={refreshGlobal}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "PersonasCreate") {
        return (
            <TabPanel value="Personas" sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    sx={{ marginTop: "20px" }}
                >
                    <Grid item xs={12}>
                        <PersonasCreate onChangeRoute={onChangeRoute} />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "PersonasEdit") {
        return (
            <TabPanel value="Personas" sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    sx={{ marginTop: "20px" }}
                >
                    <Grid item xs={12}>
                        <PersonasCreate
                            isEdit
                            onChangeRoute={onChangeRoute}
                            values={route.params}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "Diagnosticos") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Diagnosticos
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagnExpress") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticoExpress
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagnExpressCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticoExpressCU
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagnExpressEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticoExpressCU
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagnExpressRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticoExpress
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarial") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarial
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                onChangeRoute("Diagnosticos", {
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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialCreate
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialCreate
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialRead
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialHumCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialHumCreate
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialHumEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialHumCreate
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialHumRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialHumRead
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialTecCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialTecCreate
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialTecEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialTecCreate
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagEmpresarialTecRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagEmpresarialTecRead
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesign") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesign
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                onChangeRoute("Diagnosticos", {
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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignProdCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignCUProducto
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignProdEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignCUProducto
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignProdRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignReadProducto
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignServCreate") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignCUServicio
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignServEdit") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignCUServicio
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagDesignServRead") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagDesignReadServicio
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagComercial") {
        return (
            <TabPanel value="Diagnosticos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <PageCUComercial
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdDiagnostico={route.params.intIdDiagnostico}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                onChangeRoute("Diagnosticos", {
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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "Rutas") {
        return (
            <TabPanel value="Rutas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Rutas
                        onChangeRoute={onChangeRoute}
                        intIdIdea={route.params.intIdIdea}
                    />

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateRutas") {
        return (
            <TabPanel value="Rutas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <CreateRutas
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "EditRuta") {
        return (
            <TabPanel value="Rutas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <CreateRutas
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intId={route.params.intId}
                            values={route.params}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "ViewRuta") {
        return (
            <TabPanel value="Rutas" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <PreviewRuta
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intId={route.params.intId}
                            values={route.params}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "Acompañamientos") {
        return (
            <TabPanel value="Acompañamientos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Acomp
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateAcomp") {
        return (
            <TabPanel value="Acompañamientos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <CreateAcomp
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => onChangeRoute("Acompañamientos")}
                            startIcon={<ChevronLeftIcon />}
                            size="small"
                            color="inherit"
                        >
                            regresar
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "ViewAcomp") {
        return (
            <TabPanel value="Acompañamientos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <PreviewAcomp
                            isEdit
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intId={route.params.intId}
                            values={route.params}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => onChangeRoute("Acompañamientos")}
                            startIcon={<ChevronLeftIcon />}
                            size="small"
                            color="inherit"
                        >
                            regresar
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateSesion") {
        return (
            <TabPanel value="Acompañamientos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <CUSesion
                            {...route.params}
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            intIdAcompañamiento={
                                route.params.intIdAcompañamiento
                            }
                            intId={route.params.intId}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "Comentarios") {
        return (
            <TabPanel value="Comentarios" sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    sx={{ marginTop: "20px" }}
                >
                    <Grid item xs={12}>
                        <Comentarios onChangeRoute={onChangeRoute} />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateComentarios") {
        return (
            <TabPanel value="Comentarios" sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    sx={{ marginTop: "20px" }}
                >
                    <Grid item xs={12}>
                        <Comentarios
                            onChangeRoute={onChangeRoute}
                            openModalCreate={true}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
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
            <TabPanel value="Documentos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Documentos
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateDocumentos") {
        return (
            <TabPanel value="Documentos" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Documentos
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            openModalCreateRoute={true}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "DiagnosticoCoco") {
        return (
            <TabPanel value="DiagnosticoCoco" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticosCoco
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    if (route.location === "CreateDiagnosticoCoco") {
        return (
            <TabPanel value="DiagnosticoCoco" sx={{ width: "100%" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <DiagnosticosCoco
                            onChangeRoute={onChangeRoute}
                            intIdIdea={route.params.intIdIdea}
                            openModalCreateRoute={true}
                        />
                    </Grid>

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
                </Grid>
            </TabPanel>
        );
    }

    return null;
};

export default CocoRoutes;
