const express = require('express');
const { configurations, getDisclaimer, getCompanyInfo, getFooterExtraLinks } = require('./apiData');
const { validation } = require('./middleware');

const server = express();   // To Create Excutable Function

server.get('/',(request, response) => {
    response.send('Server is working Fine !!');
});

const route = express.Router();
route.use(validation);

route.get('/company-info',(request,response) => {
    const result = getCompanyInfo;

    var data = {
        _status : true,
        _message : 'Record found successfully !!',
        _data : result
    }

    response.send(data);
})

// server.use(validation);

route.get('/configurations',(request,response) => {
    const result = configurations;

    var data = {
        _status : true,
        _message : 'Record found successfully !!',
        _data : result
    }

    response.send(data);
})

route.get('/disclaimers',(request,response) => {
    const result = getDisclaimer;

    var data = {
        _status : true,
        _message : 'Record found successfully !!',
        _data : result
    }

    response.send(data);
})


server.get('/footer-extra-links',(request,response) => {
    const result = getFooterExtraLinks;

    var data = {
        _status : true,
        _message : 'Record found successfully !!',
        _data : result
    }

    response.send(data);
})

server.use('/',route);

server.get('*',(request, response) => {
    response.send('Page not Found !!');
})


server.listen(5000,() => {
    console.log('Server is Connected');
})