import { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Star, ShoppingCart, ShieldCheck, Headset, Award, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [addedIds, setAddedIds] = useState(new Set());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/products');
                // Take the first 4 products as "Popular"
                setProducts(res.data.slice(0, 4));
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedIds((prev) => new Set([...prev, product._id]));
        setTimeout(() => {
            setAddedIds((prev) => {
                const next = new Set(prev);
                next.delete(product._id);
                return next;
            });
        }, 2000);
    };

    return (
        <div className="bg-gray-400">
            {/* Hero Section */}
            {/* ... keeping hero section the same ... */}
            <section className="w-full bg-gray-400 px-10 py-20">
                <div className="container mx-auto">
                    <div className="flex flex-col mb-5 space-y-5 md:flex-row items-center gap-x-20">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl mb-5 md:text-5xl font-bold text-[#2d2d30]">
                                Upgrade Your Home with <span className="text-[#007acc]">Smart</span> Excellence
                            </h1>
                            <p className="text-lg text-[#3e3e42] text-justify mb-5 leading-relaxed">
                                Discover the latest in energy-efficient and intelligent home appliances. From advanced washing machines to smart refrigerators, we bring cutting-edge technology directly to your modern household.
                            </p>
                            <div className="flex space-x-5 mb-5">
                                <Link href="/products">
                                    <button className="bg-[#007acc] text-white text-md font-medium rounded-lg py-2 px-4 hover:bg-[#819A91] border border-[#007acc] transition duration-300">
                                        Shop Now
                                    </button>
                                </Link>
                                <Link href="/#about">
                                    <button className="bg-[#819A91] text-white text-md font-medium rounded-lg py-2 px-4 hover:bg-[#007acc] border border-white transition duration-300">
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="absolute -left-5 -top-5 w-full h-full bg-[#E4EFE7] rounded-2xl"></div>
                            <img
                                className="relative rounded-2xl shadow-lg object-cover w-full h-auto"
                                src="https://weddingservices.co.in/wsimages/1672985779_household-appliances.jpg"
                                alt="Appliances"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Shop With Us */}
            <section className="w-full bg-gray-300 py-20 px-10" id="about">
                <div className="container mx-auto">
                    <h2 className="text-center text-3xl text-[#2d2d30] font-bold mb-12">Why Shop With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-[#E4EFE7] py-10 px-8 space-y-4 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                            <div className="rounded-full bg-[#819A91]/10 h-16 w-16 flex items-center justify-center">
                                <Award className="text-[#007acc] w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-medium text-[#2d2d30]">Premium Quality</h3>
                            <p className="text-[#3e3e42]">Every appliance is handpicked from the world's most trusted brands, ensuring long-lasting performance.</p>
                        </div>
                        <div className="bg-[#E4EFE7] py-10 px-8 space-y-4 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                            <div className="rounded-full bg-[#819A91]/10 h-16 w-16 flex items-center justify-center">
                                <Truck className="text-[#007acc] w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-medium text-[#2d2d30]">Swift Delivery</h3>
                            <p className="text-[#3e3e42]">Enjoy lightning-fast and secure shipping across the country. Your convenience is our top priority.</p>
                        </div>
                        <div className="bg-[#E4EFE7] py-10 px-8 space-y-4 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                            <div className="rounded-full bg-[#819A91]/10 h-16 w-16 flex items-center justify-center">
                                <Headset className="text-[#007acc] w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-medium text-[#2d2d30]">Smart Support</h3>
                            <p className="text-[#3e3e42]">Our expert team is available 24/7 to guide you through installation and any technical queries.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Products */}
            <section className="w-full bg-gray-400 px-10 py-20">
                <div className="container mx-auto">
                    <h2 className="text-3xl text-[#2d2d30] font-bold mb-12">Popular Products</h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 text-[#007acc] animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product._id} className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 transition duration-500 border border-gray-100/50 backdrop-blur-sm">
                                    <div className="relative h-64 overflow-hidden">
                                        <Link href={`/products/${product._id}`}>
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </Link>
                                        <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black uppercase py-1 px-3 rounded-full tracking-tighter">Sale</span>
                                    </div>
                                    <div className="p-6">
                                        <span className="text-[10px] font-bold text-[#819A91] uppercase tracking-widest mb-1 block">{product.category}</span>
                                        <Link href={`/products/${product._id}`}>
                                            <h3 className="text-gray-900 text-xl font-black mb-2 group-hover:text-[#007acc] transition-colors line-clamp-1">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center space-x-1 my-2">
                                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-yellow-400 fill-current" />)}
                                            <span className="text-gray-400 text-[10px] font-bold ml-1">(521)</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-6">
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-gray-900 text-xl font-black">Rs {product.price.toLocaleString()}</span>
                                                <span className="text-gray-400 text-xs line-through font-medium">Rs {(product.price * 1.2).toLocaleString()}</span>
                                            </div>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`p-3 rounded-2xl transition-all shadow-md active:scale-95 ${addedIds.has(product._id)
                                                    ? 'bg-green-500 text-white animate-bounce'
                                                    : 'bg-[#E4EFE7] text-[#007acc] hover:bg-[#007acc] hover:text-white'
                                                    }`}
                                            >
                                                {addedIds.has(product._id) ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            {/* ... keeping testimonials the same ... */}
            <section className="w-full bg-white py-20 px-10" id="blogs">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-black">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl shadow-xl border border-gray-100 space-y-4 hover:-translate-y-2 transition duration-300 bg-white">
                            <div className="flex items-center space-x-4">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=128" alt="User" className="h-14 w-14 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-[#2d2d30] font-medium text-lg">Sanjyoti K.</h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-yellow-500 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"The smart refrigerator I bought has completely changed organized living for me. The glass finish is absolutely stunning and matches my kitchen perfectly!"</p>
                        </div>
                        <div className="p-8 rounded-xl shadow-xl border border-gray-100 space-y-4 hover:-translate-y-2 transition duration-300 bg-white">
                            <div className="flex items-center space-x-4">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128" alt="User" className="h-14 w-14 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-[#2d2d30] font-medium text-lg">Rajesh M.</h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-yellow-500 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Fast delivery and the installation team was extremely professional. Highly recommended for anyone looking for premium home appliances."</p>
                        </div>
                        <div className="p-8 rounded-xl shadow-xl border border-gray-100 space-y-4 hover:-translate-y-2 transition duration-300 bg-white">
                            <div className="flex items-center space-x-4">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128" alt="User" className="h-14 w-14 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-[#2d2d30] font-medium text-lg">Anjali S.</h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 text-yellow-500 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Excellent customer service. They helped me choose the perfect energy-efficient air conditioner for my living room. Saved a lot on my bills already!"</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
