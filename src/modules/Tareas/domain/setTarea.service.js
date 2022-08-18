//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstadoTarea = require("./getIdEstadoTarea.service");

class setTareas {
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
        this.#completeData();
        await this.#setTareas();
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
            btFinalizada: 0,
            strUsuarioCreacion:this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setTareas() {
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
module.exports = setTareas;
