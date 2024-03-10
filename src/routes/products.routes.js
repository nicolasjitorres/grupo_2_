const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require("../middlewares/adminMiddleware");
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const upload = multerMiddleware('products');
const { body } = require('express-validator');
const ValCreateEditProduct = require('../middlewares/validations/ValCreateEditProduct');
const ValEditSizeProduct = require('../middlewares/validations/ValEditSizeProduct');

/* GET ALL PRODUCTS */ 
/* Obtener todos los productos */ 
router.get('/', productController.index); 

/* GET ONE PRODUCT */ 
// Ruta hacía el detalle del producto
router.get('/detail/:id', productController.detail); 

// Ruta hacia el carrito de compras del usuario
router.get('/cart', authUserMiddleware, productController.cart);

// Agrega un producto al carrito
router.post('/cart/:id', productController.addCart);

/* CREATE ONE PRODUCT */ 
router.get('/create', adminMiddleware, productController.create); 
router.post('/',adminMiddleware, upload.array('imagenes'), ValCreateEditProduct, productController.save); 

/* EDIT ONE PRODUCT */ 
router.get('/edit/:id', adminMiddleware, productController.edit); 
router.put('/:id',adminMiddleware, ValCreateEditProduct, productController.update); 

/* DELETE ONE PRODUCT */ 
router.delete('/:id', adminMiddleware, productController.logicDelete); 

/* GET ALL IMAGES AND SIZES BY ONE PRODUCT */
router.get('/edit/:id/relations', adminMiddleware, productController.relations)

/* GET VIEW FOR ADD IMAGES TO ONE PRODUCT */
router.get('/edit/:id/relations/images/create', adminMiddleware, productController.getAddImage);

/* ADD IMAGES TO ONE PRODUCT */
router.post('/edit/:id/relations/images', adminMiddleware, upload.array('imagenes'), productController.addImage);

/* DELETE ONE IMAGE OF ONE PRODUCT */
router.delete('/edit/:id/relations/images/:idImagen', adminMiddleware, productController.deleteImage);

/* GET VIEW FOR ADD ONE SIZE TO ONE PRODUCT */
router.get('/edit/:id/relations/sizes/create', adminMiddleware, productController.getAddSize);

/* ADD SIZE TO ONE PRODUCT */
router.post('/edit/:id/relations/sizes', adminMiddleware, ValEditSizeProduct, productController.addSize);

/* EDIT ONE SIZE OF ONE PRODUCT */
router.get('/edit/:id/relations/sizes/:idTalle', adminMiddleware, productController.getEditSize);

/* EDIT ONE SIZE OF ONE PRODUCT */
router.put('/edit/:id/relations/sizes/:idTalle', adminMiddleware, ValEditSizeProduct, productController.editSize);

/* DELETE ONE SIZE OF ONE PRODUCT */
router.delete('/edit/:id/relations/sizes/:idTalle', adminMiddleware, productController.deleteSize);



module.exports = router;