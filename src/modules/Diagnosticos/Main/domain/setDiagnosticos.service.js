//class
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstadoDiagnosticos = require("./getIdEstadoDiagnosticos.service");
const serviceGetTipoDiagnosticos = require("./getTipoDiagnosticos.service");
const serviceGetDiagnosticos = require("./getDiagnosticos.service");

class setDiagnosticos {
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
        await this.#getIdEstado();
        this.#completeData();
        await this.#setDiagnosticos();
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

        let queryGetTipoDiagnosticos = await serviceGetTipoDiagnosticos(
            {
                strNombre: "Normal",
            },
            this.#objUser
        );

        if (queryGetTipoDiagnosticos.error) {
            throw new Error(queryGetTipoDiagnosticos.msg);
        }

        let intIdTipoDiagnostico = queryGetTipoDiagnosticos.data[0].intId;

        if (this.#objData.intIdTipoDiagnostico === intIdTipoDiagnostico) {
            let queryGetIdEstadoEnBorrador = await serviceGetIdEstadoDiagnosticos({
                strNombre: "En borrador",
            },this.#objUser)

            if (queryGetIdEstadoEnBorrador.error) {
                throw new Error(queryGetIdEstadoEnBorrador.msg)
            }

            let queryGetIdEstadoEnProceso= await serviceGetIdEstadoDiagnosticos({
                strNombre: "En Proceso",
            },this.#objUser)

            if (queryGetIdEstadoEnProceso.error) {
                throw new Error(queryGetIdEstadoEnProceso.msg)
            }

            let intIdEstadoDiagnosticoEnBorrador = queryGetIdEstadoEnBorrador.data.intId
            let intIdEstadoDiagnosticoEnProceso = queryGetIdEstadoEnProceso.data.intId

            let queryGetDiagnosticosEnBorrador = await serviceGetDiagnosticos(
                {
                    intIdIdea:this.#objData.intIdIdea,
                    intIdTipoDiagnostico: intIdTipoDiagnostico,
                    intIdEstadoDiagnostico: intIdEstadoDiagnosticoEnBorrador
                },
                this.#objUser
            )

            if (queryGetDiagnosticosEnBorrador.error) {
                throw new Error(queryGetDiagnosticosEnBorrador.msg);
            }

            if (queryGetDiagnosticosEnBorrador.data) {
                throw new Error("Ya existe un diagnostico de tipo Normal en estado en borrador")
            }

            let queryGetDiagnosticosEnProceso = await serviceGetDiagnosticos(
                {
                    intIdIdea:this.#objData.intIdIdea,
                    intIdTipoDiagnostico: intIdTipoDiagnostico,
                    intIdEstadoDiagnostico: intIdEstadoDiagnosticoEnProceso
                },
                this.#objUser
            )

            if (queryGetDiagnosticosEnProceso.error) {
                throw new Error(queryGetDiagnosticosEnProceso.msg);
            }

            if (queryGetDiagnosticosEnProceso.data) {
                throw new Error("Ya existe un diagnostico de tipo Normal en estado en proceso.")
            }
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstadoDiagnosticos(
            {
                strNombre: "En borrador",
            },
            this.#objUser
        );

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIdEstado.data.intId;
    }

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico,
            strUsuarioCreacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setDiagnosticos() {
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.setDiagnosticos(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = setDiagnosticos;
