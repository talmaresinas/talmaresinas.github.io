/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Sparkles, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrder: () => void;
  onViewDetails: () => void;
}

export default function ProductCard({ product, onOrder, onViewDetails }: ProductCardProps) {
  // Direct formatted Real price
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[24px] overflow-hidden border border-border-brand hover:border-amber-brand/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      {/* Product Image Stage */}
      <div className="relative h-[280px] w-full overflow-hidden bg-amber-pale/20 flex items-center justify-center">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/10 to-transparent mix-blend-multiply z-10" />

        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {product.isCustomizable && (
          <div className="absolute top-4 right-4 z-20 bg-cream/90 backdrop-blur-md border border-amber-brand/40 text-amber-brand font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles size={10} className="animate-spin" /> Personalizável
          </div>
        )}
      </div>

      {/* Product Content info */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-[10px] font-bold text-amber-brand uppercase tracking-widest mb-1.5">
            {product.displayCategory}
          </p>
          <h3 className="font-serif text-xl font-bold text-dark group-hover:text-amber-brand transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
          <p className="text-mid text-xs font-light line-clamp-2 leading-relaxed mb-4 mb-auto">
            {product.description}
          </p>
        </div>

        <div className="pt-4 border-t border-border-brand/30 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-mid font-medium block uppercase tracking-wider opacity-60">
              Valor aproximado
            </span>
            <span className="font-bold text-lg text-dark mt-[-2px] block">
              {formattedPrice}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={onViewDetails}
              className="p-2.5 rounded-full border border-border-brand/60 hover:border-amber-brand text-mid hover:text-amber-brand transition cursor-pointer"
              title="Ver detalhes"
            >
              <span className="sr-only">Detalhes</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </button>
            <button
              onClick={onOrder}
              className="bg-amber-brand hover:bg-dark text-white font-bold px-5 py-2.5 rounded-full text-xs transition duration-300 cursor-pointer flex items-center gap-1 shadow-sm hover:scale-[1.03]"
            >
              Pedir <ShoppingBag size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
