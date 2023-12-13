const nodemailer = require("nodemailer");
const { configMail } = require("../config/configEmail");

const transporter = nodemailer.createTransport(configMail)

const sendEmail = async (objParams) => {
    const {from, to, cc, subject, message} = objParams
    try {
        if (!from || !to || !subject || !message) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        let data = {
            from: from,
            to: to,
            cc: cc,
            subject:subject,
            html:message,
        };

        let response = await transporter.sendMail(data);

        let result = {
            error: false,
            msg: response.response
        }

        return result;


    } catch (error) {
        let result = {
            error: true,
            msg: error.message,
        };

        return result;
    }
};

module.exports = sendEmail;