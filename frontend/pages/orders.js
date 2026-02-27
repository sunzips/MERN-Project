import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { Package, Loader2, ShoppingBag, Clock, Truck, CheckCircle2, XCircle, MapPin } from 'lucide-react';

const STATUS_CONFIG = {
    Processing: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', label: 'Processing' },
    Confirmed: { icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', label: 'Confirmed' },
    Shipped: { icon: Truck, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', label: 'Shipped' },
    Delivered: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', label: 'Delivered' },
    Cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'Cancelled' },
};

const STATUS_STEPS = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];

function StatusTracker({ status }) {
    const isCancelled = status === 'Cancelled';
    const currentIdx = STATUS_STEPS.indexOf(status);

    if (isCancelled) {
        return (
            <div className="flex items-center gap-2 mt-4">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold text-sm">Order Cancelled</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 mt-4">
            {STATUS_STEPS.map((step, idx) => {
                const isComplete = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                const StepIcon = STATUS_CONFIG[step]?.icon || Clock;
                return (
                    <div key={step} className="flex items-center">
                        <div className={`flex flex-col items-center ${isCurrent ? 'scale-110' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isComplete ? 'bg-[#007acc] border-[#007acc]' : 'bg-transparent border-gray-600'}`}>
                                <StepIcon className={`w-4 h-4 ${isComplete ? 'text-white' : 'text-gray-600'}`} />
                            </div>
                            <span className={`text-[9px] mt-1 font-bold tracking-wider ${isComplete ? 'text-white' : 'text-gray-600'}`}>{step}</span>
                        </div>
                        {idx < STATUS_STEPS.length - 1 && (
                            <div className={`w-8 h-0.5 mx-1 mb-4 ${idx < currentIdx ? 'bg-[#007acc]' : 'bg-gray-700'}`}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function MyOrders() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user?.token) { setLoading(false); return; }
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/orders/my', {
                    headers: { 'x-auth-token': user.token }
                });
                setOrders(res.data);
            } catch (e) {
                console.error('Failed to fetch orders:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#007acc] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
                    <p className="text-gray-500 mb-6">Please log in to view your orders.</p>
                    <Link href="/login" className="inline-block bg-[#007acc] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0062a3] transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
                    <p className="text-gray-500 mt-1">Track your purchase history and delivery status</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
                        <Package className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
                        <p className="text-gray-400 mb-8">You haven&apos;t placed any orders. Start shopping now!</p>
                        <Link href="/products" className="inline-block bg-[#007acc] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0062a3] transition-colors">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => {
                            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;
                            const StatusIcon = cfg.icon;
                            return (
                                <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Order Header */}
                                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
                                                <StatusIcon className={`w-5 h-5 ${cfg.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-mono">Order #{order._id.slice(-8).toUpperCase()}</p>
                                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                                                {cfg.label}
                                            </span>
                                            <span className="text-lg font-extrabold text-gray-900">Rs {order.totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {(order.items || []).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    {item.product?.image ? (
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                                            <img src={item.product.image} alt={item.product?.name || 'Product'} className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <Package className="w-6 h-6 text-gray-300" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-gray-900 truncate">{item.product?.name || 'Product Unavailable'}</p>
                                                        <p className="text-sm text-gray-400">Qty: {item.quantity} × Rs {(item.price || 0).toLocaleString()}</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-700">Rs {((item.price || 0) * item.quantity).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Shipping Address */}
                                        {order.shippingAddress && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-400">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span>{order.shippingAddress}</span>
                                            </div>
                                        )}

                                        {/* Status Tracker */}
                                        <StatusTracker status={order.status || 'Processing'} />

                                        {/* Delivered Message */}
                                        {order.status === 'Delivered' && (
                                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                                <div>
                                                    <p className="text-green-700 font-bold text-sm">Your order has been delivered successfully!</p>
                                                    <p className="text-green-600 text-xs mt-0.5">Thank you for shopping with us. We hope you enjoy your purchase!</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Cancelled Message */}
                                        {order.status === 'Cancelled' && (
                                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                                                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                                <div>
                                                    <p className="text-red-700 font-bold text-sm">This order has been cancelled.</p>
                                                    <p className="text-red-600 text-xs mt-0.5">If you have any questions, please contact our support team.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
