const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
    },
    status : {
        type : Boolean,
        default : true
    },
    order : {
        type : Number,
        default : 0
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    updated_at : {
        type : Date,
        default : Date.now()
    },
    deleted_at : {
        type : Date,
        default : ''
    }
});

const model = mongoose.model('default',schema);

module.exports = model;