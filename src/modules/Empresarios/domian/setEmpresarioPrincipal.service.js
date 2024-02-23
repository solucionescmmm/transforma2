//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceSetHistorico = require("../../Historicos/domain/setHistorico.service");
const serviceSetDocumento = require("../../Document/domain/setDocumento.service");
const serviceUpdateTercero = require("../../Terceros/domain/updateTercero.service")
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const serviceGetIdFuenteHistorico = require("../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceGetEmpresario = require("./getEmpresario.service");

class setEmpresarioPrincipal {
    //Objetos
    #objData;
    #objDataPersona;
    #objUser;
    #objResult;

    //Variables
    #intIdEmpresario;
    #intIdEmpresa;
    #intIdTipoEmpresario;
    #intIdIdea;
    #intIdIdeaEmpresario;
    #intIdEstadoActivo;
    #intIdEstadoInactivo;
    #intIdEstadoVinculacion;
    #intIdFuenteHistorico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getDataPersona();
        await this.#getIdEstadoActivo();
        await this.#getIdTipoEmpresario();
        await this.#getIdFuenteHistorico();
        await this.#getIdEstadoVinculacion();
        await this.#validations();
        if (this.#objDataPersona?.bitIsEmpresario) {
            await this.#updateEmpresario();
        } else if (this.#objDataPersona) {
            await this.#getIdEstadoInactivo();
            await this.#updateInactivarTercero();
            await this.#setEmpresario();
        } else {
            await this.#setEmpresario();
        }
        await this.#setIdea();
        await this.#setIdeaEmpresario();
        await this.#setEmpresa();
        await this.#setInfoAdicional();
        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio !== "Idea de negocio") {
            await this.#setHistorico()
        }
        if (this.#objData?.objInfoAdicional?.strURLDocumento) {
            await this.#setDocumento()
        }

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

    async #getIdEstadoVinculacion() {
        let dao = new classInterfaceDAOEmpresarios();

        let queryGetIdEstadoVinculacion = await dao.getIdEstadoVinculacion({
            strNombre: "Interesado"
        });

        if (queryGetIdEstadoVinculacion.error) {
            throw new Error(queryGetIdEstadoVinculacion.msg);
        }

        this.#intIdEstadoVinculacion = queryGetIdEstadoVinculacion.data.intId;
    }

    async #getIdTipoEmpresario() {
        const dao = new classInterfaceDAOEmpresarios()
        
        let queryGetIdTipoEmpresario = await dao.getIdTipoEmpresario({
            strNombre: "Principal",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(queryGetIdTipoEmpresario.msg);
        }

        this.#intIdTipoEmpresario = queryGetIdTipoEmpresario.data.intId;
    }

    async #getIdFuenteHistorico() {
        let queryGetIdFuenteHistorico = await serviceGetIdFuenteHistorico({
            strNombre: "Prediagnóstico",
        });

        if (queryGetIdFuenteHistorico.error) {
            throw new Error(queryGetIdFuenteHistorico.msg);
        }

        this.#intIdFuenteHistorico = queryGetIdFuenteHistorico.data.intId;
    }

    async #getDataPersona() {
        let queryGetDataPersona = await serviceGetEmpresario({
            strDocumento: this.#objData.objEmpresario.strNroDocto,
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
            intIdEstado:this.#intIdEstadoActivo,
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

        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuarioActualizacion: this.#objUser.strEmail,
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

    async #setIdea() {
        let newData
        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio === "Idea de negocio") {
            newData = {
                strNombre: `Idea de ${this.#objData.objEmpresario?.strNombres?.trim()} ${this.#objData.objEmpresario.strApellidos?.trim()}`,
                intIdEstado: this.#intIdEstadoActivo,
                intIdEstadoVinculacion:this.#intIdEstadoVinculacion,
                strUsuarioCreacion: this.#objUser.strEmail,
            };
        } else {
            newData = {
                strNombre: this.#objData.objInfoEmpresa?.strNombreMarca,
                intIdEstado: this.#intIdEstadoActivo,
                intIdEstadoVinculacion:this.#intIdEstadoVinculacion,
                strUsuarioCreacion: this.#objUser.strEmail,
            };
        }

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdea(newData);


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
            strModalidadIngreso:this.#objData?.objEmpresario?.strModalidadIngreso,
            dtFechaVinculacion: this.#objData?.objEmpresario?.dtFechaVinculacion,
            strTipoVinculacion: this.#objData?.objEmpresario?.strTipoVinculacion,
            intIdEstadoVinculacion: this.#intIdEstadoVinculacion,
            dtFechaInicio: new Date(),
            intIdEstado: this.#intIdEstadoActivo,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setIdeaEmpresario(newData);


        this.#intIdIdeaEmpresario = query.data.intId;

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
            intIdIdea: this.#intIdIdea,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresa(newData);

        this.#intIdEmpresa = query.data.intId

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
            intIdIdea: this.#intIdIdea,
            strUsuario: this.#objUser.strEmail,
            arrTemasCapacitacion: aux_arrTemasCapacitacion,
            arrComoSeEntero: aux_arrComoSeEntero,
            arrMediosDeComunicacion: aux_arrMediosDeComunicacion,
            strUrlSoporteRecibirInfoCMM: this.#objData.objInfoAdicional?.strURLDocumento || null,
        };

        let query = await dao.setInfoAdicional(newData);


        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setHistorico() {
        let data = {
            intIdIdea: this.#intIdIdea,
            intNumeroEmpleados: this.#objData.objInfoEmpresa.btGeneraEmpleo === true ? parseInt(this.#objData.objInfoEmpresa.intNumeroEmpleados, 10) : 1,
            ValorVentas: this.#objData.objInfoEmpresa.dblValorVentasMes,
            strTiempoDedicacionAdmin: this.#objData.objInfoEmpresa.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato: this.#intIdEmpresa
        };

        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setDocumento() {
        let service = new serviceSetDocumento(
            {
                intIdIdea: this.#intIdIdea,
                strNombre: "Autorización para recibir información de CMM",
                strObservaciones: "Autorización que da la persona empresaria para recibir información de CMM.",
                strUrlDocumento: this.#objData.objInfoAdicional?.strURLDocumento,
            },
            this.#objUser
        );
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let queryIdeaEmpresario = await dao.deleteIdeaEmpresario({
            intId: this.#intIdIdeaEmpresario
        })

        let queryIdea = await dao.deleteIdea({
            intId: this.#intIdIdea
        })

        let queryEmpresa = await dao.deleteInfoEmpresa({
            intId: this.#intIdEmpresario,
        });

        let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        if (queryIdeaEmpresario.error) {
            throw new Error(queryIdeaEmpresario.msg)
        }

        if (queryIdea.error) {
            throw new Error(queryIdea.msg)
        }

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

module.exports = setEmpresarioPrincipal;
