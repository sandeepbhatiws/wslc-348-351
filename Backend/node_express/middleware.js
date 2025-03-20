exports.validation = (request, response, next) => {

    if(request.query.apikey == '' || request.query.apikey == undefined){

        var data ={
            _status : false,
            _message : 'Please insert api key',
            _data : ''
        }

        response.send(data);

    } else if(request.query.apikey != 123456789){
        var data ={
            _status : false,
            _message : 'Incorrect api key',
            _data : ''
        }

        response.send(data);
    } else{
        next();   // Create Exucutable function
    }
}