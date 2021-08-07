//Librerias
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

class setEmpresario {
    #objData;
    #intIdEmpreasrio;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
    }

    async main() {
        await this.#setEmpresario();
        await this.#setEmpresa();
        await this.#setEmprendimiento();

        return this.#objResult;
    }

    async #setEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmpresarios(this.#objData.dataEmpresario);
        if (query.error) {
            throw new Error(query.msg);
        }
        this.#intIdEmpreasrio = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
    async #setEmpresa() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmpresa(this.#objData.dataEmpresa);
        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmprendimiento() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmprendimineto(
            this.#objData.dataEmprendimiento
        );
        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.deleteEmpresario({
            intIdEmpresario: this.#intIdEmpreasrio,
        });

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresario;
