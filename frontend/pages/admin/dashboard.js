import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
    Users, ShoppingBag, DollarSign, TrendingUp, ShieldAlert,
    Package, Search, Bell, Settings, LogOut, ChevronRight, X, Check, Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const COLORS = ['#007acc', '#819A91', '#2d2d30', '#E4EFE7'];
const CATEGORIES = ['Washing Machines', 'Refrigerators', 'Microwave Ovens', 'Air Conditioners', 'Vacuum Cleaners', 'Stoves'];


function AddProductModal({ onClose, onAdd, token }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '', category: 'Washing Machines', price: '',
        brand: '', image: '', stock: '', description: ''
    });

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5001/api/products', {
                ...form, price: Number(form.price), stock: Number(form.stock)
            }, { headers: { 'x-auth-token': token } });
            onAdd(res.data);
            setSuccess(true);
            setTimeout(() => { onClose(); }, 1500);
        } catch {
            alert('Failed to add product. Check all fields.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#1a1c1e] border border-white/10 rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-black text-white mb-8">Add New Product</h2>
                {success ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-green-400 font-black text-xl">Product Added!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Product Name *</label>
                                <input required name="name" value={form.name} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none"
                                    placeholder="e.g. Smart Refrigerator" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Brand *</label>
                                <input required name="brand" value={form.brand} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none"
                                    placeholder="e.g. Samsung" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Category *</label>
                                <select required name="category" value={form.category} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none">
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Price (Rs) *</label>
                                <input required type="number" min="1" name="price" value={form.price} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none"
                                    placeholder="e.g. 45000" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Stock *</label>
                                <input required type="number" min="0" name="stock" value={form.stock} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none"
                                    placeholder="e.g. 20" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Image URL *</label>
                                <input required name="image" value={form.image} onChange={handleChange}
                                    className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none"
                                    placeholder="https://..." />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Description *</label>
                            <textarea required name="description" value={form.description} onChange={handleChange}
                                rows={3}
                                className="w-full bg-[#121416] border border-white/10 rounded-2xl px-5 py-3 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none resize-none"
                                placeholder="Product description..." />
                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-[#007acc] text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Adding...</> : '+ Add Product'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

function InventoryTable({ products, onDelete, onOpenAdd, searchQuery }) {
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="bg-[#121416] rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-2xl font-black">Stock Management
                    <span className="ml-3 text-sm font-bold text-gray-500">({filtered.length} products)</span>
                </h3>
                <button onClick={onOpenAdd} className="bg-[#007acc] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors">
                    + Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-6">Product</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Price</th>
                            <th className="p-6">Stock</th>
                            <th className="p-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={5} className="p-10 text-center text-gray-500">No products found</td></tr>
                        ) : filtered.map(p => (
                            <tr key={p._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                                            <img src={p.image} className="w-full h-full object-cover" alt={p.name}
                                                onError={(e) => { e.target.style.display = 'none'; }} />
                                        </div>
                                        <div>
                                            <span className="font-bold block">{p.name}</span>
                                            <span className="text-xs text-gray-500">{p.brand}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-gray-400">{p.category}</td>
                                <td className="p-6 font-mono text-[#007acc]">Rs {p.price.toLocaleString()}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock < 10 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                        {p.stock} Units
                                    </span>
                                </td>
                                <td className="p-6">
                                    <button onClick={() => onDelete(p._id)} className="text-red-500 hover:text-red-400 text-sm font-black">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const STATUS_STYLES = {
    Processing: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
    Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};
const STATUS_OPTIONS = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

function OrdersTable({ orders, searchQuery, onStatusChange }) {
    const filtered = orders.filter(o =>
        (o.user?.name || 'Guest').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.user?.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        o._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="bg-[#121416] rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5">
                <h3 className="text-2xl font-black">Live Order Feed
                    <span className="ml-3 text-sm font-bold text-gray-500">({filtered.length} orders)</span>
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-6">Order ID</th>
                            <th className="p-6">Customer</th>
                            <th className="p-6">Products Ordered</th>
                            <th className="p-6">Total</th>
                            <th className="p-6">Date</th>
                            <th className="p-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} className="p-10 text-center text-gray-500">No orders found</td></tr>
                        ) : filtered.map(o => (
                            <tr key={o._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-mono text-xs text-gray-500">#{o._id.slice(-6).toUpperCase()}</td>
                                <td className="p-6">
                                    <p className="font-bold">{o.user?.name || 'Guest User'}</p>
                                    <p className="text-[10px] text-gray-500">{o.user?.email || 'No email'}</p>
                                    {o.shippingAddress && <p className="text-[10px] text-gray-600 max-w-[160px] truncate">{o.shippingAddress}</p>}
                                </td>
                                <td className="p-6">
                                    <div className="space-y-2">
                                        {(o.items || []).map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                {item.product?.image && (
                                                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                                                        <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-xs font-bold block">{item.product?.name || 'Deleted'}</span>
                                                    <span className="text-[10px] text-gray-500">Qty: {item.quantity} × Rs {(item.price || 0).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {(!o.items || o.items.length === 0) && <span className="text-xs text-gray-500">No items</span>}
                                    </div>
                                </td>
                                <td className="p-6 font-black text-[#007acc]">Rs {o.totalAmount.toLocaleString()}</td>
                                <td className="p-6 text-sm text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td className="p-6">
                                    <select
                                        value={o.status || 'Processing'}
                                        onChange={(e) => onStatusChange(o._id, e.target.value)}
                                        className={`px-3 py-2 rounded-xl text-xs font-black border outline-none cursor-pointer ${STATUS_STYLES[o.status] || STATUS_STYLES.Processing} bg-transparent`}
                                    >
                                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-[#121416] text-white">{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function CustomersTable({ users, searchQuery }) {
    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="bg-[#121416] rounded-[2.5rem] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5">
                <h3 className="text-2xl font-black">User Management
                    <span className="ml-3 text-sm font-bold text-gray-500">({filtered.length} users)</span>
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-6">Customer</th>
                            <th className="p-6">Email</th>
                            <th className="p-6">Role</th>
                            <th className="p-6">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={4} className="p-10 text-center text-gray-500">No users found</td></tr>
                        ) : filtered.map(u => (
                            <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#007acc] to-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            {u.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold">{u.name}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-gray-400 text-sm">{u.email}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-gray-500/10 text-gray-400'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-6 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SettingsView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121416] p-10 rounded-[3rem] border border-white/5">
                <h3 className="text-2xl font-black mb-8">Store Profile</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Store Name</label>
                        <input type="text" className="w-full bg-[#1a1c1e] border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none" defaultValue="Household Solutions" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Customer Support Email</label>
                        <input type="email" className="w-full bg-[#1a1c1e] border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:ring-2 focus:ring-[#007acc] outline-none" defaultValue="support@household.com" />
                    </div>
                    <button className="bg-[#007acc] text-white px-8 py-4 rounded-2xl font-black text-sm w-full">Save Changes</button>
                </div>
            </div>
            <div className="bg-[#121416] p-10 rounded-[3rem] border border-white/5">
                <h3 className="text-2xl font-black mb-8">System Access</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                            <p className="font-bold">Two-Factor Auth</p>
                            <p className="text-xs text-gray-500">Secure admin login</p>
                        </div>
                        <div className="w-12 h-6 bg-[#007acc] rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                        <div>
                            <p className="font-bold">Maintenance Mode</p>
                            <p className="text-xs text-gray-500">Offline store visibility</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <button className="border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm w-full hover:bg-white/5 transition-colors">Update Security</button>
                </div>
            </div>
        </div>
    );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const { user, isAdmin, logout, loading: authLoading } = useAuth();
    const [data, setData] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
    const [activeTab, setActiveTab] = useState('Overview');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!isAdmin) { setLoading(false); return; }
        const fetchData = async () => {
            try {
                const config = { headers: { 'x-auth-token': user.token } };
                const [statsRes, prodRes, orderRes, userRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/analytics', config),
                    axios.get('http://localhost:5001/api/products'),
                    axios.get('http://localhost:5001/api/orders', config),
                    axios.get('http://localhost:5001/api/users', config)
                ]);
                setData(statsRes.data);
                setProducts(prodRes.data);
                setOrders(orderRes.data);
                setUsers(userRes.data);
            } catch (e) {
                console.error('Dashboard fetch error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [authLoading, isAdmin, user]);

    const handleDeleteProduct = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/products/${id}`, { headers: { 'x-auth-token': user.token } });
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch { alert('Delete failed'); }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:5001/api/orders/${orderId}/status`, { status: newStatus }, {
                headers: { 'x-auth-token': user.token }
            });
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: res.data.status } : o));
        } catch { alert('Failed to update status'); }
    };

    if (authLoading || loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c1e] gap-6">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[#007acc]/20 border-t-[#007acc] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#007acc]" />
                </div>
            </div>
            <span className="font-black text-gray-500 tracking-[0.2em] uppercase text-xs">Loading Dashboard...</span>
        </div>
    );

    if (!isAdmin) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c1e] p-8 text-center">
            <div className="bg-red-500/10 p-8 rounded-[3rem] border border-red-500/20 max-w-lg">
                <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-4xl font-black text-white mb-4">Secure Area</h2>
                <p className="text-gray-400 font-medium mb-10">This area is restricted to administrators only.</p>
                <Link href="/login" className="block w-full bg-[#007acc] text-white py-5 rounded-2xl font-bold hover:bg-white hover:text-[#007acc] transition-all">
                    Authenticate Now
                </Link>
            </div>
        </div>
    );

    const navItems = [
        { icon: TrendingUp, label: 'Overview' },
        { icon: Package, label: 'Inventory' },
        { icon: ShoppingBag, label: 'Orders' },
        { icon: Users, label: 'Customers' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="bg-[#1a1c1e] min-h-screen flex text-gray-200">
            {showAddModal && (
                <AddProductModal
                    token={user.token}
                    onClose={() => setShowAddModal(false)}
                    onAdd={(p) => setProducts(prev => [p, ...prev])}
                />
            )}

            {/* Sidebar */}
            <aside className="w-20 lg:w-72 bg-[#121416] border-r border-white/5 flex flex-col items-center lg:items-start py-10 transition-all">
                <div className="px-8 mb-16 hidden lg:block">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#007acc] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter">ANALYTICA</span>
                    </div>
                </div>
                <nav className="w-full space-y-2 px-4">
                    {navItems.map((item, i) => (
                        <button key={i} onClick={() => { setActiveTab(item.label); setSearchQuery(''); }}
                            className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${activeTab === item.label ? 'bg-[#007acc] text-white' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}>
                            <item.icon className="w-6 h-6" />
                            <span className="hidden lg:block font-bold">{item.label}</span>
                            {activeTab === item.label && <ChevronRight className="hidden lg:block ml-auto w-4 h-4" />}
                        </button>
                    ))}
                </nav>
                <div className="mt-auto w-full px-4 mb-10 pt-10 border-t border-white/5">
                    <button onClick={logout} className="flex items-center gap-4 w-full p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold">
                        <LogOut className="w-6 h-6" />
                        <span className="hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <p className="text-[10px] font-black text-[#007acc] uppercase tracking-[0.3em] mb-2">System Status: Active</p>
                        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">{activeTab}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {activeTab !== 'Overview' && activeTab !== 'Settings' && (
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder={`Search ${activeTab.toLowerCase()}...`}
                                    className="bg-[#121416] border border-white/5 rounded-2xl pl-12 pr-6 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#007acc] text-sm font-medium text-white placeholder:text-gray-600" />
                            </div>
                        )}
                        <button className="bg-[#121416] p-4 rounded-2xl border border-white/5 hover:border-[#007acc]/50 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 bg-[#121416] px-4 py-2 rounded-2xl border border-white/5">
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-bold text-white">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-[#007acc] to-blue-400 rounded-xl flex items-center justify-center font-black">
                                {(user?.name || 'A').charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === 'Overview' && (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Total Revenue', value: `Rs ${(data.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: '#007acc', trend: '+12.5%' },
                                { label: 'Total Orders', value: data.totalOrders || 0, icon: ShoppingBag, color: '#819A91', trend: '+8.2%' },
                                { label: 'Total Users', value: data.totalUsers || 0, icon: Users, color: '#9333ea', trend: '+24.1%' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-[#121416] p-8 rounded-[2.5rem] border border-white/5 hover:-translate-y-2 transition-transform relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 scale-150 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <stat.icon className="w-20 h-20 text-white" />
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-4xl font-black text-white font-mono">{stat.value}</h3>
                                        <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">{stat.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#121416] p-10 rounded-[3rem] border border-white/5">
                            <h3 className="text-2xl font-black text-white mb-10">Revenue Stream</h3>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { name: 'Mon', rev: 4000 }, { name: 'Tue', rev: 3000 }, { name: 'Wed', rev: 9800 },
                                        { name: 'Thu', rev: 3908 }, { name: 'Fri', rev: 4800 }, { name: 'Sat', rev: 3800 },
                                        { name: 'Sun', rev: data.totalRevenue || 3490 },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#007acc" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#007acc" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 'bold' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 'bold' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#121416', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1.5rem' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                                        <Area type="monotone" dataKey="rev" stroke="#007acc" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Inventory' && (
                    <InventoryTable
                        products={products}
                        onDelete={handleDeleteProduct}
                        onOpenAdd={() => setShowAddModal(true)}
                        searchQuery={searchQuery}
                    />
                )}
                {activeTab === 'Orders' && <OrdersTable orders={orders} searchQuery={searchQuery} onStatusChange={handleStatusChange} />}
                {activeTab === 'Customers' && <CustomersTable users={users} searchQuery={searchQuery} />}
                {activeTab === 'Settings' && <SettingsView />}
            </main>
        </div>
    );
}
