//Librerias
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//services
const getEmpresario = require("./getEmpresario.service");

class updateEmpresario {
    #objData;
    #objEmpresarioActual;
    #intIdEmpresario;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
    }

    async main() {
        await this.#validations();
        await this.#getEmpresario();
        return this.#objResult;
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objData.strUsuario, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
        let queryGetEmpresario = await getEmpresario();
        let arrEmpresarios = queryGetEmpresario.data;
        for (let i = 0; i < arrEmpresarios.length; i++) {
            if (this.#objData.strNroDocto === arrEmpresarios[i].strNroDocto) {
                throw new Error(
                    "Ya existe un empresario con este mismo número de identificación"
                );
            }
        }
    }

    async #getEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.getEmpresario({ intId: this.#objData.intId });

        if (query.error) {
            throw new Error(query.msg);
        }

        if (!query.data) {
            throw new Error(`El empresario no existe`);
        }

        this.#objEmpresarioActual = query.data[0];
    }

    async #completeData() {

    }
}
module.exports = updateEmpresario;
