const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-z A-Z]{2,20}$/,
        required : [true, 'Name is required'],
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        validate: {
            validator: async function(v) {
              const checkEmail = await this.constructor.findOne({ email: v, deleted_at : null });
              return !checkEmail;
            },
            message: props => `The specified email is already in use.`
        }
    },
    user_type : {
        type : String,
        enum : ['user', 'admin']
    },
    mobile_number : {
        type : String,
        default : '',
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
    },
    image : {
        type : String,
        default : '',
    },
    address : {
        type : String,
        default : '',
    },
    status : {
        type : Boolean,
        default : true
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

function validateEmail(email) {
    // Your custom validation logic here
    return /\S+@\S+\.\S+/.test(email);
}

const model = mongoose.model('users',schema);

module.exports = model;