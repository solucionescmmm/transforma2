//class
const classInterfaceDAOServicios = require("../infra/conectors/interfaceDAOServicios");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../../../Estados/domain/getIdEstado.service");
const getServicios = require("./getServicios.service");

class setServicios {
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
        await this.#getIdEstado();
        await this.#setServicios();
        await this.#setModuloServicios();
        await this.#setSedeTipoTarifaServicio();
        await this.#setAreasServicios();
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

        let queryGetServicios = await getServicios({}, this.#objUser);

        if (queryGetServicios.error) {
            throw new Error(queryGetServicios.msg);
        }

        let arrayServicios = queryGetServicios.data;

        if (arrayServicios?.length > 0) {
            for (let i = 0; i < arrayServicios.length; i++) {
                if (
                    this.#objData.objInfoPrincipal.strNombre.trim() ===
                    arrayServicios[i].objInfoPrincipal.strNombre.trim()
                ) {
                    throw new Error("El nombre de este servicio ya existe.");
                }
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

    async #setServicios() {
        let dao = new classInterfaceDAOServicios();

        let query = await dao.setServicios({
            ...this.#objData.objInfoPrincipal,
            intIdEstado: this.#intIdEstado,
            intIdProyectosEspeciales:
                this.#objData.objInfoPrincipal.bitProyectoEs === true
                    ? this.#objData.objInfoPrincipal.intIdProyectoEs
                    : null,
            strUsuarioCreacion: this.#objUser.strEmail,
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

    async #setModuloServicios() {
        if (this.#objData.objInfoPrincipal.bitModulos) {
            if (this.#objData.arrModulos.length > 0) {
                let array = this.#objData.arrModulos;

                for (let i = 0; i < array.length; i++) {
                    if (array[i].intHoras !== "") {
                        let dao = new classInterfaceDAOServicios();

                        let query = await dao.setModuloServicios({
                            ...array[i],
                            intIdServicio: this.#intIdServicio,
                            strResponsables: JSON.stringify(
                                array[i]?.arrResponsables
                            ),
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

    async #setSedeTipoTarifaServicio() {
        if (this.#objData.arrSedesTarifas.length > 0) {
            let array = this.#objData.arrSedesTarifas;

            for (let i = 0; i < array.length; i++) {
                if (array[i].intIdSede !== "") {
                    let dao = new classInterfaceDAOServicios();

                    let query = await dao.setSedeTipoTarifaServicio({
                        ...array[i],
                        intIdServicio: this.#intIdServicio,
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

    async #setAreasServicios() {
        if (this.#objData.arrResponsables.length > 0) {
            let array = this.#objData.arrResponsables;

            for (let i = 0; i < array.length; i++) {
                if (array[i].intIdAreas !== "") {
                    let dao = new classInterfaceDAOServicios();

                    let query = await dao.setAreasServicios({
                        ...array[i],
                        intIdServicio: this.#intIdServicio,
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

    async #setResultServcio() {
        if (this.#objData.arrAtributos.length > 0) {
            let array = this.#objData.arrAtributos;

            for (let i = 0; i < array.length; i++) {
                let dao = new classInterfaceDAOServicios();

                let query = await dao.setResultServicios({
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
            msg: "El registro del servicio ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = setServicios;
