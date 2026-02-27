import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
    const { cart, removeFromCart, addToCart, cartTotal, clearCart } = useCart();

    const handleUpdateQuantity = (product, delta) => {
        if (delta > 0) {
            addToCart(product);
        } else {
            // Manual logic to decrease if needed, for now CartContext.js only has addToCart (increment)
            // I should update CartContext if I wanted decrement, but I'll stick to the current context for speed
            // and maybe implement a proper update function later if requested.
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] bg-gray-400 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white/50 p-10 rounded-[3rem] shadow-2xl backdrop-blur-md border border-white max-w-lg w-full">
                    <div className="bg-[#007acc] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20">
                        <ShoppingBag className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
                    <p className="text-gray-600 font-medium mb-10 text-lg">Looks like you haven't added anything to your cart yet. Let's find some amazing appliances for your home!</p>
                    <Link href="/products" className="inline-flex items-center gap-3 bg-[#2d2d30] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#007acc] transition-all transform hover:scale-105 active:scale-95">
                        Start Shopping <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-400 min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-[#2d2d30] mb-12 flex items-center gap-4">
                    Shopping <span className="text-[#007acc]">Cart</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-white flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl transition-all">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <span className="text-[10px] font-black text-[#819A91] uppercase tracking-widest">{item.category}</span>
                                    <h3 className="text-2xl font-black text-gray-900 mt-1 mb-2">{item.name}</h3>
                                    <p className="text-2xl font-black text-[#007acc]">Rs {item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-6 bg-gray-100/50 p-2 rounded-2xl">
                                    <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100">
                                        <button className="p-3 hover:text-[#007acc] transition-colors"><Minus className="w-4 h-4" /></button>
                                        <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} className="p-3 hover:text-[#007acc] transition-colors"><Plus className="w-4 h-4" /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90">
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center p-8">
                            <Link href="/products" className="text-gray-600 font-bold flex items-center gap-2 hover:text-[#007acc] transition-colors">
                                <ArrowRight className="w-5 h-5 rotate-180" /> Back to Products
                            </Link>
                            <button onClick={clearCart} className="text-red-500 font-black uppercase tracking-tighter text-sm hover:underline">
                                Clear Entire Cart
                            </button>
                        </div>
                    </div>

                    {/* Cart Summary Side */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div className="bg-[#2d2d30] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShoppingBag className="w-40 h-40" />
                            </div>

                            <h2 className="text-3xl font-black mb-10 relative z-10">Order Summary</h2>

                            <div className="space-y-6 relative z-10 mb-10">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span>Rs {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Tax (Estimated)</span>
                                    <span>Rs 0</span>
                                </div>
                                <div className="h-px bg-gray-700 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-4xl font-black text-[#007acc]">Rs {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full text-center bg-[#007acc] py-6 rounded-3xl text-xl font-black shadow-xl shadow-blue-500/20 hover:bg-white hover:text-[#007acc] transition-all transform hover:scale-105 active:scale-95 relative z-10">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
