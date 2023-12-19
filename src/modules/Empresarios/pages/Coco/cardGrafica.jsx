import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    TimeScale,
    TimeSeriesScale,
} from "chart.js";

import { ExportCsv } from "@material-table/exporters";

import { Line } from "react-chartjs-2";

import axios from "axios";
import toast from "react-hot-toast";

//Librerias
import { parseISO, format } from "date-fns";

import { AuthContext } from "../../../../common/middlewares/Auth";
import { Box } from "@mui/system";
import {
    CircularProgress,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Grid,
    Button,
    useMediaQuery,
} from "@mui/material";
import "chartjs-adapter-moment";
import { useTheme } from "@emotion/react";
import MaterialTable from "@material-table/core";

import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    TimeSeriesScale
);

const CardGrafica = ({ intIdIdea, type }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openModalDesarrollo, setOpenModalDesarrollo] = useState(false);
    const [openModalEmpleados, setOpenModalEmpleados] = useState(false);
    const [openModalVentas, setOpenModalVentas] = useState(false);
    const [state, setState] = useState([]);

    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpenDialogDllo = () => {
        setOpenModalDesarrollo(!openModalDesarrollo);
    };

    const handleOpenDialogEmp = () => {
        setOpenModalEmpleados(!openModalEmpleados);
    };

    const handleOpenDialogVent = () => {
        setOpenModalVentas(!openModalVentas);
    };

    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    const getData = useCallback(
        async ({ signalSubmitData, intIdIdea }) => {
            setIsLoading(true);

            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_HISTORICOS_GET}`,
                    headers: {
                        token,
                    },
                    params: {
                        intIdIdea,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    setState(res.data.data);

                    setIsLoading(false);

                    return res;
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        toast.error(msg);

                        setState({
                            error: true,
                            msg,
                        });

                        setIsLoading(false);

                        return error;
                    }
                });
        },
        [token]
    );

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        getData({ intIdIdea, signalSubmitData });

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, intIdIdea]);

    const options = {
        responsive: true,
        scales: {
            xAxes: [
                {
                    type: "time",
                    distribution: "linear",
                },
            ],
        },
    };

    const data = {
        labels: ["1", "2", "3", "4"],
        datasets: [
            {
                label: "Valores",
                data: [0, 0, 0, 0],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (type === "Desarrollo" && state) {
        const { arrEtapaDllo } = state;

        const ejeX = [];
        const ejeY = [];

        arrEtapaDllo?.forEach((v, i) => {
            ejeX.push({
                x: parseISO(v.dtmCreacion),
                y: v.intIdPuntaje,
            });

            ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
        });

        const options = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        gridLines: {
                            lineWidth: 2,
                        },
                        title: {
                            display: true,
                            text: "Fecha",
                        },
                        time: {
                            tooltipFormat: "YYYY MM DD",
                            unit: "month",
                        },
                    },
                ],
            },
        };

        const data = {
            labels: ejeY,
            datasets: [
                {
                    label: "Etapa de desarrollo",
                    data: ejeX,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 1,
                },
            ],
        };

        const objColumns = [
            {
                title: "Fecha",
                field: "dtmCreacion",
                type: "date",
            },
            {
                title: "Puntuación",
                field: "intIdPuntaje",
                type: "date",
            },
            {
                title: "Tipo",
                field: "strClasificacionFecha",
            },
        ];

        return (
            <Fragment>
                <Dialog
                    fullScreen={bitMobile}
                    open={openModalDesarrollo}
                    onClose={handleOpenDialogDllo}
                    fullWidth
                >
                    <DialogTitle>Historico Desarrollo</DialogTitle>

                    <DialogContent>
                        <Grid container direction="row">
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
                                                previousTooltip:
                                                    "Página anterior",
                                                nextTooltip: "Siguiente página",
                                                lastTooltip: "Última página",
                                                labelRowsPerPage:
                                                    "Filas por página:",
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
                                                groupedBy:
                                                    "Datos agrupados por: ",
                                            },
                                        }}
                                        data={arrEtapaDllo || []}
                                        columns={objColumns}
                                        title=""
                                        options={{
                                            grouping: true,
                                            title: false,
                                            filtering: false,
                                            search: false,
                                            exportMenu: [
                                                {
                                                    label: "Exportar como CSV",
                                                    exportFunc: (cols, datas) =>
                                                        ExportCsv(
                                                            cols,
                                                            datas,
                                                            "historicoEtapaDesarrollo"
                                                        ),
                                                },
                                            ],
                                            exportAllData: true,
                                            columnsButton: true,
                                            headerStyle: {
                                                position: "sticky",
                                                top: "0",
                                                backgroundColor: "#cff3f2",
                                            },
                                            detailPanelColumnStylele: {
                                                fontSize: 12,
                                            },
                                            actionsColumnIndex: -1,
                                            paging: true,
                                            pageSizeOptions: [
                                                20, 100, 200, 500,
                                            ],
                                            pageSize: 20,
                                            maxBodyHeight: "520px",
                                        }}
                                    />
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => handleOpenDialogDllo()}
                            color="inherit"
                        >
                            cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => handleOpenDialogDllo()}
                            color="primary"
                        >
                            ver tabla
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

    if (type === "Empleados" && state) {
        const { arrNumeroEmpleados } = state;

        const ejeX = [];
        const ejeY = [];

        arrNumeroEmpleados?.forEach((v) => {
            ejeX.push({
                x: parseISO(v.dtmCreacion),
                y: v.intNumeroEmpleados,
            });

            ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
        });

        const objColumns = [
            {
                title: "Fecha",
                field: "dtmCreacion",
                type: "date",
            },
            {
                title: "Número empleados",
                field: "intNumeroEmpleados",
                type: "number",
            },
        ];

        const options = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        gridLines: {
                            lineWidth: 2,
                        },
                        title: {
                            display: true,
                            text: "Fecha",
                        },
                        time: {
                            tooltipFormat: "YYYY MM DD",
                            unit: "month",
                        },
                    },
                ],
            },
        };

        const data = {
            labels: ejeY,
            datasets: [
                {
                    label: "Empleados",
                    data: ejeX,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 1,
                },
            ],
        };

        return (
            <Fragment>
                <Dialog
                    fullScreen={bitMobile}
                    open={openModalEmpleados}
                    onClose={handleOpenDialogEmp}
                    fullWidth
                >
                    <DialogTitle>Historico Empleados</DialogTitle>

                    <DialogContent>
                        <Grid container direction="row">
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
                                                previousTooltip:
                                                    "Página anterior",
                                                nextTooltip: "Siguiente página",
                                                lastTooltip: "Última página",
                                                labelRowsPerPage:
                                                    "Filas por página:",
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
                                                groupedBy:
                                                    "Datos agrupados por: ",
                                            },
                                        }}
                                        data={arrNumeroEmpleados || []}
                                        columns={objColumns}
                                        title=""
                                        options={{
                                            grouping: true,
                                            title: false,
                                            filtering: false,
                                            search: false,
                                            exportMenu: [
                                                {
                                                    label: "Exportar como CSV",
                                                    exportFunc: (cols, datas) =>
                                                        ExportCsv(
                                                            cols,
                                                            datas,
                                                            "historicoEtapaDesarrollo"
                                                        ),
                                                },
                                            ],
                                            exportAllData: true,
                                            columnsButton: true,
                                            headerStyle: {
                                                position: "sticky",
                                                top: "0",
                                                backgroundColor: "#cff3f2",
                                            },
                                            detailPanelColumnStylele: {
                                                fontSize: 12,
                                            },
                                            actionsColumnIndex: -1,
                                            paging: true,
                                            pageSizeOptions: [
                                                20, 100, 200, 500,
                                            ],
                                            pageSize: 20,
                                            maxBodyHeight: "520px",
                                        }}
                                    />
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => handleOpenDialogEmp()}
                            color="inherit"
                        >
                            cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => handleOpenDialogEmp()}
                            color="primary"
                        >
                            ver tabla
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

    if (type === "Ventas" && state) {
        const { arrValorVentas } = state;

        const ejeX = [];
        const ejeY = [];

        arrValorVentas?.forEach((v) => {
            ejeX.push({
                x: parseISO(v.dtmCreacion),
                y: v.ValorVentas,
            });

            ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
        });

        const options = {
            responsive: true,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        gridLines: {
                            lineWidth: 2,
                        },
                        title: {
                            display: true,
                            text: "Fecha",
                        },
                        time: {
                            tooltipFormat: "YYYY MM DD",
                            unit: "month",
                        },
                    },
                ],
            },
        };

        const data = {
            labels: ejeY,
            datasets: [
                {
                    label: "Ventas",
                    data: ejeX,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 1,
                },
            ],
        };

        const objColumns = [
            {
                title: "Fecha",
                field: "dtmCreacion",
                type: "date",
            },
            {
                title: "Valor de las ventas",
                field: "ValorVentas",
                type: "number",
            },
        ];


        return (
            <Fragment>
                <Dialog
                    fullScreen={bitMobile}
                    open={openModalVentas}
                    onClose={handleOpenDialogVent}
                    fullWidth
                >
                    <DialogTitle>Historico Ventas</DialogTitle>

                    <DialogContent>
                        <Grid container direction="row">
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
                                                previousTooltip:
                                                    "Página anterior",
                                                nextTooltip: "Siguiente página",
                                                lastTooltip: "Última página",
                                                labelRowsPerPage:
                                                    "Filas por página:",
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
                                                groupedBy:
                                                    "Datos agrupados por: ",
                                            },
                                        }}
                                        data={arrValorVentas || []}
                                        columns={objColumns}
                                        title=""
                                        options={{
                                            grouping: true,
                                            title: false,
                                            filtering: false,
                                            search: false,
                                            exportMenu: [
                                                {
                                                    label: "Exportar como CSV",
                                                    exportFunc: (cols, datas) =>
                                                        ExportCsv(
                                                            cols,
                                                            datas,
                                                            "historicoEtapaDesarrollo"
                                                        ),
                                                },
                                            ],
                                            exportAllData: true,
                                            columnsButton: true,
                                            headerStyle: {
                                                position: "sticky",
                                                top: "0",
                                                backgroundColor: "#cff3f2",
                                            },
                                            detailPanelColumnStylele: {
                                                fontSize: 12,
                                            },
                                            actionsColumnIndex: -1,
                                            paging: true,
                                            pageSizeOptions: [
                                                20, 100, 200, 500,
                                            ],
                                            pageSize: 20,
                                            maxBodyHeight: "520px",
                                        }}
                                    />
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => handleOpenDialogVent()}
                            color="inherit"
                        >
                            cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => handleOpenDialogVent()}
                            color="primary"
                        >
                            ver tabla
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

    return <Line options={options} data={data} />;
};

export default CardGrafica;
