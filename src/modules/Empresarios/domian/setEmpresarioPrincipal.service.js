//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const serviceGetIdTipoServicio = require("./getIdTipoEmpresario.service");

class setEmpresario {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //Variables
    #intIdEmpresario;
    #intIdTipoEmpresario;
    #intIdIdea;
    #intIdEstado;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstado();
        await this.#getIdTipoEmpresario();
        await this.#setEmpresario();
        await this.#setIdea();
        await this.#setIdeaEmpresario();
        await this.#setEmpresa();
        await this.#setInfoAdicional();

        return this.#objResult;
    }

    async #validations() {
        let dao = new classInterfaceDAOEmpresarios();

        if (
            !validator.isEmail(this.#objUser.strEmail, {
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
        let queryGetIdTipoEmpresario = await serviceGetIdTipoServicio({
            strNombre: this.#objData.objEmpresario.bitRepresentante
                ? "Principal"
                : "Secundario",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(query.msg);
        }

        this.#intIdTipoEmpresario = queryGetIdTipoEmpresario.data.intId;
    }

    async #setEmpresario() {
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

        let query = await dao.setEmpresarios(newData);

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

    async #setIdea() {
        let prevData = this.#objData.objIdea;

        let newData = {
            ...prevData,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdea(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdIdea = query.data.intId;

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setIdeaEmpresario() {
        let newData = {
            intIdIdea: this.#intIdIdea,
            intIdEmpresario: this.#intIdEmpresario,
            intIdTipoEmpresario: this.#intIdTipoEmpresario,
            dtFechaInicio: new Date(),
            intIdEstado: this.#intIdEstado,
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

    async #setEmpresa() {
        let prevData = this.#objData.objInfoEmpresa;

        let aux_arrCategoriasSecundarias = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrCategoriasSecundarias || null
        );
        let aux_arrFormasComercializacion = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrFormasComercializacion || null
        );
        let aux_arrMediosDigitales = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrMediosDigitales || null
        );
        let aux_arrRequisitosLey = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrRequisitosLey || null
        );
        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresa(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setInfoAdicional() {
        let dao = new classInterfaceDAOEmpresarios();

        let prevData = this.#objData.objInfoAdicional;

        let aux_arrTemasCapacitacion = JSON.stringify(
            this.#objData.objInfoAdicional?.arrTemasCapacitacion || null
        );
        let aux_arrComoSeEntero = JSON.stringify(
            this.#objData.objInfoAdicional?.arrComoSeEntero || null
        );
        let aux_arrMediosDeComunicacion = JSON.stringify(
            this.#objData.objInfoAdicional?.arrMediosDeComunicacion || null
        );

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
            arrTemasCapacitacion: aux_arrTemasCapacitacion,
            arrComoSeEntero: aux_arrComoSeEntero,
            arrMediosDeComunicacion: aux_arrMediosDeComunicacion,
        };

        let query = await dao.setInfoAdicional(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let queryEmpresa = await dao.deleteInfoEmpresa({
            intId: this.#intIdEmpresario,
        });

        let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        if (queryEmpresa.error) {
            this.#objResult = {
                error: true,
                msg: queryEmpresa.error
                    ? queryEmpresa.msg
                    : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
            };
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresario;
