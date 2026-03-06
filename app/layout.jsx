import './globals.css'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export const metadata = {
    title: 'LocalMarket - Fresh Neighborhood Deals',
    description: 'Bringing the neighborhood closer, one local deal at a time.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
