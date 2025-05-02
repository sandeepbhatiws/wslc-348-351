const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        // minLength: 3,
        // maxLength  : 10,
        match: /^[a-zA-Z]{3,10}$/,
        required : [true, 'Name is required'],
        validate: {
            validator: async function(v) {
              const user = await this.constructor.findOne({ name: v });
              return !user;
            },
            message: props => `The specified name is already in use.`
        }
    },
    email : {
        type : String,
        // unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    // type : {
    //     type : String,
    //     required : [true, 'Type is required'],
    //     enum : ['admin','user']
    // },
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

function validateEmail(email) {
    // Your custom validation logic here
    return /\S+@\S+\.\S+/.test(email);
}

const model = mongoose.model('default',schema);

module.exports = model;