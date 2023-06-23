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
        await this.#validations();
        await this.#getIdFuenteHistorico();
        await this.#getIntIdEstadoDiagnostico();
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
            strNombre: "Diagnóstico Express",
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

    async #completeData() {
        let newData = {
            //Objeto de Información Express
            
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
