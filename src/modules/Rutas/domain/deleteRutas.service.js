//clases
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");

class deleteRutas {
    #intIdRutas;
    #intIdIdea;
    #intIdEstado;

    #objDataRuta;
    #objUser;
    #objResult;

    constructor(objParms, strDataUser) {
        this.#intIdRutas = objParms.intId;
        this.#intIdIdea = objParms.intIdIdea;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#deleteCache();
        await this.#getIdEstado();
        await this.#getRuta();
        await this.#validations();
        await this.#deleteRutas();
        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdRutas) {
            throw new Error("Se esperaban parametros de entrada");
        }

        if (!this.#validateData()) {
            throw new Error(
                "No se puede eliminar la ruta, al tener una o mas fases en un estado diferente al En Borrador."
            );
        }
    }

    async #deleteCache() {
        await apiCache.clear();
    }

    async #getRuta() {
        let dao = new classInterfaceDAORutas();

        let queryGetRuta = await dao.getEstadoFase(
            {
                intId: this.#intIdRutas,
                intIdIdea: this.#intIdIdea,
            },
            this.#objUser
        );

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

    #validateData() {
        let array = this.#objDataRuta.arrFasesRutas;
        let conuntFases = 0;

        if (array?.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let objDataFase = array[i];
                if (objDataFase.intIdEstadoFase === this.#intIdEstado) {
                    conuntFases = conuntFases + 1;
                }
            }
        }

        if (conuntFases === array.length) {
            return true;
        } else {
            return false;
        }
    }

    async #deleteRutas() {
        if (this.#validateData()) {
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
}
module.exports = deleteRutas;
