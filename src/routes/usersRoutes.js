const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const userController = require('../controllers/userController');
const multer = require('multer');
const logMiddleware = require('../middlewares/logMiddleware');
const registervalidation = require('../middlewares/registervalidation');

const multerDiskStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.resolve(__dirname, '../../public/img'))

    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName);

    }

});

const fileUpload = multer({
    storage: multerDiskStorage
});



router.get('/login', controller.login);
router.get('/register', controller.register);
router.post('/register', registervalidation,  controller.processRegister);

//EDITAR USUARIO
router.get('/perfil/:id', logMiddleware, userController.perfil);
router.get('/editar/:id', userController.editar);
router.put('/editar/:id', fileUpload.single('image'), userController.processEdit);

//ELIMINAR USUARIO
router.delete('/eliminar/:id', userController.eliminar);




module.exports = router;