import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

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
            seguidores: "",
        },
        objFacebook: {
            checked: false,
            label: "Facebook",
            parent: "strIdFacebook",
            seguidores: "",
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

    const [valuesSeg, setValuesSeg] = useState({
        'seg-strIdFacebook': "",
        'seg-strIdInstragram': "",
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
                        seguidores:
                            valuesSeg[`seg-${dataCheckbox[keyDataCheck].parent}`],
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
                seguidores: prevState[key].seguidores
            },
        }));
    };

    const handleChangeValuesCheck = (key, value) => {
        setValuesCheck((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleChangeValuesSeg = (key, value) => {
        setValuesSeg((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        if (value) {
            let prevData = dataCheckbox;
            let prevValuesCheck = valuesCheck;
            let prevValuesSeg = valuesSeg;

            value.forEach((value) => {
                for (const key in prevData) {
                    if (Object.hasOwnProperty.call(prevData, key)) {
                        if (prevData[key].label === value.label) {
                            prevData[key].checked = true;
                            prevValuesCheck[prevData[key].parent] = value.value;
                            prevValuesSeg[`seg-${prevData[key].parent}`] =
                                value.seguidores;
                        }
                    }
                }
            });

            setDataCheckbox(prevData);
            setValuesCheck(prevValuesCheck);
            setValuesSeg(prevValuesSeg);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

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
                        fontSize: "12px",
                    }}
                    htmlFor="chip-components-mediosDigitales"
                >
                    {label}
                </FormLabel>

                {value?.length > 0 ? (
                    <Input
                        id="chip-components-mediosDigitales"
                        name={name}
                        disabled={disabled}
                        readOnly
                        sx={{ flexWrap: "wrap" }}
                        startAdornment={value.map((e, i) => (
                            <Chip
                                disabled={disabled}
                                key={i}
                                label={
                                    e.value
                                        ? `${e.label}: ${e.value}`
                                        : `${e.label}`
                                }
                            />
                        ))}
                    />
                ) : (
                    <Input
                        name={name}
                        id="chip-components-mediosDigitales"
                        placeholder="Haz clic para seleccionar"
                        readOnly
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
                                {Object.entries(dataCheckbox).map(
                                    ([key, value]) => (
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
                                                <Controller
                                                    defaultValue={
                                                        valuesCheck[
                                                            value.parent
                                                        ]
                                                    }
                                                    name={Object.keys(
                                                        valuesCheck
                                                    ).find(
                                                        (e) =>
                                                            e === value.parent
                                                    )}
                                                    render={({
                                                        field: {
                                                            name,
                                                            value,
                                                            onChange,
                                                        },
                                                    }) => (
                                                        <TextField
                                                            key={key}
                                                            label="Id"
                                                            name={name}
                                                            value={value}
                                                            fullWidth
                                                            helperText={
                                                                errors[name]
                                                                    ?.message ||
                                                                "Digita la url o nombre del perfil."
                                                            }
                                                            variant="standard"
                                                            onChange={(e) => {
                                                                handleChangeValuesCheck(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value
                                                                );

                                                                onChange(e);
                                                            }}
                                                            error={
                                                                errors[name]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                    control={control}
                                                    rules={{
                                                        required:
                                                            "Por favor digita la url o nombre del perfil.",
                                                    }}
                                                />
                                            )}

                                            {value.checked &&
                                                value.parent &&
                                                value.seguidores !==
                                                    undefined && (
                                                    <Controller
                                                        defaultValue={
                                                            valuesSeg[
                                                                value.parent
                                                            ]
                                                        }
                                                        name={`seg-${Object.keys(
                                                            valuesSeg
                                                        ).find(
                                                            (e) =>
                                                                e ===
                                                                value.parent
                                                        )}`}
                                                        render={({
                                                            field: {
                                                                name,
                                                                value,
                                                                onChange,
                                                            },
                                                        }) => (
                                                            <TextField
                                                                key={key}
                                                                label="Seguidores"
                                                                name={name}
                                                                value={value}
                                                                fullWidth
                                                                helperText={
                                                                    errors[name]
                                                                        ?.message ||
                                                                    "Digita la cantidad de seguidores."
                                                                }
                                                                variant="standard"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleChangeValuesSeg(
                                                                        e.target
                                                                        .name,
                                                                        e.target
                                                                            .value
                                                                    );

                                                                    onChange(e);
                                                                }}
                                                                error={
                                                                    errors[name]
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                        )}
                                                        control={control}
                                                        rules={{
                                                            required:
                                                                "Por favor digita la cantidad de seguidores.",
                                                        }}
                                                    />
                                                )}
                                        </Fragment>
                                    )
                                )}
                            </FormGroup>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmit(onSave)} color="primary">
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
