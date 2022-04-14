import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    CircularProgress,
    TextField,
    MenuItem,
    FormControlLabel,
    Divider,
    Checkbox,
} from "@mui/material";

import { DateTimePicker, DatePicker } from "@mui/lab";

// Componentes
import SelectListas from "../../../components/selectLista";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";


const InfoCanalVenta = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strVendeRepreComer: "",
        bVendeRepreComer: false,
        bVendeRepreComerMasRepre: false,
        strFerias: "",
        bFerias: false,
        bFeriasMasRepre: false,
        strMultMarcas: "",
        bMultMarcas: false,
        bMultMarcasMasRepre: false,
        strVentPersonali: "",
        bVentPersonali: false,
        bVentPersonaliMasRepre: false,
        strVozVozRef: "",
        bVozVozRef: false,
        bVozVozRefMasRepre: false,
        strVentDireVivi: "",
        bVentDireVivi: false,
        bVentDireViviMasRepre: false,
        strVentPunVentPro: "",
        bVentPunVentPro: false,
        bVentPunVentProMasRepre: false,
        strVentPorMay: "",
        bVentPorMay: false,
        bVentPorMayMasRepre: false,
        strExportaciones: "",
        bExportaciones: false,
        bExportacionesMasRepre: false,
        strVentPorCatalog: "",
        bVentPorCatalog: false,
        bVentPorCatalogMasRepre: false,
        strPlataComerElec: "",
        bPlataComerElec: false,
        bPlataComerElecMasRepre: false,
        strGruContWhatsApp: "",
        bGruContWhatsApp: false,
        bGruContWhatsAppMasRepre: false,
        strInstaGram: "",
        bInstaGram: false,
        bInstaGramMasRepre: false,
        strFaceBook: "",
        bFaceBook: false,
        bFaceBookMasRepre: false,
        strYouTube: "",
        bYouTube: false,
        bYouTubeMasRepre: false,
        strPagWebBlog: "",
        bPagWebBlog: false,
        bPagWebBlogMasRepre: false,
        strOtrosCualEs: "",
        bOtrosCualEs: false,
        bOtrosCualEsMasRepre: false,
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strVendeRepreComer: values.strVendeRepreComer || "",
                bVendeRepreComer: values.bVendeRepreComer || false,
                bVendeRepreComerMasRepre: values.bVendeRepreComerMasRepre || false,
                strFerias: values.strFerias || "",
                bFerias: values.bFerias || false,
                bFeriasMasRepre: values.bFeriasMasRepre || false,
                strMultMarcas: values.strMultMarcas || "",
                bMultMarcas: values.bMultMarcas || false,
                bMultMarcasMasRepre: values.bMultMarcasMasRepre || false,
                strVentPersonali: values.strVentPersonali || "",
                bVentPersonali: values.bVentPersonali || false,
                bVentPersonaliMasRepre: values.bVentPersonaliMasRepre || false,
                strVozVozRef: values.strVozVozRef || "",
                bVozVozRef: values.bVozVozRef || false,
                bVozVozRefMasRepre: values.bVozVozRefMasRepre || false,
                strVentDireVivi: values.strVentDireVivi || "",
                bVentDireVivi: values.bVentDireVivi || false,
                bVentDireViviMasRepre: values.bVentDireViviMasRepre || false,
                strVentPunVentPro: values.strVentPunVentPro || "",
                bVentPunVentPro: values.bVentPunVentPro || false,
                bVentPunVentProMasRepre: values.bVentPunVentProMasRepre || false,
                strVentPorMay: values.strVentPorMay || "",
                bVentPorMay: values.bVentPorMay || false,
                bVentPorMayMasRepre: values.bVentPorMayMasRepre || false,
                strExportaciones: values.strExportaciones || "",
                bExportaciones: values.bExportaciones || false,
                bExportacionesMasRepre: values.bExportacionesMasRepre || false,
                strVentPorCatalog: values.strVentPorCatalog || "",
                bVentPorCatalog: values.bVentPorCatalog || false,
                bVentPorCatalogMasRepre: values.bVentPorCatalogMasRepre || false,
                strPlataComerElec: values.strPlataComerElec || "",
                bPlataComerElec: values.bPlataComerElec || false,
                bPlataComerElecMasRepre: values.bPlataComerElecMasRepre || false,
                strGruContWhatsApp: values.strGruContWhatsApp || "",
                bGruContWhatsApp: values.strListDeProd || false,
                bGruContWhatsAppMasRepre: values.bGruContWhatsAppMasRepre || false,
                strInstaGram: values.strInstaGram || "",
                bInstaGram: values.bInstaGram || false,
                bInstaGramMasRepre: values.bInstaGramMasRepre || false,
                strFaceBook: values.strFaceBook || "",
                bFaceBook: values.bFaceBook || false,
                bFaceBookMasRepre: values.bFaceBookMasRepre || false,
                strYouTube: values.strYouTube || "",
                bYouTube: values.bYouTube || false,
                bYouTubeMasRepre: values.bYouTubeMasRepre || false,
                strPagWebBlog: values.strPagWebBlog || "",
                bPagWebBlog: values.bPagWebBlog || false,
                bPagWebBlogMasRepre: values.bPagWebBlogMasRepre || false,
                strOtrosCualEs: values.strOtrosCualEs || "",
                bOtrosCualEs: values.bOtrosCualEs || false,
                bOtrosCualEsMasRepre: values.bOtrosCualEsMasRepre || false,
            });
        }

        setLoading(false);
    }, [values]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={30} />
            </Box>
        );
    }

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                        }}
                    >
                        Información Canales de Venta
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()} size="large">
                        <Tooltip
                            title={
                                openCollapese ? "Contraer detalle" : "Expandir detalle"
                            }
                        >
                            {openCollapese ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2} sx={{ marginTop: "0px" }}>
                    <Grid sx={{ display: "flex", alignItems: "flex-end" }} item xs={6} md={9}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                            }}
                        >
                            ¿Qué formas y canales utiliza para vender o promocionar su producto o servicio?
                        </Typography>
                    </Grid>

                    <Grid sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }} item xs={2} md={1}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                            }}
                        >
                            SI/NO
                        </Typography>
                    </Grid>


                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                                marginBottom: "10px",
                            }}
                        >
                            Indique con una X - ¿Cúal es el canal de ventas más representativo?
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Vendedores (Representates comerciales)
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVendeRepreComer"
                            defaultValue={data.strVendeRepreComer}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVendeRepreComer
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVendeRepreComer"
                            defaultValue={data.bVendeRepreComer}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVendeRepreComer
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVendeRepreComerMasRepre"
                            defaultValue={data.bVendeRepreComerMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVendeRepreComerMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Ferias
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strFerias"
                            defaultValue={data.strFerias}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strFerias
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bFerias"
                            defaultValue={data.bFerias}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bFerias
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bFeriasMasRepre"
                            defaultValue={data.bFeriasMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bFeriasMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Multimarcas
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strMultMarcas"
                            defaultValue={data.strMultMarcas}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strMultMarcas
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bMultMarcas"
                            defaultValue={data.bMultMarcas}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bMultMarcas
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bMultMarcasMasRepre"
                            defaultValue={data.bMultMarcasMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bMultMarcasMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Ventas personalizadas
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVentPersonali"
                            defaultValue={data.strVentPersonali}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVentPersonali
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVentPersonali"
                            defaultValue={data.bVentPersonali}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPersonali
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVentPersonaliMasRepre"
                            defaultValue={data.bVentPersonaliMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPersonaliMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Voz a Voz o referidos
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVozVozRef"
                            defaultValue={data.strVozVozRef}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVozVozRef
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVozVozRef"
                            defaultValue={data.bVozVozRef}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVozVozRef
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVozVozRefMasRepre"
                            defaultValue={data.bVozVozRefMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVozVozRefMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Venta directa en la vivienda
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVentDireVivi"
                            defaultValue={data.strVentDireVivi}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVentDireVivi
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVentDireVivi"
                            defaultValue={data.bVentDireVivi}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentDireVivi
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVentDireViviMasRepre"
                            defaultValue={data.bVentDireViviMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentDireViviMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Venta punto de venta propio
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVentPunVentPro"
                            defaultValue={data.strVentPunVentPro}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVentPunVentPro
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVentPunVentPro"
                            defaultValue={data.bVentPunVentPro}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPunVentPro
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVentPunVentProMasRepre"
                            defaultValue={data.bVentPunVentProMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPunVentProMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Venta al por mayor
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVentPorMay"
                            defaultValue={data.strVentPorMay}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVentPorMay
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVentPorMay"
                            defaultValue={data.bVentPorMay}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPorMay
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVentPorMayMasRepre"
                            defaultValue={data.bVentPorMayMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPorMayMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Exportaciones
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strExportaciones"
                            defaultValue={data.strExportaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strExportaciones
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bExportaciones"
                            defaultValue={data.bExportaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bExportaciones
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bExportacionesMasRepre"
                            defaultValue={data.bExportacionesMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bExportacionesMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Venta por catálogo
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strVentPorCatalog"
                            defaultValue={data.strVentPorCatalog}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strVentPorCatalog
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bVentPorCatalog"
                            defaultValue={data.bVentPorCatalog}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPorCatalog
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bVentPorCatalogMasRepre"
                            defaultValue={data.bVentPorCatalogMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bVentPorCatalogMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Plataformas comercio electrónico (e-commerce)
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strPlataComerElec"
                            defaultValue={data.strPlataComerElec}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strPlataComerElec
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bPlataComerElec"
                            defaultValue={data.bPlataComerElec}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bPlataComerElec
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bPlataComerElecMasRepre"
                            defaultValue={data.bPlataComerElecMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bPlataComerElecMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2} sx={{ marginTop: "10px" }}>
                    <Grid sx={{ display: "flex", alignItems: "flex-end" }} item xs={6} md={9}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                            }}
                        >
                            Medios Digitales
                        </Typography>
                    </Grid>

                    <Grid sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }} item xs={2} md={1}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                            }}
                        >
                            SI/NO
                        </Typography>
                    </Grid>


                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoCanalVenta ? "#D33030" : "inherit",
                                marginBottom: "10px",
                            }}
                        >
                            Indique con una X - ¿Cúal es el canal de ventas más representativo?
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Grupos o contactos WhatsApp
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strGruContWhatsApp"
                            defaultValue={data.strGruContWhatsApp}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strGruContWhatsApp
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bGruContWhatsApp"
                            defaultValue={data.bGruContWhatsApp}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bGruContWhatsApp
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bGruContWhatsAppMasRepre"
                            defaultValue={data.bGruContWhatsAppMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bGruContWhatsAppMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Instagram
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strInstaGram"
                            defaultValue={data.strInstaGram}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strInstaGram
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bInstaGram"
                            defaultValue={data.bInstaGram}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bInstaGram
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bInstaGramMasRepre"
                            defaultValue={data.bInstaGramMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bInstaGramMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Facebook
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strFaceBook"
                            defaultValue={data.strFaceBook}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strFaceBook
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bFaceBook"
                            defaultValue={data.bFaceBook}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bFaceBook
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bFaceBookMasRepre"
                            defaultValue={data.bFaceBookMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bFaceBookMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Youtube
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strYouTube"
                            defaultValue={data.strYouTube}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strYouTube
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bYouTube"
                            defaultValue={data.bYouTube}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bYouTube
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bYouTubeMasRepre"
                            defaultValue={data.bYouTubeMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bYouTubeMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Página Web/Blog
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strPagWebBlog"
                            defaultValue={data.strPagWebBlog}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strPagWebBlog
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bPagWebBlog"
                            defaultValue={data.bPagWebBlog}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bPagWebBlog
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bPagWebBlogMasRepre"
                            defaultValue={data.bPagWebBlogMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bPagWebBlogMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid container direction="row" spacing={2}>
                    <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "flex-end",
                            marginTop: "20px",
                        }} item xs={6} md={6}>
                        <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                        >
                            Otros ¿Cuál/es?
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} />

                    <Grid item xs={6} md={9}>
                        <Controller
                            name="objInfoCanalVenta.strOtrosCualEs"
                            defaultValue={data.strOtrosCualEs}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.strOtrosCualEs
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={2} md={1}>
                        <Controller
                            name="objInfoCanalVenta.bOtrosCualEs"
                            defaultValue={data.bOtrosCualEs}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bOtrosCualEs
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid sx={{ textAlign: "center" }} item xs={4} md={2}>
                        <Controller
                            name="objInfoCanalVenta.bOtrosCualEsMasRepre"
                            defaultValue={data.bOtrosCualEsMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoCanalVenta
                                            ?.bOtrosCualEsMasRepre
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoCanalVenta;
