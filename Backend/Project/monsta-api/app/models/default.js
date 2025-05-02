const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-z A-Z]{2,20}$/,
        required : [true, 'Name is required'],
        validate: {
            validator: async function(v) {
              const checkName = await this.constructor.findOne({ name: v, deleted_at : null });
              return !checkName;
            },
            message: props => `The specified name is already in use.`
        }
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

function validateEmail(email) {
    // Your custom validation logic here
    return /\S+@\S+\.\S+/.test(email);
}

const model = mongoose.model('default',schema);

module.exports = model;