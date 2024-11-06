const multer = require('multer');

const upload = multer({
    fileFilter: (req, file, cb) => {
        const allowedType = ["image/png", "image/jpg", "image/jpeg"];

        if (allowedType.includes(file.mimetype)) {
            cb(null, true)
        } else {
            const error = new Error("Hanya boleh PNG/JPG/JPEG")
            cb(error, false)
        }
    }
})

module.exports = upload