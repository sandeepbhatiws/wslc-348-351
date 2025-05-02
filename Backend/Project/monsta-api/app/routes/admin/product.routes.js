const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/products.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/products' });

const router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
        }
    })

    const multerImage = multer({ storage: storage })

    const singleMultipleImage = multerImage.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/create', singleMultipleImage, create);

    router.post('/view', upload.none(), view);

    router.post('/details/:id', upload.none(), details);

    router.put('/update/:id', singleMultipleImage, update);

    router.post('/change-status', upload.none(), changeStatus);

    router.post('/delete', upload.none(), destroy);

    server.use('/api/admin/products', router);
}
