const doctorDao = require('../dao/doctors');

const doctorController = {
    createDoctor: (req, res, next) => {
        let data = req.body;
        let doctorObj = {
            email: data.email,
            password: data.password
        };
        doctorDao
            .createDoctor(doctorObj)
            .then((result) => {
                return res.json(result);
            })
            .catch((err) => {
                res.json(err);
            })

    },
    getAllDoctor: (req, res, next) => {
        let limit = req.query.limit ?
            parseInt(req.query.limit) :
            10;
        let query = {
            status: true
        };
        doctorDao
            .getAll(query, limit)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    }
}
module.exports = doctorController;