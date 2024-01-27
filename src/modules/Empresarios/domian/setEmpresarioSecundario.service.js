//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class setEmpresarioSecundario {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //Variables
    #intIdEmpresario;
    #intIdTipoEmpresario;
    #intIdEstado;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
        if (this.#objData.intIdEmpresario) {
            this.#intIdEmpresario = this.#objData.intIdEmpresario;
        }
    }

    async main() {
        await this.#getIdTipoEmpresario();
        await this.#getIdEstado();
        await this.#validations();
        if (this.#objData.intIdEmpresario) {
            await this.#setIdeaEmpresario();
            this.#objResult = {
                error: false,
                msg: "El empresario se registro exitosamente en la idea.",
            };
        } else {
            await this.#setEmpresario();
            await this.#setIdeaEmpresario();
        }
        await this.#sp_SetInfoPrincipalIdea();

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

    async #getIdTipoEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();
        let queryGetIdTipoEmpresario = await dao.getIdTipoEmpresario({
            strNombre: "Secundario",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(query.msg);
        }

        this.#intIdTipoEmpresario = queryGetIdTipoEmpresario.data.intId;
    }

    async #setEmpresario() {
        let prevData = this.#objData;

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrDepartamento: JSON.stringify(
                this.#objData?.arrDepartamento || null
            ),
            arrCiudad: JSON.stringify(this.#objData?.arrCiudad || null),
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresario(newData);

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

    async #setIdeaEmpresario() {
        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdEmpresario: this.#intIdEmpresario,
            intIdTipoEmpresario: this.#intIdTipoEmpresario,
            strTipoRelacion: this.#objData.strTipoRelacion,
            dtFechaInicio: new Date(),
            dtFechaVinculacion: new Date(),
            intIdEstado: this.#intIdEstado,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdeaEmpresario(newData);

        if (query.error && this.#objData.btExiste === false) {
            await this.#rollbackTransaction();
        }
    }

    async #sp_SetInfoPrincipalIdea(){
        const dao = new classInterfaceDAOEmpresarios

        let query = dao.sp_SetInfoPrincipalIdea({intIdIdea: this.#objData.intIdIdea,})

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresarioSecundario;
