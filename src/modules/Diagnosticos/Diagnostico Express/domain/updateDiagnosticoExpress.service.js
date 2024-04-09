
//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoExpress = require("../infra/conectors/interfaseDAODiagnosticoExpress");

//service
const serviceUpdateHistorico = require("../../../Historicos/domain/updateHistorico.service")
const serviceGetHistoricoByFuente = require("../../../Historicos/domain/getHistoricoByFuente.service")

class updateDiagnosticoExpress {
    #objData;
    #objUser;
    #objResult;

    #bitTienePrediagnostico

    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getHistorico()
        await this.#validations();
        await this.#updateEmpresaDiagnosticoExpress();
        await this.#completeData();
        await this.#updateDiagnosticoExpress();
        
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
            await this.#updateHistorico();
        }
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
        //Objeto de Información Express
        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEmprendimiento,
            ...this.#objData.objInfoPerfilEco,
            ...this.#objData.objInfoMercado,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoEncuestaHumanas,
            intIdEmpresario: this.#objData.objInfoGeneral.objEmpresario.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario.intIdTipoEmpresario,
            strUsuarioActualizacion: this.#objData?.objInfoGeneral?.strUsuarioCreacion.strEmail,
        };

        this.#objData = newData;
    }

    async #updateDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let query = await dao.updateDiagnosticoExpress(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateHistorico(){
        let data = {
            intIdIdea:this.#objData.objInfoGeneral.intIdIdea,
            intNumeroEmpleados:parseInt(this.#objData.objInfoPerfilEco.intNumeroEmpleados, 10),
            ValorVentas:this.#objData.objInfoPerfilEco.ValorVentaProductoEscogido,
            strTiempoDedicacionAdmin:this.#objData.objInfoEmprendimiento.strTiempoDedicacion,
            intIdFuenteDato:this.#objData.objInfoGeneral.intIdDiagnostico
        };
    
        let service = new serviceUpdateHistorico(data);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
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
}
module.exports = updateDiagnosticoExpress;