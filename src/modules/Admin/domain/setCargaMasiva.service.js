//class
const classInterfaceDAOTareas = require("../infra/conectors/");

//Librerias
const validator = require("validator").default;

//functions


class setCargaMasiva {
    //obj info
    #objData;
    #objUser;
    #objResult;

    #intIdEstadoTarea

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
        await this.#setCargaMasiva();
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

    async #setCargaMasiva() {
        let dao = new classInterfaceDAOTareas();

        let newData = {
            ...this.#objData,
            btFinalizada: 0,
            intIdEstadoTarea: this.#intIdEstadoTarea,
            strUsuarioCreacion: this.#objUser.strEmail,
            intIdAreaResponsable: this.#objData.strArea?.intId,
            strResponsable: JSON.stringify(this.#objData?.strResponsable),
            strAreaResponsable: JSON.stringify(this.#objData?.strAreaResponsable)
        };

        let query = await dao.setTarea(newData);

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
module.exports = setCargaMasiva;
