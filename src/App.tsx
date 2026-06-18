/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import InteractiveCustomizer from './components/InteractiveCustomizer';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { Product } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'chaveiro' | 'caneta' | 'outros'>('todos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle standard quick ordering
  const handleQuickOrder = (product: Product) => {
    const textAndProduct = `Olá! Vi no site o produto "${product.name}" e gostaria de encomendar um igual com você.`;
    const waUrl = `https://wa.me/5531971246165?text=${encodeURIComponent(textAndProduct)}`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  const handleScrollToCustom = () => {
    const element = document.querySelector('#personalizados');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToProducts = () => {
    const element = document.querySelector('#produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterCategory = (category: 'todos' | 'chaveiro' | 'caneta' | 'outros') => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-cream selection:bg-amber-brand/20 selection:text-dark min-h-screen text-dark relative selection:bg-amber-brand/20 antialiased overflow-x-hidden">
      {/* Vertical Decorative Brand Ribbon (Artistic Flair signature) */}
      <div className="absolute right-6 top-[40%] h-auto [writing-mode:vertical-rl] text-[10px] uppercase font-bold tracking-[0.45em] text-dark/30 pointer-events-none hidden xl:block z-30 select-none">
        Artesanato Exclusivo • Feito em Minas Gerais • Est. 2025
      </div>

      {/* Floating Header */}
      <Header
        onScrollToCustom={handleScrollToCustom}
        onScrollToProducts={handleScrollToProducts}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Animated Intro Section */}
      <Hero
        onScrollToProducts={handleScrollToProducts}
        onFilterCategory={handleFilterCategory}
      />

      {/* Product Catalog Section */}
      <ProductSection
        onOrder={handleQuickOrder}
        selectedCategory={selectedCategory}
        onFilterCategory={handleFilterCategory}
      />

      {/* Interactive live 2D Resin customizer custom simulator */}
      <InteractiveCustomizer />

      {/* About Section/Story */}
      <AboutSection />

      {/* Contact Footer */}
      <Footer />

      {/* FLOATING GREEN WHATSAPP BADGE FAB */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isMobileMenuOpen ? 0 : 1,
          opacity: isMobileMenuOpen ? 0 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 260, damping: 20 },
          opacity: { duration: 0.2 }
        }}
        whileHover={isMobileMenuOpen ? {} : { scale: 1.1, rotate: '10deg' }}
        whileTap={isMobileMenuOpen ? {} : { scale: 0.9 }}
        href="https://wa.me/5531971246165"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 z-50 transition-all outline-none border border-white/10 ${
          isMobileMenuOpen ? 'pointer-events-none' : ''
        }`}
        title="Enviar mensagem direta no WhatsApp"
        id="wa-fixed-fab"
      >
        <MessageCircle size={30} className="fill-white stroke-[#25D366]" />
      </motion.a>
    </div>
  );
}
