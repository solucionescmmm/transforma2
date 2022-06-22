//class
const classInterfaceDAOTiposServicios = require("../infra/conectors/interfaceDAOTiposServicios");

//Librerias
const validator = require("validator").default;

class updateTiposServicios {
    #objData;
    #objUser;
    #objResult;
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
        await this.#updateTiposServicios();
        await this.#updateAtributosTiposServicios();
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
        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;
            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOTiposServicios();

                let query = await dao.updateAtributosTiposServicios({
                    ...array[i],
                    intIdTipoServicio: this.#intIdTipoServicio,
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
