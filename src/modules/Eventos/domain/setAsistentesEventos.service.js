
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class setAsistentesEventos {

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
        // await this.#setAsistentesEventos()
        // await this.#setAreasEventos()
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

    async #setAsistentesEventos() {
        let dao = new classInterfaceDAOEventos();

        let arrEmpresarios = this.#objData.arrEmpresarios
        let arrTerceros = this.#objData.arrTerceros

        for (let i = 0; i < arrEmpresarios.length; i++) {
            let data = {
                intIdEvento: this.#objData.intIdEvento,
                intIdIdea: arrEmpresarios[i]?.intIdIdea,
                intIdEmpresario: arrEmpresarios[i]?.intId,
                intIdTercero: null,
                intTipoEmpresario: arrEmpresarios[i]?.intTipoEmpresario,
                btFinalizoEvento: false
            }
    
            let query = await dao.setAsistentesEventos(data);
    
            if (query.error) {
                throw new Error(query.msg);
            }
            
        }

        for (let i = 0; i < arrTerceros.length; i++) {
            let data = {
                intIdEvento: this.#objData.intIdEvento,
                intIdIdea: null,
                intIdEmpresario: null,
                intIdTercero: arrTerceros[i]?.intId,
                intTipoEmpresario: null,
                btFinalizoEvento: false
            }
    
            let query = await dao.setAsistentesEventos(data);
    
            if (query.error) {
                throw new Error(query.msg);
            }
            
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = setAsistentesEventos;