# 👋 Hello Friend! Welcome to the Premium Appliance Store

This is a full-stack MERN e-commerce application. Follow these instructions to set it up and explore the premium features.

## 🛠 Quick Setup

1. **Extract/Clone** the project folder.
2. **Backend**:
   ```bash
   cd backend
   npm install
   node seed.js  # This sets up the database and admin account
   npm start
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Visit `http://localhost:3000` to start!

## 🌟 What to Test

### **1. The Shopping Experience**
- **Sign Up**: Create an account and watch the Navbar greet you personally!
- **Browse**: Check out the **Products** page. Try the **Price Range** slider (it's custom-built).
- **Cart & Checkout**: Adding items to the cart is persistent. During checkout, your name is automatically pre-filled!

### **2. The Admin Dashboard (Secret Access)**
- **Login**: Use `admin@home.com` / `admin123`.
- **Dashboard**: High-end glassmorphism dashboard with:
  - **Live Charts**: See order history and revenue.
  - **Customer List**: View all people registered on the site.
  - **Settings**: Toggle system security and maintenance modes.

## 🚀 Key Fixes Included
- **Dynamic Greeting**: Navbar now knows who you are.
- **Improved Filtering**: No more "missing products" when sliding the price.
- **Secure Auth**: Refactored backend for a smoother login/register flow.

Enjoy the demo! 🚀
