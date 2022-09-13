//class
const classInterfaceDAOPaquetes = require("../infra/conectors/interfaceDAOPaquetes");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getPaquetes = require("./getPaquetes.service");

class setPaquetes {
    #objData;
    #objUser;
    #objResult;
    #intIdPaquete;

    //variables
    #intIdEstado;

    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstado();
        await this.#setPaquetes();
        await this.#setServiciosPaquetes();
        await this.#setSedeTipoTarifaPaquete();
        await this.#setAreasPaquetes();
        await this.#setResultServcio();
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

        //let queryGetPaquetes = await getPaquetes({}, this.#objUser);
//
        //if (queryGetPaquetes.error) {
        //    throw new Error(queryGetPaquetes.msg);
        //}
//
        //let arrayPaquetes = queryGetPaquetes.data;
//
        //if (arrayPaquetes?.length > 0) {
        //    for (let i = 0; i < arrayPaquetes.length; i++) {
        //        if (this.#objData.objInfoPrincipal.strNombre.trim() === arrayPaquetes[i].objInfoPrincipal.strNombre.trim()) {
        //            throw new Error("El nombre de este servicio ya existe.");
        //        }
        //    }
        //}
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

    async #setPaquetes() {
        let dao = new classInterfaceDAOPaquetes();

        let query = await dao.setPaquetes({
            ...this.#objData.objInfoPrincipal,
            intIdEstado: this.#intIdEstado,
            strUsuarioCreacion: this.#objUser.strEmail,
        });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdPaquete = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setServiciosPaquetes() {
        if (this.#objData.objInfoPrincipal.bitModulos) {
            if (this.#objData.arrServicios.length > 0) {
                let array = this.#objData.arrServicios;

                for (let i = 0; i < array.length; i++) {
                    if (array[i].intHoras !== "") {
                        let dao = new classInterfaceDAOPaquetes();

                        let query = await dao.setServiciosPaquetes({
                            ...array[i],
                            intIdPaquete: this.#intIdPaquete,
                            strUsuarioCreacion: this.#objUser.strEmail,
                        });

                        if (query.error) {
                            await this.#rollbackTransaction();
                            throw new Error(query.msg);
                        }
                    }
                }
            }
        }
    }

    async #setSedeTipoTarifaPaquete() {
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                if (array[i].intIdSede !== "") {
                    let dao = new classInterfaceDAOPaquetes();

                    let query = await dao.setSedeTipoTarifaPaquete({
                        ...array[i],
                        intIdPaquete: this.#intIdPaquete,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        await this.#rollbackTransaction();
                        throw new Error(query.msg);
                    }
                }
            }
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOPaquetes();

        let queryPaquetes = await dao.deletePaquetes({
            intId: this.#intIdPaquete,
        });

        if (queryPaquetes.error) {
            this.#objResult = {
                error: true,
                msg: queryPaquetes.msg,
            };
        }

        this.#objResult = {
            error: true,
            msg: "El registro del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = setPaquetes;
