const configMail = {
    host: process.env.MAIL_HOST,
    secure: process.env.MAIL_SECURECONNECTION,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        // Ajusta según sea necesario
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
    }
};

module.exports = { configMail };