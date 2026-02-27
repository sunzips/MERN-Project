# 🛒 Premium MERN E-Commerce (Household Appliances)

A sophisticated, full-fledged e-commerce platform built with the MERN stack, featuring an ultra-premium admin dashboard, real-time cart management, and advanced analytics.

## 🚀 Key Features

### **Sanzeev's Analytics & QA Elite**
- **Ultra-Premium Dashboard**: Real-time market analytics with glassmorphism UI.
- **Deep Insights**: Revenue streams, order velocity, and cloud user distribution visualized via Recharts.
- **QA Verified**: Production-ready builds with secure JWT protocols.

### **Storefront Masterclass**
- **Shopping Cart**: Stateful management with persistent localStorage support.
- **Product Discovery**: High-end grid with search, filtering, and detailed product views.
- **Secure Checkout**: Multi-step checkout process with persistent order history tracking.

### **Backend Core**
- **Scalable CRUD**: Full product and order management APIs.
- **Secure Auth**: JWT-based identity management with admin middleware.
- **Data Aggregation**: MongoDB pipelines for high-performance analytics.

---

## 🛠 Tech Stack

- **Frontend**: Next.js (Pages Router), Tailwind CSS, Lucide Icons, Recharts, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Security**: JWT (JSON Web Tokens), BCrypt.js

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*Note: Ensure `.env` is configured with `MONGODB_URI` and `JWT_SECRET`.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Explore the store at `http://localhost:3000`.

---

### 4. Seed Initial Data
```bash
cd backend
node seed.js
```
This will populate the database with premium household appliances and create the default admin account.

---

## 🧪 How to Test

### **1. User Journey**
1. **Register**: Go to `http://localhost:3000/register` and create a new account.
2. **Dynamic Greeting**: Notice the Navbar changes to "Hello, [Your Name]".
3. **Product Discovery**: Visit the Products page, use the **Price Filter** slider, and try the search bar.
4. **Checkout**: Add items to your cart and proceed to checkout. The shipping name will be auto-filled!

### **2. Admin Experience**
1. **Login**: Go to `http://localhost:3000/login` and use:
   - **Email**: `admin@home.com`
   - **Password**: `admin123`
2. **Dashboard**: Visit `http://localhost:3000/admin/dashboard` to see premium glassmorphism charts, live order feeds, and customer management.

---

## 📁 Project Structure

```text
├── backend/
│   ├── models/        # MongoDB Schemas
│   ├── routes/        # API Endpoints (Auth, Products, Orders, Analytics)
│   ├── middleware/    # Auth & Admin Guards
│   └── tests/         # Jest API Tests
└── frontend/
    ├── contexts/      # Global State (Auth, Cart)
    ├── components/    # Reusable UI Blocks
    └── pages/         # Next.js Routes & Premium Layouts
```

Developed with ❤️ as a High-Fidelity MERN Showcase.
