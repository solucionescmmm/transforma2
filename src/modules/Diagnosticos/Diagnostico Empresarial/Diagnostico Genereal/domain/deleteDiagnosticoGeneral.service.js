//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOGeneral = require("../infra/conectors/interfaseDAODiagnosticoGeneral");

class deleteDiagnosticoGeneral {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#deleteDiagnosticoGeneral();
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

        if (!this.#objData?.intId) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #deleteDiagnosticoGeneral() {
        let dao = new classInterfaceDAOGeneral();

        let query = await dao.deleteDiagnosticoGeneral(this.#objData);

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
module.exports = deleteDiagnosticoGeneral;