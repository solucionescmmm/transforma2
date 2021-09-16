//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

class updateEmpresario {
    #objData;
    #objEmpresarioActual;
    #intIdEmpresarioActual;
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
        await this.#updateEmpresario();
        await this.#updateEmprendimiento();
        await this.#updateEmpresarioSecundario();

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
        let queryGetNroDoctoEmpresario = await dao.getNroDocumentoEmpresario({
            strNroDocto: this.#objData.objEmpresario.strNroDocto,
        });

        if (queryGetNroDoctoEmpresario.data) {
            throw new Error(
                `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
            );
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
        this.#intIdEmpresarioActual = query.data[0].intId;
    }

    async #updateEmpresario() {
        let prevData = this.#objData.objEmpresario;

        let newData = {
            ...prevData,
            intId: this.#intIdEmpresarioActual,
            strUsuario: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresario(newData);

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

    async #updateEmpresa() {}

    async #updateEmprendimiento() {
        let prevData = this.#objData.objInfoEmprendimiento;

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresarioActual,
            strUsuario: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmprendimiento(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateEmpresarioSecundario() {
        let dao = new classInterfaceDAOEmpresarios();
        for (let i = 0; i < this.#objData.arrEmpresarioSecundario.length; i++) {
            let prevData = this.#objData.arrEmpresarioSecundario[i];

            let newData = {
                ...prevData,
                intIdEmpresarioPrincipal: this.#intIdEmpresarioActual,
                strUsuario: this.#objUser.strEmail,
            };

            let query = await dao.updateEmpresarioSecundario(newData);

            if (query.error) {
                await this.#rollbackTransaction();
            }
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let rollEmpresario = await dao.updateEmpresario(
            this.#objEmpresarioActual.objEmpresario
        );
        let rollEmprendimiento = await dao.updateEmprendimiento(
            this.#objEmpresarioActual.objInfoEmprendimiento
        );
        let rollEmpresa = await dao.updateEmpresa(
            this.#objEmpresarioActual.objInfoEmpresa
        );

        for (
            let i = 0;
            i < this.#objEmpresarioActual.arrEmpresarioSecundario.length;
            i++
        ) {
            let rollEmpresarioSecundario = await dao.updateEmpresarioSecundario(
                this.#objEmpresarioActual.arrEmpresarioSecundario[i]
            );

            if (rollEmpresarioSecundario.error) {
                throw new Error(rollEmpresarioSecundario.msg);
            }
        }

        if (rollEmpresario.error) {
            throw new Error(rollEmpresario.msg);
        }

        if (rollEmpresa.error) {
            throw new Error(rollEmpresa.msg);
        }

        if (rollEmprendimiento.error) {
            throw new Error(rollEmprendimiento.msg);
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateEmpresario;
