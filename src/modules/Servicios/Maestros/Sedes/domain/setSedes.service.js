//class
const classInterfaceDAOSedes = require("../infra/conectors/interfaceDAOSedes");

//Librerias
const validator = require("validator").default;

class setSede {
    #objData;
    #objUser;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#setSede();
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

    async #setSede() {
        let dao = new classInterfaceDAOSedes();

        let query = await dao.setSede(this.#objData);

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
module.exports = setSede;
