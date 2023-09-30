const {body} = require('express-validator');

module.exports = [
    body('username').notEmpty().withMessage('Completa el nombre de usuario').isLength({min:6, max:12}).withMessage('Debe tener entre 5 y 12 caracteres').bail,
    body('name').notEmpty().withMessage('Completa con el nombre y apellido'),
    body('contrasenia').notEmpty().withMessage('La contrasenia no puede estar vacia').isStrongPassword({minLength:8, maxLength:20, minSymbols:1, minNumbers:1, minUppercase:1}).withMessage('La contrasenia debe tener minimo 8 caractares, incluyendo A b 1 y &').bail,
]