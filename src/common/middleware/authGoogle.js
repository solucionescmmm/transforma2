 require("dotenv-flow");
 const CLIENT_ID = process.env.CLIENT_GOOGLE;
 const { OAuth2Client } = require("google-auth-library");
 const client = new OAuth2Client(CLIENT_ID)

 const authToken = async(req, res, next) => {
     let token = req.get("token");
     try {
         if (!token) {
             throw new Error("Se requiere el token")
         }
         await client.verifyIdToken({
             idToken: token,
             audience: CLIENT_ID
         }).then((res) => {
             const payload = res.getPayload()
             if (payload) {
                 if (payload.email_verified === true) {
                     next()
                 } else {
                     let result = {
                         error: true,
                         msg: "Token de autorizacion no valido",
                         info: error.message,
                     };
                     return res.status(401).json(result);
                 }
             }
         }).catch((error) => {
             let msg = error.message
             if (msg.startsWith("Token used too late")) {
                 throw new Error("Token expiro")
             }
             throw new Error(msg)
         });

     } catch (error) {
         let result = {
             error: true,
             msg: error.message,
         };
         return res.status(400).json(result);
     }
 };

 module.exports = authToken;