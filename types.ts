/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onScrollToCustom: () => void;
  onScrollToProducts: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ 
  onScrollToCustom, 
  onScrollToProducts,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (selector: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[72px] transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-md border-b border-border-brand/40 py-2'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl font-bold text-dark tracking-tight hover:opacity-90 cursor-pointer block"
          id="nav-logo"
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
            x: isMobileMenuOpen ? -40 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          Talma <span className="text-amber-brand italic font-medium">Resinas</span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <button
              onClick={() => handleLinkClick('#produtos')}
              className="text-mid hover:text-amber-brand font-medium text-sm transition tracking-wide cursor-pointer focus:outline-none"
            >
              Coleção
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLinkClick('#personalizados')}
              className="text-mid hover:text-amber-brand font-medium text-sm transition tracking-wide cursor-pointer focus:outline-none"
            >
              Personalizados
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLinkClick('#sobre')}
              className="text-mid hover:text-amber-brand font-medium text-sm transition tracking-wide cursor-pointer focus:outline-none"
            >
              Sobre Nós
            </button>
          </li>
        </ul>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onScrollToCustom}
            className="bg-amber-brand hover:bg-dark text-white font-semibold rounded-full px-6 py-2.5 text-xs tracking-wider uppercase shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            id="nav-cta-btn"
          >
            Solicitar Orçamento
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-dark p-2 hover:bg-amber-pale/20 rounded-full transition focus:outline-none"
          aria-label="Menu principal"
          id="mobile-menu-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-cream border-l border-border-brand/30 shadow-2xl transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-8 justify-between">
          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
                  className="font-serif text-2xl font-bold text-dark tracking-tight text-center pb-4 border-b border-border-brand/15"
                >
                  Talma <span className="text-amber-brand italic font-medium">Resinas</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => handleLinkClick('#produtos')}
              className="text-left py-2 text-dark font-medium text-lg hover:text-amber-brand transition border-b border-border-brand/10"
            >
              Sua Coleção
            </button>
            <button
              onClick={() => handleLinkClick('#personalizados')}
              className="text-left py-2 text-dark font-medium text-lg hover:text-amber-brand transition border-b border-border-brand/10"
            >
              Personalizados
            </button>
            <button
              onClick={() => handleLinkClick('#sobre')}
              className="text-left py-2 text-dark font-medium text-lg hover:text-amber-brand transition border-b border-border-brand/10"
            >
              Nossa História
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToCustom();
              }}
              className="w-full bg-amber-brand hover:bg-dark text-white text-center font-bold py-3 px-4 rounded-full text-sm shadow-md transition"
            >
              Solicitar Orçamento
            </button>
            <a
              href="https://wa.me/5531971246165"
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full border border-border-brand/50 text-mid text-center font-bold py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 hover:bg-amber-pale/10 transition"
            >
              <MessageCircle size={16} className="text-[#25D366]" /> Conversar no Whats
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs md:hidden"
        />
      )}
    </>
  );
}
