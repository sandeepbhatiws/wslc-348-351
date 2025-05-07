const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    order_id : {
        type : String,
        default : ''
        // required : [true, 'Order Id is required.'],
    },
    order_number : {
        type : String,
        default : ''
    },
    date : {
        type : Date,
        default : Date.now()
    },
    user_id : {
        type : String,
        required : [true, 'User id is required.'],
        ref : 'users'
    },
    total_amount : {
        type : Number,
        default : 0
    },
    discount : {
        type : Number,
        default : 0
    },
    net_amount : {
        type : Number,
        default : 0
    },
    coupon_id : {
        type : String,
        default : ''
    },
    product_info : {
        type : Array,
        ref: 'products',
        default : []
    },
    shipping_address : {
        type : Object,
        default : ''
    },
    billing_address : {
        type : Object,
        default : ''
    },
    transaction_id : {
        type : String,
        default : ''
    },
    payment_status : {
        type : Number,
        default : 1   // 1 - Pending  2- Complete 3- Failed
    },
    order_status : {
        type : Number,
        default : 1   // 1 - Pending 2- Confirm 3-  Order Received 4 - Ready to Ship 5- Order Shipped 6 - Order Complete
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
    },
});

const modal = mongoose.model('orders',schema);

module.exports = modal;