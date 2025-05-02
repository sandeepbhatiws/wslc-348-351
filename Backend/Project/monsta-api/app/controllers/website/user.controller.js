const userSchema = require('../../models/user');
const mongodb = require('mongodb');
var jwt = require('jsonwebtoken');
var secretKey = '123456789';

const bcrypt = require('bcrypt');
const saltRounds = 10;

// For Register
exports.register = async (request, response) => {

    var dataSave = request.body;

    if (request.body.password) {
        request.body.password = bcrypt.hashSync(request.body.password, saltRounds);
    }

    await new userSchema(dataSave).save()
        .then((resp) => {

            var token = jwt.sign({ data: resp }, secretKey, { expiresIn: '24h' });

            const result = {
                _status: true,
                _message: 'User register succussfully.',
                _token: token,
                _data: resp
            }

            response.send(result);
        })
        .catch((error) => {
            var error_messages = [];
            var errorKey = {};

            for (var data in error.errors) {
                errorKey[data] = error.errors[data].properties.message;
                error_messages.push(errorKey);
            }

            const result = {
                _status: false,
                _message: 'Something went wrong !!',
                error_messages: error_messages,
                _data: null
            }

            response.send(result);
        })
}

// For Login
exports.login = async (request, response) => {

    await userSchema.findOne({
        deleted_at: null,
        email: request.body.email,
    })
        .then((resp) => {
            if (resp) {

                var checkPassword = bcrypt.compareSync(request.body.password, resp.password);

                if (checkPassword) {
                    var token = jwt.sign({ data: resp }, secretKey, { expiresIn: '24h' });

                    const result = {
                        _status: true,
                        _message: 'Login succussfully.',
                        _token: token,
                        _data: resp
                    }

                    response.send(result);
                } else {
                    const result = {
                        _status: false,
                        _message: 'Incorrect password.',
                        _data: null
                    }

                    response.send(result);
                }


            } else {
                const result = {
                    _status: false,
                    _message: 'Invalid email id.',
                    _data: null
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

}

// For View Profile
exports.viewProfile = async (request, response) => {

    token = request.headers.authorization.split(' ');
    console.log(token[1]);

    try {
        var verify = jwt.verify(token[1], secretKey);

        if (verify) {
            await userSchema.findOne({
                deleted_at: null,
                _id: verify.data._id
            })
                .then((resp) => {
                    if (resp) {
                        const result = {
                            _status: true,
                            _message: 'Data found !!',
                            _data: resp
                        }

                        response.send(result);
                    } else {
                        const result = {
                            _status: false,
                            _message: 'No record found.',
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
    } catch (error) {
        const result = {
            _status: false,
            _message: 'Token expired !!',
            _data: null
        }

        response.send(result);
    }
}

// For Update Profile
exports.updateProfile = async (request, response) => {
    token = request.headers.authorization.split(' ');

    try {
        var verify = jwt.verify(token[1], secretKey);

        var data = request.body;

        if (request.file) {
            data.image = request.file.filename;
        }

        if (verify) {
            await userSchema.updateOne({
                _id: verify.data._id
            }, {
                $set: data
            })
                .then((resp) => {
                    if (resp) {
                        const result = {
                            _status: true,
                            _message: 'Data found !!',
                            _data: resp
                        }

                        response.send(result);
                    } else {
                        const result = {
                            _status: false,
                            _message: 'No record found.',
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
    } catch (error) {
        const result = {
            _status: false,
            _message: 'Token expired !!',
            _data: null
        }

        response.send(result);
    }
}

// For Change Password
exports.changePassword = async (request, response) => {

    token = request.headers.authorization.split(' ');

    console.log(request.body);

    if(request.body.current_password == '' || request.body.new_password == '' || request.body.confirm_password == ''){
        const result = {
            _status: false,
            _message: 'Required filed is missing.',
            _data: []
        }
        response.send(result);
        
    }

    try {
        var verify = jwt.verify(token[1], secretKey);

        if (verify) {

            var getUserInfo = await userSchema.findOne({
                deleted_at: null,
                _id: verify.data._id
            });

            if (getUserInfo) {
                var verifyPassword = bcrypt.compareSync(request.body.current_password, getUserInfo.password);

                if (verifyPassword) {
                    if (request.body.current_password == request.body.new_password) {
                        const result = {
                            _status: false,
                            _message: 'Current Password and new password cannot be same.',
                            _data: []
                        }

                        response.send(result);
                    } else {
                        if (request.body.new_password != request.body.confirm_password) {
                            const result = {
                                _status: false,
                                _message: 'New Password and confirm password must be same.',
                                _data: []
                            }

                            response.send(result);
                        } else {
                            await userSchema.updateOne({
                                _id: verify.data._id
                            }, {
                                $set: {
                                    password : bcrypt.hashSync(request.body.confirm_password, saltRounds)
                                }
                            })
                                .then((resp) => {
                                    if (resp) {
                                        const result = {
                                            _status: true,
                                            _message: 'Password Update succussfully !!',
                                            _data: resp
                                        }

                                        response.send(result);
                                    } else {
                                        const result = {
                                            _status: false,
                                            _message: 'No record found.',
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
                        }
                    }

                } else {
                    const result = {
                        _status: false,
                        _message: 'Current Password is incorrect.',
                        _data: []
                    }

                    response.send(result);
                }

            } else {
                const result = {
                    _status: false,
                    _message: 'No record found.',
                    _data: []
                }

                response.send(result);
            }
        } else {
            const result = {
                _status: false,
                _message: 'Token expired !!',
                _data: null
            }

            response.send(result);
        }
    } catch (error) {
        const result = {
            _status: false,
            _message: 'Token expired !!',
            _data: null
        }

        response.send(result);
    }
}

// For Forgot Password
exports.forgotPassword = async (request, response) => {

}

// For Reset Password
exports.resetPassword = async (request, response) => {

}







//  For View Data
exports.view = async (request, response) => {

    var limit = 15;
    var page = 1;

    if (request.body.limit != '' && request.body.limit != undefined) {
        limit = request.body.limit;
    }

    if (request.body.page != '' && request.body.page != undefined) {
        page = request.body.page;
    }

    skip = (page - 1) * limit;

    const condition = {
        deleted_at: null,
    }

    if (request.body.name != '' && request.body.name != undefined) {
        var nameRegex = new RegExp(request.body.name, "i");
        condition.name = nameRegex;
    }

    await defaultSchema.find(condition).select('name status order')
        .limit(limit).skip(skip)
        .sort({
            _id: 'desc'
        })
        .then((resp) => {
            if (resp.length > 0) {
                const result = {
                    _status: true,
                    _message: 'Record inserted succussfully',
                    _data: resp
                }

                response.send(result);
            } else {
                const result = {
                    _status: false,
                    _message: 'No record found.',
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
}

//  For Details Data
exports.details = async (request, response) => {

    await defaultSchema.findOne({
        deleted_at: null,
        _id: request.params.id
    })
        .then((resp) => {
            if (resp) {
                const result = {
                    _status: true,
                    _message: 'Record fetch succussfully',
                    _data: resp
                }

                response.send(result);
            } else {
                const result = {
                    _status: false,
                    _message: 'No record found.',
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
}

//  For Update Data
exports.update = async (request, response) => {

    var dataSave = {
        name: request.body.name,
        order: request.body.order,
    }

    await defaultSchema.updateOne({
        _id: request.params.id
    },
        {
            $set: dataSave
        })
        .then((resp) => {
            const result = {
                _status: true,
                _message: 'Record updated succussfully',
                _data: resp
            }

            response.send(result);
        })
        .catch((error) => {
            var error_messages = [];
            var errorKey = {};

            for (var data in error.errors) {
                errorKey[data] = error.errors[data].properties.message;
                error_messages.push(errorKey);
            }

            const result = {
                _status: false,
                _message: 'Something went wrong !!',
                error_messages: error_messages,
                _data: null
            }

            response.send(result);
        })

}

//  For Change Status Data
exports.changeStatus = async (request, response) => {
    await defaultSchema.updateMany(
        {
            _id: {
                $in: request.body.ids
            }
        },
        [
            {
                $set: {
                    status: {
                        $not: "$status"
                    }
                }
            }
        ]
    ).then((result) => {
        const data = {
            _status: true,
            _message: 'Change Status succussfully',
            _data: result
        }

        response.send(data);

    }).catch((error) => {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    })
}

//  For Delete Data
exports.destroy = async (request, response) => {

    await defaultSchema.updateMany(
        {
            _id: {
                $in: request.body.ids
            }
        },
        {
            $set: {
                deleted_at: Date.now()
            }
        }
    ).then((result) => {
        const data = {
            _status: true,
            _message: 'Record deleted succussfully',
            _data: result
        }

        response.send(data);

    }).catch((error) => {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    })
}