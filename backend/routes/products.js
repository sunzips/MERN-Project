const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

// @route   GET api/products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST api/products
// @desc    Create a product (Admin only)
router.post('/', auth, admin, async (req, res) => {
    const { name, description, price, category, brand, image, stock } = req.body;
    try {
        const newProduct = new Product({ name, description, price, category, brand, image, stock });
        const product = await newProduct.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT api/products/:id
// @desc    Update a product (Admin only)
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
