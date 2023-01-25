//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

//Librerias
const validator = require("validator").default;

class setAcompañamiento {
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
        await this.#setAcompañamiento();
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

    async #setAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let query = await dao.setAcompañamiento(this.#objData);

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
module.exports = setAcompañamiento;
