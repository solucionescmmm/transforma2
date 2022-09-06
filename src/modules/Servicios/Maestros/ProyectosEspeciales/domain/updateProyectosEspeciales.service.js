//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAOProyectosEspeciales = require("../infra/conectors/interfaseDAOProyectosEspeciales");

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getProyectosEspeciales = require("./getProyectosEspeciales.service");


class updateProyectosEspeciales {
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
        if (typeof this.#objData.bitActivar !== "undefined") {
            await this.#getIdEstado();
            this.#completeData();
        }
        await this.#updateProyectosEspeciales();
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

        let queryGetProyectosEspeciales = await getProyectosEspeciales({}, this.#objUser);

        if (queryGetProyectosEspeciales.error) {
            throw new Error(queryGetProyectosEspeciales.msg);
        }

        let arrayProyectosEspeciales = queryGetProyectosEspeciales.data;

        for (let i = 0; i < arrayProyectosEspeciales.length; i++) {
            let strNombreRepetido = 0;
            if (this.#objData.strNombre?.trim() === arrayProyectosEspeciales[i].strNombre?.trim()) {
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

    async #updateProyectosEspeciales() {
        let dao = new classInterfaceDAOProyectosEspeciales();

        let query = await dao.updateProyectosEspeciales(this.#objData);

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
module.exports = updateProyectosEspeciales;
