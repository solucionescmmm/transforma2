//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOComentarios = require("../infra/conectors/interfaseDAODiagnosticoGeneral")

class setDiagnosticoGeneral{
    #objData;
    #objUser;
    #objResult;

    /**
     * @param {object} data
     */
     constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#completeData()
        await this.#setDiagnosticoGeneral()
        return this.#objResult;
    }

    async #validations(){
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

    async #completeData(){

        let newData = {
            //Objeto de Información General
            intIdEmpresario:this.#objData.objInfoGeneral.intIdEmpresario,
            dtmFechaSesion:this.#objData.objInfoGeneral.dtmFechaSesion,
            strLugarSesion:this.#objData.objInfoGeneral.strLugarSesion,
            strUsuarioCreacion:this.#objData.objInfoGeneral.strUsuarioCreacion,
            strUsuarioActualizacion:this.#objData.objInfoGeneral.strUsuarioActualizacion,

            //Objeto de Información Familiar
            btCabezaHogar:this.#objData.objInfoFamiliar.btCabezaHogar,
            intNumPersonasCargo:this.#objData.objInfoFamiliar.intNumPersonasCargo,
            intHijos:this.#objData.objInfoFamiliar.intHijos,
            intHijosEstudiando:this.#objData.objInfoFamiliar.intHijosEstudiando,
            strMaxNivelEducativoHijos:this.#objData.objInfoFamiliar.strMaxNivelEducativoHijos,
            strEstadoCivil:this.#objData.objInfoFamiliar.strEstadoCivil,
            strSituacionVivienda:this.#objData.objInfoFamiliar.strSituacionVivienda,
            strGrupoVulnerable:this.#objData.objInfoFamiliar.strGrupoVulnerable,
            strPoblacionEtnica:this.#objData.objInfoFamiliar.strPoblacionEtnica,
            
            //Objeto de InfoEmprendimiento
            dtFechaInicioOperacion:this.#objData.objInfoEmprendimiento.dtFechaInicioOperacion,
            btRegistroCamaraComercio:this.#objData.objInfoEmprendimiento.btRegistroCamaraComercio,
            strListadoProdServ:this.#objData.objInfoEmprendimiento.strListadoProdServ,
            //strPoblacionEtnica:this.#objData.objInfoEmprendimiento.strPoblacionEtnica,
            //strPoblacionEtnica:this.#objData.objInfoEmprendimiento.strPoblacionEtnica,
        };

        this.#objData = newData

    }


    async #setDiagnosticoGeneral(){

        let dao = new classInterfaceDAOComentarios();

        let query = await dao.setDiagnosticoGeneral(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }


        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = setDiagnosticoGeneral;