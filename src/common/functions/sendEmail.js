const { configMail } = require("../config/configEmail")

const mailchimpTx = require("@mailchimp/mailchimp_transactional")(configMail.key);

const sendEmail = async (objParams) => {
    const { from, to, subject, message } = objParams
    try {
        if (!from || !to || !subject || !message) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        let data = {
            from_email: from.email,
            from_name: from.name,
            to: to,
            subject: subject,
            html: message,
        };

        let response = await mailchimpTx.messages.send({ message: data });

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