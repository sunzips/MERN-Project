const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, admin } = require('../middleware/auth');

// @route   POST api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
    const token = req.header('x-auth-token');
    let userId = null;
    if (token) {
        try {
            const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
            userId = decoded.id;
        } catch (err) { /* guest */ }
    }

    const { items, totalAmount, shippingAddress } = req.body;
    try {
        const newOrder = new Order({
            user: userId,
            items: items.map(i => ({ product: i.product, quantity: i.quantity, price: i.price })),
            totalAmount,
            shippingAddress
        });
        const order = await newOrder.save();
        res.json(order);
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/orders
// @desc    Get all orders (Admin only)
router.get('/', auth, admin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name image category price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/orders/my
// @desc    Get logged-in user's orders
router.get('/my', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product', 'name image category price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT api/orders/:id/status
// @desc    Update order status (Admin only)
router.put('/:id/status', auth, admin, async (req, res) => {
    const { status } = req.body;
    const allowed = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowed.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Allowed: ${allowed.join(', ')}` });
    }
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('user', 'name email').populate('items.product', 'name image category price');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
