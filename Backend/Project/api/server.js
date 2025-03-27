const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();   //To Create Exucatable Function 

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

server.get('/',(request,response) => {
    response.send('Server is working fine.');
})

// Admin URLS
require('./app/routes/admin/default.routes.js')(server);



server.get('*',(request,response) => {
    response.send('page not found.');
})

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_online').then(() => {
    server.listen(5000,() => {
        console.log('Server is working fine.');
    })
}).catch(() => {
    console.log('Database Connection Error !!');
});


