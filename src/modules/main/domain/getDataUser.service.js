require("dotenv-flow");
const CLIENT_ID = process.env.CLIENT_GOOGLE;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID)

const getDataUser = async(token) => {
    try {
        if (!token) {
            throw new Error("Se requiere el token")
        }
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        const payload = ticket.getPayload()
        let result = {
            error: false,
            data: payload
        }
        return result
    } catch (error) {
        let result = {
            error: true,
            msg: error.message,
        };

        return result
    }
}
module.exports = getDataUser