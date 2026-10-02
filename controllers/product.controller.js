const productService = require('../services/product.service');

async function getProducts(req, res) {
    try {
        let products = await productService.getAllProducts();
        res.json(products);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let product = await productService.getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createProduct(req, res) {
    try {
        let newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let updated = await productService.updateProduct(id, req.body);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let success = await productService.deleteProduct(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
