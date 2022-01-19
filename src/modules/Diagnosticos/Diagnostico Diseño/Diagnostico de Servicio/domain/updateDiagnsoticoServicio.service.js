//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOComentarios = require("../infra/conectros/interfaseDAODiagnosticoServicio")

class updateDiagnosticoServicio{
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;

     constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#getIntIdEmpresario()
        await this.#completeData()
        await this.#updateDiagnosticoServicio()
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
        let newData = {
            intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            strUsuarioActualizacion: this.#objUser.strEmail,
            ...this.#objData.objInfoEvaluacion,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoAdicional,
        };
        this.#objData = newData;
    }

    async #updateDiagnosticoServicio(){

        let dao = new classInterfaceDAOComentarios();

        let query = await dao.updateDiagnosticoServicio(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }


        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = updateDiagnosticoServicio;