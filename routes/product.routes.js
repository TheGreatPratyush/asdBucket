const express = require('express');
const productController = require('../controllers/product.controller');
const cacheMiddleware = require('../middleware/cache');

const router = express.Router();

router.use(cacheMiddleware);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
