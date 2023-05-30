//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

//Servicios


class updateDiagnosticos {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        this.#completeData();
        await this.#updateDiagnosticos();
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

    #completeData() {
        let newData = {
            ...this.#objData,
            strUsuarioCreacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #updateDiagnosticos() {
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.updateDiagnosticos(this.#objData);

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
module.exports = updateDiagnosticos;
