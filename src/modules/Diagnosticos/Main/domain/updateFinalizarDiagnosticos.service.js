//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

//Services
const serviceSetRutaVacia = require("../../../Rutas/domain/setRutaVacia.service")


class updateFinalizarDiagnosticos {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstadoDiagnostico;

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
        await this.#getIntIdEstadoDiagnostico()
        await this.#updateFinalizarDiagnosticos();
        if (this.#objData.btConRuta === true) {
            await this.#setRutasPlaneada()
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

    }

    async #getIntIdEstadoDiagnostico() {
        const dao = new classInterfaceDAODiagnosticos()

        let queryGetIntIdEstadoDiagnostico = await dao.getIdEstadoDiagnosticos({
            strNombre: this.#objData.btConRuta === true ? "Finalizado con ruta" : "Finalizado",
        });

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #updateFinalizarDiagnosticos() {
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.updateDiagnosticos({
            ...this.#objData,
            intIdEstadoDiagnostico:this.#intIdEstadoDiagnostico
        });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setRutasPlaneada() {
        let data = {
            intIdIdea: this.#objData.intIdIdea,
            strObservaciones: `Ruta creada apartir de la finalización del diagnóstico #${this.#objData.intIdDiagnostico}`,
            strResponsable: '{}',
            strTipoRuta:"Planeada",
            arrInfoFases: [{
                strObservaciones: `Ruta creada apartir de la finalización del diagnóstico #${this.#objData.intIdDiagnostico}`,
                arrPaquetes: null,
                arrServicios: null,
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
}
module.exports = updateFinalizarDiagnosticos;