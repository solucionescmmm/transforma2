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
    const [htmlInfoFamiliar, setHtmlInfoFamiliar] = useState("");
    const [htmlEmprend, setHtmlEmprend] = useState("");
    const [htmlPErfilEco, setHtmlPErfilEco] = useState("");
    const [arrImagenes, setArrImagenes] = useState([]);

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

        let htmlInfoFamiliar = "";
        let htmlEmprend = "";
        let htmlPErfilEco = "";

        if(values?.objInfoFamiliar) {
        htmlInfoFamiliar = `
            <div>
                <p class="title">
                   
                </p>
            </div>
    
            <table style="">
               <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
               </tr>
    
               ${values?.objInfoFamiliar
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

        if( values?.objInfoEmprendimiento) {
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
                   <td>${e.label}</td>
                   <td>${e.value}</td>
                  
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

        if( values?.objInfoPerfilEco) {
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
    
               ${ values?.objInfoPerfilEco
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
        setHtmlInfoFamiliar(htmlInfoFamiliar);
        setArrImagenes(values?.arrImagenes || []);

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
            <Document title={`Diagnostico General - ${objEmpresario.strNroDocto} - ${objEmpresa.strNombreMarca}`}>
                <Page size="A4" style={styles.page}>
                    <Image src="/Logo.png" style={styles.image} />

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

                           ol {
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

                    <div style="font-size: 12px">
                    A continuación, te presentamos el resumen de las respuestas recopiladas durante el diagnóstico. La información estará organizada en las siguientes secciones:
                    </div>

                    <ol>
                       <li>Detalles sobre la estructura familiar.</li>
                       <li>Información general de la empresa.</li>
                       <li>Perfil económico y productivo.</li>
                       <li>Etapa desarrollo.</li>
                       <li>Registro fotográfico (si aplica).</li>
                    </ol>

                            <h5 class="pMargin"> <span style="color: #00BBB4">Información familiar </span></h5>
                            <hr />

                         
                            ${htmlInfoFamiliar}

                            <h5 class="pMargin"> <span style="color: #00BBB4">Información del emprendimiento </span></h5>
                            <hr />
                          
                            ${htmlEmprend}

                            <h5 class="pMargin"> <span style="color: #00BBB4">Perfil económico y productivo</span></h5>
                            <hr />
 
                            ${htmlPErfilEco}

                            <h5 class="pMargin"> <span style="color: #00BBB4">Etapa de desarrollo</span></h5>
                            <hr />

                            <p>
                            Las etapas de desarrollo son un concepto moldeado por De Mis Manos para definir en qué punto se encuentra tu emen el rango promedio de ventas actuales, empleos generados y tiempo de dedicación. Estas variables, estudiadas demprendimiento.
De acuerdo con la información recolectada durante el diagnóstico, la etapa de desarrollo de tu emprendimiento es:
                            </p>

                            <p>
                            ¿Qué significa esta etapa? 
                            </p>

                            <p>
                            En esta etapa, los emprendimientos se encuentran activamente comprometidos con su actividad empresarial, siendo propietarios o copropietariosproceso de organización y creación legal y formal de la empresa para realizar operaciones en el mercado. Se aborda la construcción de las bases ocontables, así como la definición de canales de comercialización y ventas. Además, se realiza el refinamiento del modelo y plan de negocios.
                            </p>

                            <p>¿Cúales son las etapas? 
                            </p>

                            <p>
                              <span style="color: #00BBB4">1. Etapa de Validación Comercial:
                              </span>

                              En esta fase, los emprendimientos se centran en desarrollar el producto o servicio,validación del producto o servicio, incluyendo el diseño correspondiente.
                            </p>

                            <p>
                            <span style="color: #00BBB4">2. Etapa de Nueva Empresa:
                            </span>

                            En esta etapa, los emprendimientos se encuentran activamente comprometidos con su actividad empresarial, siendo propietarios o copropietarios. Están inmersos en el
proceso de organización y creación legal y formal de la empresa para realizar operaciones en el mercado. Se aborda la construcción de las bases operativas, administrativas y
contables, así como la definición de canales de comercialización y ventas. Además, se realiza el refinamiento del modelo y plan de negocios. </p>



<p>
<span style="color: #00BBB4">3. Etapa de Fortalecimiento Nivel I:
</span>

Durante esta fase temprana de actividad empresarial, se busca desarrollar el potencial de mercado con un enfoque especialmente centrado en los aspectos comerciales y
administrativos. Existen expectativas de crecimiento en esta etapa inicial.</p>




<p>
<span style="color: #00BBB4">4. Etapa de Fortalecimiento Nivel II:
</span>

En este momento el emprendimiento está enfocado en el desarrollo del potencial de mercado con un enfoque comercial definido. Se trabaja en el fortalecimiento y
estabilización de los procesos administrativos, y se inicia la búsqueda y desarrollo del recurso humano con la consiguiente delegación de tareas. La actividad empresarial está
en proceso de crecimiento, con oportunidades para consolidar las actividades.</p>
                        

<p>
<span style="color: #00BBB4">5. Etapa de Consolidación:
</span>

En esta etapa, la empresa logra estabilidad y solidez económico-financiera. Se considera una actividad empresarial avanzada con altas expectativas de crecimiento. Los
factores clave para alcanzar la consolidación están relacionados con la viabilidad a mediano y largo plazo de la empresa.
</p>


<p>
<span style="color: #00BBB4">6. Etapa de Escalamiento:
</span>

Esta fase se presenta cuando el negocio se vuelve escalable y adquiere una posición sólida en el mercado. Esto se logra mediante una nueva forma de administración que se
centra en el cumplimiento de planes estratégicos y modelos de negocio.
</p>


<p>
<span style="color: #00BBB4">7. Etapa de Expansión:
</span>

En la etapa de expansión, se define la estrategia de expansión, se establecen plataformas para el crecimiento y se desarrollan nuevas líneas de negocio. En algunas ocasiones,
comienza la búsqueda de inversión para expandir el negocio y aprovechar al máximo las oportunidades del mercado, multiplicando así los márgenes de ganancia.
</p>


<h5 class="pMargin"> <span style="color: #00BBB4">Registro fotográfico</span></h5>
<hr />



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
