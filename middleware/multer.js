let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/temp/')
    },
    filename: function (req, file, cb) {
        ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, Date.now() + ext)
    }
})

module.exports = storage;