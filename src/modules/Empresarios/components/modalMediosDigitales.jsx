import React, { useState, Fragment } from "react";

//Componentes de Material UI
import {
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    Chip,
    TextField,
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

const ModalMediosDigitales = ({
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
        objInstagram: {
            checked: false,
            label: "Instagram",
            parent: "strIdInstragram",
        },
        objFacebook: {
            checked: false,
            label: "Facebook",
            parent: "strIdFacebook",
        },
        objYouTube: {
            checked: false,
            label: "YouTube",
            parent: "strIdYouTube",
        },
        objTwitter: {
            checked: false,
            label: "Twitter",
            parent: "strIdTwitter",
        },
        objLinkedIn: {
            checked: false,
            label: "LinkedIn",
            parent: "strIdLinkedIn",
        },
        objComercioElectronico: {
            checked: false,
            label: "Plataformas comercio electrónico",
            parent: "strComercioElectronico",
        },
        objPaginaWeb: {
            checked: false,
            label: "Página web",
            parent: "strPaginaWeb",
        },
    });

    const [valuesCheck, setValuesCheck] = useState({
        strIdInstragram: "",
        strIdFacebook: "",
        strIdYouTube: "",
        strIdTwitter: "",
        strIdLinkedIn: "",
        strComercioElectronico: "",
        strPaginaWeb: "",
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

    const handleChangeValuesCheck = (key, value) => {
        setValuesCheck((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

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
                    }}
                    htmlFor="chip-components-mediosDigitales"
                >
                    {label}
                </FormLabel>

                {value?.length > 0 ? (
                    <Input
                        id="chip-components-mediosDigitales"
                        startAdornment={value.map((e, i) => (
                            <Chip
                                key={i}
                                label={e.value ? `${e.label}: ${e.value}` : `${e.label}`}
                            />
                        ))}
                    />
                ) : (
                    <Input
                        id="chip-components-mediosDigitales"
                        placeholder="Selecciona los medios"
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

                                        {value.checked && value.parent && (
                                            <TextField
                                                key={key}
                                                label="Id"
                                                name={Object.keys(valuesCheck).find(
                                                    (e) => e === value.parent
                                                )}
                                                value={valuesCheck[value.parent]}
                                                fullWidth
                                                helperText="Por favor específico la url o nombre del perfil."
                                                variant="standard"
                                                onChange={(e) =>
                                                    handleChangeValuesCheck(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
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

export default ModalMediosDigitales;
