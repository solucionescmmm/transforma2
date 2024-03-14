//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Services
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class updateEmpresarioSecundario {
    //Objects
    #objData;
    #objUser;
    #objEmpresarioActual;

    //Variables
    #intIdEmpresarioActual;
    #intIdEstado;
    #intIdIdea
    #intIdTipoEmpresario;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
        this.#intIdIdea = data.intIdIdea
    }

    async main() {
        await this.#getEmpresario();
        await this.#getIdEstado();
        await this.#validations();
        await this.#updateEmpresario();
        await this.#updateIdeaEmpresario();

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
            this.#objData.strNroDocto ===
            this.#objEmpresarioActual.strNroDocto
        ) {
            btMismaCedula = true;
        }

        if (!btMismaCedula) {
            let dao = new classInterfaceDAOEmpresarios();
            let queryGetNroDoctoEmpresario =
                await dao.getNroDocumentoEmpresario({
                    strNroDocto: this.#objData.strNroDocto,
                });

            if (queryGetNroDoctoEmpresario.data) {
                throw new Error(
                    `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
                );
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

    async #getEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.getEmpresario({
            intId: this.#objData?.objEmpresario?.intId || this.#objData?.intIdEmpresario,
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
        let prevData = this.#objData;

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrPais: JSON.stringify(this.#objData?.arrPais || null),
            arrDepartamento: JSON.stringify(
                this.#objData?.arrDepartamento || null
            ),
            arrCiudad: JSON.stringify(this.#objData?.arrCiudad || null),
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

    async #updateIdeaEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateIdeaEmpresario({
            strTipoRelacionPrincipal: this.#objData.strTipoRelacion,
            intIdIdea: this.#objData?.intIdIdea,
            intIdEmpresario: this.#objData?.intIdEmpresario,
            intIdTipoEmpresario: this.#objData?.intIdTipoEmpresario,
            intIdEstado: this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail
        });

        
        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let rollEmpresario = await dao.updateEmpresario(
            this.#objEmpresarioActual
        );

        if (rollEmpresario.error) {
            throw new Error(rollEmpresario.msg);
        }

        this.#objResult = {
            error: true,
            msg: rollEmpresario.error
                ? rollEmpresario.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateEmpresarioSecundario;
