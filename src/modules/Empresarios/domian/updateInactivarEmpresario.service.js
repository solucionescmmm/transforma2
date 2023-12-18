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

    //Variables
    #intIdEstadoInactivo;
    #intIdEstadoActivo;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstadoActivo();
        await this.#getIdEstadoInactivo();
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
            strNombre: "Principal",
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

    async #getIdEstadoActivo() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Activo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoActivo = queryGetIdEstado.data.intId;
    }

    async #getIdEstadoInactivo() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoInactivo = queryGetIdEstado.data.intId;
    }

    async #updateInactivarEmpresario() {
        let newData = {
            //...this.#objData,
            intIdIdea:this.#objData.intIdIdea,
            intIdEmpresario: this.#objData.intId,
            intIdEstadoActivo:this.#intIdEstadoActivo,
            intIdEstadoInactivo: this.#intIdEstadoInactivo,
            strUsuarioActualizacion: this.#objUser.strEmail,
            dtFechaFin: new Date(),
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
