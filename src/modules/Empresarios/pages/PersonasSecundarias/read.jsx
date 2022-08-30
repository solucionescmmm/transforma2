import React, { Fragment, useEffect, useState } from "react";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Componentes de Material UI
import { Grid, Avatar, Box, Button } from "@mui/material";

import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";

//Iconos
import {
    ViewColumn as ViewColumnIcon,
    Edit as EditIcon,
    Clear as ClearIcon,
    DeleteOutline as DeleteOutlineIcon,
    Search as SearchIcon,
    SaveAlt as SaveAltIcon,
    ArrowDownward as ArrowDownwardIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    Check as CheckIcon,
    FilterList as FilterListIcon,
    Remove as RemoveIcon,
    AddBox as AddBoxIcon,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";
import ModalRepresentante from "./modalRepresentante";

//Componentes

const ReadPersonaSecundaria = ({ onChangeRoute, intId, openModalRe }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Foto",
            render: (rowData) => (
                <Avatar
                    alt={rowData.strNombres + rowData.strApellidos}
                    src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${rowData.strURLFileFoto}`}
                />
            ),
            width: "0%",
        },
        {
            title: "Persona",
            render: (rowData) =>
                rowData.strNombres + " " + rowData.strApellidos,
        },
        {
            title: "Documento de identidad",
            field: "strNroDocto",
            type: "string",
        },
        {
            title: "Fecha de registro",
            field: "dtFechaVinculacion",
            type: "date",
        },
        {
            title: "Estado",
            field: "strEstadoVinculacion",
            type: "string",
        },
        {
            title: "Tipo",
            field: "strTipoEmpresario",
            type: "string",
        },
    ]);

    const [openModalRepresentante, setModalRepresentante] = useState(false);

    const handleOpenDialogRepresentante = () => {
        setModalRepresentante(!openModalRepresentante);
    };

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetEmpresarios({
        autoload: true,
        intId,
    });

    useEffect(() => {
        if (openModalRe) {
            handleOpenDialogRepresentante();
        }
        // eslint-disable-next-line
    }, [openModalRe]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalRepresentante
                handleOpenDialog={handleOpenDialogRepresentante}
                open={openModalRepresentante}
                refresh={refreshGetData}
                arrEmpresarios={data?.[0]?.objEmpresario.filter(
                    (p) => p.strTipoEmpresario !== "Principal"
                )}
                intIdIdea={intId}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider
                            theme={createTheme({
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
                                typography: { fontSize: 13.2 },
                                components: {
                                    MuiTableBody: {
                                        styleOverrides: {
                                            root: {
                                                fontSize: 13.2,
                                            },
                                        },
                                    },
                                    MuiTableCell: {
                                        styleOverrides: {
                                            root: {
                                                padding: "5px",
                                            },
                                        },
                                    },
                                },
                            })}
                        >
                            <MaterialTable
                                icons={{
                                    Add: AddBoxIcon,
                                    Clear: ClearIcon,
                                    Check: CheckIcon,
                                    Delete: DeleteOutlineIcon,
                                    Edit: EditIcon,
                                    DetailPanel: ChevronRightIcon,
                                    Export: SaveAltIcon,
                                    Filter: FilterListIcon,
                                    FirstPage: FirstPageIcon,
                                    LastPage: LastPageIcon,
                                    NextPage: ChevronRightIcon,
                                    PreviousPage: ChevronLeftIcon,
                                    Search: SearchIcon,
                                    ResetSearch: ClearIcon,
                                    SortArrow: ArrowDownwardIcon,
                                    ThirdStateCheck: RemoveIcon,
                                    ViewColumn: ViewColumnIcon,
                                }}
                                localization={{
                                    pagination: {
                                        labelRowsSelect: "filas",
                                        labelDisplayedRows:
                                            "{from}-{to} de {count}",
                                        firstTooltip: "Primera página",
                                        previousTooltip: "Página anterior",
                                        nextTooltip: "Siguiente página",
                                        lastTooltip: "Última página",
                                        labelRowsPerPage: "Filas por página:",
                                    },
                                    toolbar: {
                                        nRowsSelected:
                                            "{0} filas seleccionadas",
                                        searchTooltip: "Buscar",
                                        searchPlaceholder: "Buscar",
                                    },
                                    header: {
                                        actions: "Acciones",
                                    },
                                    body: {
                                        emptyDataSourceMessage:
                                            "No existe información por mostrar",
                                        filterRow: {
                                            filterTooltip: "Filtro",
                                        },
                                        editRow: {
                                            deleteText:
                                                "Esta seguro de eliminar el registro?",
                                        },
                                    },
                                    selector: {
                                        okLabel: "aceptar",
                                        cancelLabel: "Cancelar",
                                        clearLabel: "Clear",
                                        todayLabel: "Hoy",
                                    },
                                    grouping: {
                                        placeholder:
                                            "Arrasta el nombre de la columna para agrupar los campos",
                                        groupedBy: "Datos agrupados por: ",
                                    },
                                }}
                                isLoading={data === undefined ? true : false}
                                data={
                                    !data?.error && data
                                        ? data[0].objEmpresario
                                        : []
                                }
                                actions={[
                                    (rowData) => {
                                        return {
                                            icon: () => (
                                                <EditIcon
                                                    color={
                                                        rowData.strTipoEmpresario ===
                                                        "Principal"
                                                            ? "gray"
                                                            : "success"
                                                    }
                                                    fontSize="small"
                                                    onClick={() =>
                                                        onChangeRoute(
                                                            "PersonasEdit",
                                                            rowData
                                                        )
                                                    }
                                                />
                                            ),
                                            tooltip: "Editar",
                                            disabled:
                                                rowData.strTipoEmpresario ===
                                                "Principal",
                                        };
                                    },
                                ]}
                                columns={objColumns}
                                title="Personas secundarias"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: true,
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                        backgroundColor: "white",
                                    },
                                    detailPanelColumnStylele: {
                                        fontSize: 12,
                                    },
                                    maxBodyHeight: "520px",
                                    actionsColumnIndex: -1,
                                    paging: true,
                                    pageSizeOptions: [20, 100, 200, 500],
                                    pageSize: 20,
                                }}
                                components={{
                                    Toolbar: (props) => (
                                        <div
                                            style={{
                                                paddingRight: "5px",
                                                paddingLeft: "5px",
                                            }}
                                        >
                                            <MTableToolbar {...props} />

                                            <Grid container direction="row">
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                ></Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    sx={{ margin: "auto" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                            marginBottom:
                                                                "10px",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "PersonasCreate"
                                                                )
                                                            }
                                                            variant="contained"
                                                        >
                                                            Agregar persona
                                                        </Button>

                                                        <Button
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleOpenDialogRepresentante()
                                                            }
                                                        >
                                                            reemplazar
                                                            representante
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ),
                                }}
                            />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ReadPersonaSecundaria;
