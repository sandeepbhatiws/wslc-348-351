const express = require('express');
const { view } = require('../../controllers/website/parentCategories.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/categories' });

const router = express.Router();

module.exports = server => {

    router.post('/view', upload.none(), view);

    server.use('/api/website/parent-categories', router);
}
