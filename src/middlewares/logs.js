
const fs = require('fs');


const logs = (req, res, next) => {

    fs.appendFileSync('logs.txt', 'Ingreso en la pagina' + req.url + '\n', 'utf-8')

    next();
}

module.exports = logs;