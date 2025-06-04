import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import FeaturesSection from '../components/FeaturesSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import MobileMenu from '../components/MobileMenu';

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    
    React.useEffect(() => {
        const handleToggleMenu = () => {
            setIsMobileMenuOpen(prev => !prev);
        };
        
        window.addEventListener('toggle-mobile-menu', handleToggleMenu);
        return () => {
            window.removeEventListener('toggle-mobile-menu', handleToggleMenu);
        };
    }, []);

    // Client-side only code
    useEffect(() => {
        // Save scroll position before page refresh
        const saveScrollPosition = () => {
            localStorage.setItem('scrollPosition', window.scrollY.toString());
        };

        // Restore scroll position after page loads
        const restoreScrollPosition = () => {
            const scrollPosition = localStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo(0, parseInt(scrollPosition));
            }
        };

        window.addEventListener('beforeunload', saveScrollPosition);
        
        // Small delay to ensure DOM is fully loaded
        const timer = setTimeout(() => {
            restoreScrollPosition();
        }, 100);

        return () => {
            window.removeEventListener('beforeunload', saveScrollPosition);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="bg-[#1A1E2B] min-h-screen">
            <Header />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main>
                <Hero />
                <ProductsSection />
                <FeaturesSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}