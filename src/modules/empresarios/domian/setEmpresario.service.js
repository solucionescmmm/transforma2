//Librerias
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

class setEmpresario {
    #objData;
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
        await this.#setEmpresario();
        await this.#setEmpresa();
        await this.#setEmprendimiento();

        return this.#objResult;
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objData.dataEmpresario.strUsuario, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
    }

    async #setEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmpresarios(this.#objData.dataEmpresario);
        if (query.error) {
            throw new Error(query.msg);
        }
        this.#intIdEmpresario = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
    async #setEmpresa() {
        let prevData = this.#objData.dataEmpresa;
        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
        };
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmpresa(newData);
        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmprendimiento() {
        let prevData = this.#objData.dataEmprendimiento;
        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
        };
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.setEmprendimineto(newData);
        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.deleteEmpresario({
            intIdEmpresario: this.#intIdEmpresario,
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
