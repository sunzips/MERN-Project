import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#525252] w-full mt-auto">
            <div className="container mx-auto py-10 px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <Link href="/">
                            <img
                                src="https://thumbs.dreamstime.com/b/vector-logo-home-appliances-black-decorative-label-illustration-big-collection-silver-color-kitchen-appliance-original-148036159.jpg?w=768"
                                alt="Logo"
                                className="h-12 w-28 object-cover"
                            />
                        </Link>
                        <div className="mt-4">
                            <span className="text-white/70 text-sm leading-relaxed block">
                                Your trusted destination for premium home appliances. We combine cutting-edge technology with elegant design to elevate your modern living experience. Quality you can trust, service you can rely on.
                            </span>
                        </div>
                        <div className="flex space-x-5 pb-10 pt-5">
                            <div className="bg-white/50 h-9 w-9 rounded-full flex items-center justify-center hover:bg-white cursor-pointer">
                                <Facebook className="w-5 h-5 text-[#007acc]" />
                            </div>
                            <div className="bg-white/50 h-9 w-9 rounded-full flex items-center justify-center hover:bg-white cursor-pointer">
                                <Instagram className="w-5 h-5 text-[#007acc]" />
                            </div>
                            <div className="bg-white/50 h-9 w-9 rounded-full flex items-center justify-center hover:bg-white cursor-pointer">
                                <Twitter className="w-5 h-5 text-[#007acc]" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">Quick links</h3>
                        <div className="flex flex-col space-y-2">
                            <Link href="/" className="text-white hover:text-[#007acc] transition duration-300">Home</Link>
                            <Link href="/#about" className="text-white hover:text-[#007acc] transition duration-300">About</Link>
                            <Link href="/products" className="text-white hover:text-[#007acc] transition duration-300">Product</Link>
                            <Link href="/#service" className="text-white hover:text-[#007acc] transition duration-300">Service</Link>
                            <Link href="/#blogs" className="text-white hover:text-[#007acc] transition duration-300">Blogs</Link>
                            <Link href="/contact" className="text-white hover:text-[#007acc] transition duration-300">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">Customer Services</h3>
                        <div className="flex flex-col space-y-2">
                            <span className="text-white/50">Privacy Policy</span>
                            <span className="text-white/50">Terms of Service</span>
                            <Link href="/faq" className="text-white/50 hover:text-white">FAQs</Link>
                            <span className="text-white/50">Support Center</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">We Accept</h3>
                        <div className="flex space-x-5 pb-10">
                            <div className="bg-white/50 px-2 rounded hover:bg-white flex items-center h-8">
                                <span className="text-blue-800 font-bold">VISA</span>
                            </div>
                            <div className="bg-white/50 px-2 rounded hover:bg-white flex items-center h-8">
                                <span className="text-blue-900 font-bold">PayPal</span>
                            </div>
                            <div className="bg-white/50 px-2 rounded hover:bg-white flex items-center h-8">
                                <span className="text-black font-bold">Apple Pay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
