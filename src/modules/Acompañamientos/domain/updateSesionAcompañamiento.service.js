//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

//Librerias
const validator = require("validator").default;

class updateSesionAcompañamiento {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //Variables
    #intIdAcompañamiento

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        console.log(this.#objData)
        // await this.#validations();
        // await this.#completeData();
        // await this.#updateAcompañamiento();
        // await this.#updateRutaAcompañamiento();
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

    async #completeData() {
        let newData = {
            ...this.#objData,
            strUsuarioActualizacion:this.#objUser.strEmail,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };
        this.#objData = newData;
    }

    async #updateAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();
        let newData = {
            ...this.#objData,
            strUsuarioActualizacion:this.#objUser.strEmail,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };

        let query = await dao.updateAcompañamiento(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdAcompañamiento = query.data.intId

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateRutaAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();
        
        let queryDeleteRutaAcompañamiento = await dao.deleteRutaAcompañamiento({
            intIdAcompañamiento:this.#intIdAcompañamiento
        })
        if(queryDeleteRutaAcompañamiento.error){
            throw new Error(queryDeleteRutaAcompañamiento.msg)
        }
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
module.exports = updateSesionAcompañamiento;