const User = require('../models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController {
    /*
        Metodo Pra mostrar os Dados;
    */
    show(req, res){

        var users = [ 'Caio', 'Larissa', 'Danver']
        return res.status(200).json({
            error: false,
            users
        })
    }

    /*Metodo de Cadastro de Usuários
    */
    async store(req, res){

        // Validação através do Yup Schema - INICIO
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required() 
        })


        //Esperando os Dados vindos de req.body e validando
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                message: 'Dados Invalidos!'
            })
        }
        //Validação atravé do Yup Schema - FIM

        // Desestruturando o Body, pedindo apenas os Dados: name, email e password.
        const { name, email, password } = req.body;

        //Validando se o Email não existe na Base de Dados.

        let emailExist = await User.findOne({ email: req.body.email });

        if(emailExist){
            return res.status(400).json({
                error: true,
                message: 'Email já está sendo utilizado!'
            })
        }
        const dados = { name, email, password };

        //Pegando o dado Senha e Criptografando
        dados.password = await bcrypt.hash(dados.password, 8)
        //Inserindo Dados no MongoDB
        await User.create(dados, (err)=> {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: 'Erro ao Tentar Inserir Usuário no Banco do MongoDB'
                })
            }
            return res.status(400).json({
                error: false,
                message: 'Usuário Cadastrado com Sucesso!'
            })

        })
    }
}

module.exports = new UserController();