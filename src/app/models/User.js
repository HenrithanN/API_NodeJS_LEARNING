const mongoose = require('mongoose');

const User = mongoose.Schema(
    // Obj, Schema
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
    },
    // Configuração pedindo pra gravar as datas do Create e o Update nas Tabelas Automaticamente
    {
        timestamps: true
    }
)
/*
    Recebe 2 Parametros
        1° Como vai ficar no Banco de Dados
        2° Obj com os Dados
*/
module.exports = mongoose.model('user', User)