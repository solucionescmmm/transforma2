//class
const classInterfaceDAOAreas = require("../infra/conectors/interfaseDAOAreas");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getAreas = require("./getAreas.service");

class setAreas {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstado;

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
        await this.#getIdEstado();
        this.#completeData();
        await this.#setAreas();
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

        let queryGetAreas = await getAreas({}, this.#objUser);

        if (queryGetAreas.error) {
            throw new Error(queryGetAreas.msg);
        }

        let arrayAreas = queryGetAreas.data;

        
        for (let i = 0; i < arrayAreas.length; i++) {
            if (this.#objData.strNombre.trim() === arrayAreas[i].strNombre.trim()) {
                throw new Error("El nombre de esta área ya existe.");
            }
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "En borrador",
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
            strUsuarioCreacion:this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setAreas() {
        let dao = new classInterfaceDAOAreas();

        let query = await dao.setAreas(this.#objData);

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
module.exports = setAreas;
