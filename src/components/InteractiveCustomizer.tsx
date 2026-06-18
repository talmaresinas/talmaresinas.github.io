/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COLORS, FILLERS, ACCESSORIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Info, Layers, RefreshCcw } from 'lucide-react';

export default function InteractiveCustomizer() {
  const [clientName, setClientName] = useState('');
  const [productType, setProductType] = useState('Chaveiro Personalizado');
  const [selectedColor, setSelectedColor] = useState(COLORS[1]); // Gold leaf defaults
  const [selectedFiller, setSelectedFiller] = useState(FILLERS[1]); // Gold flakes defaults
  const [selectedAccessories, setSelectedAccessories] = useState<typeof ACCESSORIES>([]); // Multiple accessories
  const [customLetters, setCustomLetters] = useState('');
  const [customName, setCustomName] = useState('');
  const [extraDetails, setExtraDetails] = useState('');

  // Form errors
  const [errors, setErrors] = useState({ clientName: '', customLetters: '' });

  // Calculate customized price
  const basePrices: Record<string, number> = {
    'Chaveiro Personalizado': 20.00,
    'Caneta Personalizada': 48.00,
    'Crachá / Identificador': 30.00,
    'Outros': 25.00
  };

  const getLettersList = () => {
    if (!customLetters) return [];
    return customLetters
      .split(',')
      .map(l => l.trim())
      .filter(l => l.length > 0);
  };

  const isKeyring = productType.includes('Chaveiro');
  const lettersList = getLettersList();
  const quantity = isKeyring && lettersList.length > 0 ? lettersList.length : 1;

  const unitBasePrice = basePrices[productType] || 20.00;
  const accessoriesCost = selectedAccessories.reduce((sum, item) => sum + item.price, 0);
  const nameCost = customName.trim() ? 2.00 : 0.00;

  const unitTotal = unitBasePrice + accessoriesCost + nameCost;
  const subtotal = unitTotal * quantity;

  const hasDiscount = isKeyring && quantity > 3;
  const discount = hasDiscount ? subtotal * 0.05 : 0;
  const calculatedPrice = subtotal - discount;

  const toggleAccessory = (accessory: typeof ACCESSORIES[number]) => {
    if (selectedAccessories.some(a => a.id === accessory.id)) {
      setSelectedAccessories(selectedAccessories.filter(a => a.id !== accessory.id));
    } else {
      setSelectedAccessories([...selectedAccessories, accessory]);
    }
  };

  const handleReset = () => {
    setSelectedColor(COLORS[0]);
    setSelectedFiller(FILLERS[0]);
    setSelectedAccessories([]);
    setCustomLetters('');
    setCustomName('');
    setExtraDetails('');
    setErrors({ clientName: '', customLetters: '' });
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { clientName: '', customLetters: '' };

    if (!clientName.trim()) {
      newErrors.clientName = 'Por favor, informe seu nome para continuarmos';
      hasError = true;
    }

    if (!customLetters.trim()) {
      newErrors.customLetters = 'Por favor, informe a letra desejada para a confecção (ex: A, B)';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      const el = document.getElementById(newErrors.clientName ? 'client-name-input' : 'custom-letters-input');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({ clientName: '', customLetters: '' });

    // Build perfect detailed order text representation
    let text = `Olá Talma Resinas! Meu nome é ${clientName}.\n`;
    text += `Gostaria de solicitar um orçamento para uma peça exclusiva sob encomenda:\n\n`;
    text += `✨ *Peça:* ${productType}\n`;
    text += `🎨 *Fundo/Cor:* ${selectedColor.name}\n`;
    text += `🌿 *Elementos Internos:* ${selectedFiller.name}\n`;
    
    if (selectedAccessories.length > 0) {
      text += `💍 *Acessórios Extras:* ${selectedAccessories.map(a => a.name).join(', ')}\n`;
    }
    
    if (isKeyring) {
      text += `🔤 *Iniciais Desejadas:* ${lettersList.join(', ')} (${quantity}x unidade${quantity > 1 ? 's' : ''})\n`;
    } else if (lettersList.length > 0) {
      text += `🔤 *Letras Selecionadas:* ${lettersList.join(', ')}\n`;
    }

    if (customName.trim()) {
      text += `✍️ *Nome na Peça (+R$ 2,00):* "${customName.trim()}"\n`;
    } else {
      text += `✍️ *Nome na Peça:* Sem nome gravado\n`;
    }

    if (extraDetails.trim()) {
      text += `📝 *Detalhes Adicionais:* ${extraDetails.trim()}\n`;
    }
    text += `\n`;

    if (isKeyring && quantity > 1) {
      text += `💵 *Preço por unidade:* R$ ${unitTotal.toFixed(2).replace('.', ',')}\n`;
      text += `📊 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
      if (hasDiscount) {
        text += `🏷️ *Desconto de Atacado (5%):* -R$ ${discount.toFixed(2).replace('.', ',')}\n`;
      }
      text += `\n`;
    }

    text += `💰 *Preço Estimado:* R$ ${calculatedPrice.toFixed(2).replace('.', ',')}\n\n`;
    text += `Gostaria de combinar o prazo de produção e opções de envio!`;

    const url = `https://wa.me/5531971246165?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className="custom-section py-20 px-6 md:px-12 lg:px-20 bg-dark text-cream rounded-[40px] mx-4 md:mx-10 my-16 shadow-2xl relative overflow-hidden" id="personalizados">
      {/* Decorative vector grid shapes in background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-brand/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-light/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left col: Title and Interactive preview */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-amber-light font-bold uppercase text-[10px] tracking-[0.2em] block mb-2">
                Simulador Exclusivo
              </span>
              <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-white mb-2 leading-tight">
                Personalize no seu estilo
              </h2>
              <p className="text-cream/80 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Selecione as cores e elementos desejados e confira abaixo uma simulação visual aproximada do acabamento da sua resina vitrificada:
              </p>
            </div>

            {/* LIVE 2D INTERACTIVE SIMULATOR BOX */}
            <div className="relative w-full aspect-square max-w-[340px] mx-auto bg-[#1A1009] border border-border-brand rounded-[32px] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Overlay Glass Layer effect reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none rounded-[32px] z-30" />
              <div className="absolute top-0 left-[-50%] w-[200%] h-[30%] bg-white/5 rotate-[15deg] pointer-events-none z-30" />

              {/* Top Banner stats */}
              <div className="flex justify-between items-center z-20">
                <span className="text-[10px] text-amber-light/70 font-mono tracking-wider flex items-center gap-1">
                  <Layers size={10} /> Preview do Molde
                </span>
                <span className="text-xs font-mono font-bold text-amber-brand bg-white/10 px-2 py-0.5 rounded-md">
                  R$ {calculatedPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Physical interactive object replica stage */}
              <div className="relative flex-grow flex items-center justify-center my-4 z-10 select-none">
                
                {/* Simulated resin outline shape according to product type */}
                <motion.div
                  layout
                  className={`w-40 transition-all duration-500 relative flex items-center justify-center shadow-xl border border-white/20 ${
                    productType.includes('Chaveiro')
                      ? 'h-40 rounded-[28px]'
                      : productType.includes('Caneta')
                      ? 'h-8 w-44 rounded-full'
                      : 'h-48 w-32 rounded-[24px]'
                  }`}
                  style={{
                    backgroundColor: selectedColor.id === 'transparente' ? 'rgba(253, 250, 244, 0.15)' : selectedColor.bgHex,
                    backgroundImage: selectedColor.id === 'transparente' ? 'radial-gradient(ellipse at center, rgba(253, 250, 244, 0.2) 0%, rgba(201, 123, 42, 0.05) 100%)' : 'none',
                    backdropFilter: selectedColor.id === 'transparente' ? 'blur(8px)' : 'none',
                    boxShadow: 'inset 0 0 25px rgba(255, 255, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Embedded Filler Specks (Glitter/Flakes layer simulation) */}
                  {selectedFiller.id !== 'nenhum' && (
                    <div className="absolute inset-2 rounded-xl overflow-hidden pointer-events-none opacity-80 z-10 select-none mix-blend-screen bg-cover bg-center">
                      {selectedFiller.id === 'ouro_folha' && (
                        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-70 animate-pulse" />
                      )}
                      {selectedFiller.id === 'prata_folha' && (
                        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-70 animate-pulse" />
                      )}
                      {selectedFiller.id === 'flores' && (
                        <div className="absolute inset-0 flex flex-wrap gap-2 justify-around items-center p-3 opacity-90">
                          <span className="text-xl">🌸</span>
                          <span className="text-base">🌿</span>
                          <span className="text-xs">🌼</span>
                        </div>
                      )}
                      {selectedFiller.id === 'glitter_holografico' && (
                        <div className="absolute inset-0 bg-[radial-gradient(#FF007F_1.5px,#9B5DE5_2.5px,transparent_3.5px)] [background-size:8px_8px] opacity-80" />
                      )}
                      {selectedFiller.id === 'estrelas' && (
                        <div className="absolute inset-0 flex flex-wrap gap-4 items-center justify-center p-1 font-sans text-[10px] text-pink-300">
                          <span>💖</span><span>⭐️</span><span>✨</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Laser-engraved written Name Layer simulation */}
                  {(customLetters || customName) && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center font-serif font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20 flex flex-col items-center justify-center pointer-events-none"
                    >
                      {customLetters && (
                        <span className="text-4xl uppercase opacity-90 leading-none mb-1">
                          {customLetters.split(',')[0].trim()}
                        </span>
                      )}
                      {customName && (
                        <span className="text-xs bg-dark/40 px-2 py-0.5 rounded backdrop-blur-xs font-sans tracking-widest uppercase text-white font-extrabold max-w-[120px] truncate leading-none">
                          {customName}
                        </span>
                      )}
                    </motion.div>
                  )}

                  {/* Pendant Accessory attachments overlay indicator */}
                  {selectedAccessories.length > 0 && (
                    <div className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 z-20 bg-dark border border-amber-brand/40 px-2.5 py-1 rounded-full text-[9.5px] text-amber-brand flex items-center gap-1.5 font-semibold uppercase shadow-lg whitespace-nowrap">
                      <span>➕</span>
                      {selectedAccessories.map((acc, idx) => (
                        <span key={acc.id} className="flex items-center gap-0.5 animate-pulse">
                          {idx > 0 && <span className="text-white/30 font-normal">|</span>}
                          {acc.id === 'tessel' && '🪢 Tessel'}
                          {acc.id === 'terco' && '📿 Terço'}
                          {acc.id === 'pompom' && '⚪ Pompom'}
                          {acc.id === 'pingente_coracao' && '💖 Pingente'}
                        </span>
                      ))}
                    </div>
                  )}

                </motion.div>
              </div>

              {/* Bottom footer specs */}
              <div className="text-center z-20 border-t border-white/10 pt-3">
                <p className="text-[10px] text-cream/60 uppercase font-bold tracking-widest line-clamp-1">
                  {selectedColor.name} &bull; {selectedFiller.preview}
                </p>
                <div className="flex justify-center items-center gap-1 text-[9px] text-amber-brand font-medium mt-0.5 animate-pulse">
                  <Sparkles size={10} /> Toque vitrificado alto brilho
                </div>
              </div>

            </div>
          </div>

          {/* Right col: Custom Order selector Forms */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 text-dark shadow-xl" id="simulador-controls">
            <h3 className="font-serif text-2xl font-bold mb-6 text-dark flex items-center gap-2">
              Opções de Confecção <Layers size={20} className="text-amber-brand" />
            </h3>

            <form onSubmit={handleSendToWhatsApp}>
              {/* Field 1: Client Name Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="client-name-input" className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="client-name-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className={`w-full bg-cream/30 border rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 ${
                      errors.clientName
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                        : 'border-border-brand focus:ring-amber-brand focus:border-amber-brand'
                    }`}
                  />
                  {errors.clientName && (
                    <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center gap-1">
                      ⚠️ {errors.clientName}
                    </p>
                  )}
                </div>

                {/* Field 2: Product Type Select */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                    Tipo de Peça Desejada
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-cream/30 border border-border-brand rounded-xl px-4 py-3 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand"
                  >
                    <option>Chaveiro Personalizado</option>
                    <option>Caneta Personalizada</option>
                    <option>Crachá / Identificador</option>
                    <option>Outros</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Color Selectors */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                  1. escolha a Cor do Fundo / Pigmento
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`h-9 rounded-xl flex items-center justify-center transition-all duration-300 relative cursor-pointer ${color.class} ${
                        selectedColor.id === color.id
                          ? 'ring-2 ring-amber-brand scale-110 shadow-md z-10'
                          : 'opacity-85 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      {selectedColor.id === color.id && (
                        <div className="w-2.5 h-2.5 bg-white border border-dark rounded-full shadow-xs" id={`color-active-${color.id}`} />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-mid/80 mt-1.5 italic font-light">
                  Selecionado: <strong>{selectedColor.name}</strong>
                </p>
              </div>

              {/* Field 4: Element Filler */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                  2. aditivos internos (Flores ou Glitters)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {FILLERS.map((filler) => (
                    <button
                      key={filler.id}
                      type="button"
                      onClick={() => setSelectedFiller(filler)}
                      className={`px-3 py-2.5 rounded-xl border text-left text-[11px] font-medium transition-all duration-300 cursor-pointer ${
                        selectedFiller.id === filler.id
                          ? 'bg-amber-pale/40 border-amber-brand text-amber-brand font-bold shadow-xs'
                          : 'bg-cream/30 border-border-brand hover:border-amber-brand text-mid'
                      }`}
                    >
                      {filler.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 5: Accessories additions & Name (Multi-select toggles) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                    3. ACESSÓRIOS METÁLICOS EXTRAS (Escolha quantos quiser)
                  </label>
                  <div className="space-y-2">
                    {ACCESSORIES.filter(a => a.id !== 'nenhum').map((acc) => {
                      const isSelected = selectedAccessories.some(a => a.id === acc.id);
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => toggleAccessory(acc)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-pale/40 border-amber-brand text-amber-brand font-bold shadow-xs'
                              : 'bg-cream/30 border-border-brand hover:border-amber-brand/50 text-mid'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {acc.id === 'tessel' && '🪢'}
                              {acc.id === 'terco' && '📿'}
                              {acc.id === 'pompom' && '⚪'}
                              {acc.id === 'pingente_coracao' && '💖'}
                            </span>
                            <span>{acc.name}</span>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider ${isSelected ? 'text-amber-brand' : 'text-mid/70'}`}>
                            +R$ {acc.price.toFixed(2).replace('.', ',')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  {/* Part 1: Mandatory Letter Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="custom-letters-input" className="block text-[11px] uppercase tracking-wider font-bold text-mid">
                        4. Escolha da Letra * 
                      </label>
                      <span className="text-[9.5px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                        Obrigatório
                      </span>
                    </div>
                    <input
                      type="text"
                      id="custom-letters-input"
                      value={customLetters}
                      onChange={(e) => {
                        setCustomLetters(e.target.value);
                        if (errors.customLetters) setErrors({ ...errors, customLetters: '' });
                      }}
                      placeholder="Ex: Letras A, B, C (separe por vírgula)"
                      className={`w-full bg-cream/30 border rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:ring-1 ${
                        errors.customLetters
                          ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                          : 'border-border-brand focus:ring-amber-brand focus:border-amber-brand'
                      }`}
                    />
                    {errors.customLetters ? (
                      <p className="text-red-500 text-[10px] font-bold mt-1.5 flex items-center gap-1">
                        ⚠️ {errors.customLetters}
                      </p>
                    ) : (
                      <p className="text-[9.5px] text-mid/60 mt-1 leading-normal">
                        Você pode escolher mais de uma inicial separada por vírgula.
                      </p>
                    )}
                  </div>

                  {/* Part 2: Optional Name Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="custom-name-input" className="block text-[11px] uppercase tracking-wider font-bold text-mid">
                        Adicionar Nome na Peça (Opcional)
                      </label>
                      <span className="text-[9.5px] uppercase font-bold text-amber-brand bg-amber-pale/45 px-2 py-0.5 rounded-md">
                        + R$ 2,00
                      </span>
                    </div>
                    <input
                      type="text"
                      id="custom-name-input"
                      maxLength={20}
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Nome cursivo gravado (Ex: Beatriz)"
                      className="w-full bg-cream/30 border border-border-brand rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/40"
                    />
                  </div>

                  <div className="bg-cream/30 border border-border-brand rounded-xl p-3.5 text-[10px] text-mid/80 leading-relaxed font-light">
                    <p className="font-semibold text-dark mb-0.5">💡 Combinações Recomendadas:</p>
                    Adicionar Pompom de Pelúcia + Mini Terço no seu chaveiro personalizado é a nossa opção mais charmosa!
                  </div>
                </div>
              </div>

              {/* Field 6: Extra Request Details */}
              <div className="mb-6">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-mid mb-2">
                  5. Detalhes Adicionais de Design
                </label>
                <textarea
                  value={extraDetails}
                  onChange={(e) => setExtraDetails(e.target.value)}
                  rows={3}
                  placeholder="Ex: Gostaria de flor seca azul e margaridas brancas com fundo transparente, glitter apenas próximo ao pompom."
                  className="w-full bg-cream/30 border border-border-brand rounded-xl p-3.5 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand"
                />
              </div>

              {/* Actions submit and reset buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3.5 rounded-xl border border-border-brand/70 hover:bg-cream text-mid hover:text-dark transition-all duration-300 text-xs font-bold"
                  title="Limpar formulário e redefinir"
                >
                  <RefreshCcw size={14} />
                </button>
                <button
                  type="submit"
                  className="flex-grow bg-amber-brand hover:bg-dark text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition duration-300 active:scale-[0.98] cursor-pointer"
                  id="send-wa-simulator-btn"
                >
                  Solicitar com Orçamento no WhatsApp <Send size={12} />
                </button>
              </div>

              {/* Extra instructions note */}
              <div className="mt-4 flex gap-2 items-center bg-amber-pale/20 p-3 rounded-xl border border-amber-brand/10">
                <Info size={14} className="text-amber-brand flex-shrink-0" />
                <p className="text-[10px] text-mid/80 leading-relaxed font-light">
                  Nossos itens especiais têm um prazo de confecção de 5 a 10 dias úteis para a secagem perfeita e aplicação do acabamento vítreo protetor UV.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
