const express = require('express');
const { placeOrder, updateStatus } = require('../../controllers/website/order.controller');
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/users' });

const router = express.Router();

module.exports = server => {

    router.post('/', upload.none(), placeOrder);

    router.post('/update-status', upload.none(), updateStatus);

    server.use('/api/website/place-order', router);
}
