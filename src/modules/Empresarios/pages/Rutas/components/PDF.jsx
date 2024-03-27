import React, { useState, useEffect } from "react";

import Html from "react-pdf-html";

import {
    PDFViewer,
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    Font,
    View,
} from "@react-pdf/renderer";

import { Box, CircularProgress } from "@mui/material";

import bg1Img from "../../../../../static/img/rutas/bg1.png";
import bg2Img from "../../../../../static/img/rutas/bg2.png";
import bg3Img from "../../../../../static/img/rutas/bg3.png";
import bg4Img from "../../../../../static/img/rutas/bg4.png";
import bg5Img from "../../../../../static/img/rutas/bg5.png";
import bg6Img from "../../../../../static/img/rutas/bg6.png";
import bg7Img from "../../../../../static/img/rutas/bg7.png";
import logoHeader from "../../../../../static/img/rutas/logoPropuesta.png";
import useGetEmpresarios from "../../../hooks/useGetEmpresarios";
import useGetRutas from "../../../hooks/useGetRutas";

// Register Font
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-thin-webfont.ttf",
            fontStyle: "normal",
            fontWeight: "thin",
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
            fontStyle: "normal",
            fontWeight: "normal",
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
            fontStyle: "italic",
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
            fontStyle: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        fontFamily: "Roboto",
    },
    BGImg: {
        width: "100vw",
        height: "99.9vh",
    },
    BG1Title: {
        textAlign: "center",
        position: "absolute",
        fontSize: "25px",
        fontWeight: 100,
        color: "#fff",
        top: "180",
        left: "540",
        width: "300px",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG1Desc1: {
        textAlign: "center",
        position: "absolute",
        fontSize: "18px",
        fontWeight: 100,
        top: "390",
        left: "490",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG1Desc2: {
        textAlign: "center",
        position: "absolute",
        fontSize: "18px",
        fontWeight: 100,
        top: "420",
        left: "490",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG1Desc3: {
        textAlign: "center",
        position: "absolute",
        fontSize: "18px",
        fontWeight: 100,
        top: "450",
        left: "490",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG1Desc4: {
        textAlign: "center",
        position: "absolute",
        fontSize: "18px",
        fontWeight: 100,
        top: "480",
        left: "490",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG1Desc5: {
        textAlign: "center",
        position: "absolute",
        fontSize: "18px",
        fontWeight: 100,
        top: "510",
        left: "490",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG2Title: {
        textAlign: "center",
        position: "absolute",
        fontSize: "42px",
        fontWeight: 100,
        color: "#fff",
        top: "50",
        left: "10",
        width: "400px",
        bottom: "0",
        fontFamily: "Roboto",
    },
    BG2Desc1: {
        position: "absolute",
        fontSize: "12px",
        fontWeight: 100,
        top: "200",
        left: "50",
        bottom: "0",
        width: "350px",
        lineHeight: 2,
        fontFamily: "Roboto",
    },
    logoHeader: {
        width: "100vw",
    },
});

const PDFProduct = ({ intIdIdea, intId }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);
    const [objPersona, setObjPersona] = useState();
    const [objInfoEmpresa, setObjInfoEmpresa] = useState();
    const [objInfoPrincipal, setObjInfoPrincipal] = useState();
    const [dataFases, setDataFases] = useState();
    console.log(intId);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data: dataEmpr } = useGetEmpresarios({
        autoload: true,
        intId: intIdIdea,
    });

    const { data: values } = useGetRutas({ autoLoad: true, intIdIdea, intId });

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values && dataEmpr) {
            const { objInfoPrincipal } = values[0];
            const { objEmpresario } = dataEmpr.at(0);
            const objPersona = objEmpresario.find(
                (p) => p.strTipoEmpresario === "Principal"
            );

            const { objInfoEmpresa } = dataEmpr.at(0);

            const arrDataFases = [];

            for (let i = 0; i < values[0].arrInfoFases.length; i++) {
                const arrPaqueteServ = [];
                const { arrPaquetes, arrServicios } = values[0].arrInfoFases[i];

                for (let j = 0; j < arrPaquetes?.length; j++) {
                    const {
                        objPaquete,
                        intDuracionHorasTotalPaquete,
                        // arrObjetivos,
                    } = arrPaquetes[j];

                    let htmlResultado = "";

                    if (objPaquete) {
                        const { objInfoPrincipal } = objPaquete;

                        if (
                            objInfoPrincipal?.arrServicios &&
                            objInfoPrincipal?.arrServicios.length > 0
                        ) {
                            htmlResultado = "<ol>";

                            for (let k = 0; k < arrServicios?.length; k++) {
                                const { arrModulos } = arrServicios[k];

                                // eslint-disable-next-line no-loop-func
                                arrModulos?.forEach((modulo) => {
                                    htmlResultado += `<li>${modulo.strEntregables}</li>`;
                                });
                            }

                            htmlResultado += "</ol>";
                        }
                    }

                    // arrObjetivos?.forEach((o) => {
                    //     htmlResultado = htmlResultado + "\n" + o.strNombre;
                    // });

                    const dataTable = {
                        strComp: objPaquete?.objInfoPrincipal?.strNombre,
                        intDuracion: `${intDuracionHorasTotalPaquete} horas`,
                        intDuracionValue: intDuracionHorasTotalPaquete,
                        strResultado: htmlResultado,
                    };

                    arrPaqueteServ.push(dataTable);
                }

                for (let j = 0; j < arrServicios?.length; j++) {
                    const {
                        objServicio,
                        intDuracionHorasTotalServicio,
                        // arrObjetivos,
                        ValorTotalServicio,
                    } = arrServicios[j];

                    if (ValorTotalServicio) {
                        let htmlResultado = "<ol>";

                        // arrObjetivos?.forEach((o) => {
                        //     htmlResultado += `<li>${o.strNombre}</li>`;
                        // });

                        objServicio?.arrModulos?.forEach((modulo) => {
                            htmlResultado += `<li>${modulo.strEntregables}</li>`;
                        });

                        htmlResultado += "</ol>";

                        const dataTable = {
                            strComp: objServicio?.objInfoPrincipal?.strNombre,
                            intDuracion: `${intDuracionHorasTotalServicio} horas`,
                            intDuracionValue: intDuracionHorasTotalServicio,
                            strResultado: htmlResultado,
                        };

                        arrPaqueteServ.push(dataTable);
                    }
                }

                const intTotalHoras = arrPaqueteServ.reduce((cont, value) => {
                    return cont + value.intDuracionValue;
                }, 0);

                const htmlTable1 = `
                <div>
                    <p class="title">
                       Fase ${i + 1}: ${values[0].arrInfoFases[i].strNombre}
                    </p>
                </div>

                <table style="padding-right: 100px; padding-left: 100px">
                   <tr>
                      <th>Componente</th>
                      <th>Duración</th>
                      <th>Entregables</th>
                   </tr>

                   ${arrPaqueteServ
                       .map(
                           (e) => `<tr>
                       <td>${e.strComp}</td>
                       <td>${e.intDuracion}</td>
                       <td>${e.strResultado || "Sin entregables"}</td>
                   </tr>
                   `
                       )
                       .join("")}
                </table>
                `;

                arrDataFases[i] = {
                    intTotalHoras,
                    htmlTable1,
                    dblValorFase: new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "COP",
                    })
                        .format(values[0].arrInfoFases[i].dblValorFase)
                        .toString(),
                };
            }

            setObjPersona(objPersona);
            setObjInfoEmpresa(objInfoEmpresa);
            setObjInfoPrincipal(objInfoPrincipal);
            setDataFases(arrDataFases);

            setLoading(false);
        }
    }, [values, dataEmpr]);

    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    width: "100wh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <PDFViewer width="100%" height="100%">
            <Document
                title={`Propuesta ruta - ${objPersona.strNroDocto} - ${objInfoEmpresa.strNombreMarca}`}
            >
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg1Img} style={styles.BGImg} />

                    <Text style={styles.BG1Title}>{objPersona.strNombres}</Text>
                    <Text style={styles.BG1Desc1}>
                        Empresa: {objInfoEmpresa.strNombreMarca}
                    </Text>
                    <Text style={styles.BG1Desc2}>
                        Asesor: {objInfoPrincipal.strResponsable.strNombre}
                    </Text>
                    <Text style={styles.BG1Desc3}>
                        Correo: {objInfoPrincipal.strResponsable.strEmail}
                    </Text>
                    <Text style={styles.BG1Desc4}>
                        Fecha:{" "}
                        {
                            new Date(objInfoPrincipal.dtmCreacion)
                                .toISOString()
                                .split("T")[0]
                        }
                    </Text>
                    <Text style={styles.BG1Desc5}>Vigencia: 3 meses</Text>
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg2Img} style={styles.BGImg} />
                    <Text style={styles.BG2Title}>
                        ¡Hola {objPersona.strNombres}!
                    </Text>
                    <Text style={styles.BG2Desc1}>
                        Soy {objInfoPrincipal.strResponsable.strNombre}, tu
                        asesor De Mis Manos.{"\n"}
                        {"\n"}
                        He tenido la oportunidad de conocer tu empresa, tus
                        sueños y necesidades. {"\n"}
                        {"\n"}A partir de ellos, he diseñado una propuesta de
                        acompañamiento especialmente para ti. Si la aceptas, con
                        seguridad avanzaremos en la transformación exitosa de tu
                        empresa y tu vida.{"\n"}
                        {"\n"} Te invito a leer la información que te presento a
                        continuación y si tienes alguna duda, llámame para
                        brindarte una oportuna asesoría e iniciar pronto este
                        maravilloso proceso.{"\n"}
                        {"\n"} ¡Espero te animes a dar este gran paso! Saludos.
                    </Text>
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <View>
                        <Image src={logoHeader} style={styles.logoHeader} />
                    </View>
                    <Html>
                        {`  <html>
                        <style>
                           hr {
                            border: 1px solid gray;
                            border-radius: 1px;
                            margin: 15px;
                           }

                           .pMargin {
                              margin-bottom: -10px;
                           }

                           .textObj {
                             margin: 2px;
                             font-size: 11px;
                             display: flex;
                             align-content: center;
                             font-family: Roboto;
                             color: #505050;
                           }

                           .title {
                            font-size: 20px;
                            font-weight: bold;
                            margin: 10px;
                            color: #F5B335;
                            text-align: center;
                            font-family: Roboto;
                           }

                           table {
                            font-size: 12px;
                            border-collapse: collapse;
                            width: 100%;
                            font-family: Roboto;
                            color: #505050;
                          }
                          
                          td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 5px;
                          }

                          tr:nth-child(even) {
                            background-color: #dddddd;
                          }

                          th {
                            padding-top: 12px;
                            padding-bottom: 12px;
                            text-align: center;
                            background-color: #00BBB4;
                            color: white;
                          }

                          tr:nth-child(even){background-color: #f2f2f2; text-align: left;}
                        </style>
                        <body>
                        ${dataFases.map(
                            (e) => `
                        <div>
                            ${e.htmlTable1}
                           <div style="padding-right: 100px; padding-left: 100px;">
                             <div><span style="color: #1ccbc4; font-size: 12px !important;">Total horas de acompañamiento: </span>
                                <span style="font-size: 12px !important;">${e.intTotalHoras} horas</span>
                             </div>
                             <div><span style="color: #1ccbc4; font-size: 12px !important;">Valor total: </span>
                                <span style="font-size: 12px !important;">$${e.dblValorFase}</span>
                             </div>                                 
                           </div>
                        </div>`
                        )}
                         
                        
                        <div>
                        <div style="padding-right: 100px; padding-left: 100px;">
                            <div><span style="color: #1ccbc4; font-size: 12px !important;">Valor total de la Ruta: </span>
                                 <span style="font-size: 12px !important;">$${new Intl.NumberFormat(
                                     "es-ES",
                                     {
                                         style: "currency",
                                         currency: "COP",
                                     }
                                 )
                                     .format(
                                         values[0].objInfoPrincipal
                                             ?.valorTotalRuta
                                     )
                                     .toString()}</span>
                            </div>   
                        </div>
                            
                        </div>
                        </body>
                        </html>
                        `}
                    </Html>
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg3Img} style={styles.BGImg} />
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg4Img} style={styles.BGImg} />
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg5Img} style={styles.BGImg} />
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg6Img} style={styles.BGImg} />
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Image src={bg7Img} style={styles.BGImg} />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFProduct;
