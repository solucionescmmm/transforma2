//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const serviceGetEmpresario = require("./getEmpresario.service");
const serviceUpdateTercero = require("../../Terceros/domain/updateTercero.service")

class setEmpresarioSecundario {
    //Objetos
    #objData;
    #objUser;
    #objResult;
    #objDataPersona;

    //Variables
    #intIdEmpresario;
    #intIdTipoEmpresario;
    #intIdEstado;
    #intIdEstadoInactivo;
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
        await this.#getDataPersona();
        await this.#getIdTipoEmpresario();
        await this.#getIdEstado();
        await this.#validations();
        if (this.#objDataPersona?.bitIsEmpresario) {
            await this.#updateEmpresario();
            await this.#setIdeaEmpresario();
            this.#objResult = {
                error: false,
                msg: "El empresario se registro exitosamente en la idea.",
            };
        } else if (this.#objDataPersona) {
            await this.#getIdEstadoInactivo();
            await this.#updateInactivarTercero();
            await this.#setEmpresario();
            await this.#setIdeaEmpresario();
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

    async #getIdEstadoInactivo() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoInactivo = queryGetIdEstado.data.intId;
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

    async #getDataPersona() {
        let queryGetDataPersona = await serviceGetEmpresario({
            strDocumento: this.#objData.strNroDocto,
        }, this.#objUser);

        if (queryGetDataPersona.error) {
            throw new Error(queryGetDataPersona.msg);
        }

        this.#objDataPersona = queryGetDataPersona.data ? queryGetDataPersona.data[0] : null;
    }

    async #updateInactivarTercero() {
        let newData ={
            objInfoPrincipal:{
                ...this.#objDataPersona,
                intIdEstado:this.#intIdEstadoInactivo
            }
        }

        let service = new serviceUpdateTercero(newData, this.#objUser);
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #setEmpresario() {
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

    async #updateEmpresario() {
        let prevData = this.#objData.objEmpresario;

        let aux_arrPais = JSON.stringify(
            this.#objData.objEmpresario?.arrPais || null
        );
        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuarioActualizacion: this.#objUser.strEmail,
            arrPais: aux_arrPais,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresario(newData);

        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }

        this.#intIdEmpresario = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: `La iniciativa de la persona ${query.data?.strNombres} ${query.data?.strApellidos}, fue registrada con éxito.`,
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

        let query = dao.sp_SetInfoPrincipalIdea({intIdIdea: this.#objData.intIdIdea})

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
