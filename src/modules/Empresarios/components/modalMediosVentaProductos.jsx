import React, { useState, useEffect, Fragment } from "react";

//Componentes de Material UI
import {
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    Chip,
    Input,
    Button,
    Grid,
    Checkbox,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    useTheme,
    useMediaQuery,
} from "@mui/material";

const ModalMediosVetanProductos = ({
    value,
    name,
    label,
    error,
    onChange,
    helperText,
    disabled,
    required,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openModal, setOpenModal] = useState(false);

    const [dataCheckbox, setDataCheckbox] = useState({
        objAlmacenesCadena: {
            checked: false,
            label: "Almacenes de cadena",
            parent: "strAlmacenesCadena",
        },
        objExportaciones: {
            checked: false,
            label: "Exportaciones",
            parent: "strExportaciones",
        },
        objFerias: {
            checked: false,
            label: "Ferias",
            parent: "strFerias",
        },
        objRedesComercializacion: {
            checked: false,
            label: "Grupos o redes para la comercialización",
            parent: "strRedesComercializacion",
        },
        objMultimarcas: {
            checked: false,
            label: "Multimarcas y/o minimercados ",
            parent: "strMultimarcas",
        },
        objEncargo: {
            checked: false,
            label: "Por encargo (personalizado)",
            parent: null,
        },
        objReferidos: {
            checked: false,
            label: "Referidos",
            parent: "strReferidos",
        },
        objVentaPorMayor: {
            checked: false,
            label: "Venta al por mayor",
            parent: "strVentaPorMayor",
        },
        objVentasCorporativas: {
            checked: false,
            label: "Ventas corporativas",
            parent: "strVentasCorporativas",
        },
        objVentaDirectaVivienda: {
            checked: false,
            label: "Venta directa en la vivienda",
            parent: null,
        },
        objVentaDirectaLocal: {
            checked: false,
            label: "Venta directa en local",
            parent: "strVentaDirectaLocal",
        },
        objVentaCatalogo: {
            checked: false,
            label: "Venta por catálogo",
            parent: "strVentaCatalogo",
        }
    });

    // eslint-disable-next-line
    const [valuesCheck, setValuesCheck] = useState({
        strVentaDirectaLocal: "",
        strVentaPorMayor: "",
        strExportaciones: "",
        strVentaCatalogo: "",
        strFerias: "",
        strMultimarcas: "",
        strReferidos: "",
        strRedesComercializacion: "",
        strAlmacenesCadena: "",
        strVentasCorporativas: "",
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    };

    const onSave = () => {
        let arrValues = [];

        for (const keyDataCheck in dataCheckbox) {
            if (Object.hasOwnProperty.call(dataCheckbox, keyDataCheck)) {
                if (dataCheckbox[keyDataCheck].checked) {
                    arrValues.push({
                        label: dataCheckbox[keyDataCheck].label,
                        name: keyDataCheck.toString(),
                        value: valuesCheck[dataCheckbox[keyDataCheck].parent],
                    });
                }
            }
        }

        onChange(arrValues);
        handleOpenModal();
    };

    const handleChangeDataCheckbox = (key, value) => {
        setDataCheckbox((prevState) => ({
            ...prevState,
            [key]: {
                checked: value,
                label: prevState[key].label,
                parent: prevState[key].parent,
            },
        }));
    };

    // const handleChangeValuesCheck = (key, value) => {
    //     setValuesCheck((prevState) => ({
    //         ...prevState,
    //         [key]: value,
    //     }));
    // };

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (value) {
            let prevData = dataCheckbox;
            let prevValuesCheck = valuesCheck;

            value.forEach((value) => {
                for (const key in prevData) {
                    if (Object.hasOwnProperty.call(prevData, key)) {
                        if (prevData[key].label === value.label) {
                            prevData[key].checked = true;

                            prevValuesCheck[prevData[key].parent] = value.value;
                        }
                    }
                }
            });

            setDataCheckbox(prevData);
            setValuesCheck(prevValuesCheck);
        }
    }, [value, dataCheckbox, valuesCheck]);

    return (
        <Fragment>
            <FormControl
                error={error}
                disabled={disabled}
                required={required}
                fullWidth
                onClick={() => (!disabled ? handleOpenModal() : null)}
            >
                <FormLabel
                    sx={{
                        position: "absolute",
                        top: "-3px",
                        fontSize: "12px"
                    }}
                    htmlFor="chip-components-mediosVentaProductos"
                >
                    {label}
                </FormLabel>

                {value?.length > 0 ? (
                    <Input
                        id="chip-components-mediosVentaProductos"
                        name={name}
                        disabled={disabled}
                        readOnly
                        sx={{ flexWrap: "wrap" }}
                        startAdornment={value.map((e, i) => (
                            <Chip
                                sx={{
                                    maxWidth: "inherit",
                                }}
                                disabled={disabled}
                                key={i}
                                label={e.value ? `${e.label}: ${e.value}` : `${e.label}`}
                            />
                        ))}
                    />
                ) : (
                    <Input
                        id="chip-components-mediosVentaProductos"
                        name={name}
                        placeholder="Haz clic para seleccionar"
                        disabled={disabled}
                    />
                )}

                <FormHelperText
                    sx={{
                        marginLeft: "0px",
                    }}
                >
                    {helperText}
                </FormHelperText>
            </FormControl>

            <Dialog
                open={openModal}
                onClose={handleOpenModal}
                fullScreen={bitMobile}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>{label}</DialogTitle>

                <DialogContent>
                    <Grid container direction="row">
                        <Grid item xs={12}>
                            <FormGroup>
                                {Object.entries(dataCheckbox).map(([key, value]) => (
                                    <Fragment key={key}>
                                        <FormControlLabel
                                            name={key.toString()}
                                            control={
                                                <Checkbox
                                                    checked={value.checked}
                                                    onChange={(e) =>
                                                        handleChangeDataCheckbox(
                                                            e.target.name,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                            label={value.label}
                                        />

                                        {/* {value.checked && value.parent && (
                                            <TextField
                                                key={key}
                                                label="¿Cuáles?"
                                                name={Object.keys(valuesCheck).find(
                                                    (e) => e === value.parent
                                                )}
                                                value={valuesCheck[value.parent]}
                                                fullWidth
                                                helperText="Digita detalladamente cuales son los productos o servicios que aplican."
                                                variant="standard"
                                                onChange={(e) =>
                                                    handleChangeValuesCheck(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )} */}
                                    </Fragment>
                                ))}
                            </FormGroup>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onSave()} color="primary">
                        guardar
                    </Button>

                    <Button onClick={() => handleOpenModal()} color="inherit">
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalMediosVetanProductos;
