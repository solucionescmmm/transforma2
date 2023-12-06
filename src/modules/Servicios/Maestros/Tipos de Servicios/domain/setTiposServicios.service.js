//class
const classInterfaceDAOTiposServicios = require("../infra/conectors/interfaceDAOTiposServicios");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");

class setTiposServicios {
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
        await this.#setTiposServicios();
        await this.#setAtributosTiposServicios();

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

        let dao = new classInterfaceDAOTiposServicios();

        let queryGetTipoServicios = await dao.getTiposServicios({});

        if (queryGetTipoServicios.error) {
            throw new Error(queryGetTipoServicios.msg);
        }

        let arrayTipoServicios = queryGetTipoServicios.data;

        for (let i = 0; i < arrayTipoServicios.length; i++) {
            if (this.#objData.strNombre.trim() === arrayTipoServicios[i].strNombre.trim()) {
                throw new Error("El nombre de este tipo servicio ya existe.");
            }
        }

        let arrayAtributos = this.#objData.arrAtributos

        if (arrayAtributos.length > 0) {
            for (let i = 0; i < arrayAtributos.length; i++) {
                if (!arrayAtributos[i].intIdAtributo) {
                    throw new Error("Hay un atributo en este tipo de servicio que no tiene tipo de atributo.");  
                }  
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

    async #setTiposServicios() {
        let dao = new classInterfaceDAOTiposServicios();

        let query = await dao.setTiposServicios(this.#objData);

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

    async #setAtributosTiposServicios() {
        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;
            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOTiposServicios();

                let query = await dao.setAtributosTiposServicios({
                    ...array[i],
                    intIdTipoServicio: this.#intIdTipoServicio,
                    strUsuarioCreacion: this.#objUser.strEmail,
                    intIdEstado: this.#intIdEstado,
                });

                if (query.error) {
                    throw new Error(query.msg);
                }
            }
        }
    }
}
module.exports = setTiposServicios;
