const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/parentCategories.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/categories' });

const router = express.Router();

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
        }
    })

    const multerImage = multer({ storage: storage })

    var singleImage = multerImage.single('image');

    router.post('/create', singleImage, create);

    router.post('/view', upload.none(), view);

    router.post('/details/:id', upload.none(), details);

    router.put('/update/:id', singleImage, update);

    router.post('/change-status', upload.none(), changeStatus);

    router.post('/delete', upload.none(), destroy);

    server.use('/api/admin/parent-categories', router);
}
