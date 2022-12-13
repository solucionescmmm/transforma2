//clases
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Servicios
const serviceGetRutas = require("./getRutas.service");
const serviceGetIdEstado = require("./getIdEstadoRutas.service");

class deleteRutas {
    #intIdRutas;
    #intIdIdea;
    #intIdEstado;

    #objDataRuta;
    #objResult;

    constructor(objParms) {
        this.#intIdRutas = objParms.intId;
        this.#intIdIdea = objParms.intIdIdea;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstado();
        await this.#getRuta();
        await this.#validateData();
        await this.#deleteRutas();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdRutas) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #getRuta() {
        let queryGetRuta = await serviceGetRutas({
            intId: this.#intIdRutas,
            intIdIdea: this.#intIdIdea,
        });

        if (queryGetRuta.error) {
            throw new Error(queryGetRuta.msg);
        }

        this.#objDataRuta = queryGetRuta.data[0];
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "En borrador",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #validateData() {
        let array = this.#objDataRuta.arrInfoFases;

        if (array?.length > 0) {
            for (let i = 0; i < array.length; i++) {
            }
        }
    }

    async #deleteRutas() {
        let dao = new classInterfaceDAORutas();
        let query = await dao.deleteRutas({
            intId: this.#intIdRutas,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Rutas"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = deleteRutas;
