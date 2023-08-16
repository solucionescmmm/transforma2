
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class setAsistentesSesionesEventos {

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
        console.log(this.#objData)
        // await this.#validations()
        // await this.#setAsistentesSesionesEventos()
        // return this.#objResult;
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

    async #setAsistentesSesionesEventos() {
        let newData = {
            ...this.#objData,
            
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.setAsistentesSesionesEventos(newData);

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
module.exports = setAsistentesSesionesEventos;