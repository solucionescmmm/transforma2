import React, {
    useState,
    useEffect,
    Fragment,
    useCallback,
    useContext,
} from "react";

//Librerias
import { matchSorter } from "match-sorter";
import axios from "axios";

//Hooks
import useGetObjetivos from "../hooks/useGetObjetivos";

//Componentes de Material UI
import {
    Autocomplete,
    TextField,
    Chip,
    List,
    ListItem,
    ListItemText,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    Tooltip,
    IconButton,
    Checkbox,
    DialogActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    LinearProgress,
    useMediaQuery,
} from "@mui/material";

//Iconos
import {
    Refresh as RefreshIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { AuthContext } from "../../../../../common/middlewares/Auth";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";

//Filtro personalizado
const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
        keys: ["strNombre"],
    });

const modalStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const DropdownObjetivos2 = ({
    id,
    value,
    name,
    onChange,
    disabled,
    error,
    helperText,
    label,
    multiple,
    required,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    const [options, setOptions] = useState([]);

    const { data, refreshGetData } = useGetObjetivos();
    const [open, toggleOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [flagSubmit, setFlagSubmit] = useState(false);

    const handlerOpenModal = () => {
        toggleOpen(!open);
    };

    const [state, setState] = useState({
        strObjetivo: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const classes = modalStyles();

    const handleClose = () => {
        toggleOpen(!open);
    };

    const onSubmit = (data) => {
        setState((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            await axios(
                {
                    method: "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_OBJETIVOS_SET}`,
                    headers: {
                        token,
                    },
                    data: {
                        strNombre: state.strObjetivo,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            );

            setLoading(false);
            setFlagSubmit(false);
            handleClose();
            refreshGetData();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state, token]
    );

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }
    }, [flagSubmit, submitData]);

    useEffect(() => {
        if (data?.length > 0) {
            setOptions(data);
        }
    }, [data]);

    if (!data) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (data.error) {
        return (
            <Alert
                severity="error"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData();
                        }}
                        size="large"
                    >
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos del listado de
                personas empresarias
            </Alert>
        );
    }

    return (
        <Fragment>
            <Dialog
                fullScreen={bitMobile}
                open={loading ? true : open}
                onClose={handleClose}
                fullWidth
            >
                {loading ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : null}
                <DialogTitle>Registrar nuevo objetivo</DialogTitle>

                <DialogContent>
                    <Grid container direction="row" spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Todos los campos marcados con (*) son
                                obligatorios.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="strObjetivo"
                                defaultValue={data.strObjetivo}
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <TextField
                                        label="Objetivo"
                                        name={name}
                                        required
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        disabled={loading}
                                        error={
                                            errors?.strObjetivo ? true : false
                                        }
                                        helperText={
                                            errors?.strObjetivo?.message ||
                                            "Digita el objetivo"
                                        }
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                )}
                                rules={{
                                    required: "Por favor, digita el objetivo",
                                }}
                                control={control}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <LoadingButton
                        color="primary"
                        loading={loading}
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                    >
                        registrar
                    </LoadingButton>

                    <Button
                        onClick={() => handlerOpenModal()}
                        color="inherit"
                        type="button"
                        disabled={loading}
                    >
                        cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Autocomplete
                id={id}
                value={value}
                onChange={(_, value) => {
                    if (typeof value === "string") {
                        setTimeout(() => {
                            toggleOpen(true);
                            setState({
                                strObjetivo: value,
                            });
                            setValue("strObjetivo", value);
                        });
                    } else if (value && value.inputValue) {
                        toggleOpen(true);
                        setState({
                            strObjetivo: value.inputValue,
                        });

                        setValue("strObjetivo", value.inputValue);
                    } else {
                        onChange(_, value);
                    }
                }}
                options={options}
                clearText="Borrar"
                openText="Abrir"
                closeText="Cerrar"
                noOptionsText="Valor no encontrado."
                disabled={disabled}
                fullWidth
                multiple={multiple}
                filterOptions={(options, params) => {
                    const filter = filterOptions(options, params);

                    if (params.inputValue !== "") {
                        filter.push({
                            inputValue: params.inputValue,
                            title: `Agregar "${params.inputValue}"`,
                        });
                    }

                    return filter;
                }}
                disableCloseOnSelect={multiple ? true : false}
                renderInput={(props) => (
                    <TextField
                        label={label}
                        name={name}
                        error={error}
                        required={required}
                        helperText={helperText}
                        variant="standard"
                        {...props}
                    />
                )}
                isOptionEqualToValue={(option, value) => {
                    if (typeof value === "string") {
                        return option === value;
                    } else {
                        return (
                            option === value ||
                            option?.strNombre === value?.strNombre
                        );
                    }
                }}
                getOptionLabel={(option) => option?.strNombre || option}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        if (option.strNombre) {
                            return (
                                <Chip
                                    key={index}
                                    label={option.strNombre}
                                    {...getTagProps({ index })}
                                />
                            );
                        }

                        return (
                            <Chip
                                key={index}
                                label={option}
                                {...getTagProps({ index })}
                            />
                        );
                    })
                }
                renderOption={(props, option, { selected }) => (
                    <List {...props} disablePadding>
                        <ListItem>
                            {multiple && (
                                <Checkbox
                                    icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                    }
                                    checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                    }
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                            )}
                            <ListItemText
                                primary={
                                    option.strNombre ||
                                    `Agregar "${option.inputValue}"`
                                }
                            />
                        </ListItem>
                    </List>
                )}
            />
        </Fragment>
    );
};

export default DropdownObjetivos2;
