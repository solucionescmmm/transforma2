//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOServicio = require("../infra/conectros/interfaseDAODiagnosticoServicio")

class setDiagnosticoServicio{
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;

    /**
     * @param {object} data
     */
     constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#getIntIdEmpresario()
        await this.#completeData()
        await this.#setDiagnosticoServicio()
        await this.#setResultDiagnosticoServicio()
        return this.#objResult;
    }

    async #validations(){
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

    async #getIntIdEmpresario(){
        this.#intIdEmpresario=this.#objData.objInfoGeneral.intId;
    }

    async #completeData(){
        console.log(this.#objData)
        let newData = {
            intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEvaluacion,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoAdicional,
        };
        this.#objData = newData;
    }

    async #setDiagnosticoServicio(){

        let dao = new classInterfaceDAOServicio();

        let query = await dao.setDiagnosticoServicio(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setResultDiagnosticoServicio(){
        let dao = new classInterfaceDAOServicio();

        let query = await dao.setResultDiagnosticoServicio({intIdEmpresario: this.#intIdEmpresario});

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = setDiagnosticoServicio;