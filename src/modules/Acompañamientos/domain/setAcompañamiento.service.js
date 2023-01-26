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
        await this.#setAcompañamiento();
        await this.#setRutasAcompañamiento();
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
              throw new Error(query.msg)
            }

            this.#intIdDocumento = query.data.intId
        }
    }

    async #setAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();
        let newData = {
            ...this.#objData,
            strUsuarioCreacion: this.#objUser.strEmail,
            intIdDocumento:this.#intIdDocumento,
            strResponsables: JSON.stringify(this.#objData?.strResponsables),
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

    async #setRutasAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();
        let array = this.#objData.arrPaqueteServicioFase;

        for (let i = 0; i < array.length; i++) {
            let newData = {
                ...array[i],
                intIdAcompañamiento: this.#intIdAcompañamiento,
                strUsuarioCreacion: this.#objUser.strEmail,
            };
            let query = await dao.setRutasAcompañamiento(newData);

            if (query.error) {
                throw new Error(query.msg);
            }
        }
    }
}
module.exports = setAcompañamiento;
