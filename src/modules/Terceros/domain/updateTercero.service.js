//class
const classInterfaceDAOTercero = require("../infra/conectors/interfaceDAOTercero");

//Librerias
const validator = require("validator").default;

//Servicios


class updateTercero {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //Variables

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
        await this.#completeData();
        await this.#updateTercero();
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

    async #completeData() {
        let newData = {
            ...this.#objData,
            strDepartamento: JSON.stringify(this.#objData?.arrDepartamento || null),
            strCiudad: JSON.stringify(this.#objData?.arrCiudad || null),
            strUsuarioCreacion:this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #updateTercero() {
        let dao = new classInterfaceDAOTercero();

        let query = await dao.updateTercero(this.#objData);

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
module.exports = updateTercero;
