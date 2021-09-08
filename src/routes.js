const { Router } = require('express');

//Uma Constante herdando tudo que tem dentro do Router;
const routes = new Router();

//Importando Controller.
const UserController = require('./app/Controllers/UserController');

//Criando uma Rota POST
//Indicando o caminho e depois qual arquivo vai receber a requisição.
routes.post('/create-user', UserController.store);

//Criando uma Rota GET
//Indicando o caminho e depois qual arquivo vai receber a requisição.
routes.get('/user', UserController.show);
module.exports = routes