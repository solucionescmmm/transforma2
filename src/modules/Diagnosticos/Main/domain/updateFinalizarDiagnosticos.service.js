//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

//Services
const serviceSetRutaVacia = require("../../../Rutas/domain/setRutaVacia.service");
const serviceGetDiagnosticosHijos = require("./getDiagnosticosHijos.service");

class updateFinalizarDiagnosticos {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstadoDiagnostico;
    #bitDiagnosticoEmpresarial;
    #bitDiagnosticoDiseño;
    #bitDiagnosticoGeneral;
    #bitDiagnosticoTecnico;
    #bitDiagnosticoHumano;
    #bitDiagnosticoProducto;
    #bitDiagnosticoServicio;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getDiagnosticosHijos();
        await this.#validations();
        await this.#getIntIdEstadoDiagnostico();
        await this.#updateFinalizarDiagnosticos();
        if (this.#objData.btConRuta === true) {
            await this.#setRutasPlaneada();
        }
        return this.#objResult;
    }

    async #getDiagnosticosHijos() {
        const query = await serviceGetDiagnosticosHijos(
            {
                intId: this.#objData?.intIdDiagnostico,
                btFinalizado: true,
            },
            this.#objUser
        );

        if (query.error) {
            throw new Error(query.msg);
        }

        const data = query.data[0];

        this.#bitDiagnosticoGeneral = data.objDiagnosticoGeneral ? true : false;
        this.#bitDiagnosticoHumano = data.objDiagnosticoHumanoSocial
            ? true
            : false;
        this.#bitDiagnosticoTecnico = data.objDiagnosticoCompetenciasTecnicas
            ? true
            : false;
        this.#bitDiagnosticoProducto = data.objDiagnosticoProductos
            ? true
            : false;
        this.#bitDiagnosticoServicio = data.objDiagnosticoServicios
            ? true
            : false;

        this.#bitDiagnosticoEmpresarial =
            data.objDiagnosticoGeneral &&
            data.objDiagnosticoHumanoSocial &&
            data.objDiagnosticoCompetenciasTecnicas
                ? true
                : false;
        this.#bitDiagnosticoDiseño =
            data.objDiagnosticoProductos || data.objDiagnosticoServicios
                ? true
                : false;
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

        if (!this.#bitDiagnosticoEmpresarial) {
            if (!this.#bitDiagnosticoGeneral) {
                throw new Error(
                    "Falta el diagnóstico general por diligenciar y finalizar"
                );
            }

            if (!this.#bitDiagnosticoHumano) {
                throw new Error(
                    "Falta el diagnóstico competencias humanas por diligenciar y finalizar"
                );
            }

            if (!this.#bitDiagnosticoTecnico) {
                throw new Error(
                    "Falta el diagnóstico competencias tecnicas por diligenciar y finalizar"
                );
            }
        }

        // if (!this.#bitDiagnosticoDiseño) {
        //     if (!this.#bitDiagnosticoProducto) {
        //         throw new Error(
        //             "Falta el diagnóstico de diseño de producto por diligenciar y finalizar"
        //         );
        //     }

        //     if (!this.#bitDiagnosticoServicio) {
        //         throw new Error(
        //             "Falta el diagnóstico de diseño de servicio por diligenciar y finalizar"
        //         );
        //     }
        // }
    }

    async #getIntIdEstadoDiagnostico() {
        const dao = new classInterfaceDAODiagnosticos();

        let queryGetIntIdEstadoDiagnostico = await dao.getIdEstadoDiagnosticos({
            strNombre:
                this.#objData.btConRuta === true
                    ? "Finalizado con ruta"
                    : "Finalizado",
        });

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico =
            queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #updateFinalizarDiagnosticos() {
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.updateDiagnosticos({
            ...this.#objData,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico,
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
            intIdDiagnostico:this.#objData?.intIdDiagnostico,
            intIdIdea: this.#objData.intIdIdea,
            strObservaciones: `Ruta creada a partir de la finalización del diagnóstico #${
                this.#objData.intIdDiagnostico
            }`,
            strResponsable: "{}",
            strTipoRuta: "Planeada",
            strEstado:"En borrador",
            arrInfoFases: [
                {
                    strObservaciones: `Ruta creada a partir de la finalización del diagnóstico #${
                        this.#objData.intIdDiagnostico
                    }`,
                    arrPaquetes: null,
                    arrServicios: null,
                },
            ],
        };

        let service = new serviceSetRutaVacia(data, this.#objUser);
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateFinalizarDiagnosticos;
