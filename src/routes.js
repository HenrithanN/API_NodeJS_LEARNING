const { Router } = require('express');
const LoginController = require('./app/Controllers/LoginController');
const authMiddleware = require('./app/Middlewares/authMiddleware');

//Uma Constante herdando tudo que tem dentro do Router;
const routes = new Router();

//Importando Controller.
const UserController = require('./app/Controllers/UserController');

//Criando uma Rota POST
//Indicando o caminho e depois qual arquivo vai receber a requisição.
routes.post('/create-user', authMiddleware, UserController.store);
routes.post('/login', LoginController.index);

//Criando uma Rota GET
//Indicando o caminho e depois qual arquivo vai receber a requisição.
routes.get('/user', authMiddleware, UserController.show);
module.exports = routes