const fs = require("fs")
const path = require("path")

const deleteFile = async (data) => {
    if (!data.strFileName) {
        throw new Error("Se esperaban parametros de entrada")
    }

    try {
        await fs.unlink(`${path.resolve(__dirname, "../uploads")}${data.strFileName}`,(error)=>{
            if (error) {
                console.error(error)
            }
        })
    } catch (error) {
        console.error(error)
    }

}
 module.exports = deleteFile