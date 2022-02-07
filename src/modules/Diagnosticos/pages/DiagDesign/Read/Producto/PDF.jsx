import React, { useState, useEffect } from "react";

import Html from "react-pdf-html";

import {
    PDFViewer,
    Page,
    Text,
    Image,
    Document,
    Font,
    StyleSheet,
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
});

const PDFProduct = ({ intId, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);

    const [objEmpresario, setObjEmpresario] = useState();
    const [objEmpresa, setObjEmpresa] = useState();
    const [htmlInfoProductos, setHtmlInfoProductos] = useState("");
    const [htmlTemasFortalecer, setHtmlTemasFortalecer] = useState("");
    const [htmlFortalezas, setHtmlFortalezas] = useState("");
    const [htmlConclusiones, setHtmlConclusiones] = useState("");

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetEmpresarios({ autoload: true, intId });

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoading(true);

        if (data && data.length > 0) {
            setObjEmpresario(data[0]?.objEmpresario);
            setObjEmpresa(data[0]?.objInfoEmpresa);
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        setLoading(true);

        let htmlProductos = "";
        let htmlTemasFortalecer = "";
        let htmlFortalezas = "";
        let htmlConclusiones = values?.strConclusiones ? `<p class="textObj">${values.strConclusiones}</p>` : ""

        values?.objInfoProductos.forEach(
            (e) =>
                (htmlProductos =
                    htmlProductos +
                    `<p class="textObj">
                ${e.label}: ${e.value || "No diligenciado"}
            </p>`)
        );

        values?.objInfoTemasFortalecer.forEach((e) => {
            if (e.objInnovacionFortalecer) {
                htmlTemasFortalecer =
                    htmlTemasFortalecer +
                    ` 
                        <div>
                            <p class="title">
                                Innovación
                            </p>
                        </div>

                        <table>
                            <tr>
                                <th>Item</th>
                                <th>Respuesta</th>
                                <th>Nivel</th>
                                <th>Detalle</th>
                            </tr>

                        ${e.objInnovacionFortalecer
                            .map(
                                (e) => `
                            <tr>
                                <td>${e.label}</td>
                                <td>${e.value || "No diligenciado"}</td>
                                <td>${e.nivel || "No diligenciado"}</td>
                                <td>${e.detalle || ""}</td>
                            </tr>
                            `
                            )
                            .join("")}
                        </table>`;
            }

            if (e.objPersepcionFortalecer) {
                htmlTemasFortalecer =
                    htmlTemasFortalecer +
                    ` 
                    <div>
                        <p class="title">
                        Percepción y calidad
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objPersepcionFortalecer
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objEsteticaFortalecer) {
                htmlTemasFortalecer =
                    htmlTemasFortalecer +
                    ` 
                    <div>
                        <p class="title">
                        Estética
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objEsteticaFortalecer
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objExperienciaFortalecer) {
                htmlTemasFortalecer =
                    htmlTemasFortalecer +
                    ` 
                    <div>
                        <p class="title">
                        Experiencia
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objExperienciaFortalecer
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objMarcaFortalecer) {
                htmlTemasFortalecer =
                    htmlTemasFortalecer +
                    ` 
                    <div>
                        <p class="title">
                        Marca
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objMarcaFortalecer
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }
        });

        values?.objInfoFortalezas.forEach((e) => {
            if (e.objInnovacionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                        <div>
                            <p class="title">
                                Innovación
                            </p>
                        </div>

                        <table>
                            <tr>
                                <th>Item</th>
                                <th>Respuesta</th>
                                <th>Nivel</th>
                                <th>Detalle</th>
                            </tr>

                        ${e.objInnovacionFortalezas
                            .map(
                                (e) => `
                            <tr>
                                <td>${e.label}</td>
                                <td>${e.value || "No diligenciado"}</td>
                                <td>${e.nivel || "No diligenciado"}</td>
                                <td>${e.detalle || ""}</td>
                            </tr>
                            `
                            )
                            .join("")}
                        </table>`;
            }

            if (e.objPersepcionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    <div>
                        <p class="title">
                        Percepción y calidad
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objPersepcionFortalezas
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objEsteticaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    <div>
                        <p class="title">
                        Estética
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objEsteticaFortalezas
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objExperienciaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    <div>
                        <p class="title">
                        Experiencia
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objExperienciaFortalezas
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }

            if (e.objMarcaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    <div>
                        <p class="title">
                        Marca
                        </p>
                    </div>

                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Respuesta</th>
                            <th>Nivel</th>
                            <th>Detalle</th>
                        </tr>

                    ${e.objMarcaFortalezas
                        .map(
                            (e) => `
                        <tr>
                            <td>${e.label}</td>
                            <td>${e.value || "No diligenciado"}</td>
                            <td>${e.nivel || "No diligenciado"}</td>
                            <td>${e.detalle || ""}</td>
                        </tr>
                           
                       
                        `
                        )
                        .join("")}
                    </table>`;
            }
        });

        setHtmlTemasFortalecer(htmlTemasFortalecer);
        setHtmlInfoProductos(htmlProductos);
        setHtmlFortalezas(htmlFortalezas);
        setHtmlConclusiones(htmlConclusiones);

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
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

                    <Text style={styles.title}>
                        Reporte diagnóstico de producto
                    </Text>

                    <Html>
                        {`
                        <html>
                        <style>
                           p {
                               font-size: 12px;
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

                            <h5 class="pMargin"> <span style="color: #00BBB4">Productos evaluados en el diagnóstico </span></h5>
                            <hr />

                            ${htmlInfoProductos}

                            <h5 class="pMargin"> <span style="color: #00BBB4">Temas a fortalecer</span></h5>
                            <hr />

                            ${
                                htmlTemasFortalecer &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Temas a fortalecer</span></h5>
                            <hr />
                            `
                            }

                            ${htmlTemasFortalecer}

                            ${
                                htmlFortalezas &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Fortalezas</span></h5>
                            <hr />
                            `
                            }

                            ${htmlFortalezas}

                            ${
                                htmlConclusiones &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Conclusiones</span></h5>
                            <hr />
                            `
                            }

                            ${htmlConclusiones}

                        </body>
                        </html>
                      `}
                    </Html>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFProduct;
