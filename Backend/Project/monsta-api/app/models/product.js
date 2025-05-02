const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
    },
    code : {
        type : String,
        default : "",
    },
    slug : {
        type : String,
        default : "",
    },
    length : {
        type : String,
        default : "",
    },
    width : {
        type : String,
        default : "",
    },
    height : {
        type : String,
        default : "",
    },
    estimate_delivery_days : {
        type : String,
        default : "",
    },
    material_id : {
        type : Array,
        default : [],
        ref : 'materials'
    },
    color_id : {
        type : Array,
        default : [],
        ref : 'colors'
    },
    parent_category_id : {
        type : String,
        default : '',
        ref : 'parent_categories'
    },
    sub_category_id : {
        type : Array,
        default : [],
        ref : 'sub_categories'
    },
    sub_sub_category_id : {
        type : Array,
        default : [],
        ref : 'sub_sub_categories'
    },
    image : {
        type : String,
        default : '',
    },
    images : {
        type : Array,
        default : [],
    },
    actual_price : {
        type : Number,
        default : '',
    },
    sale_price : {
        type : Number,
        default : '',
    },
    short_description : {
        type : String,
        default : '',
    },
    description : {
        type : String,
        default : '',
    },
    out_of_stock : {
        type : Number,
        default : 0,    // 0 - No 1 - Yes
    },
    is_featured : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
    },
    is_new_arrivals : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
    },
    is_onsale : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
    },
    is_bestsellings : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
    },
    is_upsell : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
    },
    is_top_rated : {
        type : Boolean,
        default: 0  //  // 0 - No 1 - Yes
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

const model = mongoose.model('products',schema);

module.exports = model;