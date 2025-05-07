const orderSchema = require('../../models/order');
const mongodb = require('mongodb');
var jwt = require('jsonwebtoken');
var secretKey = '123456789';
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_tFz6O0QKcTtRj6',
    key_secret: 'xLD5lVVr0nEiXV1vY9i7PSFk',
});

// For Place Order
exports.placeOrder = async (request, response) => {

    var token = request.headers.authorization.split(' ');
    var verify = jwt.verify(token[1], secretKey);

    if(verify){

        var totalOrders = await orderSchema.find().countDocuments();

        var data = request.body;
        data.user_id = verify.data._id;
        data.order_number = 'MONSTA_'+(1000+totalOrders+1)

        await new orderSchema(data).save()
        .then(async(success) => {

            var orderInfo = await instance.orders.create({
                "amount": request.body.net_amount * 100,
                "currency": "INR",
                "receipt": success.order_number,
                "partial_payment": false,
            })

            await orderSchema.updateOne({
                _id : success._id,
            },{
                $set : {
                    order_id : orderInfo.id
                }
            })

            success.order_id = orderInfo.id;

            const result = {
                _status : true,
                _message : 'Order placed succussfully',
                orderInfo : orderInfo,
                _data :  success
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

            console.log(error);

            const result = {
                _status : false,
                _message : 'Something went wrong !!',
                error_messages : error_messages,
                _data :  null
            }
        
            response.send(result);
        })
    } else {
        const result = {
            _status: false,
            _message: 'Token expired !!',
            _data: null
        }

        response.send(result);
    }
};

// For Update Status
exports.updateStatus = async (request, response) => {
    var token = request.headers.authorization.split(' ');
    var verify = jwt.verify(token[1], secretKey);

    if(verify){
        await orderSchema.updateOne({
            order_id: request.body.order_id
        }, {
            $set: {
                transaction_id : request.body.transaction_id,
                payment_status : request.body.payment_status,
                order_status : request.body.order_status,
            }
        })
        .then((resp) => {
            if (resp) {
                const result = {
                    _status: true,
                    _message: 'Order Status update successfully !!',
                    _data: resp
                }

                response.send(result);
            } else {
                const result = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _data: []
                }

                response.send(result);
            }

        })
        .catch(() => {
            const result = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: null
            }

            response.send(result);
        })

    } else {
        const result = {
            _status: false,
            _message: 'Token expired !!',
            _data: null
        }

        response.send(result);
    }

};