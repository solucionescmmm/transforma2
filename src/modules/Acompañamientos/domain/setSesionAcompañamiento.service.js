//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

//Librerias
const validator = require("validator").default;

//Service
const serviceSetDocumento = require("../../Document/domain/setDocumento.service");

class setAcompañamiento {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //Variable
    #intIdAcompañamiento;
    #intIdDocumento = null;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#setSesionAcompañamiento();
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
            throw new Error("Se esperaban parámetros de entrada.");
        }

        if (this.#objData.strURLDocumento !== "") {
            this.#setDocumento();
        }
    }

    async #setSesionAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();
        
        let newData = {
            ...this.#objData,
            intIdAcompañamiento: this.#objData.intIdAcompañamiento,
            intIdEmpresario: this.#objData.objEmpresario?.intId,
            dtmFechaInicial: this.#objData.dtmFechaInicial,
            dtmFechaFinal: this.#objData.dtmFechaFinal,
            intIdRuta: this.#objData?.objInfoRutaExs?.objRuta?.objInfoPrincipal?.intId || null,
            intIdFase: this.#objData?.objInfoRutaExs?.objFase?.intId || null,
            intIdPaquete: this.#objData?.objNuevoServPaq?.objPaquete?.objInfoPrincipal?.intId || null,
            intIdServicio: this.#objData?.objNuevoServPaq?.objServicio?.objInfoPrincipal?.intId || this.#objData?.objInfoRutaExs?.objServicio?.objServicio?.objInfoPrincipal?.intId || null,
            strUbicacion: this.#objData.strUbicacion,
            intIdTipoActividad: this.#objData.intIdTipoActividad,
            strResponsables: JSON.stringify(this.#objData.strResponsables || ""),
            strTemasActividades: this.#objData.strTemasActividades,
            strLogrosAvances: this.#objData.strLogros,
            strObservaciones: this.#objData.strObservaciones,
            intIdTarea: null,
            dtmProximaActividad: this.#objData.dtmProximaActividad,
            intIdDocumento: this.#intIdDocumento,
            strUsuarioCreacion: this.#objUser.strEmail,
            btFinalizado: false,
        };

        let query = await dao.setSesionAcompañamiento(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setDocumento() {
        let service = new serviceSetDocumento(
            {
                intIdIdea: this.#objData.intIdIdea,
                strNombre: "Archivo de Acompañamiento",
                strObservaciones: "Archivo creado por un Acompañamiento",
                strUrlDocumento: this.#objData.strURLDocumento,
            },
            this.#objUser
        );
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdDocumento = query.data.intId;
    }
}
module.exports = setAcompañamiento;
