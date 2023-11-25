import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    MenuItem,
    Button,
    Grid,
    useTheme,
    useMediaQuery,
} from "@mui/material";

const ModalDireccionResidencia = ({
    name,
    label,
    value,
    disabled,
    error,
    helperText,
    onChange,
    required,
}) => {
    //========================================================================================================================
    //========================================= Estados  =====================================================================
    //========================================================================================================================
    const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState({
        strTipoVia: "",
        strNumeroVia: "",
        strLetraVia: "",
        strComplementoVia: "",
        strNumeroViaSecundaria: "",
        strLetraViaSecundaria: "",
        strComplementoViaSecundaria: "",
        strNumeroPredio: "",
        strComplementoDireccion: "",
    });

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

    //========================================================================================================================
    //========================================= Funciones  ===================================================================
    //========================================================================================================================
    const handleOpenDialog = () => {
        setOpenModal(!openModal);
    };

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({ ...prevState, [key]: value }));
    };

    const onSubmit = (data) => {
        let strDireccion = `${data.strTipoVia} ${
            data.strNumeroVia
        } ${data.strLetraVia.toUpperCase()} ${data.strComplementoVia} # ${
            data.strNumeroViaSecundaria
        } ${data.strLetraViaSecundaria.toUpperCase()} ${
            data.strComplementoViaSecundaria
        } - ${data.strNumeroPredio} ${data.strComplementoDireccion}`;

        onChange(strDireccion);
        handleOpenDialog();
    };

    //========================================================================================================================
    //========================================= UseEffects  ==================================================================
    //========================================================================================================================
    useEffect(() => {
        if (value) {
            let strDireccion = value ? value : "";
            let max = 0;
            let arrayString = strDireccion.split(" ");

            if (arrayString[3] === "BIS") {
                max = 1;
            }

            let strComple = arrayString[10 + max]
                ? `${arrayString[10 + max] ? arrayString[10 + max] : ""} ${
                      arrayString[11 + max] ? arrayString[11 + max] : ""
                  } ${arrayString[12 + max] ? arrayString[12 + max] : ""} ${
                      arrayString[13 + max] ? arrayString[13 + max] : ""
                  } ${arrayString[14 + max] ? arrayString[14 + max] : ""} ${
                      arrayString[15 + max] ? arrayString[15 + max] : ""
                  } ${arrayString[16 + max] ? arrayString[16 + max] : ""} ${
                      arrayString[17 + max] ? arrayString[17 + max] : ""
                  } ${arrayString[18 + max] ? arrayString[18 + max] : ""} ${
                      arrayString[19 + max] ? arrayString[19 + max] : ""
                  } ${arrayString[20 + max] ? arrayString[20 + max] : ""} ${
                      arrayString[21 + max] ? arrayString[21 + max] : ""
                  } ${arrayString[22 + max] ? arrayString[22 + max] : ""} ${
                      arrayString[23 + max] ? arrayString[23 + max] : ""
                  }`
                : "";

            setData((prevState) => ({
                ...prevState,
                strTipoVia: arrayString[0] ? arrayString[0] : "",
                strNumeroVia: arrayString[1] ? arrayString[1] : "",
                strLetraVia:
                    max === 1
                        ? arrayString[2] + " " + arrayString[3]
                        : arrayString[2]
                        ? arrayString[2]
                        : "",
                strComplementoVia: arrayString[3 + max] ? arrayString[3 + max] : "",
                strNumeroViaSecundaria: arrayString[5 + max] ? arrayString[5 + max] : "",
                strLetraViaSecundaria: arrayString[6 + max] ? arrayString[6 + max] : "",
                strComplementoViaSecundaria: arrayString[7 + max]
                    ? arrayString[7 + max]
                    : "",
                strNumeroPredio: arrayString[9 + max] ? arrayString[9 + max] : "",
                strComplementoDireccion: strComple,
            }));
        }
    }, [value]);

    //========================================================================================================================
    //========================================= Renders  =====================================================================
    //========================================================================================================================
    return (
        <Fragment>
            <FormControl
                disabled={disabled}
                required={required}
                error={error}
                fullWidth
                onClick={() => (!disabled ? handleOpenDialog() : null)}
            >
                <FormLabel
                    htmlFor={`txt${name}`}
                    sx={{
                        position: "absolute",
                        top: "-3px",
                        fontSize: "12px"
                    }}
                >
                    {label}
                </FormLabel>
                <Input
                    id={`txt${name}`}
                    name={name}
                    value={value}
                    placeholder="Haz clic para seleccionar"
                    disabled={disabled}
                />
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
                onClose={handleOpenDialog}
                maxWidth="md"
                fullScreen={bitMobile}
            >
                <DialogTitle>{label}</DialogTitle>

                <DialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValu={data.strTipoVia}
                                name="strTipoVia"
                                render={({ field: { name, onChange, value } }) => (
                                    <TextField
                                        label="Tipo de vía"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        required
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strTipoVia ? true : false}
                                        helperText={
                                            errors?.strTipoVia?.message ||
                                            "Seleccione el tipo de vía."
                                        }
                                        select
                                    >
                                        <MenuItem value="Calle">Calle</MenuItem>
                                        <MenuItem value="Carrera">Carrera</MenuItem>
                                        <MenuItem value="Transversal">
                                            Transversal
                                        </MenuItem>
                                        <MenuItem value="Diagonal">Diagonal</MenuItem>
                                        <MenuItem value="Avenida">Avenida</MenuItem>
                                        <MenuItem value="Bulevar">Bulevar</MenuItem>
                                        <MenuItem value="Autopista">Autopista</MenuItem>
                                        <MenuItem value="Esquina">Esquina</MenuItem>
                                    </TextField>
                                )}
                                control={control}
                                rules={{
                                    required: "Por favor, seleccione el tipo de vía.",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strNumeroVia}
                                name="strNumeroVia"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Número de vía primaria"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        required
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strNumeroVia ? true : false}
                                        helperText={
                                            errors?.strNumeroVia?.message ||
                                            "Digite el número de la vía primaria."
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required: "Por favor, digite el número de la vía.",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strLetraVia}
                                name="strLetraVia"
                                render={({ field: { name, onChange, value } }) => (
                                    <TextField
                                        label="Letra de la vía primaria"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strLetraVia ? true : false}
                                        helperText={
                                            errors?.strLetraVia?.message ||
                                            "Digite la letra de la vía primaria, en caso de que aplique."
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value) {
                                            if (!/^[A-Za-z _]{0,6}$/.test(value)) {
                                                return "El formato de la letra no es válido, por favor revise e intente nuevamente.";
                                            }
                                        }
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strComplementoVia}
                                name="strComplementoVia"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Cardinalidad de la vía primaria"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strComplementoVia ? true : false}
                                        helperText={
                                            errors?.strComplementoVia?.message ||
                                            "Seleccione la cardinalidad de la vía primaria, en caso de que aplique."
                                        }
                                        select
                                    >
                                        <MenuItem value="Norte">Norte</MenuItem>
                                        <MenuItem value="Sur">Sur</MenuItem>
                                        <MenuItem value="Oriente">Oriente</MenuItem>
                                        <MenuItem value="Occidente">Occidente</MenuItem>
                                        <MenuItem value="">No aplica</MenuItem>
                                    </TextField>
                                )}
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strNumeroViaSecundaria}
                                name="strNumeroViaSecundaria"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Número de vía secundaria"
                                        required
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={
                                            errors?.strNumeroViaSecundaria ? true : false
                                        }
                                        helperText={
                                            errors?.strNumeroViaSecundaria?.message ||
                                            "Digite el número de vía secundaria."
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required:
                                        "Por favor, digite el número de vía secundaria",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strLetraViaSecundaria}
                                name="strLetraViaSecundaria"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Letra de la vía secundaria"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={
                                            errors?.strLetraViaSecundaria ? true : false
                                        }
                                        helperText={
                                            errors?.strLetraViaSecundaria?.message ||
                                            "Digite la letra de vía secundaria, en caso de que aplique."
                                        }
                                    />
                                )}
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strComplementoViaSecundaria}
                                name="strComplementoViaSecundaria"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Cardinalidad de la vía secundaria"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={
                                            errors?.strComplementoViaSecundaria
                                                ? true
                                                : false
                                        }
                                        helperText={
                                            errors?.strComplementoViaSecundaria
                                                ?.message ||
                                            "Seleccione la cardinalidad de la vía secundaria, en caso de que aplique."
                                        }
                                        select
                                    >
                                        <MenuItem value="Norte">Norte</MenuItem>
                                        <MenuItem value="Sur">Sur</MenuItem>
                                        <MenuItem value="Oriente">Oriente</MenuItem>
                                        <MenuItem value="Occidente">Occidente</MenuItem>
                                        <MenuItem value="">No aplica</MenuItem>
                                    </TextField>
                                )}
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                defaultValue={data.strNumeroPredio}
                                name="strNumeroPredio"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Número de vía secundaria adicional"
                                        required
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);

                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strNumeroPredio ? true : false}
                                        helperText={
                                            errors?.strNumeroPredio?.message ||
                                            "Digite el número de la vía secundaria adicional."
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required:
                                        "Por favor, digite el número de la vía secundaria adicional.",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                defaultValue={data.strComplementoDireccion}
                                name="strComplementoDireccion"
                                render={({ field: { name, value, onChange } }) => (
                                    <TextField
                                        label="Complemento de la dirección (unidad/bloque/apto/manzana)"
                                        name={name}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            
                                            handlerChangeData(
                                                e.target.name,
                                                e.target.value
                                            );
                                        }}
                                        fullWidth
                                        variant="standard"
                                        error={
                                            errors?.strComplementoDireccion ? true : false
                                        }
                                        helperText={
                                            errors?.strComplementoDireccion?.message ||
                                            "Digite el complemento de la direcció, en caso de que aplique."
                                        }
                                    />
                                )}
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Dirección ingresada"
                                disabled
                                fullWidth
                                variant="standard"
                                value={`${data.strTipoVia} ${
                                    data.strNumeroVia
                                }${data.strLetraVia.toUpperCase()} ${
                                    data.strComplementoVia
                                } # ${
                                    data.strNumeroViaSecundaria
                                } ${data.strLetraViaSecundaria.toUpperCase()} ${
                                    data.strComplementoViaSecundaria
                                } - ${data.strNumeroPredio} ${
                                    data.strComplementoDireccion
                                }`}
                                helperText="Dirección que será almacenada."
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleOpenDialog()} color="inherit">
                        cancelar
                    </Button>

                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                        guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalDireccionResidencia;
