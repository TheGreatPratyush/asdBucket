const productDatabase = require('../database/product.database');

async function getAllProducts() {
    return await productDatabase.delayReadData();
}

async function getProductById(id) {
    let products = await productDatabase.delayReadData();
    return products.find(el => el.id == id);
}

async function createProduct(productData) {
    let products = await productDatabase.readData();
    let newProduct = {
        id: Date.now(),
        ...productData
    };
    products.push(newProduct);
    await productDatabase.writeData(products);
    return newProduct;
}

async function updateProduct(id, updateData) {
    let products = await productDatabase.readData();
    let index = products.findIndex(el => el.id == id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updateData, id: Number(id) };
        await productDatabase.writeData(products);
        return products[index];
    }
    return null;
}

async function deleteProduct(id) {
    let products = await productDatabase.readData();
    let initialLength = products.length;
    products = products.filter(el => el.id != id);
    if (products.length !== initialLength) {
        await productDatabase.writeData(products);
        return true;
    }
    return false;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
