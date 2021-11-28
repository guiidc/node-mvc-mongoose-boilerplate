const route = require('express').Router();

const loginController = require('./src/controllers/loginController');
const todoController = require('./src/controllers/todoController');

route.get('/login', loginController.login);
route.post('/', todoController.getAll);

module.exports = route;
