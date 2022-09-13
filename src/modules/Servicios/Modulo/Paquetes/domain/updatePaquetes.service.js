//class
const classInterfaceDAOPaquetes = require("../infra/conectors/interfaceDAOPaquetes");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getPaquetes = require("./getPaquetes.service");

class updatePaquetes {
    #objData;
    #objUser;
    #objResult;
    #intIdServicio;

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
        if (typeof this.#objData.bitActivar !== "undefined") {
            await this.#getIdEstado();
            await this.#updatePaquetes();
            return this.#objResult;
        }else{
            await this.#updatePaquetes();
            await this.#updateModuloPaquetes();
            await this.#updateSedeTipoTarifaServicio();
            await this.#updateAreasPaquetes();
            await this.#updateResultServcio();
            return this.#objResult;
        }
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

        if (typeof this.#objData.bitActivar === "undefined") {
            let queryGetPaquetes = await getPaquetes({}, this.#objUser);

            if (queryGetPaquetes.error) {
                throw new Error(queryGetPaquetes.msg);
            }
    
            let arrayPaquetes = queryGetPaquetes.data;
    
            if (arrayPaquetes?.length > 0 ) {
                for (let i = 0; i < arrayPaquetes.length; i++) {
                    let strNombreRepetido =0
                    if (this.#objData.objInfoPrincipal.strNombre?.trim() === arrayPaquetes[i].objInfoPrincipal.strNombre?.trim()) {
                        strNombreRepetido++;
                    }
                    if (strNombreRepetido === 2) {
                        throw new Error("El nombre de esta áreas ya existe.");
                    }
                }
            } 
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: this.#objData.bitActivar === true ? "Activo" : "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #updatePaquetes() {
        let dao = new classInterfaceDAOPaquetes();


        let query = await dao.updatePaquetes({
            intId: this.#objData.intId,
            ...this.#objData.objInfoPrincipal,
            intIdEstado: this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail,
        });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdServicio = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateModuloPaquetes() {
        let dao = new classInterfaceDAOPaquetes();

        let queryModuloPaquetes = await dao.deleteModuloPaquetes({
            intId: this.#intIdServicio,
        });

        if (queryModuloPaquetes.error) {
            throw new Error(queryModuloPaquetes.msg);
        }

        if (this.#objData.objInfoPrincipal.bitModulos) {
            if (this.#objData.arrModulos.length > 0) {
                let array = this.#objData.arrModulos;

                for (let i = 0; i < array.length; i++) {
                    let dao = new classInterfaceDAOPaquetes();

                    let query = await dao.setModuloPaquetes({
                        ...array[i],
                        strResponsables: JSON.stringify(
                            array[i]?.arrResponsables
                        ),
                        strUsuarioActualizacion: this.#objUser.strEmail,
                        intIdServicio: this.#intIdServicio
                    });

                    if (query.error) {
                        await this.#rollbackTransaction();
                        throw new Error(query.msg);
                    }
                }
            }
        }
    }

    async #updateSedeTipoTarifaServicio() {
        let dao = new classInterfaceDAOPaquetes();

        let querySedeTipoTarifaServicio =
            await dao.deleteSedeTipoTarifaPaquetes({
                intId: this.#intIdServicio,
            });

        if (querySedeTipoTarifaServicio.error) {
            throw new Error(querySedeTipoTarifaServicio.msg);
        }
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOPaquetes();

                let query = await dao.setSedeTipoTarifaServicio({
                    ...array[i],
                    strUsuarioActualizacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    await this.#rollbackTransaction();
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #updateAreasPaquetes() {
        let dao = new classInterfaceDAOPaquetes();

        let queryAreasPaquetes = await dao.deleteAreaPaquetes({
            intId: this.#intIdServicio,
        });

        if (queryAreasPaquetes.error) {
            throw new Error(queryAreasPaquetes.msg);
        }

        if (this.#objData.arrResponsables.length > 0) {
            let array = this.#objData.arrResponsables;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOPaquetes();

                let query = await dao.setAreasPaquetes({
                    ...array[i],
                    strUsuarioActualizacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    await this.#rollbackTransaction();
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #updateResultServcio() {
        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOPaquetes();

                let query = await dao.setResultPaquetes({
                    intIdServicio: this.#intIdServicio,
                    intIdAtributo: array[i].intIdAtributo,
                    strResultAtributo: array[i]?.[array[i].strNombreAtributo],
                });

                if (query.error) {
                    await this.#rollbackTransaction();
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOPaquetes();

        let queryPaquetes = await dao.deletePaquetes({
            intId: this.#intIdServicio,
        });

        if (queryPaquetes.error) {
            this.#objResult = {
                error: true,
                msg: queryPaquetes.msg,
            };
        }

        this.#objResult = {
            error: true,
            msg: "La actulización del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updatePaquetes;
