const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

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

server.get('*',(request,response) => {
    response.send('page not found.');
})

server.listen(5000,() => {
    console.log('Server is working fine.');
})