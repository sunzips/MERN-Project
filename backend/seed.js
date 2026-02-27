const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@home.com',
        password: 'admin123',
        role: 'admin'
    }
];

const products = [
    // Washing Machines
    { name: 'Premium Washing Machine', description: 'Advanced front-load washing machine with steam wash. Features AI-driven cycle adjustment and deep cleaning technology.', price: 45000, category: 'Washing Machines', brand: 'Electra', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', stock: 12 },
    { name: 'Ultra-Quiet Top Loader', description: 'Efficient top-loading machine with vibration reduction technology and smart wash cycles.', price: 32000, category: 'Washing Machines', brand: 'Electra', image: 'https://images.unsplash.com/photo-1545173158-154446f7902d?auto=format&fit=crop&q=80&w=800', stock: 15 },
    { name: 'Compact Washer-Dryer', description: 'Space-saving combo unit with fuzzy logic and sensor drying for delicate fabrics.', price: 58000, category: 'Washing Machines', brand: 'Electra', image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800', stock: 8 },

    // Refrigerators
    { name: 'Smart Refrigerator', description: 'Double door glass finish with inverter technology. Maintains optimal humidity for week-long freshness.', price: 85000, category: 'Refrigerators', brand: 'FrostGuard', image: 'https://images.unsplash.com/photo-1571175440340-f1db1f8edccb?auto=format&fit=crop&q=80&w=800', stock: 5 },
    { name: 'French Door Elite', description: 'Massive capacity with custom cooling zones and built-in water dispenser.', price: 125000, category: 'Refrigerators', brand: 'FrostGuard', image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800', stock: 3 },
    { name: 'Mini Chill Master', description: 'Compact refrigerator perfect for offices or bedrooms with quiet operation.', price: 18000, category: 'Refrigerators', brand: 'FrostGuard', image: 'https://images.unsplash.com/photo-1622146099402-70452335c091?auto=format&fit=crop&q=80&w=800', stock: 20 },

    // Microwave Ovens
    { name: 'Convection Microwave', description: 'Versatile cooking with grill and convection. Multi-stage cooking with 10 power levels.', price: 15000, category: 'Microwave Ovens', brand: 'HeatMaster', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=800', stock: 20 },
    { name: 'Pro-Grill Microwave', description: 'High-power grill functionality with ceramic enamel interior for easy cleaning.', price: 12000, category: 'Microwave Ovens', brand: 'HeatMaster', image: 'https://images.unsplash.com/photo-1466632311177-0c55d13d2ea5?auto=format&fit=crop&q=80&w=800', stock: 25 },
    { name: 'Smart Solo Oven', description: 'Simple and effective solo microwave with one-touch heating and child lock.', price: 8500, category: 'Microwave Ovens', brand: 'HeatMaster', image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=800', stock: 30 },

    // Air Conditioners
    { name: 'Split Air Conditioner', description: '5-star energy saving with rapid cooling. Dual inverter compressor with virus filter.', price: 65000, category: 'Air Conditioners', brand: 'ChillZone', image: 'https://images.unsplash.com/photo-1621905252507-b352224d33a0?auto=format&fit=crop&q=80&w=800', stock: 8 },
    { name: 'Window Cooling Pro', description: 'Reliable window AC with high-efficiency copper tubes and sleep mode.', price: 42000, category: 'Air Conditioners', brand: 'ChillZone', image: 'https://images.unsplash.com/photo-1591147139233-e4a90710684f?auto=format&fit=crop&q=80&w=800', stock: 10 },
    { name: 'Portable Arctic Breeze', description: 'Take the cool with you. High-mobility AC with remote control and programmable timer.', price: 35000, category: 'Air Conditioners', brand: 'ChillZone', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800', stock: 12 },

    // Vacuum Cleaners
    { name: 'Robot Vacuum Cleaner', description: 'Smart mapping and automatic charging. HEPA filter with high-suction performance.', price: 25000, category: 'Vacuum Cleaners', brand: 'CleanBot', image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80&w=800', stock: 15 },
    { name: 'Stick Vacuum Elite', description: 'Cordless convenience with multi-surface brush and lightweight design.', price: 19000, category: 'Vacuum Cleaners', brand: 'CleanBot', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800', stock: 18 },
    { name: 'Heavy Duty Canister', description: 'Industrial grade suction for deep carpet cleaning and pet hair removal.', price: 14000, category: 'Vacuum Cleaners', brand: 'CleanBot', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800', stock: 10 },

    // Stoves
    { name: 'Induction Cooktop', description: 'Fast and safe cooking with touch controls. Energy efficient with automatic pan detection.', price: 5000, category: 'Stoves', brand: 'ChefPro', image: 'https://images.unsplash.com/photo-1522069394066-326005dc26b2?auto=format&fit=crop&q=80&w=800', stock: 30 },
    { name: 'Glass Top Gas Stove', description: 'Premium 3-burner gas stove with toughened glass top and high-efficiency brass burners.', price: 7500, category: 'Stoves', brand: 'ChefPro', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', stock: 22 },
    { name: 'Smart Air Fryer', description: 'Healthy oil-free cooking with digital presets and 5.5L large capacity.', price: 12000, category: 'Stoves', brand: 'ChefPro', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800', stock: 40 }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});

        // Hash passwords and save users
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            return user;
        }));

        await User.insertMany(hashedUsers);
        console.log('Users Seeded');

        await Product.insertMany(products);
        console.log('Products Seeded');

        console.log('Database Initialized Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
