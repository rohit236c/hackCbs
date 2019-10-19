const autheticationController = require('./controller/authetication');
module.exports = (router) => {
    router.post('/signup', autheticationController.signup);
    router.post('/login', autheticationController.login);
}