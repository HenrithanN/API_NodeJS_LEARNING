const app = require('./app');

// Se houver um numero de porta contido no servidor vai utilizar
// Se não vai utilizar a porta 3000
var PORT = process.env.port || 3000;


app.listen(PORT, ()=> console.log(`App rodando na porta: ${PORT}`))