const express = require('express');
const { register, login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controllers/website/user.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/users' });

const router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
        }
    })

    const multerImage = multer({ storage: storage })

    var singleImage = multerImage.single('image');

    router.post('/register', upload.none(), register);

    router.post('/login', upload.none(), login);

    router.post('/view-profile', upload.none(), viewProfile);

    router.post('/update-profile', singleImage, updateProfile);

    router.post('/change-password', upload.none(), changePassword);

    router.post('/forgot-password', upload.none(), forgotPassword);

    router.post('/reset-password', upload.none(), resetPassword);

    server.use('/api/website/users', router);
}
