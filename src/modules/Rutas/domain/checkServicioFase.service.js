//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;

class checkServicioFase {
    //obj info
    #objData;
    #objUser;
    #objResult;

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
        await this.#checkServicioFase();
        await this.#checkServicioObjetivoFase()
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

    async #checkServicioFase() {
        let dao = new classInterfaceDAORutas();

        let newData = {
            intId: this.#objData.intIdServicioFase,
            btFinalizado: true,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let query = await dao.checkServicioFase(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #checkServicioObjetivoFase() {
        let dao = new classInterfaceDAORutas();

        let array = this.#objData.arrObjetivos;

        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let objData = array[i];

                let newData = {
                    ...objData,
                    strUsuarioActualizacion: this.#objUser.strEmail,
                };

                let query = await dao.checkServicioObjetivoFase(newData);

                if (query.error) {
                    throw new Error(query.msg);
                }
            }
        }
    }
}
module.exports = checkServicioFase;