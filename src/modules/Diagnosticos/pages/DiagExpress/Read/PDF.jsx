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
} from "@react-pdf/renderer";

import { Box, CircularProgress } from "@mui/material";
import useGetEmpresarios from "../../../../Empresarios/hooks/useGetEmpresarios";
import { isSimilar } from "../../../../../common/functions/all";

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
    container: {
        flexDirection: "row", // Organiza las imágenes en una fila
        justifyContent: "center", // Centra las imágenes horizontalmente
    },
});

const propiedadesEtapas = [
    {
        parent: "Ideación",
        label: "Ideación",
        html: `
        <p>
        En esta fase, los emprendimiento aun no han realizado ventas en sus productos o
        servicios.
        </p>`,
    },
    {
        parent: "Validación comercial",
        label: "Validación Comercial",
        html: `
        <p>
        En esta fase, los emprendimientos se centran en desarrollar el producto o servicio,
        validación del producto o servicio, incluyendo el diseño correspondiente.
        </p>`,
    },
    {
        parent: "Nuevo empresario",
        label: "Nueva Empresa",
        html: `
        <p>
        En esta etapa, los emprendimientos se encuentran activamente comprometidos con su actividad empresarial, 
        siendo propietarios o copropietarios. Están inmersos en el proceso de organización y creación legal y 
        formal de la empresa para realizar operaciones en el mercado. Se aborda la construcción de las bases 
        operativas, administrativas y contables, así como la definición de canales de comercialización y ventas. 
        Además, se realiza el refinamiento del modelo y plan de negocios. 
        </p>`,
    },
    {
        parent: "Fortalecimiento empresariaI I",
        label: "Fortalecimiento Nivel I",
        html: `
        <p>
        Durante esta fase temprana de actividad empresarial, se busca desarrollar el potencial de mercado 
        con un enfoque especialmente centrado en los aspectos comerciales y administrativos. 
        Existen expectativas de crecimiento en esta etapa inicial.
        </p>`,
    },
    {
        parent: "Fortalecimiento empresarial II",
        label: "Fortalecimiento Nivel II",
        html: `
        <p>
        En este momento el emprendimiento está enfocado en el desarrollo del potencial de mercado con un 
        enfoque comercial definido. Se trabaja en el fortalecimiento y estabilización de los procesos 
        administrativos, y se inicia la búsqueda y desarrollo del recurso humano con la consiguiente 
        delegación de tareas. La actividad empresarial está en proceso de crecimiento, 
        con oportunidades para consolidar las actividades.
        </p>`,
    },
    {
        parent: "Consolidación",
        label: "Consolidación",
        html: `
        <p>
          En esta etapa, la empresa logra estabilidad y solidez económico-financiera. 
          Se considera una actividad empresarial avanzada con altas expectativas de crecimiento. Los factores 
          clave para alcanzar la consolidación están relacionados con la viabilidad a mediano y 
          largo plazo de la empresa.
        </p>`,
    },
    {
        parent: "Escalamiento",
        label: "Escalamiento",
        html: `
        <p>
        Esta fase se presenta cuando el negocio se vuelve escalable y adquiere una posición sólida en el mercado. 
        Esto se logra mediante una nueva forma de administración que se centra en el cumplimiento de planes 
        estratégicos y modelos de negocio.
        </p>`,
    },
    {
        parent: "Expansión",
        label: "Expansión",
        html: `
        <p>
        En la etapa de expansión, se define la estrategia de expansión, se establecen plataformas 
        para el crecimiento y se desarrollan nuevas líneas de negocio. En algunas ocasiones,
        comienza la búsqueda de inversión para expandir el negocio y aprovechar al máximo las oportunidades 
        del mercado, multiplicando así los márgenes de ganancia.
        </p>`,
    },
];

const PDFProduct = ({ intId, values, intIdDiagnostico }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);

    const [objEmpresario, setObjEmpresario] = useState();
    const [objEmpresa, setObjEmpresa] = useState();
    const [htmlEmprend, setHtmlEmprend] = useState("");
    const [htmlPErfilEco, setHtmlPErfilEco] = useState("");
    const [htmlMercado, setHtmlMercado] = useState("");
    const [htmlNormatividad, setHtmlNormatividad] = useState("");
    const [htmlCanalesVenta, setHtmlCanalesVenta] = useState("");
    const [htmlEncuestasHumanas, setHtmlEncuenstasHumanas] = useState("");

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetEmpresarios({ autoload: true, intIdIdea: intId });

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

        let htmlEmprend = "";
        let htmlPErfilEco = "";
        let htmlMercado = ''
        let htmlNormatividad = ""
        let htmlEncuestasHumanas = ""
        let htmlCanalesVenta = ""

        if (values?.objInfoEmprendimiento) {
            htmlEmprend = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoEmprendimiento
                   .map(
                       (e) => `<tr>
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        // values?.objInfoEmprendimiento?.forEach(
        //     (e) =>
        //         (htmlEmprend =
        //             htmlEmprend +
        //             `
        //             <p class="textObj">
        //             ${e.label}: ${e.value || "No diligenciado"}
        //         </p>
        //             `)
        // );

        if (values?.objInfoPerfilEco) {
            htmlPErfilEco = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoPerfilEco
                   .map(
                       (e) => `<tr>
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        if (values?.objInfoMercado) {
            htmlMercado = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoMercado
                   .map(
                       (e) => `<tr>
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

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
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        if (values?.objInfoCanalesVenta) {
            htmlCanalesVenta = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoCanalesVenta
                   .map(
                       (e) => `<tr>
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        if (values?.objInfoEncuestaHumanas) {
            htmlEncuestasHumanas = `
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
                   <td style="color: black">${e.label}</td>
                   <td>${e.value || "No diligenciado"}</td>
                  
               </tr>
               `
                   )
                   .join("")}
            </table>
            `;
        }

        // values?.objInfoPerfilEco?.forEach(
        //     (e) =>
        //         (htmlPErfilEco =
        //             htmlPErfilEco +
        //             `
        //             <p class="textObj">
        //             ${e.label}: ${e.value || "No diligenciado"}
        //         </p>
        //             `)
        // );

        setHtmlPErfilEco(htmlPErfilEco);
        setHtmlEmprend(htmlEmprend);
        setHtmlMercado(htmlMercado)
        setHtmlNormatividad(htmlNormatividad)
        setHtmlCanalesVenta(htmlCanalesVenta)
        setHtmlEncuenstasHumanas(htmlEncuestasHumanas)
  
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
            <Document
                title={`Diagnostico Exprés - ${objEmpresario?.strNroDocto} - ${objEmpresa?.strNombreMarca}`}
            >
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

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

     ol {
         font-size: 11px;
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

     .title {
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

     td,
     th {
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

     tr:nth-child(even) {
         background-color: #f2f2f2;
         text-align: left;
     }
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
             values?.objInfoGeneral?.find((v) => v.parent === "dtmFechaSesion")
                 ?.value
         }
     </p>

     <p class="pMargin">
         <span style="color: #00BBB4">Responsable del diagnóstico: </span>
         ${
             values?.objInfoGeneral?.find(
                 (v) => v.parent === "strUsuarioCreacion"
             )?.value
         }
     </p>

     <p class="pMargin">
         <span style="color: #00BBB4">Lugar de la sesión: </span>
         ${
             values?.objInfoGeneral?.find((v) => v.parent === "strLugarSesion")
                 ?.value
         }
     </p>

     <p style="font-family: Roboto; color: #505050; font-size: 11px">
         A continuación, te presentamos el resumen de las respuestas recopiladas durante el diagnóstico. La información
         estará organizada en las siguientes secciones:
     </p>

     <ol style="font-family: Roboto; color: #505050; font-size: 11px">
         <li>Información de la empresa.</li>
         <li>Perfil económico y productivo.</li>
         <li>Etapa de desarrollo.</li>
         <li>Componente de mercados y comercial.</li>
         <li>Normatividad.</li>
         <li>Canales de ventas.</li>
         <li>Componente humano.</li>
     </ol>


     <h5 class="pMargin"> <span style="color: #00BBB4">Información de la empresa </span></h5>
     <hr />

     ${htmlEmprend}

     <h5 class="pMargin"> <span style="color: #00BBB4">Perfil económico y productivo</span></h5>
     <hr />

     ${htmlPErfilEco}

     <h5 class="pMargin"> <span style="color: #00BBB4">Etapa de desarrollo</span></h5>
     <hr />

     <p>
         Las etapas de desarrollo son un concepto moldeado por De Mis Manos para definir en qué punto se encuentra tu
         empresa. En el cálculo de estas etapas, nos fundamentamos en el rango promedio de ventas actuales, empleos generados y tiempo de dedicación. 
         Estas variables estudiadas detenidamente, se consideran claves en el desarrollo de un emprendimiento.

         <br />
         <br />

         De acuerdo con la información recolectada durante el diagnóstico, la etapa de desarrollo de tu emprendimiento es:

         <div style="border-style: solid; border-width: 3px; padding-bottom: 5px; padding-top: 2px; padding-left: 5px; border-color: #F5B335; display:flex; justify-content: center; margin: auto">
            <span style="color: #00BBB4; font-family: Roboto; font-size: 13px">
            ${
                propiedadesEtapas.find((etapa) =>
                    isSimilar(
                        etapa.parent.toLowerCase(),
                        values?.objInfoPerfilEco
                            .find((x) => x.parent === "strEtapaDllo")
                            ?.value.toLowerCase(),
                        0.7
                    )
                )?.label
            }
            </span>
         </div>

        <span style="color: black; font-size: 11px; font-family: Roboto">
         ¿Qué significa esta etapa?
        </span>
     </p>


    ${
        propiedadesEtapas.find((etapa) =>
            isSimilar(
                etapa.parent.toLowerCase(),
                values?.objInfoPerfilEco
                    .find((x) => x.parent === "strEtapaDllo")
                    ?.value.toLowerCase(),
                0.7
            )
        )?.html
    }

     <h5 class="pMargin"> <span style="color: #00BBB4">Componente de mercados y comercial</span></h5>
     <hr />

     ${htmlMercado}

     <h5 class="pMargin"> <span style="color: #00BBB4">Normatividad</span></h5>
     <hr />

     ${htmlNormatividad}

     <h5 class="pMargin"> <span style="color: #00BBB4">Canales de ventas</span></h5>
     <hr />

     ${htmlCanalesVenta}

     <h5 class="pMargin"> <span style="color: #00BBB4">Componente humano</span></h5>
     <hr />

     ${htmlEncuestasHumanas}

 </body>

 </html>
 `}
                    </Html>

                    <Text style={styles.footerTitle}>
                    Transformamos la vida de las personas emprendedoras y empresarias desde el ser y el hacer
                    </Text>

                    <Text style={styles.footerContact}>Contacto</Text>

                    <Text style={styles.footerContact}>
                        Email: asistentedesarrollo@demismanos.org
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
