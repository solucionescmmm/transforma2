
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class setEventos {

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
        await this.#setEventos()
        await this.#setAreasEventos()
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

    async #setEventos() {
        let newData = {
            ...this.#objData,
            intIdSede: this.#objData.strSede,
            intIdTipoEvento: this.#objData.intTipoEvento,
            strInvolucrados: JSON.stringify(this.#objData.arrInvolucrados || ""),
            strResponsable: JSON.stringify(this.#objData.strResponsable || ""),
            intIdServicio: this.#objData?.strServicio?.objInfoPrincipal?.intId,
            intEstadoEvento: this.#intIdEstado,
            btPago: this.#objData.bitPago === "Sí" ? true : false,
            intNumSesiones: 0
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.setEventos(newData);

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

    async #setAreasEventos() {
        const array = this.#objData?.arrAreas;

        for (let i = 0; i < array.length; i++) {
            let data = {
                intIdEvento: this.#intIdEvento,
                intIdArea: array[i]?.intId,
            }
            let dao = new classInterfaceDAOEventos();

            let query = await dao.setAreasEventos(data);

            if (query.error) {
                throw new Error(query.msg);
            }

        }

    }

}
module.exports = setEventos;