//Librerias
const multer = require("multer");
const path = require("path");

const configMulter = {
    storage: (fileStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, "../uploads"));
        },

        filename: function (req, file, cb) {
            const fileExtension = file.originalname.substring(
                file.originalname.lastIndexOf("."),
                file.originalname.length
            );

            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);

            cb(null, `${uniqueSuffix}${fileExtension}`);
        },
    })),
};

const uploadFile = multer(configMulter).single("fileFormInteresados");

module.exports = uploadFile;
