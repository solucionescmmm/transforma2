//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Servicios
const serviceGetIdTipoEmpresario = require("./getIdTipoEmpresario.service");
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class updateInactivarEmpresario {
    #objData;
    #objUser;
    #objResult;
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
        await this.#getIdEstado();
        await this.#updateInactivarEmpresario();

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

        let queryGetIntIdTipoEmpresario = await serviceGetIdTipoEmpresario({
            strNombre: "Primario",
        });

        if (queryGetIntIdTipoEmpresario.error) {
            throw new Error(queryGetIntIdTipoEmpresario.msg);
        }

        let intIdTipoEmpresario = queryGetIntIdTipoEmpresario.data.intId;

        if (this.#objData.intIdTipoEmpresario === intIdTipoEmpresario) {
            throw new Error(
                "El empresario no se puede inactivar porque es el principal."
            );
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #updateInactivarEmpresario() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateInactivarEmpresario(newData);
        

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = updateInactivarEmpresario;
