const userSchema = require('../../models/user');
const mongodb = require('mongodb');
var jwt = require('jsonwebtoken');
var secretKey = '123456789';
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "frahim9900@gmail.com",
      pass: "msyttpjhrrjejosi",
    },
});

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

    await userSchema.findOne({
        email: request.body.email
    })
    .then(async(resp) => {
        if (resp) {

            var link = `http://localhost:3000/reset-password/${ resp._id }`;

            const info = await transporter.sendMail({
                from: '"Frahim" <frahim9900@gmail.com>',
                to: "sandeep.bhati@wscubetech.com",
                subject: "Reset Your Password",
                // text: "Hello world?", // plain‑text body
                html: `
                    <h2>Reset Your Password</h2>
                    <p>Hi ${ resp.name },</p>
                    <p>We received a request to reset the password for your account. If you made this request, click the button below to reset your password:</p>
                    
                    <a href=${ link } class="button">Reset Password</a>
                    
                    <p>If you did not request a password reset, you can safely ignore this email. Your account remains secure.</p>
                    <p>This link will expire in <strong>[X hours]</strong>.</p>

                    <div class="footer">
                    <p>Need help? Contact us at [support@example.com]</p>
                    <p>© [Year] [Your Company Name]. All rights reserved.</p>
                    </div>
                `, // HTML body
            });

            const result = {
                _status: true,
                _message: 'Email sent Successfully !!',
            }

            response.send(result);
        } else {
            const result = {
                _status: false,
                _message: "Email Id does't exit.",
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

// For Reset Password
exports.resetPassword = async (request, response) => {
    await userSchema.findOne({
        deleted_at: null,
        _id: request.body.id,
    })
    .then(async(resp) => {
        if (resp) {
            
            await userSchema.updateOne({
                _id: request.body.id
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