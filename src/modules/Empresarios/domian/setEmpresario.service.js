//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

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
        await this.#setEmpresa();
        await this.#setInfoAdicional();
        return this.#objResult;
    }

    async #validations() {
       console.log(this.#objData);
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

        let aux_arrDepartamento= JSON.stringify(this.#objData.objEmpresario?.arrDepartamento || "")
        let aux_arrCiudad= JSON.stringify(this.#objData.objEmpresario?.arrCiudad || "")

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad:aux_arrCiudad
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
        let prevData = this.#objData.objInfoEmpresa;

        let aux_arrCategoriasSecundarias= JSON.stringify(this.#objData.objInfoEmpresa?.arrCategoriasSecundarias || "")
        let aux_arrFormasComercializacion = JSON.stringify(this.#objData.objInfoEmpresa?.arrFormasComercializacion ||"")
        let aux_arrMediosDigitales = JSON.stringify(this.#objData.objInfoEmpresa?.arrMediosDigitales||"")
        let aux_arrRequisitosLey = JSON.stringify(this.#objData.objInfoEmpresa?.arrRequisitosLey||"")
        let aux_arrDepartamento= JSON.stringify(this.#objData.objInfoEmpresa?.arrDepartamento || "")
        let aux_arrCiudad= JSON.stringify(this.#objData.objInfoEmpresa?.arrCiudad || "")
        
        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
            arrDepartamento:aux_arrDepartamento,
            arrCiudad:aux_arrCiudad
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresa(newData);

        console.log(query)
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

    async #setInfoAdicional(){
        let dao = new classInterfaceDAOEmpresarios()

        let prevData = this.#objData.objInfoAdicional;

        let aux_arrTemasCapacitacion =JSON.stringify(this.#objData.objInfoAdicional?.arrTemasCapacitacion||"");
        let aux_arrComoSeEntero = JSON.stringify(this.#objData.objInfoAdicional?.arrComoSeEntero||"");
        let aux_arrMediosDeComunicacion = JSON.stringify(this.#objData.objInfoAdicional?.arrMediosDeComunicacion||"");

        
        let newData={
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
            arrTemasCapacitacion:aux_arrTemasCapacitacion,
            arrComoSeEntero:aux_arrComoSeEntero,
            arrMediosDeComunicacion:aux_arrMediosDeComunicacion,
        }

        let query = await dao.setInfoAdicional(newData)

        if(query.error){
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();

        let queryEmpresarioSecundario = await dao.deleteEmpresarioSecundario({
            intId :this.#intIdEmpresario,
        })

        let queryEmpresa = await dao.deleteInfoEmpresa({
             intId : this.#intIdEmpresario,
         })

         let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        if (queryEmpresa.error) {
            this.#objResult = {
                error: true,
                msg: queryEmpresa.error
                    ? queryEmpresa.msg
                    : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
            };
        }

        if (queryEmpresarioSecundario.error) {
            this.#objResult = {
                error: true,
                msg: queryEmpresarioSecundario.error
                    ? queryEmpresarioSecundario.msg
                    : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
            };
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresario;
