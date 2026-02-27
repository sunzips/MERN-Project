import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <main className="w-full bg-gray-400 py-24 px-6 min-h-screen relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent"></div>
            <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <span className="text-[#007acc] font-black tracking-widest text-sm uppercase">Contact Us</span>
                    <h1 className="text-5xl md:text-6xl font-black text-[#2d2d30] tracking-tight">
                        How can we <span className="text-[#007acc]">help?</span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        We’d love to hear from you. Please fill out this form or use our contact information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Info Side */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all group">
                                <div className="bg-[#007acc] p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Visit Our Office</h3>
                                    <p className="text-gray-600 font-medium">New-Road, Kathmandu, Nepal</p>
                                    <p className="text-sm text-gray-500 mt-2">Open: Mon-Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all group">
                                <div className="bg-green-600 p-4 rounded-2xl text-white shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Call Anywhere</h3>
                                    <p className="text-gray-600 font-medium">+977-9841000000</p>
                                    <p className="text-sm text-gray-500 mt-2">Available for 24/7 technical support</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all group">
                                <div className="bg-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Email Support</h3>
                                    <p className="text-gray-600 font-medium">support@homeappliances.com</p>
                                    <p className="text-sm text-gray-500 mt-2">Response time: within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#2d2d30] p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Send className="w-32 h-32 text-white rotate-12" />
                            </div>

                            {submitted ? (
                                <div className="text-center py-20 space-y-6">
                                    <div className="mx-auto bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center border border-green-500">
                                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
                                    <p className="text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-[#3e3e42] border border-gray-600 focus:border-[#007acc] focus:ring-4 focus:ring-[#007acc]/20 outline-none text-white transition-all"
                                                placeholder="User Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-6 py-4 rounded-2xl bg-[#3e3e42] border border-gray-600 focus:border-[#007acc] focus:ring-4 focus:ring-[#007acc]/20 outline-none text-white transition-all"
                                                placeholder="username@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                                        <select className="w-full px-6 py-4 rounded-2xl bg-[#3e3e42] border border-gray-600 focus:border-[#007acc] outline-none text-white cursor-pointer appearance-none transition-all">
                                            <option>Product Support</option>
                                            <option>Sales Inquiry</option>
                                            <option>Service Appointment</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                                        <textarea
                                            rows="5"
                                            required
                                            className="w-full px-6 py-4 rounded-2xl bg-[#3e3e42] border border-gray-600 focus:border-[#007acc] focus:ring-4 focus:ring-[#007acc]/20 outline-none text-white transition-all resize-none"
                                            placeholder="Tell us what you need..."
                                        ></textarea>
                                    </div>

                                    <button className="w-full bg-[#007acc] py-5 rounded-2xl text-white font-black text-lg hover:bg-white hover:text-[#007acc] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-500/20">
                                        Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
