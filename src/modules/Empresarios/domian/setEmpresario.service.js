//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//services
const getCategoriaEmpresario = require("./getCategoriaServicio.service");

class setEmpresario {
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#setEmpresario();
        await this.#setEmpresarioSecundario();
        await this.#setEmprendimiento();
        //await this.#setEmpresa();
        return this.#objResult;
    }

    async #validations() {
        //console.log(this.#objData);
        //console.log(this.#objUser);
        let dao = new classInterfaceDAOEmpresarios();

        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
        let queryGetNroDoctoEmpresario = await dao.getNroDocumentoEmpresario({
            strNroDocto: this.#objData.objEmpresario.strNroDocto,
        });

        if (queryGetNroDoctoEmpresario.data) {
            throw new Error(
                `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
            );
        }
    }

    async #setEmpresario() {
        let prevData = this.#objData.objEmpresario;

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresarios(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdEmpresario = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setEmpresa() {
        let queryGetCategoriaProducto = await getCategoriaEmpresario({
            strNombreCategoria: this.#objData.objInfoEmpresa.strCategoriaProducto,
        });

        let queryGetCategoriaServicio = await getCategoriaEmpresario({
            strNombreCategoria: this.#objData.objInfoEmpresa.strCategoriaServicio,
        });

        let prevData = this.#objData.objInfoEmpresa;

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            intIdNombreCategoriaProducto: queryGetCategoriaProducto?.data || null,
            intIdNombreCategoriaServicio: queryGetCategoriaServicio?.data || null,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresa(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmprendimiento() {
        let prevData = this.#objData.objInfoEmprendimiento;

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmprendimineto(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmpresarioSecundario() {
        let dao = new classInterfaceDAOEmpresarios();
        for (let i = 0; i < this.#objData.arrEmpresarioSecundario.length; i++) {
            let prevData = this.#objData.arrEmpresarioSecundario[i];

            let newData = {
                ...prevData,
                intIdEmpresarioPrincipal: this.#intIdEmpresario,
                strUsuario: this.#objUser.strEmail,
            };

            let query = await dao.setEmpresarioSecundario(newData);

            if (query.error) {
                await this.#rollbackTransaction();
            }
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresario;
