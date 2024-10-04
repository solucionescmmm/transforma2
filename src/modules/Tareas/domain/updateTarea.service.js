//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

class updateTarea {
    //obj info
    #objData;
    #objUser;
    #objResult;

    #strNombreEsatdo

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getEstadoTarea();
        await this.#validations();
        await this.#completeData();
        await this.#updateTarea();
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

    async #getEstadoTarea(){
        const dao = new classInterfaceDAOTareas()
        let queryGetIdEstado = await dao.getEstadoTarea({
            intId: this.#objData.intIdEstado
        }, this.#objUser);

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#strNombreEsatdo = queryGetIdEstado.data[0]?.strNombre
    }

    async #completeData() {
        let newData = {
            ...this.#objData,
            btFinalizada: this.#strNombreEsatdo === "Realizada" ? 1 : this.#strNombreEsatdo === "No atendida" ? 1 : this.#strNombreEsatdo === "Cancelada" ? 1 : 0,
            strUsuarioActualizacion: this.#objUser.strEmail,
            intIdEstadoTarea: this.#objData.intIdEstado,
            intIdAreaResponsable: this.#objData.strArea?.intId,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };
        this.#objData = newData;
    }

    async #updateTarea() {
        let dao = new classInterfaceDAOTareas();

        let query = await dao.updateTarea(this.#objData);

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
module.exports = updateTarea;