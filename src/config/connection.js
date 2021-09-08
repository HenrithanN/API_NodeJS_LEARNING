const mongoose = require('mongoose');

class Connection{
    //Construtor chama tudo que ta dentro dele, assim que a Connection é Instanciada em Algum Lugar.
    constructor() {
        this.dataBaseConnectionMongoDB();
    }

    dataBaseConnectionMongoDB(){
        let dataBaseURL = 'mongodb+srv://joaninha:141517Joaninha@cluster0.gwvmv.mongodb.net/user?retryWrites=true&w=majority'
        /*
            Metodo Connect recebe 2 Parametros:
                1° URL do banco de Dados
                2° Algumas Configurações Padrão do MongoDB
        */
        this.mongoDBConnection = mongoose.connect(dataBaseURL)
        //Se tudo der Certo Faz o Then
        .then(()=>{
            console.log('Conexão com o MongoDB estabelecida com Sucesso!');
        })
        //Se der Errado Faz o Catch
        .catch((error)=>{
            console.log(`Erro ao Estabelecer Conexão com o MongoDB: ${error}`)
        })
    }
}

module.exports = new Connection();