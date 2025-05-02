const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-z A-Z]{2,20}$/,
        required : [true, 'Name is required'],
    },
    sub_category_id : {
        type : Array,
        ref : "sub_categories"
    },
    product_id : {
        type : Array,
        ref : "products"
    },
    image : {
        type : String,
        default:  '',
    },
    slug : {
        type : String,
        default:  '',
    },
    status : {
        type : Boolean,
        default : true
    },
    order : {
        type : Number,
        min : 0,
        max : 1000,
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

const model = mongoose.model('parent_categories',schema);

module.exports = model;