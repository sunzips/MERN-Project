const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

router.get('/', auth, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const orderStats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);

        const categoryStats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        const latestOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            totalOrders: orderStats[0] ? orderStats[0].totalOrders : 0,
            totalRevenue: orderStats[0] ? orderStats[0].totalRevenue : 0,
            categoryDistribution: categoryStats,
            recentActivity: latestOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
