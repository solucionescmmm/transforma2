//class
const classInterfaceDAOServicios = require("../infra/conectors/interfaceDAOServicios");

//Librerias
const validator = require("validator").default;

class updateServicios {
    #objData;
    #objUser;
    #objResult;
    #intIdServicio;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#updateServicios();
        await this.#updateModuloServicios();
        await this.#updateSedeTipoTarifaServicio();
        await this.#updateAreasServicios();
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

    async #updateServicios() {
        let dao = new classInterfaceDAOServicios();

        let query = await dao.updateServicios({
            ...this.#objData.objInfoPrincipal,
            strUsuarioActualizacion: this.#objUser.strEmail,
        });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdServicio = query.data.intIdServicio;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateModuloServicios() {
        if (this.#objData.objInfoPrincipal.bitModulos) {
            if (this.#objData.arrModulos.length > 0) {
                let array = this.#objData.arrModulos;

                for (let i = 0; i < array.length; i++) {
                    let dao = new classInterfaceDAOServicios();

                    let query = await dao.updateModuloServicios({
                        ...array[i],
                        intIdServicio: this.#intIdServicio,
                        strResponsables: JSON.stringify(
                            array[i]?.strResponsables
                        ),
                        strUsuarioActualizacion: this.#objUser.strEmail,
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
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOServicios();

                let query = await dao.updateSedeTipoTarifaServicio({
                    ...array[i],
                    intIdServicio: this.#intIdServicio,
                    strUsuarioActualizacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    await this.#rollbackTransaction();
                    throw new Error(query.msg);
                }
            }
        }
    }

    async #updateAreasServicios() {
        if (this.#objData.arrResponsables.length > 0) {
            let array = this.#objData.arrResponsables;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOServicios();

                let query = await dao.updateAreasServicios({
                    ...array[i],
                    intIdServicio: this.#intIdServicio,
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
        let dao = new classInterfaceDAOServicios();

        let queryModuloServicios = await dao.deleteModuloServicios({
            intIdServicio: this.#intIdServicio,
        });

        let querySedeTipoTarifaServicio =
            await dao.deleteSedeTipoTarifaServicio({
                intIdServicio: this.#intIdServicio,
            });

        let queryAreasServicios = await dao.deleteAreasServicios({
            intIdServicio: this.#intIdServicio,
        });

        let queryServicios = await dao.deleteServicios({
            intId: this.#intIdServicio,
        });

        if (queryModuloServicios.error) {
            this.#objResult = {
                error: true,
                msg: queryModuloServicios.msg,
            };
        }

        if (querySedeTipoTarifaServicio.error) {
            this.#objResult = {
                error: true,
                msg: querySedeTipoTarifaServicio.msg,
            };
        }

        if (queryAreasServicios.error) {
            this.#objResult = {
                error: true,
                msg: queryAreasServicios.msg,
            };
        }

        if (queryServicios.error) {
            this.#objResult = {
                error: true,
                msg: queryAreasServicios.msg,
            };
        }

        this.#objResult = {
            error: true,
            msg: "El registro del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateServicios;