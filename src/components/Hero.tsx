/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gem } from 'lucide-react';

interface HeroProps {
  onScrollToProducts: () => void;
  onFilterCategory: (cat: 'todos' | 'chaveiro' | 'caneta' | 'outros') => void;
}

export default function Hero({ onScrollToProducts, onFilterCategory }: HeroProps) {
  const categories = [
    { title: 'Chaveiros', icon: '🔑', category: 'chaveiro' as const, style: { mt: 'mt-10 md:mt-12' }, color: 'from-amber-100 to-amber-200' },
    { title: 'Canetas', icon: '🖊️', category: 'caneta' as const, style: { mt: 'mt-6 md:mt-8' }, color: 'from-amber-50 to-amber-100' },
    { title: 'Crachás', icon: '🪪', category: 'outros' as const, style: { mt: 'mt-0' }, color: 'from-amber-100/50 to-amber-200/50' },
    { title: 'Bijuterias', icon: '✨', category: 'outros' as const, style: { mt: 'mt-[-10px] md:mt-[-12px]' }, color: 'from-yellow-100 to-yellow-200' }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-cream">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-brand/10 blur-[80px] pointer-events-none drift-1" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-light/10 blur-[80px] pointer-events-none drift-2" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10 max-w-7xl mx-auto">
        {/* Texts */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-brand/10 text-amber-brand font-bold text-xs tracking-[0.2em] uppercase px-4 py-2.5 rounded-full w-fit mb-6"
            id="hero-eyebrow"
          >
            <Sparkles size={14} className="animate-pulse" />
            Feito à mão, pensado em você
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] text-dark mb-6 tracking-tight font-bold"
            id="hero-title"
          >
            A arte de eternizar momentos em <em className="text-amber-brand not-italic font-medium">resina.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-mid text-base sm:text-lg md:text-xl max-w-[550px] mb-8 font-light"
            id="hero-sub"
          >
            Transformamos sonhos e ideias em peças de luxo personalizadas, com acabamento vitrificado de altíssima durabilidade e design exclusivo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onScrollToProducts}
              className="bg-dark hover:bg-amber-brand text-white font-bold px-8 py-4 rounded-full text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-amber-brand/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              id="hero-cta-catalog"
            >
              Ver Coleção <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#personalizados');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="border border-border-brand/60 text-dark hover:bg-amber-pale/20 font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 cursor-pointer"
              id="hero-cta-custom"
            >
              Simulador 3D
            </button>
          </motion.div>

          {/* Quick trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 pt-8 border-t border-border-brand/30 grid grid-cols-3 gap-4"
            id="hero-metrics"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-pale/40 rounded-full text-amber-brand">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-dark">Proteção UV</p>
                <p className="text-[10px] text-mid">Não amarela</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-pale/40 rounded-full text-amber-brand">
                <Gem size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-dark">100% Artesanal</p>
                <p className="text-[10px] text-mid">Autoral & Único</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-pale/40 rounded-full text-amber-brand">
                <Truck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-dark">Todo o Brasil</p>
                <p className="text-[10px] text-mid">Frete seguro</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Cards Grid (Interactive category selector!) */}
        <div className="hidden lg:col-span-5 lg:flex justify-end relative h-[500px]">
          <div className="grid grid-cols-2 gap-6 rotate-[-5deg] w-full max-w-[420px] h-fit absolute right-0 top-1/2 -translate-y-1/2 transition-transform hover:rotate-0 duration-500">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                onClick={() => {
                  onFilterCategory(cat.category);
                  onScrollToProducts();
                }}
                className={`bg-white hover:bg-amber-pale/18 p-6 rounded-3xl text-center shadow-lg border border-border-brand hover:border-amber-brand/50 transition-all duration-300 hover:-translate-y-4 hover:rotate-[6deg] cursor-pointer ${cat.style.mt} group`}
              >
                <span className="text-[3rem] mb-3 block transform group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </span>
                <p className="font-serif text-lg font-bold text-dark group-hover:text-amber-brand transition-colors">
                  {cat.title}
                </p>
                <p className="text-[10px] text-mid font-medium tracking-widest uppercase mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  Explorar →
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
