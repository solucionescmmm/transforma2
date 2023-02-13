//class
const classInterfaceDAOPaquetes = require("../infra/conectors/interfaceDAOPaquetes");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const serviceGetPaquetes = require("./getPaquetes.service");

class updatePaquetes {
    #objData;
    #objDataPaqueteAnterior;
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
        if (typeof this.#objData.bitActivar !== "undefined") {
            await this.#getIdEstado();
            await this.#updatePaquetes();
            return this.#objResult;
        } else {
            await this.#getDataPaquete();
            await this.#updatePaquetes();
            await this.#updateServiciosPaquetes();
            await this.#updateSedeTipoTarifaServicio();
            await this.#updateAreasServicio();
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
            let queryGetPaquetes = await getPaquetes(
                { strNombre: this.#objData.objInfoPrincipal.strNombre.trim()},
                this.#objUser
            );

            if (queryGetPaquetes.error) {
                throw new Error(queryGetPaquetes.msg);
            }

            if (queryGetPaquetes.data) {
                let arrayPaquetes = queryGetPaquetes.data;

                if (arrayPaquetes?.length > 0) {
                    for (let i = 0; i < arrayPaquetes.length; i++) {
                        let strNombreRepetido = 0;
                        if (
                            this.#objData.objInfoPrincipal.strNombre?.trim() ===
                            arrayPaquetes[i].objInfoPrincipal.strNombre?.trim()
                        ) {
                            strNombreRepetido++;
                        }
                        if (strNombreRepetido === 2) {
                            throw new Error(
                                "El nombre de este paquete ya existe."
                            );
                        }
                    }
                }
            }
        }

        if (this.#objData.objInfoPrincipal?.arrServicios?.length <= 1) {
            throw new Error(
                "El paquete no puede tener un solo servicio asociado."
            );
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre:
                this.#objData.bitActivar === true ? "Activo" : "Inactivo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #getDataPaquete() {
        let query = await serviceGetPaquetes(
            { intId: this.#objData.objInfoPrincipal.intId },
            this.#objUser
        );

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objDataPaqueteAnterior = query.data[0];
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

        this.#intIdPaquete = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateServiciosPaquetes() {
        let dao = new classInterfaceDAOPaquetes();

        let queryModuloPaquetes = await dao.deleteServiciosPaquetes({
            intId: this.#intIdPaquete,
        });

        if (queryModuloPaquetes.error) {
            throw new Error(queryModuloPaquetes.msg);
        }

        if (this.#objData.objInfoPrincipal.arrServicios.length > 0) {
            let array = this.#objData.objInfoPrincipal.arrServicios;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOPaquetes();

                let query = await dao.setServiciosPaquetes({
                    ...array[i],
                    intIdPaquete: this.#intIdPaquete,
                    intIdServicio: array[i].objInfoPrincipal.intId,
                    strUsuarioActualizacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    await this.#rollbackTransaction();
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #updateSedeTipoTarifaServicio() {
        let dao = new classInterfaceDAOPaquetes();

        let querySedeTipoTarifaServicio =
            await dao.deleteSedeTipoTarifaPaquetes({
                intId: this.#intIdPaquete,
            });

        if (querySedeTipoTarifaServicio.error) {
            throw new Error(querySedeTipoTarifaServicio.msg);
        }
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOPaquetes();

                let query = await dao.setSedeTipoTarifaPaquete({
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

    async #updateAreasServicio() {
        let dao = new classInterfaceDAOPaquetes();

        let querySedeTipoTarifaServicio = await dao.deleteAreasPaquetes({
            intId: this.#intIdPaquete,
        });

        if (querySedeTipoTarifaServicio.error) {
            throw new Error(querySedeTipoTarifaServicio.msg);
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

    async #rollbackTransaction() {

        let service = new updatePaquetes(this.#objDataPaqueteAnterior, this.#objUser);
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: true,
            msg: "La actulización del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updatePaquetes;
