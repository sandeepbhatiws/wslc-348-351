const parentCategoriesSchema = require('../../models/parentCategories');

//  For View Data
exports.view = async(request,response) => {

    const addCondition = {
        deleted_at : null, 
        status : true
    };

    await parentCategoriesSchema.find(addCondition).select('name image status sub_category_id product_id order')
    .populate({ path: 'sub_category_id', select: 'name image' })
    .populate({ path: 'product_id', select: 'name image' })
    .sort({
        order : 'asc',
        _id : 'desc'
    })
    .then((resp) => {
        if(resp.length > 0){
            const result = {
                _status : true,
                _message : 'Record inserted succussfully',
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
    .catch((error) => {
        console.log(error)
        const result = {
            _status : false,
            _message : 'Something went wrong !!',
            _data :  null
        }
    
        response.send(result);
    })
}