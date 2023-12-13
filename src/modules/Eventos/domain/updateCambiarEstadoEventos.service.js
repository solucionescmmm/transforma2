
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetIdEstadoEventos = require("./getIdEstadoEventos.service")

class updateCambiarEstadoEventos {

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
        this.#intIdEvento = data.intIdEvento;
    }

    async main() {
        await this.#validations()
        switch (this.#objData.strEstado) {
            case "Cancelado":
                await this.#getIdEstado(this.#objData?.strEstado)
                await this.#updateEventos()
                break;

            case "Suspendido":
                await this.#getIdEstado(this.#objData?.strEstado)
                await this.#updateEventos()
                break;

            case"En ejecución":
                await this.#getIdEstado(this.#objData?.strEstado)
                await this.#validarSesionesEventos(true)
                await this.#updateEventos()
                break;

            case"Finalizado":
                await this.#getIdEstado(this.#objData?.strEstado)
                await this.#validarSesionesEventos(false)
                await this.#updateEventos()
                break
        
            default:
                this.#objResult = {
                    error: true,
                    msg: "No se ejecuto ningun cambio de estado. Si el error persiste contactar a la mesa de ayuda TI.",
                };
                break;
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

        if (!this.#objData?.strEstado) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIdEstado(strNombre) {
        let queryGetIdEstado = await serviceGetIdEstadoEventos({
            strNombre
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #validarSesionesEventos(btFinalizado) {
        const dao = new classInterfaceDAOEventos();

        let queryGetSesionesEventos = await dao.getSesionesEventos({
            intIdEvento:this.#intIdEvento
        });

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        const arrayDataSesionesEventos = queryGetSesionesEventos.data

        if (!btFinalizado) {
            if (arrayDataSesionesEventos?.length > 0) {
                for (let i = 0; i < arrayDataSesionesEventos.length; i++) {    
                    if (!arrayDataSesionesEventos[i]?.btFinalizado) {
                        throw new Error("El evento que quieres finalizar tiene sesiones activas, finalizalas e intentalo de nuevo.")
                    }
                }
            }
        }else{
            console.log("Entre en true")
            console.log(arrayDataSesionesEventos)
            if (!arrayDataSesionesEventos) {
                throw new Error("El evento no tiene sesiones.")
            }
        }

    }

    async #updateEventos() {
        let newData = {
            ...this.#objData,
            intEstadoEvento: this.#intIdEstado,
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.updateEventos(newData);

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
module.exports = updateCambiarEstadoEventos;