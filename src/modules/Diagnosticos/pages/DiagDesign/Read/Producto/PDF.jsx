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
import useGetDataPDFProduct from "../../../../hooks/useGetDataPDFProduct";

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
        fontFamily: "Roboto",
    },
    footerTitle: {
        textAlign: "center",
        fontSize: "10px",
        color: "#00BBB4",
        marginTop: "55px",
        fontFamily: "Roboto",
    },
    footerContact: {
        textAlign: "center",
        fontSize: "10px",
        color: "#F5B335",
        marginTop: "10px",
        fontFamily: "Roboto",
    },
    footerPhoneEmail: {
        textAlign: "center",
        fontSize: "10px",
        color: "#F5B335",
        fontFamily: "Roboto",
    },
    pPDFSpan: {
        fontWeight: 400,
        fontFamily: "Roboto",
    },
    pPDF: {
        fontSize: "10px",
        marginBottom: "-15px",
        fontFamily: "Roboto",
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
    images: {
        width: "100px",
    },
});

const PDFProduct = ({ intId, values, intIdDiagnostico }) => {
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
    const [htmlNormatividad, setHtmlNormatividad] = useState("");
    const [arrImagenes, setArrImagenes] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetEmpresarios({ autoload: true, intIdIdea: intId });
    const { data: valuesPDF } = useGetDataPDFProduct({
        autoload: true,
        intIdIdea: intId,
        intIdDiagnostico,
    });

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
        }
    }, [data]);

    useEffect(() => {
        let htmlProductos = "";
        let htmlTemasFortalecer = "";
        let htmlFortalezas = "";
        let htmlConclusiones = values?.strConclusiones
            ? `<p class="textObj">${values.strConclusiones}</p>`
            : "";

        let htmlNormatividad = "";

        values?.objInfoNormatividad.forEach(
            (e) =>
                (htmlNormatividad =
                    htmlNormatividad +
                    `<p class="textObj">
            ${e.label}: ${e.value || "No diligenciado"}
        </p>`)
        );

        values?.objInfoProductos.forEach(
            (e) =>
                (htmlProductos =
                    htmlProductos +
                    `<p class="textObj">
                ${e.label}: ${e.value || "No diligenciado"}
            </p>`)
        );

        htmlTemasFortalecer =
            htmlTemasFortalecer +
            `<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptates excepturi impedit, ea debitis nam doloremque quo ipsum pariatur deleniti maxime illo consequatur, quibusdam perferendis corporis unde quia fuga quaerat?</p>`;

        if (valuesPDF?.[0].objInnovacionBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                      En Innovación
                    </p>
                </div>
                
                ${valuesPDF?.[0].objInnovacionBajo
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objPersepcionBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                       En Percepción y calidad
                    </p>
                </div>
                
                ${valuesPDF?.[0].objPersepcionBajo
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objExperienciaBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                       En Experiencia
                    </p>
                </div>
                
                ${valuesPDF?.[0].objExperienciaBajo
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objMarcaBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                       En Marca
                    </p>
                </div>
                
                ${valuesPDF?.[0].objMarcaBajo
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        htmlTemasFortalecer =
            htmlTemasFortalecer +
            `<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptates excepturi impedit, ea debitis nam doloremque quo ipsum pariatur deleniti maxime illo consequatur, quibusdam perferendis corporis unde quia fuga quaerat?</p>`;

        if (valuesPDF?.[0].objInnovacionMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                      En Innovación
                    </p>
                </div>
                
                ${valuesPDF?.[0].objInnovacionMedio
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objPersepcionMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                     En Percepción y calidad
                    </p>
                </div>
                
                ${valuesPDF?.[0].objPersepcionMedio
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objExperienciaMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                      En Experiencia
                    </p>
                </div>
                
                ${valuesPDF?.[0].objExperienciaMedio
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objMarcaMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div>
                    <p class="title">
                      En Marca
                    </p>
                </div>
                
                ${valuesPDF?.[0].objMarcaMedio
                    .map(
                        (e) =>
                            `<p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>`
                    )
                    .join("")}`;
        }

        values?.objInfoFortalezas.forEach((e) => {
            if (e.objInnovacionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                            <p class="title" >
                                En Innovación
                            </p>
           

                        ${e.objInnovacionFortalezas
                            .map(
                                (e) => `
                   
                                <p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                    e.label
                                }:</span> ${e.value || "No diligenciado"}</p>
                            `
                            )
                            .join("")}
                        `;
            }

            if (e.objPersepcionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
        
                        <p class="title">
                        En Percepción y calidad
                        </p>
        


                    ${e.objPersepcionFortalezas
                        .map(
                            (e) => `
                        
                            <p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>
                        
                        `
                        )
                        .join("")}
                    `;
            }

            if (e.objEsteticaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    ${e.objEsteticaFortalezas
                        .map(
                            (e) => `         
                            <p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>
                        `
                        )
                        .join("")}
                  `;
            }

            if (e.objExperienciaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                        <p class="title">
                        En Experiencia
                        </p>
              
                    ${e.objExperienciaFortalezas
                        .map(
                            (e) => `
                            <p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>
                        `
                        )
                        .join("")}
                   `;
            }

            if (e.objMarcaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                        <p class="title">
                        En Marca
                        </p>

                    ${e.objMarcaFortalezas
                        .map(
                            (e) => `
                            <p class="pPDF"><span class="pPDFSpan" style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</p>
                        `
                        )
                        .join("")}`;
            }
        });

        htmlFortalezas =
            htmlFortalezas +
            `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus asperiores odit provident magnam dolorum vero nisi rerum ea voluptatem maiores placeat possimus minus vitae, excepturi cum distinctio quae? Suscipit, quis!</p>`;

        setHtmlTemasFortalecer(htmlTemasFortalecer);
        setHtmlInfoProductos(htmlProductos);
        setHtmlFortalezas(htmlFortalezas);
        setHtmlConclusiones(htmlConclusiones);
        setHtmlNormatividad(htmlNormatividad);
        setArrImagenes(values?.arrImagenes || []);

        setLoading(false);
    }, [values, valuesPDF]);

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
            <Document title="Informe_Diagnostico_Producto">
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

                    <Text style={styles.title}>
                        Reporte diagnóstico de producto
                    </Text>

                    <Html>
                        {`
                        <html>

                        <style>
                        div {
                            font-family: "Roboto";
                        }
                           hr {
                            border: 1px solid gray;
                            border-radius: 1px;
                            margin: 15px;
                           }

                           p {
                               font-size: 12px;
                               margin: 0;
                               font-family: "Roboto";
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

                          .imgChart {
                             width: 100%; height: 100%
                          }

                          tr:nth-child(even){background-color: #f2f2f2; text-align: left;}
                        </style>

                        <body>
                        <h5 class="pMargin"> <span style="color: #00BBB4">Información General</span></h5>
                            <hr />

                            <p>
                            <span style="color: #00BBB4">Empresa: </span>
                             ${objEmpresa?.strNombreMarca} 
                            </p>

                            <p>
                            <span style="color: #00BBB4">Representante: </span>
                             ${objEmpresario?.strNombreCompleto}
                            </p>

                            <p>
                            <span style="color: #00BBB4">Categoría: </span>
                             ${objEmpresa?.strCategoriaProducto}
                            </p>

                            <p>
                            <span style="color: #00BBB4">Descripción: </span>
                             ${objEmpresa?.strDescProductosServicios}
                            </p>

                            <p>
                                <span style="color: #00BBB4">Fecha de descarga: </span>
                                 ${new Date().toLocaleDateString("es-ES")} 
                            </p>

                            <br />

                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quaerat mollitia non consequuntur iste quae, ea exercitationem ullam nam magnam sit velit doloribus vel ipsum sapiente! Vitae dolor mollitia aspernatur?
                            </p>

                            <h5 class="pMargin"> <span style="color: #00BBB4">Productos evaluados en el diagnóstico </span></h5>
                            <hr />

                            ${htmlInfoProductos}

                            <br/>

                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quaerat mollitia non consequuntur iste quae, ea exercitationem ullam nam magnam sit velit doloribus vel ipsum sapiente! Vitae dolor mollitia aspernatur?
                            </p>

                        </body>
                        </html>
                      `}
                    </Html>

                    <Image source={values?.imgChart} />
                    <Html>
                        {`
                        <style>
                        p {
                            font-size: 12px;
                            font-family: "Roboto";
                        }

                        .pMargin {
                           margin-bottom: -10px;
                        }
                        </style>
                        <p class="pMargin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur illum dolores quam ab reprehenderit, esse dolorem earum alias quasi, nulla quidem molestias placeat corporis, dignissimos aperiam voluptatem doloremque odio.</p>`}
                    </Html>

                    <Html>
                        {`
                           <html>
                           <style>
                           div {
                               font-family: "Roboto";
                           }
   
                              hr {
                               border: 1px solid gray;
                               border-radius: 1px;
                               margin: 15px;
                              }
   
                              p {
                               font-size: 12px;
                               margin: 0;
                               font-family: "Roboto";
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
                                htmlNormatividad &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Normatividad</span></h5>
                            <hr />
                            `
                            }

                            ${htmlNormatividad}

                            ${
                                htmlConclusiones &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Conclusiones</span></h5>
                            <hr />
                            `
                            }

                            ${htmlConclusiones}

                            ${
                                arrImagenes.length > 0 &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Registro fotográfico</span></h5>
                            <hr />
                            `
                            }

                        
                              </body>
                           </html>
                        `}
                    </Html>

                    {arrImagenes.length > 0 &&
                        arrImagenes.map((i) => <Image src={i.src} style={styles.images} />)}

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
