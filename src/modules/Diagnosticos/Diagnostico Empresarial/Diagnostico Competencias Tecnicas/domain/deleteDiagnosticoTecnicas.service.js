//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOTecnicas = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");

class deleteDiagnosticoTecnicas {
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#deleteDiagnosticoTecnicas();
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

    async #deleteDiagnosticoTecnicas() {
        let dao = new classInterfaceDAOTecnicas();

        let query = await dao.deleteDiagnosticoTecnicas(this.#objData);

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
module.exports = deleteDiagnosticoTecnicas;