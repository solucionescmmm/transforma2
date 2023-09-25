
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class updateEventos {

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
        await this.#deleteAreasEventos()
        await this.#updateEventos()
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

    async #deleteAreasEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdEvento: this.#objData.intId
        }

        let query = await dao.deleteAreasEventos(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

    }

    async #updateEventos() {
        let newData = {
            ...this.#objData,
            intIdSede: this.#objData.strSede,
            intIdTipoEvento: this.#objData.intTipoEvento,
            strInvolucrados: JSON.stringify(this.#objData.arrInvolucrados || ""),
            strResponsable: JSON.stringify(this.#objData.strResponsable || ""),
            intIdServicio: this.#objData?.strServicio?.objInfoPrincipal?.intId || this.#objData?.strServicio,
            btPago: this.#objData.bitPago === "Sí" ? true : false,
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.updateEventos(newData);

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
        let dao = new classInterfaceDAOEventos();

        for (let i = 0; i < array.length; i++) {
            let data = {
                intIdEvento: this.#intIdEvento,
                intIdArea: array[i]?.intId,
            }

            let query = await dao.setAreasEventos(data);

            if (query.error) {
                throw new Error(query.msg);
            }

        }

    }

}
module.exports = updateEventos;