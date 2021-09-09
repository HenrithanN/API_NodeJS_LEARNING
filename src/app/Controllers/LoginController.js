const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');

class LoginController {

    async index(req, res){
        //Receber Requisição e validar se existe um usuário com o email que vai ser enviado no req.body
        const { email, password } = req.body;

        //Verifica se existe um usuário com o Email informado.
        const userExist = await User.findOne({ email });

        //Se não existir, retorna erro
        if(!userExist){
            return res.status(400).json({
                error: true,
                message: 'Usuário não Existe!'
            })
        }

        //Comparando a senha informada e a senha armazenada e verificando se são iguais.
        if(!(await bcrypt.compare(password, userExist.password))){
            return res.status(400).json({
                error: true,
                message: 'A senha está inválida!'
            })
        }
        
        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email
            },
            token:{
                /*
                    Gerando o Token, necessário 3 parametros:
                    1° Objeto = id do usuário
                    2° Variavel com a senha secreta
                    3° Objeto = quando o token vai expirar
                */
                token: jwt.sign(
                    {id: userExist._id}, 
                    config.secret, 
                    {expiresIn: config.expireIn}
                )
            }
        })
    }
}

module.exports = new LoginController();