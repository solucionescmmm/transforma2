//class
const classInterfaceDAOObjetivos = require("../infra/conectors/interfaseDAOObjetivos");

//Librerias
const validator = require("validator").default;
const apiCache = require("apicache-plus");
//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const getObjetivos = require("./getObjetivos.service");

class setObjetivos {
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
        await apiCache.clear()
        await this.#validations();
        await this.#getIdEstado();
        this.#completeData();
        await this.#setObjetivos();
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

        let queryGetObjetivos = await getObjetivos({
            strNombre: this.#objData?.strNombre.trim()
        }, this.#objUser);

        if (queryGetObjetivos.error) {
            throw new Error(queryGetObjetivos.msg);
        }

        if (queryGetObjetivos.data) {
            let arrayObjetivos = queryGetObjetivos.data;

            if (arrayObjetivos?.length > 0) {
                for (let i = 0; i < arrayObjetivos.length; i++) {
                    if (
                        this.#objData.strNombre.trim() ===
                        arrayObjetivos[i].strNombre.trim()
                    ) {
                        throw new Error("El nombre de este objetivo ya existe.");
                    }
                }
            }
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

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
            strUsuarioCreacion:this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setObjetivos() {
        let dao = new classInterfaceDAOObjetivos();

        let query = await dao.setObjetivos(this.#objData);

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
module.exports = setObjetivos;
