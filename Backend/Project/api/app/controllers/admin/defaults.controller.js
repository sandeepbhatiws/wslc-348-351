const defaultSchema = require('../../models/default');
const mongodb = require('mongodb');

//  For Create Data
exports.create = async(request,response) => {
    
    const result = {
        _status : true,
        _message : 'Record inserted succussfully',
        _data :  request.files,
        body :  request.body,
    }

    response.send(result);


    var dataSave = {
        name : request.body.name,
        type : request.body.type,
        email : request.body.email,
        order : request.body.order,
    }
    
    await new defaultSchema(dataSave).save()
    .then((resp) => {
        const result = {
            _status : true,
            _message : 'Record inserted succussfully',
            _data :  resp
        }
    
        response.send(result);
    })
    .catch((error) => {
        console.log(error);

        var error_messages = [];
        var errorKey ={};

        for(var data in error.errors){
            console.log(error.errors[data].properties.message);

            // error_messages.push(error.errors[data].properties.message);

            errorKey[data] = error.errors[data].properties.message;
            error_messages.push(errorKey);
        }

        const result = {
            _status : false,
            _message : 'Something went wrong !!',
            error_messages : error_messages,
            _data :  null
        }
    
        response.send(result);
    })
}

//  For View Data
exports.view = async(request,response) => {
    
    const condition = {
        deleted_at : null,
    }

    if(request.body.name != '' && request.body.name != undefined){
        // var nameRegex = new RegExp("^" + request.body.name);
        var nameRegex = new RegExp(request.body.name,"i");
        condition.name = nameRegex
    }
    
    // await defaultSchema.find(condition).select('name status order')
    // .sort({
    //     order : 'asc',
    //     _id : 'desc'
    // })


    // await defaultSchema.findOne({ _id : '67e6c0df8db5c9f380fd1266' })

    // await defaultSchema.findById('67e6c0df8db5c9f380fd1266')
    // await defaultSchema.find({ order: { $gt: 9 } })

    var limit = 4;
    var skip = 0;
    var page = 1;

    if(request.body.page != '' && request.body.page != undefined){
        page = request.body.page;
    }

    skip = (page - 1) * limit;

    // await defaultSchema.find(condition).limit(limit).skip(skip)

    // Model.find({role: { $exists: true } });

    await defaultSchema.find({ name : { $type : 8 } })
    .then((resp) => {
        if(resp.length > 0){
            const result = {
                _status : true,
                _message : 'Record inserted succussfully',
                _data :  resp
            }
        
            response.send(result);
        } else {
            const result = {
                _status : false,
                _message : 'No record found.',
                _data :  []
            }
        
            response.send(result);
        }
        
    })
    .catch(() => {
        const result = {
            _status : false,
            _message : 'Something went wrong !!',
            _data :  null
        }
    
        response.send(result);
    })
}

//  For Details Data
exports.details = (request,response) => {

}

//  For Update Data
exports.update = (request,response) => {

}

//  For Change Status Data
exports.changeStatus = (request,response) => {

}

//  For Delete Data
exports.destroy = async(request,response) => {

    await defaultSchema.updateOne(
        {
            _id : request.body.id
        },
        {
            $set : {
                deleted_at : Date.now()
            }
        }
    ).then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated succussfully',
            _data :  result
        }
    
        response.send(data);

    }).catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data :  ''
        }
    
        response.send(data);
    })
}