//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

//Librerias
const validator = require("validator").default;

//Service
const serviceSetDocumento = require("../../Document/domain/setDocumento.service");
const serviceSetRutaNoPlaneada = require("../../Rutas/domain/setRutaNoPlaneada.service")

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
        await this.#setAcompañamiento();
        await this.#setSesionAcompañamiento();
        if (this.#objData) {
            
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

        if (this.#objData.strURLDocumento) {
            this.#setDocumento();
        }
    }

    async #setAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let newData = {
            intIdIdea: this.#objData.intIdIdea,
            intIdTipoAcompañamiento: this.#objData.intTipoAcomp,
            strUsuarioCreacion: this.#objUser.strEmail,
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
            intIdDocumento: this.#intIdDocumento,
            intIdAcompañamiento: this.#intIdAcompañamiento,
            strUsuarioCreacion: this.#objUser.strEmail,
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
            strObservaciones: "Ruta creada apartir de un acompañamiento",
            arrInfoFases: [{
                strObservaciones: "Ruta creada apartir de un acompañamiento",
                arrPaquetes: this.#objData.objNuevoServPaq?.objPaquete ? [this.#objData.objNuevoServPaq?.objPaquete] : null,
                arrServicios: this.#objData.objNuevoServPaq?.objServicio ? [this.#objData.objNuevoServPaq?.objServicio] : null,
            }]
        }

        let service = new serviceSetRutaNoPlaneada(
            data,
            this.#objUser
        );
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = setAcompañamiento;
