//class
const classInterfaceDAOAtributos = require("../infra/conectors/interfaceDAOAtributos");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const getAtributos = require("./getAtributos.service");

class setAtributos {
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
        await this.#getIdEstado();
        this.#completeData();
        await this.#setAtributos();
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

        let queryGetAtributos = await getAtributos({}, this.#objUser);

        if (queryGetAtributos.error) {
            throw new Error(queryGetAtributos.msg);
        }

        let arrayAtributos = queryGetAtributos.data;

        for (let i = 0; i < arrayAtributos.length; i++) {
            if (this.#objData.strNombre.trim() === arrayAtributos[i].strNombre.trim()) {
                throw new Error("El nombre de este atributo ya existe.");
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

    async #setAtributos() {
        let dao = new classInterfaceDAOAtributos();

        let query = await dao.setAtributos(this.#objData);

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
module.exports = setAtributos;
