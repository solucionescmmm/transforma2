import React, { useState, useEffect } from "react";

import Html from "react-pdf-html";

import {
    PDFViewer,
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";

import { Box, CircularProgress } from "@mui/material";

import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";

// Register Font
Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: "Roboto",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    image: {
        marginVertical: 10,
        marginHorizontal: 210,
        width: "120px",
    },
    title: {
        textAlign: "center",
        fontSize: "14px",
        color: "#00BBB4",
    },
    footerTitle: {
        textAlign: "center",
        fontSize: "10px",
        color: "#00BBB4",
        marginTop: "55px",
    },
    footerContact: {
        textAlign: "center",
        fontSize: "10px",
        color: "#F5B335",
        marginTop: "10px",
    },
    footerPhoneEmail: {
        textAlign: "center",
        fontSize: "10px",
        color: "#F5B335",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 8,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

const PDFProduct = ({ intId, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);

    const [objEmpresario, setObjEmpresario] = useState();
    const [objEmpresa, setObjEmpresa] = useState();
    const [htmlInfoEncuestaHumanas, setHtmlInfoEncuestaHumanas] = useState("");

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetEmpresarios({ autoload: true, intId });

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (data && data.length > 0) {
            setObjEmpresario(
                data[0]?.objEmpresario?.find(
                    (e) => e.strTipoEmpresario === "Principal"
                )
            );
            setObjEmpresa(data[0]?.objInfoEmpresa);
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        setLoading(true);

        let htmlCompetencias = "";

        if(values?.objInfoEncuestaHumanas) {
            htmlCompetencias = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoEncuestaHumanas
                   .map(
                       (e) => `<tr>
                   <td>${e.label}</td>
                   <td>${e.value}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        // values?.objInfoEncuestaHumanas.forEach(
        //     (e) =>
        //         (htmlCompetencias =
        //             htmlCompetencias +
        //             `<p class="textObj">
        //         ${e.label}: ${e.value || "No diligenciado"}
        //     </p>`)
        // );


        setHtmlInfoEncuestaHumanas(htmlCompetencias);

        setLoading(true);
    }, [values]);

    if (loading || !data) {
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
            <Document title={`Diagnostico de competencias humanas - ${objEmpresario.strNroDocto} - ${objEmpresa.strNombreMarca}`}>
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

                    {/* <Text style={styles.title}>
                        Reporte diagnóstico de competencias humanas
                    </Text> */}

                    <Html>
                        {`
                        <html>
                        <style>
                           hr {
                            border: 1px solid gray;
                            border-radius: 1px;
                           }

                           p {
                               font-size: 11px;
                           }

                           .pMargin {
                              margin-bottom: -10px;
                           }

                           .textObj {
                             margin: 2px;
                             font-size: 11px;
                             display: flex;
                             align-content: center;
                           }

                           .title{
                            font-size: 14px;
                            font-weight: bold;
                            color: #F5B335;
                            margin: 10px;
                           }

                           table {
                            font-size: 8px;
                            border-collapse: collapse;
                            width: 100%;

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
                        <h5 class="pMargin"> <span style="color: #00BBB4">Información General</span></h5>
                        <hr />

                            <p class="pMargin">
                                <span style="color: #00BBB4">${
                                    objEmpresario?.strTipoDocto
                                }: </span>
                                ${objEmpresario?.strNroDocto}
                            </p>

                            <p class="pMargin">
                                <span style="color: #00BBB4">Nombre: </span>
                                 ${objEmpresario?.strNombres}  ${
                            objEmpresario?.strApellidos
                        }
                            </p>

                            <p class="pMargin">
                                <span style="color: #00BBB4">Empresa: </span>
                                 ${objEmpresa?.strNombreMarca} 
                            </p>

                            <p>
                                <span style="color: #00BBB4">Fecha de descarga: </span>
                                 ${new Date().toLocaleDateString("es-ES")} 
                            </p>

                            <h5 class="pMargin"> <span style="color: #00BBB4">Competencias Humanas </span></h5>
                            <hr />

                            ${htmlInfoEncuestaHumanas}
 
                        </body>
                        </html>
                      `}
                    </Html>

                    <Text style={styles.footerTitle}>
                        Promovemos la transformación de personas emprendedoras y
                        empresarias en Colombia, mediante asesoría, formación y
                        gestión de oportunidades.
                    </Text>

                    <Text style={styles.footerContact}>Contacto</Text>

                    <Text style={styles.footerContact}>
                        Email: comunicaciones@cmmmedellin.org
                    </Text>

                    <Text style={styles.footerPhoneEmail}>
                        Teléfono: 318 656 65 08
                    </Text>

                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFProduct;
