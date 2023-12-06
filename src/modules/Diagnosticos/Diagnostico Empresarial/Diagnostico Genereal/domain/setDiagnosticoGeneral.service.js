//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoGeneral = require("../infra/conectors/interfaseDAODiagnosticoGeneral");

//Services
const serviceGetIdFuenteHistorico = require("../../../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceGetIdEstadoDiagnostico = require("../../../Main/domain/getIdEstadoDiagnosticos.service")
const serviceSetHistorico = require("../../../../Historicos/domain/setHistorico.service")
const serviceGetHistoricoByFuente = require("../../../../Historicos/domain/getHistoricoByFuente.service")
const serviceUpdateDiagnostico = require("../../../Main/domain/updateDiagnosticos.service")

class setDiagnosticoGeneral {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstadoDiagnostico;
    #intIdFuenteHistorico;
    #bitTienePrediagnostico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getIdFuenteHistorico();
        await this.#getIntIdEstadoDiagnostico();
        await this.#getHistorico();
        await this.#validations();
        await this.#updateEmpresarioDiagnosticoGeneral();
        await this.#updateEmpresaDiagnosticoGeneral();
        await this.#updateDiagnostico();
        await this.#completeData();
        await this.#setDiagnosticoGeneral();
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

        if (this.#bitTienePrediagnostico) {
            await this.#setHistorico();
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
        }, this.#objUser);

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #getHistorico() {
        let queryGetHistorico = await serviceGetHistoricoByFuente({
            intIdIdea: this.#objData?.objInfoGeneral?.intIdIdea,
        });

        if (queryGetHistorico.error) {
            throw new Error(query.msg);
        }

        this.#bitTienePrediagnostico = queryGetHistorico.data ? true : false;
    }

    async #completeData() {
        let newData = {
            ...this.#objData,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoFamiliar,
            ...this.#objData.objInfoEmprendimiento,
            ...this.#objData.objInfoEmpresa,
            ...this.#objData.objInfoPerfilEco,
            ...this.#objData.objInfoAdicional,
            //Objeto de Información General
            intIdDiagnostico: this.#objData.objInfoGeneral?.intIdDiagnostico,
            intIdEmpresario: this.#objData.objInfoGeneral?.intIdEmpresario,
            intIdTipoEmpresario: this.#objData.objInfoGeneral?.intIdTipoEmpresario,
            btFinalizado: false,
            strLugarSesion: this.#objData.objInfoGeneral.strLugarSesion,
            dtmFechaSesion: this.#objData.objInfoGeneral.dtmFechaSesion,
            strUsuarioCreacion: this.#objData.objInfoGeneral.strUsuarioCreacion,
            strUsuarioActualizacion: this.#objUser.strEmail,

            //Objeto de Información Familiar
            strCabezaHogar: this.#objData.objInfoFamiliar.strCabezaHogar,
            intNumPersonasCargo: this.#objData.objInfoFamiliar.intNumPersonasCargo,
            intHijos: this.#objData.objInfoFamiliar.intHijos,
            intHijosEstudiando: this.#objData.objInfoFamiliar.intHijosEstudiando,
            strMaxNivelEducativoHijos: this.#objData.objInfoFamiliar.strMaxNivelEducativoHijos,
            strEstadoCivil: this.#objData.objInfoFamiliar.strEstadoCivil,
            strSituacionVivienda: this.#objData.objInfoFamiliar.strSituacionVivienda,
            strGrupoVulnerable: this.#objData.objInfoFamiliar.strGrupoVulnerable,
            strPoblacionEtnica: this.#objData.objInfoFamiliar.strPoblacionEtnica,

            //Objeto de InfoEmprendimiento
            intAñoInicioOperacion: parseInt(this.#objData.objInfoEmprendimiento.intAñoInicioOperacion, 10),
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
            strRegistroCamaraComercio: this.#objData.objInfoEmprendimiento.strRegistroCamaraComercio,

            //Objeto de InfoEmpresa
            strTrabajanFamiliares: this.#objData.objInfoEmpresa.strTrabajanFamiliares,
            strHistoriaEmpresa: this.#objData.objInfoEmpresa.strHistoriaEmpresa,
            strSuenioEmpresa: this.#objData.objInfoEmpresa.strSuenioEmpresa,
            strEstudioEmprendimiento: this.#objData.objInfoEmpresa.strEstudioEmprendimiento,
            strExperienciaEmprendimiento: this.#objData.objInfoEmpresa.strExperienciaEmprendimiento,
            strTipoContribuyente: this.#objData.objInfoEmpresa.strTipoContribuyente,
            strRut: this.#objData.objInfoEmpresa.strRut,
            strPresupuestoFamiliar: this.#objData.objInfoEmpresa.strPresupuestoFamiliar,
            strIngresosDistintos: this.#objData.objInfoEmpresa.strIngresosDistintos,

            //Objeto de InfoPerfilEco
            strOperacionesVentas6Meses: this.#objData.objInfoPerfilEco.strOperacionesVentas6Meses,
            strEtapaValidacion: this.#objData.objInfoPerfilEco.strEtapaValidacion,
            strPromedioVentas6Meses: this.#objData.objInfoPerfilEco.strPromedioVentas6Meses,
            strRangoVentas: this.#objData.objInfoPerfilEco.strRangoVentas,
            strRangoEmpleados: this.#objData.objInfoPerfilEco.strRangoEmpleados,
            strTipoEmpleoGenerado: this.#objData.objInfoPerfilEco.strTipoEmpleoGenerado,
            strDlloAcitividadesContratados: this.#objData.objInfoPerfilEco.strDlloAcitividadesContratados,
            strPromedioTiempoInvertido: this.#objData.objInfoPerfilEco.strPromedioTiempoInvertido,
            strRolesEmprendimiento: JSON.stringify(this.#objData.objInfoPerfilEco.strRolesEmprendimiento || null),
            strDiasProduccion: this.#objData.objInfoPerfilEco.strDiasProduccion,
            strGeneraEmpleoRiesgoPobreza: this.#objData.objInfoPerfilEco.strGeneraEmpleoRiesgoPobreza,
            valorGananciasMes: this.#objData.objInfoPerfilEco.dblValorVentasMes,
            strActivos: this.#objData.objInfoPerfilEco.strActivos,
            ValorActivos: this.#objData.objInfoPerfilEco.dblValorActivos,

            //Objeto de InfoAdicional
            strConclusiones: this.#objData.objInfoAdicional.strConclusiones,
            strURLSFotosProducto: this.#objData.objInfoAdicional.strURLSFotosProducto,
        };

        this.#objData = newData;
    }

    async #setDiagnosticoGeneral() {
        let dao = new classInterfaceDAODiagnosticoGeneral();

        let query = await dao.setDiagnosticoGeneral(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateEmpresarioDiagnosticoGeneral() {
        let dao = new classInterfaceDAODiagnosticoGeneral();

        let objInfoEmpresario = {
            ...this.#objData.objInfoGeneral,
            arrDepartamento: JSON.stringify(this.#objData.objInfoGeneral?.arrDepartamento || null),
            arrCiudad: JSON.stringify(this.#objData.objInfoGeneral?.arrCiudad || null),
            intIdEmpresario: this.#objData.objInfoGeneral.intIdEmpresario,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let query = await dao.updateEmpresarioDiagnosticoGeneral(
            objInfoEmpresario
        );

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #updateEmpresaDiagnosticoGeneral() {
        let dao = new classInterfaceDAODiagnosticoGeneral();

        let objInfoEmpresa = {
            ...this.#objData.objInfoEmprendimiento,
            intIdIdea: this.#objData?.objInfoGeneral?.intIdIdea,
            arrDepartamento: JSON.stringify(this.#objData.objInfoEmprendimiento?.arrDepartamento || null),
            arrCiudad: JSON.stringify(this.#objData.objInfoEmprendimiento?.arrCiudad || null),
            strMediosDigitales: JSON.stringify(this.#objData.objInfoEmprendimiento?.arrMediosDigitales || null),
            strCategoriasSecundarias: JSON.stringify(this.#objData.objInfoEmprendimiento?.arrCategoriasSecundarias || null),
            dblValorVentasMes: this.#objData.objInfoPerfilEco.dblValorVentasMes,
            intNumeroEmpleados: parseInt(this.#objData.objInfoPerfilEco.intNumeroEmpleados, 10),
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let query = await dao.updateEmpresaDiagnosticoGeneral(
            objInfoEmpresa
        );

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #setHistorico() {
        let data = {
            intIdIdea: this.#objData.objInfoGeneral.intIdIdea,
            intNumeroEmpleados: parseInt(this.#objData.objInfoPerfilEco.intNumeroEmpleados, 10),
            ValorVentas: this.#objData.objInfoPerfilEco.dblValorVentasMes,
            strTiempoDedicacionAdmin: this.#objData.objInfoEmprendimiento.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato: this.#objData.objInfoGeneral.intIdDiagnostico
        };

        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }

    async #updateDiagnostico() {
        let data = {
            intId: this.#objData.objInfoGeneral.intIdDiagnostico,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico
        };

        let service = new serviceUpdateDiagnostico(data, this.#objUser);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }

}
module.exports = setDiagnosticoGeneral;
