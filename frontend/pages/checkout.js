import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Controlled form state
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const router = useRouter();

    // Pre-fill name from auth context
    useEffect(() => {
        if (user?.name) {
            setShippingDetails(prev => ({ ...prev, name: user.name }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            items: cart.map(i => ({
                product: i._id,
                quantity: i.quantity,
                price: i.price
            })),
            totalAmount: cartTotal,
            shippingAddress: `${shippingDetails.name}, ${shippingDetails.address}, Phone: ${shippingDetails.phone}`
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/orders', orderData, {
                headers: token ? { 'x-auth-token': token } : {}
            });
            setSuccess(true);
            clearCart();
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-400 flex items-center justify-center p-6">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-xl w-full border border-white">
                    <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Order Placed!</h2>
                    <p className="text-gray-600 font-medium mb-10 text-lg">Thank you for your purchase. Your order has been successfully placed and is being processed.</p>
                    <Link href="/" className="inline-block bg-[#007acc] text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                        Return to Store
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-400 min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <Link href="/cart" className="inline-flex items-center gap-2 text-gray-700 font-bold hover:text-[#007acc] transition-colors mb-12">
                    <ArrowLeft className="w-5 h-5" /> Back to Cart
                </Link>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Billing Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white">
                            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <Truck className="text-[#007acc]" /> Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        value={shippingDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-100/50 border-none focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                                    <input
                                        required
                                        name="phone"
                                        type="text"
                                        value={shippingDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-100/50 border-none focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                        placeholder="+977-9800000000"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Delivery Address</label>
                                    <input
                                        required
                                        name="address"
                                        type="text"
                                        value={shippingDetails.address}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-100/50 border-none focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                        placeholder="Banepa-6, Kavre"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white">
                            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                <CreditCard className="text-[#007acc]" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-4 p-6 bg-[#007acc]/5 border-2 border-[#007acc] rounded-3xl cursor-pointer">
                                    <input type="radio" name="payment" defaultChecked className="w-6 h-6 text-[#007acc]" />
                                    <div>
                                        <p className="font-black text-gray-900">Cash on Delivery</p>
                                        <p className="text-sm text-gray-500 font-medium">Pay when you receive your items</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-6 bg-gray-50 border-2 border-transparent rounded-3xl opacity-50 cursor-not-allowed">
                                    <input disabled type="radio" name="payment" className="w-6 h-6 text-[#007acc]" />
                                    <div>
                                        <p className="font-black text-gray-900">Online Payment (Coming Soon)</p>
                                        <p className="text-sm text-gray-500 font-medium">Khalti, Esewa support in next version</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Side */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#2d2d30] text-white p-10 rounded-[3rem] shadow-2xl">
                            <h2 className="text-3xl font-black mb-8">Your Order</h2>
                            <div className="space-y-4 mb-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-[#007acc]">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-700 mb-10">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span>Rs {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-4xl font-black text-[#007acc]">Rs {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-3 bg-[#007acc] py-6 rounded-3xl text-xl font-black hover:bg-white hover:text-[#007acc] transition-all transform hover:scale-105 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Confirm Order <CheckCircle2 className="w-6 h-6" /></>}
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-[#007acc]" /> Secure Checkout Powered by MERN
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
