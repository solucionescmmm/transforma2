//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoExpress = require("../infra/conectors/interfaseDAODiagnosticoExpress");

//Services
const serviceGetIdFuenteHistorico = require("../../../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceGetIdEstadoDiagnostico = require("../../../Main/domain/getIdEstadoDiagnosticos.service")
const serviceSetHistorico = require("../../../../Historicos/domain/setHistorico.service")
const serviceUpdateDiagnostico = require("../../../Main/domain/updateDiagnosticos.service")

class setDiagnosticoExpress {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEmpresario;
    #intIdEstadoDiagnostico;
    #intIdFuenteHistorico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdFuenteHistorico();
        await this.#getIntIdEmpresario();
        await this.#getIntIdEstadoDiagnostico();
        await this.#updateEmpresarioDiagnosticoExpress();
        await this.#updateEmpresaDiagnosticoExpress();
        await this.#completeData();
        await this.#setDiagnosticoExpress();
        await this.#setHistorico();
        await this.#updateDiagnostico();
        return this.#objResult;
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }

        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIdFuenteHistorico() {
        let queryGetIdFuenteHistorico = await serviceGetIdFuenteHistorico({
            strNombre: "Diagnóstico Normal",
        });

        if (queryGetIdFuenteHistorico.error) {
            throw new Error(query.msg);
        }

        this.#intIdFuenteHistorico = queryGetIdFuenteHistorico.data.intId;
    }
    
    async #getIntIdEstadoDiagnostico() {
        let queryGetIntIdEstadoDiagnostico = await serviceGetIdEstadoDiagnostico({
            strNombre: "En Proceso",
        });

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #getIntIdEmpresario() {
        this.#intIdEmpresario = this.#objData.objInfoExpress.intId;
    }

    async #completeData() {
        let newData = {
            //Objeto de Información Express
            intIdDiagnostico: this.#objData.objInfoExpress.intIdDiagnostico,
            intIdEmpresario: this.#objData.objInfoExpress?.intId || 1,
            intIdTipoEmpresario: 1,
            strUbicacionVivienda:this.#objData.objInfoExpress.strUbicacionVivienda,
            dtmFechaSesion: this.#objData.objInfoExpress.dtmFechaSesion,
            strLugarSesion: this.#objData.objInfoExpress.strLugarSesion,
            strUsuarioCreacion: this.#objData.objInfoExpress.strUsuarioCreacion,
            strUsuarioActualizacion: this.#objData.objInfoExpress.strUsuarioActualizacion,

            //Objeto de Información Familiar
            strCabezaHogar: this.#objData.objInfoFamiliar.strCabezaHogar,
            intNumPersonasCargo:
                this.#objData.objInfoFamiliar.intNumPersonasCargo,
            intHijos: this.#objData.objInfoFamiliar.intHijos,
            intHijosEstudiando:
                this.#objData.objInfoFamiliar.intHijosEstudiando,
            strMaxNivelEducativoHijos:
                this.#objData.objInfoFamiliar.strMaxNivelEducativoHijos,
            strEstadoCivil: this.#objData.objInfoFamiliar.strEstadoCivil,
            strSituacionVivienda:
                this.#objData.objInfoFamiliar.strSituacionVivienda,
            strGrupoVulnerable:
                this.#objData.objInfoFamiliar.strGrupoVulnerable,
            strPoblacionEtnica:
                this.#objData.objInfoFamiliar.strPoblacionEtnica,

            //Objeto de InfoEmprendimiento
            intAñoInicioOperacion:
                this.#objData.objInfoEmprendimiento.intAñoInicioOperacion,
            strUbicacionUP: this.#objData.objInfoEmprendimiento.strUbicacionUP,
            strProductoServiciosEnValidacion: this.#objData.objInfoEmprendimiento.strProductoServiciosEnValidacion,
            strNivelDlloProductoServicios: this.#objData.objInfoEmprendimiento.strNivelDlloProductoServicios,
            strEtapaValidProductoServicios: this.#objData.objInfoEmprendimiento.strEtapaValidProductoServicios,
            MinimoValorProducto: this.#objData.objInfoEmprendimiento.MinimoValorProducto,
            MaximoValorProducto: this.#objData.objInfoEmprendimiento.MaximoValorProducto,
            strEscojaProductoServicio: this.#objData.objInfoEmprendimiento.strEscojaProductoServicio,
            ValorVentaProductoEscogido: this.#objData.objInfoEmprendimiento.ValorVentaProductoEscogido,
            strConoceMargenRentaProductoEscogido: this.#objData.objInfoEmprendimiento.strConoceMargenRentaProductoEscogido,
            intPorcentajeMargenRentaProductoEscogido: this.#objData.objInfoEmprendimiento.intPorcentajeMargenRentaProductoEscogido,
            strConoceCostosProductoEscogido: this.#objData.objInfoEmprendimiento.strConoceCostosProductoEscogido,
            CostoProduccionProductoEscogido: this.#objData.objInfoEmprendimiento.CostoProduccionProductoEscogido,
            strPorcentajeIntermediacionVentas: this.#objData.objInfoEmprendimiento.strPorcentajeIntermediacionVentas,
            strDefinePorcentajesCanal: this.#objData.objInfoEmprendimiento.strDefinePorcentajesCanal,
            intRangoPorcentajeIntermediacionVentas: this.#objData.objInfoEmprendimiento.intRangoPorcentajeIntermediacionVentas,
            strRegistroCamaraComercio:
                this.#objData.objInfoEmprendimiento.strRegistroCamaraComercio,

            //Objeto de InfoEmpresa
            strTrabajanFamiliares: this.#objData.objInfoEmpresa.strTrabajanFamiliares,
            strDefinineLineasProductoServicios: this.#objData.objInfoEmpresa.strDefinineLineasProductoServicios,
            strHistoriaEmpresa: this.#objData.objInfoEmpresa.strHistoriaEmpresa,
            strSuenioEmpresa: this.#objData.objInfoEmpresa.strSuenioEmpresa,
            strEstudioEmprendimiento:
                this.#objData.objInfoEmpresa.strEstudioEmprendimiento,
            strExperienciaEmprendimiento:
                this.#objData.objInfoEmpresa.strExperienciaEmprendimiento,
            strTipoContribuyente:
                this.#objData.objInfoEmpresa.strTipoContribuyente,
            strRut: this.#objData.objInfoEmpresa.strRut,
            strPresupuestoFamiliar:
                this.#objData.objInfoEmpresa.strPresupuestoFamiliar,
            strIngresosDistintos:
                this.#objData.objInfoEmpresa.strIngresosDistintos,

            //Objeto de InfoPerfilEco
            strOperacionesVentas6Meses:
                this.#objData.objInfoPerfilEco.strOperacionesVentas6Meses,
            strEtapaValidacion:
                this.#objData.objInfoPerfilEco.strEtapaValidacion,
            strPromedioVentas6Meses:
                this.#objData.objInfoPerfilEco.strPromedioVentas6Meses,
            strRangoVentas: this.#objData.objInfoPerfilEco.strRangoVentas,
            strRangoEmpleados: this.#objData.objInfoPerfilEco.strRangoEmpleados,
            strTipoEmpleoGenerado:
                this.#objData.objInfoPerfilEco.strTipoEmpleoGenerado,
            strDlloAcitividadesContratados:
                this.#objData.objInfoPerfilEco.strDlloAcitividadesContratados,
            strPromedioTiempoInvertido:
                this.#objData.objInfoPerfilEco.strPromedioTiempoInvertido,
            strRolesEmprendimiento: JSON.stringify( this.#objData.objInfoPerfilEco.strRolesEmprendimiento || null),
            strDiasProduccion: this.#objData.objInfoPerfilEco.strDiasProduccion,
            strGeneraEmpleoRiesgoPobreza:
                this.#objData.objInfoPerfilEco.strGeneraEmpleoRiesgoPobreza,
            valorGananciasMes: this.#objData.objInfoPerfilEco.dblValorVentasMes,
            strActivos: this.#objData.objInfoPerfilEco.strActivos,
            ValorActivos: this.#objData.objInfoPerfilEco.ValorActivos,

            //Objeto de InfoAdicional
            strConclusiones: this.#objData.objInfoAdicional.strConclusiones,
            strURLSFotosProducto:
                this.#objData.objInfoAdicional.strURLSFotosProducto,
        };

        this.#objData = newData;
    }

    async #setDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let query = await dao.setDiagnosticoExpress(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateEmpresarioDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let objInfoEmpresario = {
            ...this.#objData.objInfoExpress,
            arrDepartamento: JSON.stringify(
                this.#objData.objInfoExpress?.arrDepartamento || null
            ),
            arrCiudad: JSON.stringify(
                this.#objData.objInfoExpress?.arrCiudad || null
            ),
            intIdEmpresario: this.#intIdEmpresario,
        };

        let query = await dao.updateEmpresarioDiagnosticoExpress(
            objInfoEmpresario
        );

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #updateEmpresaDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let objInfoEmpresa = {
            ...this.#objData.objInfoEmprendimiento,
            intIdEmpresario: this.#intIdEmpresario,
            arrDepartamento: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrDepartamento || null
            ),
            arrCiudad: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrCiudad || null
            ),
            strMediosDigitales: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrMediosDigitales || null
            ),
            strCategoriasSecundarias: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrCategoriasSecundarias ||
                    null
            ),
            dblValorVentasMes: this.#objData.objInfoPerfilEco.dblValorVentasMes,
            intNumeroEmpleados:
                this.#objData.objInfoPerfilEco.intNumeroEmpleados,
        };

        let query = await dao.updateEmpresarioDiagnosticoExpress(
            objInfoEmpresa
        );

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #setHistorico(){
        let data = {
            intIdIdea:this.#objData.objInfoExpress.intIdIdea,
            intNumeroEmpleados:parseInt(this.#objData.objInfoPerfilEco.intNumeroEmpleados, 10),
            ValorVentas:this.#objData.objInfoPerfilEco.dblValorVentasMes,
            strTiempoDedicacionAdmin:this.#objData.objInfoEmprendimiento.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato:this.#objData.objInfoExpress.intIdDiagnostico
        };
    
        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }

    async #updateDiagnostico(){
        let data = {
            intId: this.#objData.objInfoExpress.intIdDiagnostico,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico
        };
    
        let service = new serviceUpdateDiagnostico(data,this.#objUser);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }
    
}
module.exports = setDiagnosticoExpress;
