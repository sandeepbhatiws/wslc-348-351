const parentCategoriesSchema = require('../../models/parentCategories');
const mongodb = require('mongodb');

//  For Create Data
exports.create = async(request,response) => {

    var dataSave = {
        name : request.body.name,
        order : request.body.order,
    }

    if(request.file){
        dataSave.image = request.file.filename;
    }
    
    await new parentCategoriesSchema(dataSave).save()
    .then((resp) => {
        const result = {
            _status : true,
            _message : 'Record inserted succussfully',
            _data :  resp
        }
    
        response.send(result);
    })
    .catch((error) => {
        var error_messages = [];
        var errorKey = {};

        for(var data in error.errors){
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
    
    var limit = 15;
    var page = 1;

    if(request.body.limit != '' && request.body.limit != undefined){
        limit = request.body.limit;
    }

    if(request.body.page != '' && request.body.page != undefined){
        page = request.body.page;
    }

    skip = (page - 1) * limit;

    const condition = {
        deleted_at : null,
    }

    if(request.body.name != '' && request.body.name != undefined){
        var nameRegex = new RegExp(request.body.name,"i");
        condition.name = nameRegex;
    }

    var totalRecords = await parentCategoriesSchema.find(condition).select('name status order').countDocuments();

    console.log(request.port);
    
    await parentCategoriesSchema.find(condition).select('name image status order')
    .limit(limit).skip(skip)
    .sort({
        _id : 'desc'
    })
    .then((resp) => {
        if(resp.length > 0){
            const result = {
                _status : true,
                _message : 'Record inserted succussfully',
                image_path : `${request.protocol}://${request.get('host')}/uploads/categories/`,
                'total_records' : totalRecords,
                'total_pages' : Math.ceil(totalRecords / limit),
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
exports.details = async (request,response) => {

    await parentCategoriesSchema.findOne({
        deleted_at : null,
        _id : request.params.id
    })
    .then((resp) => {
        if(resp){
            const result = {
                _status : true,
                _message : 'Record fetch succussfully',
                image_path : `${request.protocol}://${request.get('host')}/uploads/categories/`,
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

//  For Update Data
exports.update = async(request,response) => {

    var dataSave = {
        name : request.body.name,
        order : request.body.order,
    }

    if(request.file){
        dataSave.image = request.file.filename
    }
    
    await parentCategoriesSchema.updateOne({
        _id : request.params.id
    },
    {
        $set : dataSave
    })
    .then((resp) => {
        const result = {
            _status : true,
            _message : 'Record updated succussfully',
            image_path : `${request.protocol}://${request.get('host')}/uploads/categories/`,
            _data :  resp
        }
    
        response.send(result);
    })
    .catch((error) => {
        var error_messages = [];
        var errorKey = {};

        for(var data in error.errors){
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

//  For Change Status Data
exports.changeStatus = async(request,response) => {
    await parentCategoriesSchema.updateMany(
        {
            _id : {
                $in : request.body.ids
            }
        },
        [
            { 
                $set: { 
                    status: { 
                        $not: "$status" 
                    } 
                } 
            }
        ]
    ).then((result) => {
        const data = {
            _status : true,
            _message : 'Change Status succussfully',
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

//  For Delete Data
exports.destroy = async(request,response) => {

    await parentCategoriesSchema.updateMany(
        {
            _id : {
                $in : request.body.ids
            }
        },
        {
            $set : {
                deleted_at : Date.now()
            }
        }
    ).then((result) => {
        const data = {
            _status : true,
            _message : 'Record deleted succussfully',
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