const configMail = {
    host: process.env.MAIL_HOST,
    secureConnection: process.env.MAIL_SECURECONNECTION,
    port: process.env.MAIL_PORT,
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};

module.exports = { configMail };