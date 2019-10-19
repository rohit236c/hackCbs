const doctors = require('./controllers/doctors');
module.exports = (router) => {
    router.get('/doctors',doctors.getAllDoctor);
    router.post('/doctors',doctors.createDoctor);
}