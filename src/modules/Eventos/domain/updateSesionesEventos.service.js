
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class updateSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEvento
    #intIdEstado
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#getIdEstado()
        await this.#updateSesionesEventos()
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

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstadoEventos({
            strNombre: "Planeado",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #updateSesionesEventos() {
        let newData = {
            ...this.#objData,
            strNombreModulo: this.#objData?.strNombre,
            intAreaResponsable: this.#objData?.strArea?.intId,
            strResponsables: JSON.stringify(this.#objData.strResponsables || ""),
            dtFechaIni: this.#objData.dtFechaInicio,
            dtFechaFin: this.#objData.dtFechaFin,
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.updateSesionesEventos(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdEvento = query?.data?.intId

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = updateSesionesEventos;