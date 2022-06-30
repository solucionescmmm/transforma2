//class
const classInterfaceDAOServicios = require("../infra/conectors/interfaceDAOServicios");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../Maestros/Estados/domain/getIdEstado.service");
const getServicios = require("./getServicios.service");

class updateServicios {
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
            await this.#updateServicios();
            return this.#objResult;
        }else{
            await this.#updateServicios();
            await this.#updateModuloServicios();
            await this.#updateSedeTipoTarifaServicio();
            await this.#updateAreasServicios();
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
            let queryGetServicios = await getServicios({}, this.#objUser);

            if (queryGetServicios.error) {
                throw new Error(queryGetServicios.msg);
            }
    
            let arrayServicios = queryGetServicios.data;
    
            if (arrayServicios?.length > 0 ) {
                for (let i = 0; i < arrayServicios.length; i++) {
                    if (this.#objData.objInfoPrincipal.strNombre === arrayServicios[i].objInfoPrincipal.strNombre) {
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

    async #updateServicios() {
        let dao = new classInterfaceDAOServicios();

        let query = await dao.updateServicios({
            ...this.#objData.objInfoPrincipal,
            intId:this.#objData.intId,
            intIdEstado: this.#intIdEstado,
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
        let dao = new classInterfaceDAOServicios();

        let queryModuloServicios = await dao.deleteModuloServicios({
            intIdServicio: this.#intIdServicio,
        });

        if (queryModuloServicios.error) {
            throw new Error(queryModuloServicios.msg);
        }

        if (this.#objData.objInfoPrincipal.bitModulos) {
            if (this.#objData.arrModulos.length > 0) {
                let array = this.#objData.arrModulos;

                for (let i = 0; i < array.length; i++) {
                    let dao = new classInterfaceDAOServicios();

                    let query = await dao.setModuloServicios({
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
        let dao = new classInterfaceDAOServicios();

        let querySedeTipoTarifaServicio =
            await dao.deleteSedeTipoTarifaServicios({
                intIdServicio: this.#intIdServicio,
            });

        if (querySedeTipoTarifaServicio.error) {
            throw new Error(querySedeTipoTarifaServicio.msg);
        }
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOServicios();

                let query = await dao.setSedeTipoTarifaServicio({
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
        let dao = new classInterfaceDAOServicios();

        let queryAreasServicios = await dao.deleteAreaServicios({
            intIdServicio: this.#intIdServicio,
        });

        if (queryAreasServicios.error) {
            throw new Error(queryAreasServicios.msg);
        }

        if (this.#objData.arrResponsables.length > 0) {
            let array = this.#objData.arrResponsables;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOServicios();

                let query = await dao.setAreasServicios({
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

        let queryServicios = await dao.deleteServicios({
            intId: this.#intIdServicio,
        });

        if (queryServicios.error) {
            this.#objResult = {
                error: true,
                msg: queryServicios.msg,
            };
        }

        this.#objResult = {
            error: true,
            msg: "La actulización del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateServicios;
