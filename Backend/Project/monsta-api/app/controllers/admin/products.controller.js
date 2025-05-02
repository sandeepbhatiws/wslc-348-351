const productSchema = require('../../models/product');
const parentCategoriesSchema = require('../../models/parentCategories');
const mongodb = require('mongodb');
const slugify = require("slugify");

const generateUniqueSlug = async (Model, baseSlug) => {
    let slug = baseSlug;
    let count = 0;
  
    // Loop to find unique slug
    while (await Model.findOne({ slug })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }
  
    return slug;
};

//  For Create Data
exports.create = async(request,response) => {

    var slug = slugify(request.body.name,{
        lower : true,
        strict : true,
    });

    slug = await generateUniqueSlug(productSchema, slug);

    var dataSave = request.body

    if(request.files.image){
        dataSave.image = request.files.image[0].filename;
    }

    if(request.files.images){
        images = [];
        request.files.images.forEach((v,i) => {
            images.push(v.filename);
        })
        dataSave.images = images;
    }

    dataSave.slug = slug;
    
    await new productSchema(dataSave).save()
    .then(async(resp) => {

        await parentCategoriesSchema.updateOne(
        { 
            _id : request.body.parent_category_id
        }, 
        { 
            $push: { product_id: { $each: [resp._id] } } 
        });

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

    if(request.body.status){
        condition.status = request.body.status;
    }

    if(request.body.parent_category_id){
        condition.parent_category_id = request.body.parent_category_id;
    }

    if(request.body.name != '' && request.body.name != undefined){
        var nameRegex = new RegExp(request.body.name,"i");
        condition.name = nameRegex;
    }

    var totalRecords = await productSchema.find(condition).countDocuments();
 
    await productSchema.find(condition).select('name parent_category_id image actual_price sale_price status order')
    .populate({ path: 'parent_category_id', select: 'name' })
    .limit(limit).skip(skip)
    .sort({
        _id : 'desc'
    })
    .then((resp) => {
        if(resp.length > 0){
            const result = {
                _status : true,
                _message : 'Record inserted succussfully',
                image_path : `${request.protocol}://${request.get('host')}/uploads/products/`,
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

    await productSchema.findOne({
        deleted_at : null,
        _id : request.params.id
    })
    .then((resp) => {
        if(resp){
            const result = {
                _status : true,
                _message : 'Record fetch succussfully',
                image_path : `${request.protocol}://${request.get('host')}/uploads/products/`,
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

    var dataSave = request.body

    if(request.files.image){
        dataSave.image = request.files.image[0].filename;
    }

    if(request.files.images){
        images = [];
        request.files.images.forEach((v,i) => {
            images.push(v.filename);
        })
        dataSave.images = images;
    }
    
    await productSchema.updateOne({
        _id : request.params.id
    },
    {
        $set : dataSave
    })
    .then((resp) => {
        const result = {
            _status : true,
            _message : 'Record updated succussfully',
            image_path : `${request.protocol}://${request.get('host')}/uploads/products/`,
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
    await productSchema.updateMany(
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

    await productSchema.updateMany(
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