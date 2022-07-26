//class
const classInterfaceDAOTipoTarifa = require("../infra/conectors/interfaceDAOTipoTarifa");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getTipoTarifa = require("./getTipoTarifa.service");

class updateTipoTarifa {
    #objData;
    #objUser;
    #objResult;

     //variables
     #intIdEstado;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        if (typeof this.#objData.bitActivar !== "undefined") {
            await this.#getIdEstado();
            this.#completeData();
        }
        await this.#updateTipoTarifa();
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

        let queryGetTipoTarifa = await getTipoTarifa({}, this.#objUser);

        if (queryGetTipoTarifa.error) {
            throw new Error(queryGetTipoTarifa.msg);
        }

        let arrayTipoTarifa = queryGetTipoTarifa.data;

        for (let i = 0; i < arrayTipoTarifa.length; i++) {
            let strNombreRepetido = 0;
            if (this.#objData.strNombre?.trim() === arrayTipoTarifa[i].strNombre?.trim()) {
                strNombreRepetido++;
            }
            if (strNombreRepetido === 2) {
                throw new Error("El nombre de esta áreas ya existe.");
            }
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre:
                this.#objData.bitActivar === true ? "Activo" : "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #updateTipoTarifa() {
        let dao = new classInterfaceDAOTipoTarifa();

        let query = await dao.updateTipoTarifa(this.#objData);

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
module.exports = updateTipoTarifa;