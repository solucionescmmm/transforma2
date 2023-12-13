//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const serviceGetIdTipoServicio = require("./getIdTipoEmpresario.service");
const serviceGetIdEmpresarioPrincipal = require("./getIdEmpresarioPrincipal.service")

class setCambioEmpresarioPrincipal {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //Variables
    #intIdEmpresario;
    #intIdTipoEmpresarioPrincipal;
    #intIdTipoEmpresarioSecundario;
    #intIdEmpresarioPrincipal
    #intIdEstadoActivo;
    #intIdEstadoInactivo;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstadoActivo();
        await this.#getIdEstadoInactivo();
        await this.#getIdTipoEmpresarioPrincipal();
        await this.#getIdTipoEmpresarioSecundario();
        await this.#getIdEmpresarioPrincipal();
        await this.#updateEmpresarioPrincipal();
        await this.#updateEmpresarioSecundario();
        await this.#setIdeaEmpresarioPrincipalNuevo();
        await this.#setIdeaEmpresarioSecundarioNuevo();
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

        if (!this.#objData) {
            throw new Error("Se esperaban parametros de entrada.")
        }
        
    }

    async #getIdEstadoActivo() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Activo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoActivo = queryGetIdEstado.data.intId;
    }

    async #getIdEstadoInactivo() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoInactivo = queryGetIdEstado.data.intId;
    }

    async #getIdTipoEmpresarioPrincipal() {
        let queryGetIdTipoEmpresario = await serviceGetIdTipoServicio({
            strNombre: "Principal",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(query.msg);
        }

        this.#intIdTipoEmpresarioPrincipal = queryGetIdTipoEmpresario.data.intId;
    }

    async #getIdTipoEmpresarioSecundario() {
        let queryGetIdTipoEmpresario = await serviceGetIdTipoServicio({
            strNombre: "Secundario",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(query.msg);
        }

        this.#intIdTipoEmpresarioSecundario = queryGetIdTipoEmpresario.data.intId;
    }

    async #getIdEmpresarioPrincipal() {
        let queryGetIdEmpresarioPrincipal = await serviceGetIdEmpresarioPrincipal({
            intIdIdea: this.#objData.intIdIdea,
            intIdTipoEmpresario: this.#intIdTipoEmpresarioPrincipal
        });

        if (queryGetIdEmpresarioPrincipal.error) {
            throw new Error(query.msg);
        }

        this.#intIdEmpresarioPrincipal = queryGetIdEmpresarioPrincipal.data.intIdEmpresario;
    }

    async #updateEmpresarioPrincipal(){
        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdEmpresario: this.#intIdEmpresarioPrincipal,
            intIdEstado:this.#intIdEstadoInactivo,
            dtFechaFin: new Date(),
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateFechaFinEmpresario(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateEmpresarioSecundario(){
        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdEmpresario: this.#objData.intIdEmpresario,
            intIdEstado:this.#intIdEstadoInactivo,
            dtFechaFin: new Date(),
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateFechaFinEmpresario(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setIdeaEmpresarioPrincipalNuevo() {
        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdEmpresario: this.#objData.intIdEmpresario,
            intIdTipoEmpresario: this.#intIdTipoEmpresarioPrincipal,
            dtFechaInicio: new Date(),
            intIdEstado: this.#intIdEstadoActivo,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdeaEmpresario(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setIdeaEmpresarioSecundarioNuevo() {
        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdEmpresario: this.#intIdEmpresarioPrincipal,
            intIdTipoEmpresario: this.#intIdTipoEmpresarioSecundario,
            strTipoRelacion:this.#objData.objEmpresario.strTipoRelacion,
            dtFechaInicio: new Date(),
            intIdEstado: this.#intIdEstadoActivo,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdeaEmpresario(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        if (query.error) {
            await this.#rollbackTransaction();
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: "Se realizo el cambio de empresario principal exitosamente.",
        };
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

module.exports = setCambioEmpresarioPrincipal;