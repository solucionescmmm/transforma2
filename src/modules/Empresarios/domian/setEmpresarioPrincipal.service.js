//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");
const serviceGetIdTipoServicio = require("./getIdTipoEmpresario.service");
const serviceGetIdFuenteHistorico = require("../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceSetHistorico = require("../../Historicos/domain/setHistorico.service")

class setEmpresarioPrincipal {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    //Variables
    #intIdEmpresario;
    #intIdEmpresa;
    #intIdTipoEmpresario;
    #intIdIdea;
    #intIdIdeaEmpresario;
    #intIdEstado;
    #intIdFuenteHistorico;
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
        await this.#getIdFuenteHistorico();
        await this.#setEmpresario();
        await this.#setIdea();
        await this.#setIdeaEmpresario();
        await this.#setEmpresa();
        await this.#setInfoAdicional();
        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio !== "Idea de negocio") {
            await this.#setHistorico()
        }

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
            strNombre: "Principal",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(query.msg);
        }

        this.#intIdTipoEmpresario = queryGetIdTipoEmpresario.data.intId;
    }

    async #getIdFuenteHistorico() {
        let queryGetIdFuenteHistorico = await serviceGetIdFuenteHistorico({
            strNombre: "Prediagnóstico",
        });

        if (queryGetIdFuenteHistorico.error) {
            throw new Error(query.msg);
        }

        this.#intIdFuenteHistorico = queryGetIdFuenteHistorico.data.intId;
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
        let newData
        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio === "Idea de negocio") {
            newData = {
                strNombre:`Idea de ${this.#objData.objEmpresario.strNombres} ${this.#objData.objEmpresario.strApellidos}`,
                intIdEstado:this.#intIdEstado,
                strUsuarioCreacion: this.#objUser.strEmail,
            };  
        }else{
            newData = {
                strNombre:this.#objData.objInfoEmpresa?.strNombreMarca,
                intIdEstado:this.#intIdEstado,
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
            dtFechaInicio: new Date(),
            intIdEstado: this.#intIdEstado,
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
        };

        let query = await dao.setInfoAdicional(newData);
        
        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setHistorico(){
        let data = {
            intIdIdea:this.#intIdIdea,
            intNumeroEmpleados:parseInt(this.#objData.objInfoEmpresa.intNumeroEmpleados, 10),
            ValorVentas:this.#objData.objInfoEmpresa.dblValorVentasMes,
            strTiempoDedicacionAdmin:this.#objData.objInfoEmpresa.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato:this.#intIdEmpresa
        };
    
        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let queryIdeaEmpresario = await dao.deleteIdeaEmpresario({
            intId:this.#intIdIdeaEmpresario
        })

        let queryIdea =await dao.deleteIdea({
            intId:this.#intIdIdea
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
