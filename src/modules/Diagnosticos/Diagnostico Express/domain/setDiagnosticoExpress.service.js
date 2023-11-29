//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoExpress = require("../infra/conectors/interfaseDAODiagnosticoExpress");

//Services
const serviceGetIdFuenteHistorico = require("../../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceGetIdEstadoDiagnostico = require("../../Main/domain/getIdEstadoDiagnosticos.service")
const serviceSetHistorico = require("../../../Historicos/domain/setHistorico.service")
const serviceUpdateDiagnostico = require("../../Main/domain/updateDiagnosticos.service")

class setDiagnosticoExpress {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //variables
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
        console.log(this.#objData)
        // await this.#validations();
        // await this.#getIdFuenteHistorico();
        // await this.#getIntIdEstadoDiagnostico();
        // await this.#updateEmpresaDiagnosticoExpress();
        // await this.#completeData();
        // await this.#setDiagnosticoExpress();
        // await this.#setHistorico();
        // await this.#updateDiagnostico();
        // return this.#objResult;
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
            strNombre: "Diagnóstico Express",
        });

        if (queryGetIdFuenteHistorico.error) {
            throw new Error(query.msg);
        }

        this.#intIdFuenteHistorico = queryGetIdFuenteHistorico.data.intId;
    }
    
    async #getIntIdEstadoDiagnostico() {
        let queryGetIntIdEstadoDiagnostico = await serviceGetIdEstadoDiagnostico({
            strNombre: "Finalizado",
        });

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #completeData() {
        //Objeto de Información Express
        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEmprendimiento,
            ...this.#objData.objInfoPerfilEco,
            ...this.#objData.objInfoMercado,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoEncuestaHumanas,
            intIdEmpresario:this.#objData.objInfoGeneral.objEmpresario.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario.intIdTipoEmpresario,
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

    async #updateEmpresaDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let objInfoEmpresa = {
            ...this.#objData.objInfoEmprendimiento,
            intIdIdea: this.#objData?.objInfoGeneral?.intIdIdea,
            strMediosDigitales: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrMediosDigitales || null
            ),
            strFormasComercializacion: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrFormasComercializacion || null
            ),
            strCategoriasSecundarias: JSON.stringify(
                this.#objData.objInfoEmprendimiento?.arrCategoriasSecundarias ||
                    null
            ),
            dblValorVentasMes: this.#objData.objInfoPerfilEco.ValorVentaProductoEscogido,
            intNumeroEmpleados:this.#objData.objInfoPerfilEco.intNumeroEmpleados,
            btGeneraEmpleo:this.#objData.objInfoPerfilEco.btGeneraEmpleo
        };

        let query = await dao.updateEmpresaDiagnosticoExpress(
            objInfoEmpresa
        );

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #setHistorico(){
        let data = {
            intIdIdea:this.#objData.objInfoGeneral.intIdIdea,
            intNumeroEmpleados:parseInt(this.#objData.objInfoPerfilEco.intNumeroEmpleados, 10),
            ValorVentas:this.#objData.objInfoPerfilEco.ValorVentaProductoEscogido,
            strTiempoDedicacionAdmin:this.#objData.objInfoEmprendimiento.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato:this.#objData.objInfoGeneral.intIdDiagnostico
        };
    
        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }

    async #updateDiagnostico(){
        let data = {
            intId: this.#objData.objInfoGeneral.intIdDiagnostico,
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
