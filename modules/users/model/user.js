const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    guardian_name: {
        type: String
    },
    blood_group: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    phone: {
        type: String
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
    },
    password: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: moment.utc().toDate()
    },
    disease: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);