const http = require('http');
const { configurations, getDisclaimer, getCompanyInfo, getFooterExtraLinks } = require('./apiData');


// http.createServer(

// ).listen(5000,() => {
//     console.log('Server is connected');
// });


const server = http.createServer((request, response) => {

    console.log(request.url);
    console.log(request.method);

    if(request.url == '/'){
        response.end('<h1>Server is working fine !!</h1>');
    } if(request.url == '/categories' && request.method == 'POST'){

        var data = {
            status : true,
            message : 'Message goes here',
            data : ''
        }

        response.end(JSON.stringify(data));
    } if(request.url == '/configurations' && request.method == 'POST'){

        var data = {
            status : true,
            message : 'Record found successfully !',
            data : configurations
        }

        response.end(JSON.stringify(data));

    } if(request.url == '/get-disclaimer' && request.method == 'POST'){

        var data = {
            status : true,
            message : 'Record found successfully !',
            data : getDisclaimer
        }

        response.end(JSON.stringify(data));
        
    } if(request.url == '/get-company-info' && request.method == 'POST'){

        var data = {
            status : true,
            message : 'Record found successfully !',
            data : getCompanyInfo
        }

        response.end(JSON.stringify(data));

    } if(request.url == '/get-footer-links' && request.method == 'POST'){
        var data = {
            status : true,
            message : 'Record found successfully !',
            data : getFooterExtraLinks
        }

        response.end(JSON.stringify(data));
    } else {
        response.end('<h1>page not Found !!</h1>');
    }

    
});

server.listen(5000,() => {
    console.log('Server is connected');
});