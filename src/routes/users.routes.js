const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Middlewares
const upload = require('../middlewares/multerMiddleware');
const guestUserMiddleware = require('../middlewares/guestUserMiddleware');
const authUserMiddleware = require('../middlewares/authUserMiddleware');


// LOGIN
router.get('/login', guestUserMiddleware, userController.login);
router.post('/signIn', userController.signIn);

// LOGOUT
router.get('/logout', authUserMiddleware, userController.logout);

// REGISTRO
router.get('/register', guestUserMiddleware, userController.register);
router.post('/register', upload.single('Imagen'), userController.save); 

// ELIMINACION DE UNA CUENTA
router.delete('/:id', userController.destroyUser); 

// TODOS LOS USUARIOS
router.get('/', authUserMiddleware, userController.usuarios);

// PERFIL DEL USUARIO
router.get('/profile', authUserMiddleware, userController.profile);

// EDICION DEL USUARIO
router.get('/edit', authUserMiddleware, userController.edit);
router.put('/edit', upload.single('Imagen'), userController.update);

// CAMBIO DE CONTRASEÑA
router.get('/changePass', authUserMiddleware, userController.changePass);
router.put('/changePass', userController.updatePass);




module.exports = router;