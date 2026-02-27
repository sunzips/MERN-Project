import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const faqData = [
    {
        question: "How do I connect my appliance to Wi-Fi?",
        answer: "To connect your appliance to Wi-Fi, start by downloading the companion app. Power on your device, tap “Add Device” in the app, and follow the step-by-step instructions. Make sure your phone is connected to the same Wi-Fi network."
    },
    {
        question: "What is the warranty period?",
        answer: "All products include a standard 2-year warranty. Premium models offer extended coverage and on-site repair services."
    },
    {
        question: "Can I schedule service online?",
        answer: "Yes! Simply log in to your account, navigate to the “Service” section, and select your appliance. Choose a convenient date and time for the service appointment."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we offer international shipping to selected countries. Shipping availability may vary depending on the product and destination."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="w-full bg-gray-400 py-24 px-6 min-h-screen relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007acc]/10 text-[#007acc] rounded-full text-sm font-bold tracking-wider uppercase">
                        <HelpCircle className="w-4 h-4" /> Support Center
                    </div>
                    <h2 className="text-5xl font-black text-[#2d2d30] leading-tight">
                        Common <span className="text-[#007acc]">Questions</span>
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Find quick answers to your technical questions about home appliances and service schedules.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`group rounded-3xl transition-all duration-500 ${openIndex === index
                                ? 'bg-white shadow-2xl ring-1 ring-[#007acc]/20'
                                : 'bg-white/50 hover:bg-white shadow-lg'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex justify-between items-center text-left"
                            >
                                <span className={`text-xl font-bold transition-colors ${openIndex === index ? 'text-[#007acc]' : 'text-gray-800'}`}>
                                    {item.question}
                                </span>
                                <div className={`p-2 rounded-xl transition-all duration-500 ${openIndex === index ? 'bg-[#007acc] text-white rotate-180' : 'bg-gray-200 text-gray-500 group-hover:bg-[#007acc]/10 group-hover:text-[#007acc]'}`}>
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-8 pb-8 text-gray-600 leading-relaxed text-lg border-t border-gray-100 mt-2 pt-4">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-[#2d2d30] rounded-3xl p-10 text-center shadow-2xl shadow-blue-900/20">
                    <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
                    <p className="text-gray-400 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#007acc] hover:bg-white hover:text-[#007acc] text-white font-bold rounded-2xl transition-all transform hover:scale-105">
                        <MessageCircle className="w-5 h-5" /> Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
}
