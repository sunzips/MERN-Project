import Link from 'next/link';
import { Moon, ShoppingCart, User, Menu, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logout, isAdmin } = useAuth();

    return (
        <header className="sticky top-0 shadow-lg bg-gradient-to-r from-red-950 to-gray-950 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between py-3 pl-10 pr-10 items-center">
                    <Link href="/" className="flex items-center">
                        <img
                            src="https://thumbs.dreamstime.com/b/vector-logo-home-appliances-black-decorative-label-illustration-big-collection-silver-color-kitchen-appliance-original-148036159.jpg?w=768"
                            alt="Logo"
                            className="h-12 w-28 object-cover"
                        />
                    </Link>

                    <nav className="hidden md:block">
                        <div className="flex space-x-6">
                            <Link href="/" className="text-[#E4EFE7] font-medium hover:text-[#007acc] transition-colors">Home</Link>
                            <Link href="/products" className="text-[#E4EFE7] font-medium hover:text-[#007acc] transition-colors">Products</Link>
                            {user && !isAdmin && (
                                <Link href="/orders" className="text-[#E4EFE7] font-medium hover:text-[#007acc] transition-colors flex items-center gap-1">
                                    <Package className="w-4 h-4" /> My Orders
                                </Link>
                            )}
                            <Link href="/faq" className="text-[#E4EFE7] font-medium hover:text-[#007acc] transition-colors">FAQ</Link>
                            <Link href="/contact" className="text-[#E4EFE7] font-medium hover:text-[#007acc] transition-colors">Contact</Link>
                            {isAdmin && (
                                <Link href="/admin/dashboard" className="text-[#007acc] font-bold hover:text-white transition-colors flex items-center gap-1">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </Link>
                            )}
                        </div>
                    </nav>

                    <div className="flex space-x-5 items-center">
                        <Link href="/cart" className="relative group">
                            <ShoppingCart className="text-[#E4EFE7] group-hover:text-[#007acc] w-6 h-6 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-red-950">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm font-medium hidden sm:block">
                                    Hello, <span className="text-white">{isAdmin ? 'Admin' : (user.name || 'User')}</span>
                                </span>
                                <Link href="/profile" className="text-[#E4EFE7] hover:text-[#007acc] transition-colors">
                                    <User className="w-5 h-5" />
                                </Link>
                                <button onClick={logout} className="flex items-center gap-2 bg-red-800/20 hover:bg-red-800/40 text-red-200 px-3 py-1.5 rounded-lg border border-red-800/50 transition-all text-sm font-medium">
                                    <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-[#E4EFE7] font-medium hover:text-[#007acc] text-sm">Login</Link>
                                <Link href="/register" className="bg-[#007acc] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0062a3] shadow-lg shadow-blue-500/20 transition-all">Sign Up</Link>
                            </div>
                        )}

                        <button className="block md:hidden">
                            <Menu className="text-[#E4EFE7] hover:text-[#007acc] w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
