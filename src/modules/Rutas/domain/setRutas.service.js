//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");
const getRutas = require("./getRutas.service");

class setRutas {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdRuta;
    #intIdFase;
    #intIdEstado;

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
        await this.#getIdEstado();
        this.#completeData();
        await this.#setRutas();
        await this.#setFases();
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

        let queryGetRutas = await getRutas({}, this.#objUser);

        if (queryGetRutas.error) {
            throw new Error(queryGetRutas.msg);
        }

        let arrayRutas = queryGetRutas.data;

        for (let i = 0; i < arrayRutas.length; i++) {
            if (
                this.#objData.strNombre.trim() ===
                arrayRutas[i].strNombre.trim()
            ) {
                throw new Error("El nombre de esta área ya existe.");
            }
        }
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

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
            strUsuarioCreacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setRutas() {
        let dao = new classInterfaceDAORutas();

        let query = await dao.setRutas(this.#objData.objRuta);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdRuta = query.data[0].intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setFases() {
        let dao = new classInterfaceDAORutas();
        let arrayFases = this.#objData.arrFases;

        if (arrayFases.length <= 0) {
            throw new Error("El array de las fases esta vacio.");
        }

        for (let i = 0; i < arrayFases.length; i++) {
            let objDataFase = arrayFases[i];

            let query = await dao.setFases({
                ...objDataFase,
                intIdRuta: this.#intIdRuta,
                intIdEstadoFase: this.#intIdEstado,
                strUsuarioCreacion: this.#objUser.strEmail,
            });

            if (query.error) {
                throw new Error(query.msg);
            }

            this.#intIdFase = query.data[0].intId;

            let arrPaquetes = objDataFase[i].arrPaquetes;

            if (arrPaquetes.length > 0) {
                for (let j = 0; j < arrPaquetes.length; j++) {
                    let objDataPaquete = arrPaquetes[i];

                    await this.#setPaquetesFases(objDataPaquete);

                    if (objDataPaquete.bitProyectosPaquete) {
                        
                    }
                }
            }

            let arrServicios = objDataFase[i].arrPaquetes;

            if (arrPaquetes.length > 0) {
                for (let j = 0; j < arrPaquetes.length; j++) {
                    let objDataPaquete = arrPaquetes[i];

                    let query = await dao.setFases({
                        ...objDataPaquete,
                        intIdFase: this.#intIdFase,
                        intIdEstadoFase: this.#intIdEstado,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }
                }
            }
        }
    }

    async #setPaquetesFases(data) {
        let dao = new classInterfaceDAORutas();

        let query = await dao.setPaquetesFases({
            ...data,
            intIdFase: this.#intIdFase,
            strUsuarioCreacion: this.#objUser.strEmail,
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = setRutas;
