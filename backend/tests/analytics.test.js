const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const analyticsRoute = require('../routes/analytics');
const User = require('../models/User');
const Order = require('../models/Order');

const app = express();
app.use(express.json());
app.use('/api/analytics', analyticsRoute);

describe('Analytics API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/mern-ecommerce-test');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Order.deleteMany({});
    });

    it('should return 0 stats when database is empty', async () => {
        const res = await request(app).get('/api/analytics');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('totalUsers', 0);
        expect(res.body).toHaveProperty('totalOrders', 0);
        expect(res.body).toHaveProperty('totalRevenue', 0);
    });

    it('should return correct stats when data exists', async () => {
        const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password' });
        await user.save();

        const order = new Order({
            user: user._id,
            products: [{ quantity: 1 }],
            totalAmount: 1000
        });
        await order.save();

        const res = await request(app).get('/api/analytics');
        expect(res.statusCode).toEqual(200);
        expect(res.body.totalUsers).toEqual(1);
        expect(res.body.totalOrders).toEqual(1);
        expect(res.body.totalRevenue).toEqual(1000);
    });
});
