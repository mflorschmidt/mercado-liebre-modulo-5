const path = require('path');
const fs = require('fs');
const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/user.json')));
const {validationResult} = require('express-validator');


const userController = {
    login: (req,res) => {
        return res.render('login');
    },
    register: (req,res) => {
        return res.render('register');
    },
    processRegister: (req, res) => {
        const user = {
            "id" : datos.length+1,
            "name": req.body.nombreCompleto,
            "username": req.body.username,
            "fechaDeNacimiento": req.body.nacimiento,
            "email": req.body.email,
            "domicilio": req.body.domicilio,
            "tipoDePerfil": req.body.perfil,
            "intereses": req.body.intereses,
            "image": req.body.image,
            "password": req.body.contrasenia

            }
            // Guarda un obj literal con la propiedad errors
            const rdoValidacion = validationResult(req)
            console.log(rdoValidacion.errors)

            if(rdoValidacion.errors.length > 0) {
                return res.render('register', {error: rdoValidacion.mapped(), oldData: req.body})
            }

            fs.writeFileSync(path.resolve(__dirname,'../database/user.json'), JSON.stringify([...datos,user], null, 2));

        return res.redirect('/')
    },
    perfil: (req, res) => {
            const usuario = datos.find((row) => row.id == req.params.id);
    
        return res.render('perfil', {usuario: usuario});

    },
    editar: (req, res) => {
        const usuario = datos.find((row) => row.id == req.params.id);
        return res.render('editar', {usuario: usuario});

    },
    processEdit: (req,res) => {
        const usuario = datos.find((row) => row.id == req.params.id);
        for(let propiedad in req.body){
            usuario[propiedad] = req.body[propiedad];
        };
        fs.writeFileSync(path.resolve(__dirname,'../database/user.json'), JSON.stringify(datos, null, 2));

        return res.redirect('/');



    },
    eliminar: (req, res) => {
        const usuario = datos.find((row) => row.id == req.params.id);
        usuario.borrado = true;
        fs.writeFileSync(path.resolve(__dirname,'../database/user.json'), JSON.stringify(datos, null, 2));

        return res.redirect('/');

    }

}

module.exports = userController;