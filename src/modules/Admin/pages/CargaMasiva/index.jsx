import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
    Breadcrumbs,
    Grid,
    Typography,
    Link,
    Button,
    createTheme,
    ThemeProvider,
    Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import MaterialTable from "@material-table/core";

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

const FileUploadWithBreadcrumbs = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleFileUpload = (e) => {
        setData(undefined)
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            let jsonData = [];
            let columnHeaders = [];

            const dateColumns = ["FechaVinculacion", "FechaFundacion", "FechaNacimiento", "FechaExpedicionDocto"]; // Lista de columnas que deben convertirse a fechas

            if (file.type === "text/csv") {
                const workbook = XLSX.read(fileContent, { type: "binary" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const csvData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                columnHeaders = csvData[0];
                jsonData = csvData.slice(1).map((row) =>
                    row.reduce((acc, value, idx) => {
                        const columnName = columnHeaders[idx];
                        acc[columnName] = dateColumns.includes(columnName)
                            ? convertExcelDate(value)
                            : value;
                        return acc;
                    }, {})
                );
            } else {
                const workbook = XLSX.read(fileContent, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rawData = XLSX.utils.sheet_to_json(sheet);
                columnHeaders = Object.keys(rawData[0]);
                jsonData = rawData.map((row) => {
                    const convertedRow = {};
                    for (const key in row) {
                        convertedRow[key] = dateColumns.includes(key)
                            ? convertExcelDate(row[key])
                            : row[key];
                    }
                    return convertedRow;
                });
            }

            const filteredData = jsonData.filter((row) =>
                Object.values(row).some((value) => value !== null && value !== undefined && value !== "")
            );

            setColumns(columnHeaders.map((header) => ({ title: header, field: header })));
            setData(filteredData);
            setFileUploaded(true);
        };

        if (file.type === "text/csv") {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    };

    // Función para convertir números de Excel a fechas legibles
    const convertExcelDate = (value) => {
        if (typeof value === "number") {
            const date = XLSX.SSF.parse_date_code(value);
            if (date) {
                // Formatear la fecha como DD/MM/YYYY
                return `${String(date.d).padStart(2, "0")}/${String(date.m).padStart(2, "0")}/${date.y}`;
            }
        }
        return value; // Devolver el valor original si no es un número de fecha
    };


    const handleResetFile = () => {
        setData([]);
        setColumns([]);
        setFileUploaded(false);
    };

    const handleSendData = async () => {
        try {
            //const response = await axios.post("/api/endpoint", data);
            // alert("Datos enviados exitosamente");
            console.log(data);
            //console.log(response.data);
        } catch (error) {
            console.error("Error al enviar los datos", error);
            alert("Error al enviar los datos");
        }
    };

    return (
        <Grid container direction="row" spacing={2}>
            {/* Breadcrumbs */}
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={RouterLink} to="/transforma" color="inherit">
                        Inicio
                    </Link>
                    <Link component={RouterLink} to="/transforma/admin" color="inherit">
                        Administración
                    </Link>
                    <Typography color="textPrimary">Carga masiva</Typography>
                </Breadcrumbs>
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
                <Typography variant="h6">Subir archivo CSV/Excel</Typography>
                {!fileUploaded ? (
                    <Button variant="contained" component="label" color="primary">
                        Seleccionar archivo
                        <input
                            type="file"
                            hidden
                            accept=".csv, .xlsx, .xls"
                            onChange={handleFileUpload}
                        />
                    </Button>
                ) : (
                    <Box>
                        <Button variant="outlined" color="secondary" onClick={handleResetFile}>
                            Eliminar archivo
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendData}
                            style={{ marginLeft: "10px" }}
                        >
                            Enviar a API
                        </Button>
                    </Box>
                )}
                <hr />
            </Grid>

            {/* Data Table */}
            <Grid item xs={12}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={
                        createTheme({
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
                        })}>
                        <MaterialTable
                            title="Previsualización de datos"
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
                            data={data || []}
                            columns={columns}
                            options={{
                                title: true,
                                search: true,
                                exportAllData: true,
                                columnsButton: true,
                                headerStyle: {
                                    position: "sticky",
                                    top: "0",
                                    backgroundColor: "#cff3f2",
                                    zIndex: 1,
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
                        />
                    </ThemeProvider>
                </StyledEngineProvider>
            </Grid>
        </Grid>
    );
};

export default FileUploadWithBreadcrumbs;
