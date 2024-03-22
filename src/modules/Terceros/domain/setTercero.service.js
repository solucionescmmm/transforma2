//class
const classInterfaceDAOTercero = require("../infra/conectors/interfaceDAOTercero");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class setTercero {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //Variables
     #intIdEstado

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
        await this.#completeData();
        await this.#setTercero();
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

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Activo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #completeData() {
        let newData = {
            ...this.#objData.objInfoPrincipal,
            intIdEstado: this.#intIdEstado,
            strPais: JSON.stringify(this.#objData.objInfoPrincipal?.arrPais || null),
            strDepartamento: JSON.stringify(this.#objData.objInfoPrincipal?.arrDepartamento || null),
            strCiudad: JSON.stringify(this.#objData.objInfoPrincipal?.arrCiudad || null),
            strUsuarioCreacion:this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setTercero() {
        let dao = new classInterfaceDAOTercero();

        let query = await dao.setTercero(this.#objData);

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
module.exports = setTercero;
