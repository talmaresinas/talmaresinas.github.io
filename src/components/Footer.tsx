/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, MapPin, Sparkles, Heart, Phone, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer bg-[#f5edd7] border-t border-border-brand/40 pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16" id="footer-grid-container">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl font-bold text-dark tracking-tight"
            >
              Talma <span className="text-amber-brand italic font-medium">Resinas</span>
            </a>
            <p className="text-mid text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Cada peça, uma história única eternizada com paixão e bom gosto. Produzimos lembranças e brindes de resina de altíssimo luxo com as melhores matérias-primas e brilho vítreo duradouro.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://instagram.com/talmaresinas"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-3 rounded-full bg-white border border-border-brand text-mid hover:text-amber-brand hover:border-amber-brand hover:scale-105 transition-all shadow-xs"
                title="Siga no Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5531971246165"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-3 rounded-full bg-white border border-border-brand text-mid hover:text-amber-brand hover:border-amber-brand hover:scale-105 transition-all shadow-xs"
                title="Falar no WhatsApp"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
              </a>
              <a
                href="mailto:talmaresinas@gmail.com"
                className="p-3 rounded-full bg-white border border-border-brand text-mid hover:text-amber-brand hover:border-amber-brand hover:scale-105 transition-all shadow-xs"
                title="Enviar E-mail"
              >
                <Mail size={18} className="text-amber-brand" />
              </a>
            </div>
          </div>

          {/* Links Quick Navigation */}
          <div className="col-span-1 sm:col-span-6 md:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-dark uppercase tracking-widest border-b border-border-brand/35 pb-2">
              Menu Técnico
            </h4>
            <ul className="list-none space-y-2.5 pl-0">
              <li>
                <a
                  href="#produtos"
                  onClick={(e) => handleLinkClick(e, '#produtos')}
                  className="text-mid/80 hover:text-amber-brand text-xs transition font-light block"
                >
                  Conheça a Coleção
                </a>
              </li>
              <li>
                <a
                  href="#personalizados"
                  onClick={(e) => handleLinkClick(e, '#personalizados')}
                  className="text-mid/80 hover:text-amber-brand text-xs transition font-light block"
                >
                  Peças Exclusivas
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  onClick={(e) => handleLinkClick(e, '#sobre')}
                  className="text-mid/80 hover:text-amber-brand text-xs transition font-light block"
                >
                  História da Marca
                </a>
              </li>
            </ul>
          </div>

          {/* Location and Info block */}
          <div className="col-span-1 sm:col-span-6 md:col-span-4 flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-dark uppercase tracking-widest border-b border-border-brand/35 pb-2">
              Nossa Sede
            </h4>
            <ul className="list-none space-y-3.5 pl-0">
              <li className="flex gap-2.5 items-start text-xs text-mid font-light leading-snug">
                <MapPin size={16} className="text-amber-brand flex-shrink-0 mt-0.5" />
                <span>
                  Sarzedo - Minas Gerais <br />
                  <span className="text-[10px] text-mid/60 uppercase font-medium">Belo Horizonte e Região</span>
                </span>
              </li>
              <li className="flex gap-2.5 items-center text-xs text-mid font-light leading-snug">
                <Instagram size={16} className="text-amber-brand flex-shrink-0" />
                <a href="https://instagram.com/talmaresinas" target="_blank" rel="noopener noreferrer" className="hover:text-amber-brand transition">@talmaresinas</a>
              </li>
              <li className="flex gap-2.5 items-center text-xs text-mid font-light leading-snug">
                <Mail size={16} className="text-amber-brand flex-shrink-0" />
                <a href="mailto:talmaresinas@gmail.com" className="hover:text-amber-brand transition font-mono">talmaresinas@gmail.com</a>
              </li>
              <li className="flex gap-2.5 items-center text-xs text-white bg-dark/95 border border-border-brand/40 px-3.5 py-2.5 rounded-xl w-fit">
                <Sparkles size={14} className="text-amber-brand animate-spin" />
                <span className="text-[10px] font-bold text-amber-brand uppercase tracking-wider">Altíssimo Padrão de Acabamento</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Copyright, built with Love details */}
        <div className="border-t border-border-brand/30 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-mid/65 text-[11px] font-light">
          <div>
            &copy; {currentYear} Talma Resinas. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            Feito à mão com <Heart size={12} className="text-red-400 fill-red-400 inline" /> na resina &bull; Sarzedo, MG
          </div>
        </div>
      </div>
    </footer>
  );
}
