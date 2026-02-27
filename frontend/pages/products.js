import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(150000);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const { addToCart } = useCart();
    const [addedIds, setAddedIds] = useState(new Set());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/products');
                setProducts(res.data);
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

    const toggleCategory = (cat) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    const filteredProducts = products.filter((p) => {
        const matchesPrice = Number(p.price) <= Number(priceRange);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(p.category);
        return matchesPrice && matchesSearch && matchesCategory;
    });

    const categories = ['Washing Machines', 'Refrigerators', 'Microwave Ovens', 'Air Conditioners', 'Vacuum Cleaners', 'Stoves'];

    return (
        <div className="bg-gray-400 min-h-screen">
            <div className="max-w-7xl mx-auto mt-6 flex gap-8 px-4 py-16">
                {/* Filters Section */}
                <aside className="w-72 bg-white/50 backdrop-blur-md shadow-2xl rounded-[2rem] p-8 h-fit hidden md:block border border-white">
                    <h2 className="text-2xl font-black mb-8 text-gray-900 tracking-tight">Filters</h2>
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h3>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#007acc]"
                        />
                        <div className="flex justify-between text-sm mt-4 font-bold text-gray-800">
                            <span>Rs 0</span>
                            <span className="text-[#007acc]">Rs {Number(priceRange).toLocaleString()}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Categories</h3>
                        <ul className="space-y-4">
                            {categories.map((cat) => (
                                <li key={cat} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleCategory(cat)}>
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.has(cat)}
                                            onChange={() => { }} // Controlled by li click
                                            className="w-5 h-5 rounded-lg border-gray-300 text-[#007acc] focus:ring-[#007acc] cursor-pointer"
                                        />
                                    </div>
                                    <span className={`font-medium transition-colors ${selectedCategories.has(cat) ? 'text-[#007acc]' : 'text-gray-700 group-hover:text-[#007acc]'}`}>{cat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Section */}
                <main className="flex-1">
                    {/* Sorting & Search */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white">
                        <h2 className="text-3xl font-black text-gray-900 leading-none">Best <span className="text-[#007acc]">Choice</span></h2>
                        <div className="relative w-full sm:w-1/2 group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#007acc] transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find your appliance..."
                                className="w-full pl-12 pr-6 py-4 bg-gray-100 border-2 border-gray-100 focus:border-[#007acc] focus:bg-white rounded-2xl focus:ring-4 focus:ring-[#007acc]/10 outline-none font-bold text-gray-900 placeholder:text-gray-400 transition-all"
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 text-[#007acc] animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-10">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col md:flex-row border border-white p-4">
                                    <Link href={`/products/${product._id}`} className="relative w-full md:w-2/5 h-80 md:h-auto overflow-hidden rounded-[2.5rem] block">
                                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                                        <div className="absolute top-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase text-[#007acc] tracking-widest shadow-lg">
                                                Premium Selection
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <span className="text-[10px] font-black text-[#819A91] uppercase tracking-[0.3em] mb-4 block leading-none">{product.category}</span>
                                                <Link href={`/products/${product._id}`}>
                                                    <h3 className="font-black text-3xl md:text-4xl text-gray-900 mb-2 group-hover:text-[#007acc] transition-colors tracking-tight">{product.name}</h3>
                                                </Link>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
                                                    <span className="px-3 py-1 bg-green-100 rounded-full text-[10px] font-bold text-green-600 uppercase tracking-widest">In Stock</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1 tracking-widest">Price</span>
                                                <p className="text-3xl font-black text-[#007acc]">Rs {product.price.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-lg mb-8 line-clamp-3 leading-relaxed font-medium max-w-xl">{product.description}</p>

                                        <div className="mt-auto flex gap-4">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`flex-1 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${addedIds.has(product._id)
                                                    ? 'bg-green-500 text-white animate-pulse'
                                                    : 'bg-[#007acc] text-white hover:bg-[#2d2d30] hover:shadow-blue-500/20'
                                                    }`}
                                            >
                                                {addedIds.has(product._id) ? (
                                                    <><Check className="w-5 h-5" /> Added to Cart</>
                                                ) : (
                                                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                                                )}
                                            </button>
                                            <Link
                                                href={`/products/${product._id}`}
                                                className="px-8 py-5 rounded-[1.5rem] bg-gray-100 text-gray-900 font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="col-span-full py-32 text-center bg-white/50 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-gray-300">
                                    <div className="mb-4 text-gray-400">
                                        <Search className="w-16 h-16 mx-auto opacity-20" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">No results found</h3>
                                    <p className="text-gray-500 font-medium max-w-xs mx-auto">Try adjusting your filters or searching for something else.</p>
                                    <button
                                        onClick={() => setPriceRange(100000)}
                                        className="mt-6 text-[#007acc] font-black uppercase text-[10px] tracking-widest hover:underline"
                                    >
                                        Reset Price Filter
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
