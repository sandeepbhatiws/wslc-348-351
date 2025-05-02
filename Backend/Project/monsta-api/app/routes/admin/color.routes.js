const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/colors.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/colors' });

const router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/colors')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
        }
    })

    const multerImage = multer({ storage: storage })

    var singleImage = multerImage.single('image');
    var multipleImages = multerImage.array('images', 12);
    const singleMultipleImage = multerImage.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/create', upload.none(), create);

    router.post('/view', upload.none(), view);

    router.post('/details/:id', upload.none(), details);

    router.put('/update/:id', upload.none(), update);

    router.post('/change-status', upload.none(), changeStatus);

    router.post('/delete', upload.none(), destroy);

    server.use('/api/admin/colors', router);
}
