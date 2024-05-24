import React, { useState, useEffect } from "react";

import Html from "react-pdf-html";

import {
    PDFViewer,
    Page,
    Text,
    Image,
    Document,
    Font,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

import { Box, CircularProgress } from "@mui/material";

import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";
import useGetDataPDFProduct from "../../../../hooks/useGetDataPDFProduct";

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
        fontSize: "12px",
        color: "black",
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
    pageNumber: {
        position: "absolute",
        fontSize: 8,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
        fontFamily: "Roboto",
    },
    images: {
        width: "100px",
    },
    container: {
        flexDirection: "row", // Organiza las imágenes en una fila
        justifyContent: "center", // Centra las imágenes horizontalmente
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

        console.log(values);
        let htmlNormatividad = "";

        if (values?.objInfoNormatividad) {
            htmlNormatividad = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoNormatividad
                   .map(
                       (e) => `<tr>
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "Sin diligenciar"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        // values?.objInfoNormatividad.forEach(
        //     (e) =>
        //         (htmlNormatividad =
        //             htmlNormatividad +
        //             `<p class="textObj">
        //     ${e.label}: ${e.value || "No diligenciado"}
        // </p>`)
        // );

        values?.objInfoProductos.forEach(
            (e) =>
                (htmlProductos =
                    htmlProductos +
                    `<p class="textObj">
                    <span style="color: #00BBB4">${e.label}:</span> ${
                        e.value || "No diligenciado"
                    }
            </p>`)
        );

        // htmlTemasFortalecer =
        //     htmlTemasFortalecer +
        //     `<p>Lorem BAJO, ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptates excepturi impedit, ea debitis nam doloremque quo ipsum pariatur deleniti maxime illo consequatur, quibusdam perferendis corporis unde quia fuga quaerat?</p>`;

        if (valuesPDF?.[0].objInnovacionBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                    En Innovación         
                </div>
                
                ${valuesPDF?.[0].objInnovacionBajo
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objPersepcionBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">        
                    En Percepción y calidad
                </div>
                
                ${valuesPDF?.[0].objPersepcionBajo
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objExperienciaBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                    En Experiencia
                </div>
                
                ${valuesPDF?.[0].objExperienciaBajo
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objMarcaBajo?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                       En Marca
                </div>
                
                ${valuesPDF?.[0].objMarcaBajo
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        // htmlTemasFortalecer =
        //     htmlTemasFortalecer +
        //     `<p>Lorem MEDIO, ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptates excepturi impedit, ea debitis nam doloremque quo ipsum pariatur deleniti maxime illo consequatur, quibusdam perferendis corporis unde quia fuga quaerat?</p>`;

        if (valuesPDF?.[0].objInnovacionMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                      En Innovación
                </div>
                
                ${valuesPDF?.[0].objInnovacionMedio
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objPersepcionMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                     En Percepción y calidad
                </div>
                
                ${valuesPDF?.[0].objPersepcionMedio
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objExperienciaMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                      En Experiencia
                </div>
                
                ${valuesPDF?.[0].objExperienciaMedio
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        if (valuesPDF?.[0].objMarcaMedio?.length > 0) {
            htmlTemasFortalecer =
                htmlTemasFortalecer +
                `<div class="title" style="margin-bottom: 10px; margin-top: 10px">
                      En Marca
                </div>
                
                ${valuesPDF?.[0].objMarcaMedio
                    .map(
                        (e) =>
                            `<div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>`
                    )
                    .join("")}`;
        }

        // htmlFortalezas =
        //     htmlFortalezas +
        //     `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus asperiores odit provident magnam dolorum vero nisi rerum ea voluptatem maiores placeat possimus minus vitae, excepturi cum distinctio quae? Suscipit, quis!</p>`;

        values?.objInfoFortalezas.forEach((e) => {
            if (e.objInnovacionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                            <div class="title" style="margin-bottom: 10px; margin-top: 10px">
                                En Innovación
                            </div>
           

                        ${e.objInnovacionFortalezas
                            .map(
                                (e) => `
                   
                                <div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                    e.label
                                }:</span> ${e.value || "No diligenciado"}</div>
                            `
                            )
                            .join("")}
                        `;
            }

            if (e.objPersepcionFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
        
                        <div class="title" style="margin-bottom: 10px; margin-top: 10px">
                        En Percepción y calidad
                        </div>
        


                    ${e.objPersepcionFortalezas
                        .map(
                            (e) => `
                        
                            <div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>
                        
                        `
                        )
                        .join("")}
                    `;
            }

            if (e.objEsteticaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                    <div class="title" style="margin-bottom: 10px; margin-top: 10px">
                    En Estética
                    </div>
                    ${e.objEsteticaFortalezas
                        .map(
                            (e) => `         
                            <div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>
                        `
                        )
                        .join("")}
                  `;
            }

            if (e.objExperienciaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                        <div class="title" style="margin-bottom: 10px; margin-top: 10px">
                        En Experiencia
                        </div>
              
                    ${e.objExperienciaFortalezas
                        .map(
                            (e) => `
                            <div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>
                        `
                        )
                        .join("")}
                   `;
            }

            if (e.objMarcaFortalezas) {
                htmlFortalezas =
                    htmlFortalezas +
                    ` 
                        <div class="title" style="margin-bottom: 10px; margin-top: 10px">
                        En Marca
                        </div>

                    ${e.objMarcaFortalezas
                        .map(
                            (e) => `
                            <div style="color: #505050; font-size: 11px; padding: 10px"><span style="color: #00BBB4">${
                                e.label
                            }:</span> ${e.value || "No diligenciado"}</div>
                        `
                        )
                        .join("")}`;
            }
        });

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
            <Document
                title={`Diagnostico de producto - ${objEmpresario?.strNroDocto} - ${objEmpresa?.strNombreMarca}`}
            >
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

                    <Text style={styles.title}>
                     Diagnóstico de producto
                    </Text>

                    <Html>
                        {`
                        <html>

                        <style>
                        div {
                            font-family: Roboto;
                        }
                           hr {
                            border: 1px solid gray;
                            border-radius: 1px;
                           }

                           h5 {
                            font-family: Roboto;
                        }

                           p {
                               font-size: 11px;
                               font-family: Roboto;
                               color: #505050;
                           }

                           .pMargin {
                              margin-bottom: -10px;
                           }

                           .textObj {
                             margin-bottom: -10px;
                             font-size: 11px;
                             display: flex;
                             align-content: center;
                           }

                           .title{
                            font-size: 14px;
                            color: black;
                            margin: 10px;
                           }

                           table {
                            font-family: Roboto;
                            font-size: 9px;
                            border-collapse: collapse;
                            width: 100%;
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

                          .imgChart {
                             width: 100%; height: 100%
                          }

                          tr:nth-child(even){background-color: #f2f2f2; text-align: left;}
                        </style>

                        <body>
                            <h5 class="pMargin"> <span style="color: #00BBB4">Información General</span></h5>
                            <hr />

                            <p class="pMargin">
                            <span style="color: #00BBB4">Empresa: </span>
                             ${objEmpresa?.strNombreMarca} 
                            </p>

                            <p class="pMargin">
                            <span style="color: #00BBB4">Representante: </span>
                             ${objEmpresario?.strNombreCompleto}
                            </p>

                            <p class="pMargin">
                            <span style="color: #00BBB4">Categoría: </span>
                             ${
                                 objEmpresa?.strCategoriaProducto ||
                                 objEmpresa?.strCategoriaServicio
                             }  
                            </p>

                            <p class="pMargin">
                            <span style="color: #00BBB4">Descripción: </span>
                             ${objEmpresa?.strDescProductosServicios}
                            </p>

                            <p class="pMargin">
                                <span style="color: #00BBB4">Fecha y hora de la sesión: </span>
                                 ${
                                     values?.objInfoGeneral?.find(
                                         (v) => v.parent === "dtmFechaSesion"
                                     )?.value
                                 } 
                            </p>

                            <p class="pMargin">
                                <span style="color: #00BBB4">Responsable del diagnóstico: </span>
                                ${
                                    valuesPDF?.[0]?.objInfoGeneral?.strUsuarioResponsable
                                } 
                            </p>

                            <p class="pMargin">
                                <span style="color: #00BBB4">Lugar de la sesión: </span>
                                ${
                                    values?.objInfoGeneral?.find(
                                        (v) => v.parent === "strLugarSesion"
                                    )?.value
                                } 
                            </p>

                            <br />

                            <p>
                                A continuación, te presentamos un resumen del diagnóstico de los productos de tú
                                emprendimiento. En primer lugar, verás un gráfico que muestra el puntaje actual de tu
                                emprendimiento en relación con el puntaje máximo de cada grupo temático analizado.
                                Luego, encontrarás una sección donde podrás identificar las fortalezas y temas a
                                fortalecer de tu emprendimiento, agrupadas en los siguientes temas:
                            </p>

                            <ol style="font-family: Roboto; color: #505050; font-size: 11px">
                                <li>Innovación</li>
                                <li>Estética / Percepción y calidad</li>
                                <li>Experiencia</li>
                                <li>Marca</li>
                            </ol>

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />

                            <h5 class="pMargin"> <span style="color: #00BBB4">Gráfico resumen </span></h5>
                            <hr />
                        </body>
                        </html>
                      `}
                    </Html>

                    <Image
                        source={values?.imgChart}
                        style={{ width: "450px", alignSelf: "center" }}
                    />

                    <Html>
                        {`
                          <html>
                          <style>
                          div {
                              font-family: Roboto;
                          }
                             hr {
                              border: 1px solid gray;
                              border-radius: 1px;
                             }

                             h5 {
                                font-family: Roboto;
                            }
  
                             p {
                                 font-size: 11px;
                                 font-family: Roboto;
                                 color: #505050;
                             }
  
                             .pMargin {
                                margin-bottom: -10px;
                             }
  
                             .textObj {
                               margin-bottom: -10px;
                               font-size: 11px;
                               display: flex;
                               align-content: center;
                             }
  
                             .title{
                              font-size: 14px;
                              font-weight: 700;
                              color: black;
                              margin: 10px;
                             }
  
                             table {
                                font-family: Roboto;
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
                             
                            <h5 class="pMargin"> <span style="color: #00BBB4">Productos evaluados en el diagnóstico </span></h5>
                            <hr />

                            ${htmlInfoProductos}
                             </body>
                          </html>
                        `}
                    </Html>

                    <Html>
                        {`
                           <html>
                           <style>
                           div {
                            font-family: Roboto;
                           }
                              hr {
                               border: 1px solid gray;
                               border-radius: 1px;
                              }

                              h5 {
                                font-family: Roboto;
                            }
   
                              p {
                               font-size: 11px;
                               font-family: Roboto;
                               color: #505050;
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
                               font-size: 11px;
                               font-weight: bold;
                               color: black;
                              }
   
                              table {
                                font-family: Roboto;
                               font-size: 9px;
                               border-collapse: collapse;
                               width: 100%;
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
                              
                            ${
                                htmlFortalezas &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Fortalezas</span></h5>
                            <hr />
                            `
                            }

                            ${htmlFortalezas}

                            ${
                                htmlTemasFortalecer &&
                                `
                            <h5 class="pMargin"> <span style="color: #00BBB4">Temas a fortalecer</span></h5>
                            <hr />
                            `
                            }

                            ${htmlTemasFortalecer}

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

                    <View style={styles.container}>
                        {arrImagenes.length > 0 &&
                            arrImagenes.map((i, index) => (
                                <Image
                                    src={i.src}
                                    style={styles.images}
                                    key={index}
                                />
                            ))}
                    </View>

                    <Text style={styles.footerTitle}>
                        <hr />
                        Transformamos la vida de las personas emprendedoras y
                        empresarias desde el ser y el hacer
                    </Text>

                    <Text style={styles.footerContact}>
                        Correo electrónico: asistentedesarrollo@demismanos.org - Teléfono: 318 656 65 08
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
