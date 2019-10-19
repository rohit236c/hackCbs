const userDao = require('../../users/dao/users');
const doctorDao = require('../../doctors/dao/doctors');
const {
    createToken
} = require('../token.util/util');
const validate = require('../validate/validate');
const resBuilder = require('../responseBuilder/response');

const autheticationController = {
    signup: (req, res, next) => {
        validate
            .encryptPassword(req.body.password)
            .then((hash) => {

                if (req.body.type === "patient") {
                    let userObj = {
                        email: req.body.email,
                        password: hash,
                        type: req.body.type
                    };
                    userDao
                        .createUser(userObj)
                        .then((result) => {
                            meta = {
                                status: result.status,
                                message: result.message,
                                success: result.success
                            };
                            let userObj = {
                                id: result.savedUser._id,
                                email: result.savedUser.email
                            };
                            let token = createToken(userObj);
                            data = {
                                type: "token",
                                attributes: {
                                    value: token
                                }
                            };
                            let json = resBuilder('create', meta, data);
                            res.json(json);
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                } else {
                    let userObj = {
                        email: req.body.email,
                        password: hash,
                        type: req.body.type
                    };
                    doctorDao
                        .createDoctor(userObj)
                        .then((result) => {
                            meta = {
                                status: result.status,
                                message: result.message,
                                success: result.success
                            };
                            let userObj = {
                                id: result.savedUser._id,
                                email: result.savedUser.email
                            };
                            let token = createToken(userObj);
                            data = {
                                type: "token",
                                attributes: {
                                    value: token
                                }
                            };
                            let json = resBuilder('create', meta, data);
                            res.json(json);
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                }

            });
    },
    login: (req, res, next) => {
        let query = {
            email: req.body.email,
            // type: req.body.type
        };
        if (req.body.type === "patient") {
            userDao
                .getOneUser(query)
                .then((result) => {
                    let userObj = {
                        id: result.user._id,
                        email: result.user.email
                    };
                    console.log(result,"what");
                    let token = createToken(userObj);
                    validate
                        .isValidPassword(req.body.password, result.user, token)
                        .then((result) => {
                            meta = {
                                status: result.status,
                                message: result.message,
                                success: result.success
                            }
                            data = {
                                type: "token",
                                attributes: {
                                    value: result.token
                                }
                            }
                            let json = resBuilder('create', meta, data);
                            res.json(json);
                        })
                        .catch((err) => {
                            console.log(err)
                            res.json(err);
                        });
                })
                .catch(err => res.json(err));
        } else {
            doctorDao
                .getOneDoctor(query)
                .then((result) => {
                    let userObj = {
                        id: result.doctor._id,
                        email: result.doctor.email
                    };
                    let token = createToken(userObj);
                    validate
                        .isValidPassword(req.body.password, result.doctor, token)
                        .then((result) => {
                            meta = {
                                status: result.status,
                                message: result.message,
                                success: result.success
                            }
                            data = {
                                type: "token",
                                attributes: {
                                    value: result.token
                                }
                            }
                            let json = resBuilder('create', meta, data);
                            res.json(json);
                        })
                        .catch((err) => {
                            console.log(err)
                            res.json(err);
                        });
                })
                .catch(err => res.json(err));
        }
    }
};

module.exports = autheticationController;