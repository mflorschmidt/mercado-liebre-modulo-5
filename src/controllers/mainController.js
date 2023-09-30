const path = require('path');
const fs = require('fs');
const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));


const mainController = {
    index: (req,res) => {
        const visitados = datos.filter((row) => row.category == 'visited');
        const ofertas = datos.filter((row) => row.category == 'in-sale');
        return res.render('home', { visitado: visitados, oferta: ofertas });
    }


}

module.exports = mainController;
