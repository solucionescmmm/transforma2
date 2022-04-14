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
                            color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                    borderColor: errors?.objInfoProdServi ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2} sx={{ marginTop: "0px" }}>
                    <Grid sx={{ display: "flex", alignItems: "flex-end" }} item xs={6} md={9}>
                        <Typography
                            variant="caption"
                            style={{
                                fontWeight: "bold",
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                            name="objInfoProdServi.strVendeRepreComer"
                            defaultValue={data.strVendeRepreComer}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVendeRepreComer"
                            defaultValue={data.bVendeRepreComer}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVendeRepreComerMasRepre"
                            defaultValue={data.bVendeRepreComerMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strFerias"
                            defaultValue={data.strFerias}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bFerias"
                            defaultValue={data.bFerias}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bFeriasMasRepre"
                            defaultValue={data.bFeriasMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strMultMarcas"
                            defaultValue={data.strMultMarcas}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bMultMarcas"
                            defaultValue={data.bMultMarcas}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bMultMarcasMasRepre"
                            defaultValue={data.bMultMarcasMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVentPersonali"
                            defaultValue={data.strVentPersonali}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPersonali"
                            defaultValue={data.bVentPersonali}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPersonaliMasRepre"
                            defaultValue={data.bVentPersonaliMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVozVozRef"
                            defaultValue={data.strVozVozRef}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVozVozRef"
                            defaultValue={data.bVozVozRef}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVozVozRefMasRepre"
                            defaultValue={data.bVozVozRefMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVentDireVivi"
                            defaultValue={data.strVentDireVivi}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentDireVivi"
                            defaultValue={data.bVentDireVivi}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentDireViviMasRepre"
                            defaultValue={data.bVentDireViviMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVentPunVentPro"
                            defaultValue={data.strVentPunVentPro}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPunVentPro"
                            defaultValue={data.bVentPunVentPro}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPunVentProMasRepre"
                            defaultValue={data.bVentPunVentProMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVentPorMay"
                            defaultValue={data.strVentPorMay}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPorMay"
                            defaultValue={data.bVentPorMay}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPorMayMasRepre"
                            defaultValue={data.bVentPorMayMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strExportaciones"
                            defaultValue={data.strExportaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bExportaciones"
                            defaultValue={data.bExportaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bExportacionesMasRepre"
                            defaultValue={data.bExportacionesMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strVentPorCatalog"
                            defaultValue={data.strVentPorCatalog}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPorCatalog"
                            defaultValue={data.bVentPorCatalog}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bVentPorCatalogMasRepre"
                            defaultValue={data.bVentPorCatalogMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strPlataComerElec"
                            defaultValue={data.strPlataComerElec}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bPlataComerElec"
                            defaultValue={data.bPlataComerElec}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bPlataComerElecMasRepre"
                            defaultValue={data.bPlataComerElecMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                                color: errors?.objInfoProdServi ? "#D33030" : "inherit",
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
                            name="objInfoProdServi.strGruContWhatsApp"
                            defaultValue={data.strGruContWhatsApp}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bGruContWhatsApp"
                            defaultValue={data.bGruContWhatsApp}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bGruContWhatsAppMasRepre"
                            defaultValue={data.bGruContWhatsAppMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strInstaGram"
                            defaultValue={data.strInstaGram}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bInstaGram"
                            defaultValue={data.bInstaGram}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bInstaGramMasRepre"
                            defaultValue={data.bInstaGramMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strFaceBook"
                            defaultValue={data.strFaceBook}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bFaceBook"
                            defaultValue={data.bFaceBook}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bFaceBookMasRepre"
                            defaultValue={data.bFaceBookMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strYouTube"
                            defaultValue={data.strYouTube}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bYouTube"
                            defaultValue={data.bYouTube}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bYouTubeMasRepre"
                            defaultValue={data.bYouTubeMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strPagWebBlog"
                            defaultValue={data.strPagWebBlog}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bPagWebBlog"
                            defaultValue={data.bPagWebBlog}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bPagWebBlogMasRepre"
                            defaultValue={data.bPagWebBlogMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.strOtrosCualEs"
                            defaultValue={data.strOtrosCualEs}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="ID"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bOtrosCualEs"
                            defaultValue={data.bOtrosCualEs}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
                            name="objInfoProdServi.bOtrosCualEsMasRepre"
                            defaultValue={data.bOtrosCualEsMasRepre}
                            render={({ field: { name, onChange, value } }) => (
                                <Checkbox
                                    name={name}
                                    disabled={disabled}
                                    checked={value}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoProdServi
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
