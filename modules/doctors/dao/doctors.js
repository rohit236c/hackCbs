const Doctor = require('../model/doctor');

const doctorDao = {
    getAll: (query, limit, order = {
        _id: 'desc'
    }) => {
        return new Promise((resolve, reject) => {
            Doctor
                .find(query, null, {
                    limit,
                    order
                }, function (err, doctors) {
                    if (err) {
                        reject({success: false, status: 500, message: 'Error in processing Query'});
                    } else {
                        resolve({success: true, message: 'Successfully retrieved doctor', doctors});
                    }
                });
        });
    },
    createDoctor: (newDoctorObj) => {
        let newDoctor = new Doctor(newDoctorObj);
        return new Promise((resolve, reject) => {
            newDoctor
                .save(function (err, savedDoctor) {
                    if (err) {
                        reject({success: false, status: 500, error: err, message: 'Error in processing Query'});
                    } else {
                        resolve({message: 'Successfully Created Doctor', success: true, savedDoctor});
                    }
                });
        });
    },
    getOneDoctor: function (query) {
        return new Promise((resolve, reject) => {
            Doctor.findOne(query, function (err, doctor) {
                if (err) {
                    return reject({
                        success: false,
                        status: 500,
                        message: 'Error in processing Query'
                    });
                } 
                else if(!doctor){
                    return reject({
                        meta: 404,
                        message: 'No doctor Found',
                        success: false
                    });
                }
                else {
                    return resolve({
                        success: true,
                        message: 'Successfully retrieved doctor',
                        doctor
                    });
                }
            });
        });
    },
}
module.exports = doctorDao;