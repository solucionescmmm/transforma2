//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

//Librerias
const validator = require("validator").default;

//Service
const serviceSetDocumento = require("../../Document/domain/setDocumento.service");
const serviceSetRutaVacia = require("../../Rutas/domain/setRutaVacia.service")
const serviceSetFinalizarServicio = require("../../Rutas/domain/checkServicioFase.service")
const serviceGetTipoAcompañamiento = require("../domain/getTipoAcompañamiento.service")

class setAcompañamiento {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //Variable
    #intIdAcompañamiento;
    #intIdDocumento = null;
    #strTipoAcompañamiento;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getTipoAcompañamiento()
        await this.#validations();
        await this.#setAcompañamiento();
        await this.#setSesionAcompañamiento();
        if (this.#strTipoAcompañamiento === "Para un nuevo servicio") {
            await this.#setRutasNoPlaneada()
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
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        if (this.#objData.strURLDocumento !== "") {
            await this.#setDocumento();
        }

        if (this.#objData.objObjetivos.bitFinalizaServ) {
            await this.#setFinalizarServicio()
        }
    }

    async #getTipoAcompañamiento(){
        let query = await serviceGetTipoAcompañamiento({intId:this.#objData.intTipoAcomp},this.#objUser)

        if (query.error) {
            throw new Error(query.msg)
        }
        
        this.#strTipoAcompañamiento = query.data?.[0]?.strNombre
    }

    async #setAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdTipoAcompañamiento: this.#objData.intTipoAcomp,
            strUsuarioCreacion: this.#objUser.strEmail,
            btFinalizado: false
        };

        let query = await dao.setAcompañamiento(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdAcompañamiento = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setSesionAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let newData = {
            ...this.#objData,
            intIdEmpresario: this.#objData.objEmpresario?.intId,
            dtmFechaInicial: this.#objData.dtmFechaInicio,
            dtmFechaFinal: this.#objData.dtmFechaFinal,
            intIdRuta: this.#objData?.objInfoRutaExs?.objRuta?.objInfoPrincipal?.intId || null,
            intIdFase: this.#objData?.objInfoRutaExs?.objFase?.intId || null,
            intIdPaquete: null,
            intIdServicio: this.#objData?.objNuevoServPaq?.objServicio?.objInfoPrincipal?.intId || this.#objData?.objInfoRutaExs?.objServicio?.objServicio?.objInfoPrincipal?.intId || null,
            strUbicacion: this.#objData.strLugarActividad,
            intIdTipoActividad: this.#objData.intTipoActividad,
            strResponsables: JSON.stringify(this.#objData.objResponsable),
            strTemasActividades: this.#objData.strActividades,
            strLogrosAvances: this.#objData.strLogros,
            strObservaciones: this.#objData.strRetroAlim,
            intIdTarea: null,
            dtmProximaActividad: this.#objData.dtmFechaProx,
            intIdDocumento: this.#intIdDocumento,
            intIdAcompañamiento: this.#intIdAcompañamiento,
            strUsuarioCreacion: this.#objUser.strEmail,
            btFinalizado: this.#objData?.bitFinalizarSesion
        };

        let query = await dao.setSesionAcompañamiento(newData);

        if (query.error) {
            throw new Error(query.msg);
        }
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

    async #setRutasNoPlaneada() {
        let data = {
            intIdIdea: this.#objData.intIdIdea,
            strObservaciones: "Ruta creada a partir de un acompañamiento",
            strResponsable: this.#objData.objResponsable[0],
            strNombre:`Ruta no planeada del servicio ${ 
                this.#objData.objNuevoServPaq?.objServicio?.objInfoPrincipal?.strNombre
            }`,
            strTipoRuta:"No planeada",
            arrInfoFases: [{
                strObservaciones: "Ruta creada a partir de un acompañamiento",
                arrServicios: this.#objData.objNuevoServPaq?.objServicio ? [
                    {
                        ...this.#objData?.objNuevoServPaq?.objServicio,
                        objSedeTarifa: this.#objData?.objNuevoServPaq?.objSedeTarifa
                    }
                ] : null,
            }]
        }

        let service = new serviceSetRutaVacia(
            data,
            this.#objUser
        );
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #setFinalizarServicio(){
        let arrObjetivos = []

        for (const [key, value] of Object.entries(this.#objData.objObjetivos)) {
            let newKey = parseInt(key)
            if (!isNaN(newKey)) {
                arrObjetivos.push({intIdObjetivo: newKey, ...value,})
            }
        }

        let data = {
            intIdServicioFase: this.#objData.objInfoRutaExs?.objServicio?.intId,
            arrObjetivos
        }

        let service = new serviceSetFinalizarServicio({
            data,
            strDataUser: this.#objUser
        });

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }

    }
}
module.exports = setAcompañamiento;
