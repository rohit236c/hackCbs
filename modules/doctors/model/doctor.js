const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const DoctorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    name: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    contact: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    specialization: {
        type: String
    },
    license_number: {
        type: String
    },
    hospital_name: {
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
});

module.exports = mongoose.model('doctor', DoctorSchema);