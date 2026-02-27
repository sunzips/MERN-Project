import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register: registerAuth } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        const res = await registerAuth(data.name, data.email, data.password);
        if (!res.success) {
            setError(res.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#007acc]/20 rounded-full blur-3xl"></div>

            <div className="max-w-md w-full space-y-8 bg-[#3e3e42]/80 p-10 rounded-3xl shadow-2xl border border-gray-600/30 backdrop-blur-md relative z-10">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-[#007acc] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-300">Join our premium appliance store</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className={`w-full pl-10 pr-4 py-3 bg-[#2d2d30] border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#007acc] transition-all`}
                                    placeholder="User Name"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    className={`w-full pl-10 pr-4 py-3 bg-[#2d2d30] border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#007acc] transition-all`}
                                    placeholder="username@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "At least 6 characters" }
                                    })}
                                    className={`w-full pl-10 pr-4 py-3 bg-[#2d2d30] border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#007acc] transition-all`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-white font-bold bg-[#007acc] hover:bg-[#0062a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007acc] transition-all disabled:opacity-50 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#007acc] hover:text-[#0062a3] transition-colors">
                            Sign In
                        </Link>
                    </p>
                    <div className="mt-4">
                        <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest font-bold">
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
