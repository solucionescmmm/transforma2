//class
const classInterfaceDAOTiposServicios = require("../infra/conectors/interfaceDAOTiposServicios");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const getTipoServicios = require("./getTiposServicios.service");

class updateTiposServicios {
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstado;
    #intIdTipoServicio;

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
        this.#completeData();
        await this.#updateTiposServicios();
        await this.#updateAtributosTiposServicios();
        if (this.#objData.bitActivar === true) {
            await this.#updateActivarAtributosTiposServicios()
        }
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

        let queryGetTipoServicios = await getTipoServicios({}, this.#objUser);

        if (queryGetTipoServicios.error) {
            throw new Error(queryGetTipoServicios.msg);
        }

        let arrayTipoServicios = queryGetTipoServicios.data;

        for (let i = 0; i < arrayTipoServicios.length; i++) {
            if (this.#objData.strNombre === arrayTipoServicios[i].strNombre) {
                throw new Error("El nombre de este tipo servicio ya existe.");
            }
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre:
                this.#objData.bitActivar === true
                    ? "Activo"
                    : this.#objData.bitActivar === false
                    ? "Inactivo"
                    : "En borrador",
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

    async #updateTiposServicios() {
        let dao = new classInterfaceDAOTiposServicios();

        let query = await dao.updateTiposServicios(this.#objData);

        this.#intIdTipoServicio = query.data.intId;

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateAtributosTiposServicios() {
        let dao = new classInterfaceDAOTiposServicios();

        let queryModuloServicios = await dao.deleteAtributoTiposServicios({
            intId: this.#objData.intId,
        });

        if (queryModuloServicios.error) {
            throw new Error(queryModuloServicios.msg);
        }

        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;
            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOTiposServicios();

                let query = await dao.setAtributosTiposServicios({
                    ...array[i],
                    intIdTipoServicio: this.#intIdTipoServicio,
                    intIdEstado: this.#intIdEstado,
                    strUsuarioCreacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #updateActivarAtributosTiposServicios() {
        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;
            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOTiposServicios();

                let query = await dao.updateAtributosTiposServicios({
                    ...array[i],
                    intIdTipoServicio: this.#intIdTipoServicio,
                    intIdEstado: this.#intIdEstado,
                    strUsuarioCreacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    throw new Error(query.msg);
                }
            }
        }
    }
}
module.exports = updateTiposServicios;
