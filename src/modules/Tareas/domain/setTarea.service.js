//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

class setTarea {
    //obj info
    #objData;
    #objUser;
    #objResult;

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
        await this.#setTarea();
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
            btFinalizada: 0,
            strUsuarioCreacion:this.#objUser.strEmail,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };
        this.#objData = newData;
    }

    async #setTarea() {
        let dao = new classInterfaceDAOTareas();

        let query = await dao.setTarea(this.#objData);

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
module.exports = setTarea;
