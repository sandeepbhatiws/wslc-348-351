const express = require('express');
const mongodb = require('mongodb');
const dbConnection = require('./config/database.js');

const server = express();   //To Create Exucatable Function 

server.get('/',(request,response) => {
    response.send('Server is working fine.');
})

server.get('/add-color',async (request,response) => {

    const db = await dbConnection();
    const insertRecord = await db.collection('colors').insertOne({
        name : request.query.name,
        code : request.query.code,
    });

    const result = {
        _status : true,
        _message : 'Record inserted succussfully',
        _data :  insertRecord
    }

    response.send(result);
})

server.get('/view-colors',async(request,response) => {
    const db = await dbConnection();
    const getRecords = await db.collection('colors').find().toArray();

    if(getRecords.length > 0){
        const result = {
            _status : true,
            _message : 'Record found succussfully',
            _data :  getRecords
        }
        response.send(result);
    } else {
        const result = {
            _status : false,
            _message : 'No record found',
            _data :  []
        }
        response.send(result);
    }
})

server.get('/edit-color',async(request,response) => {
    const db = await dbConnection();
    const updatedRecord = await db.collection('colors').updateOne({
        _id : new mongodb.ObjectId(request.query.id)
    },{
        $set : {
            name : request.query.name,
            code : request.query.code,
        }
    });

    const result = {
        _status : true,
        _message : 'Record updated succussfully',
        _data :  updatedRecord
    }

    response.send(result);
})

server.get('/color-details',async(request,response) => {
    const db = await dbConnection();
    const getRecords = await db.collection('colors').findOne(
    { 
        _id : new mongodb.ObjectId(request.query.id) 
    });

    if(getRecords){
        const result = {
            _status : true,
            _message : 'Record found succussfully',
            _data :  getRecords
        }
        response.send(result);
    } else {
        const result = {
            _status : false,
            _message : 'No record found',
            _data :  null
        }
        response.send(result);
    }
})

server.get('/color-delete',async(request,response) => {

    
    const db = await dbConnection();
    const deleteRecord = await db.collection('colors').deleteOne({
        _id : new mongodb.ObjectId(request.query.id)
    });

    const result = {
        _status : true,
        _message : 'Record delete succussfully',
        _data :  deleteRecord
    }

    response.send(result);
})

server.get('*',(request,response) => {
    response.send('page not found.');
})

server.listen(5000,() => {
    console.log('Server is working fine.');
})