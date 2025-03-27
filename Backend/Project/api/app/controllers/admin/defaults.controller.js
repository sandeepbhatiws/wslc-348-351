const defaultSchema = require('../../models/default');

//  For Create Data
exports.create = async(request,response) => {
    
    var dataSave = {
        name : request.body.name,
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
    .catch(() => {
        const result = {
            _status : false,
            _message : 'Something went wrong !!',
            _data :  null
        }
    
        response.send(result);
    })

    
}

//  For View Data
exports.view = (request,response) => {

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
exports.destroy = (request,response) => {

}