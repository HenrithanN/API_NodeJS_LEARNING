const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
require('./config/connection');

class App {

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //Fara com que a aplicação entenda dados no formato JSON.
        this.app.use(express.json());

        /*
        req = requisição
        res = resposta
        next = middleware, intercepta uma requisição, pode pegar ou validar um dado,
        e manda prosseguir pra rota.
        */
        this.app.use((req, res, next) => {

            //Abaixo são parametros de Configuração, interceptam a requisição e vê se todos os requisitos estão sendo atendidos.
            //Quais origens são aceitas na Requisição ? Aqui no caso são todas. 
            res.header('Access-Controll-Allow-Origin', '*');
            //Quais o Metodos são aceitos?
            res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
            //Quais Cabeçalhos serão aceitos.
            res.header('Access-Controll-Allow-Headers', 'Acess, Content-type, Authorization, Acept, Origin, X-Requested-with');


            this.app.use(morgan('dev'));
            this.app.use(cors())

            //Depois de realizar as configurações, continua pra onde estava indo.
            next();
        })
    }

    routes(){
        this.app.use(routes)
    }
}

//Exportando a Classe App e o atributo app.
module.exports = new App().app