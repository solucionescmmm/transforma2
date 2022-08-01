//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

class updateEmpresarioSecundario {
    #objData;
    #objUser;
    #objEmpresarioActual;
    #intIdEmpresarioActual;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getEmpresario();
        await this.#validations();
        await this.#updateEmpresario();
        await this.#updateIdea();
        await this.#updateEmpresa();
        await this.#updateInfoAdicional();

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

        let btMismaCedula = false;
        if (
            this.#objData.objEmpresario.strNroDocto ===
            this.#objEmpresarioActual.strNroDocto
        ) {
            btMismaCedula = true;
        }

        if (!btMismaCedula) {
            let dao = new classInterfaceDAOEmpresarios();
            let queryGetNroDoctoEmpresario =
                await dao.getNroDocumentoEmpresario({
                    strNroDocto: this.#objData.objEmpresario.strNroDocto,
                });

            if (queryGetNroDoctoEmpresario.data) {
                throw new Error(
                    `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
                );
            }
        }
    }

    async #getEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.getEmpresario({
            intId: this.#objData.objEmpresario.intId,
        });

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

        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresario(newData);

        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let rollEmpresario = await dao.updateEmpresario(
            this.#objEmpresarioActual.objEmpresario
        );

        if (rollEmpresario.error) {
            throw new Error(rollEmpresario.msg);
        }

        if (rollEmpresa.error) {
            throw new Error(rollEmpresa.msg);
        }

        if (rollAdicional.error) {
            throw new Error(rollAdicional.msg);
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateEmpresarioSecundario;
