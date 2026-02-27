import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { User as UserIcon, Mail, MapPin, Lock, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.token) return;
            try {
                const res = await axios.get('http://localhost:5001/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                setValue('name', res.data.name);
                setValue('email', res.data.email);
                setValue('address', res.data.address || '');
                setFetching(false);
            } catch (error) {
                console.error('Failed to fetch profile', error);
                setFetching(false);
            }
        };
        fetchProfile();
    }, [user, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Only send password if it's filled
        const payload = { ...data };
        if (!payload.password) delete payload.password;

        const res = await updateProfile(payload);
        if (res.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: res.message });
        }
        setLoading(false);
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#007acc] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-[#007acc] p-8 text-white relative h-48 flex items-end">
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                                <UserIcon className="w-12 h-12 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Profile Settings</h1>
                                <p className="text-blue-100 mt-1">Manage your account and preferences</p>
                            </div>
                        </div>
                        {/* Decorative patterns */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    </div>

                    <div className="p-8 lg:p-12">
                        {message.text && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-slideIn ${message.type === 'success' ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-red-50 border border-red-100 text-red-700'
                                }`}>
                                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <span className="font-medium">{message.text}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#007acc] pl-4">Personal Info</h2>

                                <div>
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-1">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-1">Email (Read-only)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type="email"
                                            disabled
                                            {...register("email")}
                                            className="w-full pl-10 pr-4 py-4 bg-gray-100 border-none rounded-2xl text-gray-400 cursor-not-allowed font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-1">Shipping Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            {...register("address")}
                                            className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                            placeholder="Enter your delivery address"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-gray-300 pl-4">Security</h2>

                                <div>
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-1">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            {...register("password", { minLength: { value: 6, message: "At least 6 characters" } })}
                                            className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#007acc] outline-none font-medium text-gray-900"
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>
                                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center gap-3 py-4 px-6 rounded-2xl shadow-lg text-white font-bold bg-[#007acc] hover:bg-[#0062a3] focus:outline-none transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-6 h-6" /> Save Changes</>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
