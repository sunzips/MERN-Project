import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`http://localhost:5001/api/products/${id}`);
                    setProduct(res.data);
                } catch (err) {
                    console.error('Error fetching product:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="bg-gray-400 min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <Link href="/products" className="inline-flex items-center gap-2 text-gray-700 font-bold hover:text-[#007acc] transition-colors mb-12">
                    <ArrowLeft className="w-5 h-5" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl opacity-50"></div>
                        <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl border border-white overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-[2.5rem] group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-1.5 bg-[#007acc]/10 text-[#007acc] rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
                                <span className="px-4 py-1.5 bg-gray-200 text-gray-600 rounded-full text-xs font-black uppercase tracking-widest">{product.brand}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <span className="text-gray-500 font-bold">(48 Customer Reviews)</span>
                            </div>
                        </div>

                        <div className="p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-5xl font-black text-[#007acc]">Rs {product.price.toLocaleString()}</span>
                                <span className="text-xl text-gray-400 line-through font-bold">Rs {(product.price * 1.2).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10">
                                {product.description}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-grow flex items-center justify-center gap-3 py-6 rounded-3xl text-xl font-black shadow-xl transition-all transform active:scale-95 ${added ? 'bg-green-600 text-white animate-bounce' : 'bg-[#2d2d30] text-white hover:bg-[#007acc] shadow-blue-500/10'
                                        }`}
                                >
                                    {added ? (
                                        <> <Check className="w-6 h-6" /> Item Added! </>
                                    ) : (
                                        <> <ShoppingCart className="w-6 h-6" /> Add to Cart </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center p-6 bg-white/30 rounded-[2rem] text-center border border-white/50">
                                <ShieldCheck className="w-8 h-8 text-[#007acc] mb-3" />
                                <span className="text-sm font-bold text-gray-800">2 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white/30 rounded-[2rem] text-center border border-white/50">
                                <Truck className="w-8 h-8 text-[#007acc] mb-3" />
                                <span className="text-sm font-bold text-gray-800">Free Home Delivery</span>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white/30 rounded-[2rem] text-center border border-white/50">
                                <RefreshCcw className="w-8 h-8 text-[#007acc] mb-3" />
                                <span className="text-sm font-bold text-gray-800">7 Day Easy Return</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
