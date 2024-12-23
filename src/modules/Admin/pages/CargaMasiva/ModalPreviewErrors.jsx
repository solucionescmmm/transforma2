import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid,
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import MaterialTable from "@material-table/core";
import {
    AddBox as AddBoxIcon,
    Clear as ClearIcon,
    Check as CheckIcon,
    DeleteOutline as DeleteOutlineIcon,
    Edit as EditIcon,
    ChevronRight as ChevronRightIcon,
    SaveAlt as SaveAltIcon,
    FilterList as FilterListIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    ChevronLeft as ChevronLeftIcon,
    Search as SearchIcon,
    ArrowDownward as ArrowDownwardIcon,
    Remove as RemoveIcon,
    ViewColumn as ViewColumnIcon,
} from '@mui/icons-material';

const ErrorDialog = ({ open, onClose, errorData, title, lengthError }) => {
    const columns = [
        { title: 'Fila', field: 'index' },
        { title: 'Nombre', field: 'name' },
        { title: 'Documento', field: 'document' },
        { title: 'Columna error', field: 'column' },
        { title: 'Error', field: 'error' },
    ];

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#00BAB3',
                dark: '#007c6a',
                light: '#0288D1',
                contrastText: '#ffff',
            },
            secondary: {
                main: '#FF4160',
            },
            divider: '#BDBDBD',
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
                        padding: '5px',
                    },
                },
            },
        },
    });

    return (
        <Dialog
            fullScreen={false}
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                style: {
                    backgroundColor: '#FDEDED',
                },
            }}
        >
            <DialogTitle>{title || 'Errores Encontrados'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A continuación se muestran los errores detectados durante la validación de datos.
                </DialogContentText>
                <Grid item xs={12} mt={2}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Previsualización de Errores"
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
                                        labelRowsSelect: 'filas',
                                        labelDisplayedRows: '{from}-{to} de {count}',
                                        firstTooltip: 'Primera página',
                                        previousTooltip: 'Página anterior',
                                        nextTooltip: 'Siguiente página',
                                        lastTooltip: 'Última página',
                                        labelRowsPerPage: 'Filas por página:',
                                    },
                                    toolbar: {
                                        nRowsSelected: '{0} filas seleccionadas',
                                        searchTooltip: 'Buscar',
                                        searchPlaceholder: 'Buscar',
                                    },
                                    header: {
                                        actions: 'Acciones',
                                    },
                                    body: {
                                        emptyDataSourceMessage: 'No existe información por mostrar',
                                        filterRow: {
                                            filterTooltip: 'Filtro',
                                        },
                                        editRow: {
                                            deleteText: '¿Está seguro de eliminar el registro?',
                                        },
                                    },
                                }}
                                data={errorData || []}
                                columns={columns}
                                options={{
                                    grouping: false,
                                    filtering: false,
                                    search: true,
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: 'sticky',
                                        top: '0',
                                        backgroundColor: '#cff3f2',
                                        zIndex: 1,
                                    },
                                    maxBodyHeight: '300px',
                                    actionsColumnIndex: -1,
                                    paging: true,
                                    pageSizeOptions: [lengthError],
                                    pageSize: lengthError,
                                }}
                            />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
