import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <CartProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CartProvider>
        </AuthProvider>
    )
}
