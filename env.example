/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';
import { Sparkles, X, Send, ShoppingBag, Search, CheckCircle, Info, RefreshCcw, Truck, MapPin } from 'lucide-react';

interface ProductSectionProps {
  onOrder: (product: Product, customOptions?: { nameOnPiece?: string }) => void;
  selectedCategory: 'todos' | 'chaveiro' | 'caneta' | 'outros';
  onFilterCategory: (cat: 'todos' | 'chaveiro' | 'caneta' | 'outros') => void;
}

export default function ProductSection({ onOrder, selectedCategory, onFilterCategory }: ProductSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [modalFlow, setModalFlow] = useState<'details' | 'order' | null>(null);
  const [letterOnPiece, setLetterOnPiece] = useState('');
  const [nameOnPiece, setNameOnPiece] = useState('');
  const [observations, setObservations] = useState('');
  const [addTasselSeda, setAddTasselSeda] = useState(true);
  const [addPompom, setAddPompom] = useState(false);

  // States for live shipping calculator
  const [shippingCep, setShippingCep] = useState('');
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState('');
  const [shippingResult, setShippingResult] = useState<{
    logradouro?: string;
    bairro?: string;
    localidade: string;
    uf: string;
    pacPrice: number;
    pacDays: number;
    sedexPrice: number;
    sedexDays: number;
  } | null>(null);

  const filterTabs: { id: 'todos' | 'chaveiro' | 'caneta' | 'outros'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'chaveiro', label: 'Chaveiros' },
    { id: 'caneta', label: 'Canetas' },
    { id: 'outros', label: 'Marca-Páginas & Outros' }
  ];

  // Filtering + Searching logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.displayCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleOpenDetails = (product: Product, flow: 'details' | 'order') => {
    setSelectedProductForModal(product);
    setModalFlow(flow);
    setLetterOnPiece('');
    setNameOnPiece('');
    setObservations('');
    // For all keychains, default tassel to true.
    setAddTasselSeda(product.category === 'chaveiro');
    setAddPompom(false);
    
    // Reset shipping calculator of the modal
    setShippingCep('');
    setShippingLoading(false);
    setShippingError('');
    setShippingResult(null);
  };

  const handleCepCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = shippingCep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setShippingError('Digite um CEP válido com 8 dígitos.');
      setShippingResult(null);
      return;
    }

    setShippingLoading(true);
    setShippingError('');
    setShippingResult(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o CEP.');
      }
      const data = await response.json();
      if (data.erro) {
        setShippingError('CEP não encontrado. Verifique se o CEP foi digitado de forma correta.');
        setShippingLoading(false);
        return;
      }

      const uf = data.uf ? data.uf.toUpperCase() : 'SP';
      const city = data.localidade || '';
      
      // Real-world regional shipping calculations from Sarzedo, MG (região metropolitana de Belo Horizonte)
      let pacPrice = 19.90;
      let pacDays = 5;
      let sedexPrice = 29.90;
      let sedexDays = 2;

      const isMG = uf === 'MG';
      const lowercaseCity = city.toLowerCase();
      // Detect Sarzedo / Betim / Contagem / BH and metropolitan areas of Belo Horizonte
      const isLocalMG = isMG && (
        cleanCep.startsWith('30') || 
        cleanCep.startsWith('31') || 
        cleanCep.startsWith('32') ||
        lowercaseCity.includes('sarzedo') ||
        lowercaseCity.includes('belo horizonte') ||
        lowercaseCity.includes('contagem') ||
        lowercaseCity.includes('betim') ||
        lowercaseCity.includes('ibirité')
      );

      if (isMG) {
        if (isLocalMG) {
          pacPrice = 12.90;
          pacDays = 2;
          sedexPrice = 16.90;
          sedexDays = 1;
        } else {
          pacPrice = 17.90;
          pacDays = 4;
          sedexPrice = 24.90;
          sedexDays = 2;
        }
      } else if (['SP', 'RJ', 'ES'].includes(uf)) {
        pacPrice = 19.90;
        pacDays = 5;
        sedexPrice = 31.90;
        sedexDays = 3;
      } else if (['PR', 'SC', 'RS', 'DF', 'GO', 'MS', 'MT'].includes(uf)) {
        pacPrice = 24.90;
        pacDays = 7;
        sedexPrice = 39.90;
        sedexDays = 4;
      } else if (['BA', 'PE', 'CE', 'AL', 'SE', 'PB', 'RN', 'MA', 'PI'].includes(uf)) {
        pacPrice = 29.90;
        pacDays = 9;
        sedexPrice = 49.90;
        sedexDays = 5;
      } else { // Região Norte (AM, PA, AC, RO, RR, AP, TO)
        pacPrice = 36.90;
        pacDays = 12;
        sedexPrice = 69.90;
        sedexDays = 7;
      }

      setShippingResult({
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: city,
        uf: uf,
        pacPrice,
        pacDays,
        sedexPrice,
        sedexDays
      });
    } catch (err) {
      setShippingError('Instabilidade de conexão com a API de CEP. Tente novamente.');
    } finally {
      setShippingLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 5) {
      val = val.slice(0, 5) + '-' + val.slice(5);
    }
    setShippingCep(val);
  };

  const handleCloseModal = () => {
    setSelectedProductForModal(null);
    setModalFlow(null);
  };

  const getKeychainLetters = () => {
    if (!letterOnPiece) return [];
    return letterOnPiece
      .split(',')
      .map(l => l.trim())
      .filter(l => l.length > 0);
  };

  const getPriceBreakdown = () => {
    if (!selectedProductForModal) {
      return {
        unitBasePrice: 0,
        unitAdicionais: 0,
        unitPrice: 0,
        quantity: 1,
        subtotal: 0,
        discount: 0,
        total: 0,
        hasDiscount: false
      };
    }

    const unitBasePrice = selectedProductForModal.price;
    let unitAdicionais = 0;

    // Only Pompom adds a dynamic price of R$ 3,00 if chosen for any keychain
    if (selectedProductForModal.category === 'chaveiro' && addPompom) {
      unitAdicionais += 3.00;
    }

    const unitPrice = unitBasePrice + unitAdicionais;
    
    let quantity = 1;
    if (selectedProductForModal.category === 'chaveiro') {
      const letters = getKeychainLetters();
      quantity = letters.length > 0 ? letters.length : 1;
    }

    const subtotal = unitPrice * quantity;
    
    // "Quando passar de 3 chaveiros sera aplicado um desconto de 5% no valor total."
    // Passer de 3 means quantity > 3
    const hasDiscount = selectedProductForModal.category === 'chaveiro' && quantity > 3;
    const discount = hasDiscount ? subtotal * 0.05 : 0;
    const total = subtotal - discount;

    return {
      unitBasePrice,
      unitAdicionais,
      unitPrice,
      quantity,
      subtotal,
      discount,
      total,
      hasDiscount
    };
  };

  const getModalTotalPrice = () => {
    return getPriceBreakdown().total;
  };

  const handleModalOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForModal) return;

    let finalNameText = nameOnPiece.trim();
    let finalLetterText = letterOnPiece.trim().toUpperCase();
    let additions: string[] = [];
    const cat = selectedProductForModal.category;
    const id = selectedProductForModal.id;

    if (cat === 'chaveiro') {
      if (finalLetterText) {
        additions.push(`Letras / Iniciais do Chaveiro: "${finalLetterText}"`);
      }
      if (id === 'chaveiro-2' || id === 'chaveiro-4') {
        if (finalNameText) {
          additions.push(`Nome Gravado no Chaveiro: "${finalNameText}"`);
        }
      }
    } else if (cat === 'caneta') {
      if (id === 'caneta-2' && finalNameText) {
        additions.push(`Nome Gravado na Caneta: "${finalNameText}"`);
      }
    } else {
      if (id === 'marca-pagina-2' && finalNameText) {
        additions.push(`Nome/Frase no Marca-Páginas: "${finalNameText}"`);
      } else if (id === 'cracha-1' && finalNameText) {
        additions.push(`Nome/Cargo no Crachá: "${finalNameText}"`);
      }
    }

    if (cat === 'chaveiro') {
      if (id === 'chaveiro-3' || id === 'chaveiro-4') {
        additions.push(`Mini Terço de Pérolas: Incluso (Fixo no Modelo)`);
      }
      if (addTasselSeda) {
        additions.push(`Tassel de Seda: Incluso (Grátis)`);
      }
      
      if (addPompom) {
        additions.push(`Pompom de Pelúcia: +R$ 3,00`);
      }
    } else if (cat === 'caneta') {
      if (id === 'caneta-3') {
        additions.push(`Mini Terço de Pérolas: Incluso (Fixo no Modelo)`);
      } else {
        additions.push(`Tassel de Seda: Incluso (Grátis)`);
      }
    }

    const { unitBasePrice, unitAdicionais, unitPrice, quantity, subtotal, discount, total, hasDiscount } = getPriceBreakdown();

    let text = `Olá! Gostaria de encomendar o seguinte item da coleção:\n\n`;
    text += `📦 *Produto:* ${selectedProductForModal.name}\n`;
    text += `🏷️ *Categoria:* ${selectedProductForModal.displayCategory}\n`;
    
    if (cat === 'chaveiro') {
      const lettersList = getKeychainLetters();
      text += `🔤 *Quantidade de Chaveiros:* ${quantity}x (${lettersList.join(', ')})\n`;
      text += `💵 *Preço de cada Chaveiro:* R$ ${unitPrice.toFixed(2).replace('.', ',')}\n`;
    } else {
      text += `💵 *Preço Base:* R$ ${unitBasePrice.toFixed(2).replace('.', ',')}\n`;
    }
    text += `\n`;

    if (additions.length > 0) {
      text += `✨ *Adicionais / Personalizações:*\n`;
      additions.forEach(add => {
        text += `- ${add}\n`;
      });
      text += `\n`;
    }

    if (cat === 'chaveiro' && quantity > 1) {
      text += `📊 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
      if (hasDiscount) {
        text += `🏷️ *Desconto Especial (5% para mais de 3 unidades):* -R$ ${discount.toFixed(2).replace('.', ',')}\n`;
      }
      text += `\n`;
    }

    if (observations.trim()) {
      text += `📝 *Observações/Cores/Glitter:* "${observations.trim()}"\n\n`;
    }

    text += `💰 *Valor Total:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    text += `Por favor, me informe o prazo de entrega e formas de pagamento!`;

    const waUrl = `https://wa.me/5531971246165?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noreferrer');

    setSelectedProductForModal(null);
  };

  return (
    <section id="produtos" className="py-24 px-6 md:px-12 lg:px-24 bg-cream relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Label and Titles */}
        <div className="text-center md:text-left mb-12">
          <span className="inline-block bg-amber-brand/10 text-amber-brand font-bold uppercase text-xs tracking-[0.2em] px-4 py-2 rounded-full mb-3">
            Destaques
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-dark mt-1">
            Nossa Coleção Exclusiva
          </h2>
          <p className="text-mid text-sm sm:text-base max-w-[600px] mt-2 font-light">
            Arte autoral moldada com resina de altíssima qualidade. Toque vitrificado, altíssimo brilho e proteção contra amarelamento precoce.
          </p>
        </div>

        {/* Filter Toolbar with Interactive Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-border-brand/30">
          
          {/* Categories Buttons */}
          <div className="flex gap-2.5 flex-wrap justify-center w-full md:w-auto" id="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterCategory(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-amber-brand text-white shadow-md shadow-amber-brand/20'
                    : 'bg-white text-mid border border-border-brand hover:border-amber-brand hover:text-amber-brand'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-[320px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-border-brand/80 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Pesquisar por produto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white text-dark placeholder:text-mid/40 border border-border-brand focus:outline-none focus:ring-1 focus:ring-amber-brand focus:border-amber-brand text-xs transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mid hover:text-dark p-1"
                title="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Grid Container */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              id="grid-produtos-container"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => handleOpenDetails(product, 'details')}
                  onOrder={() => handleOpenDetails(product, 'order')}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 bg-white/40 border border-dashed border-border-brand rounded-3xl"
              id="no-match-grid"
            >
              <div className="w-16 h-16 bg-amber-pale/30 text-amber-brand rounded-full flex items-center justify-center mb-4">
                <Info size={28} />
              </div>
              <h4 className="text-dark font-serif text-lg font-bold">Nenhum item encontrado</h4>
              <p className="text-mid text-xs font-light max-w-sm text-center px-4 mt-1">
                Não localizamos produtos para "{searchQuery}". Tente usar palavras-chave como "chaveiro", "caneta" ou "crachá".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onFilterCategory('todos');
                }}
                className="mt-6 border border-border-brand text-dark hover:bg-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition"
              >
                <RefreshCcw size={12} /> Mostrar todos
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info card banner */}
        <div className="mt-16 bg-dark text-cream p-8 rounded-[32px] overflow-hidden relative shadow-lg">
          <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-amber-brand/10 blur-[40px] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-9">
              <span className="text-amber-light font-bold text-[10px] tracking-widest uppercase block mb-1">
                ⭐ Brindes Corporativos de Alto Padrão
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                Encomendas Coletivas para Clínicas, Escolas e Empresas
              </h3>
              <p className="text-cream/75 text-xs sm:text-sm font-light leading-relaxed max-w-[700px]">
                Produzimos kits de canetas e chaveiros resinados com logotipos, nomes de colaboradores ou paleta de cores corporativa. Ideal para SIPATs, formaturas, lembranças de fim de ano ou boas-vindas. Solicite orçamento com descontos especiais de escala!
              </p>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <button
                onClick={() => {
                  const el = document.querySelector('#personalizados');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full md:w-auto bg-amber-brand hover:bg-amber-light text-white font-bold text-xs uppercase tracking-wide py-3 px-6 rounded-full transition shadow-sm"
              >
                Orçamento Lote
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProductForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-cream border border-border-brand/40 shadow-2xl rounded-3xl w-full max-w-[800px] max-h-[90vh] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
            >
             {/* 2. CONTAINER FILHO: Envolve todo o conteúdo do modal e cuida da rolagem, mantendo a grade responsiva */}
             <div className="col-span-1 md:col-span-2 w-full h-full overflow-y-auto pr-2 max-h-[90vh] grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual stage */}
              <div className="relative h-[250px] md:h-full min-h-[250px] bg-amber-pale/40">
                <img
                  src={selectedProductForModal.imageUrl}
                  alt={selectedProductForModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 left-4 bg-white/90 p-2 rounded-full text-dark hover:bg-amber-brand hover:text-white transition shadow-md md:hidden"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Product form / specifications */}
              <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-amber-brand uppercase tracking-widest block mb-1">
                        {selectedProductForModal.displayCategory}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-dark">
                        {selectedProductForModal.name}
                      </h3>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="hidden md:flex bg-white hover:bg-amber-brand hover:text-white p-2 rounded-full text-mid transition border border-border-brand shadow-sm"
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <span className="font-bold text-2xl text-dark block mt-2">
                    {selectedProductForModal.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>

                  <p className="text-mid text-xs font-light tracking-wide mt-3 leading-relaxed">
                    {selectedProductForModal.description}
                  </p>

                  {/* Bullet points benefits */}
                  <div className="mt-5 pt-4 border-t border-border-brand/35">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Ficha de Confecção:
                    </h4>
                    <ul className="list-none space-y-1.5 pl-0">
                      {selectedProductForModal.details?.map((detail, key) => (
                        <li key={key} className="text-[11px] text-mid/90 flex gap-2 items-start">
                          <CheckCircle size={12} className="text-amber-brand flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Informações de Produção & Prazo de Cura */}
                  <div className="mt-5 pt-4 border-t border-border-brand/35 bg-amber-pale/20 p-4 rounded-2xl border border-amber-brand/10">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-brand" /> 
                      Como é Feito & Como Pedir:
                    </h4>
                    
                    <div className="space-y-3.5 text-[11px] leading-relaxed text-mid">
                      <div>
                        <strong className="block text-dark font-semibold text-[10.5px] mb-0.5">✨ Arte Exclusiva em Resina Premium</strong>
                        <span className="block font-light">
                          Cada peça é produzida 100% à mão com resina epóxi de alta rigidez e brilho vítreo (com película de proteção UV contra amarelamento precoce). Sua peça é personalizada com glitters nobres, folhas de ouro/prata e flores desidratadas nacionais e importadas, tornando sua joia de resina verdadeiramente única.
                        </span>
                      </div>
                      
                      <div>
                        <strong className="block text-amber-brand font-semibold text-[10.5px] mb-0.5 flex items-center gap-1">
                          ⏳ Prazo de Confecção & Cura Química: 8 a 10 dias
                        </strong>
                        <span className="block font-light">
                          O tempo é nosso maior aliado! A resina epóxi passa por um processo físico-químico rigoroso chamado <strong className="font-semibold text-dark">cura por etapas</strong>. Para garantir que sua peça alcance a rigidez máxima de superfície resistente a riscos e polimento vitrificado impecável, o produto exige de <strong className="font-bold text-dark text-xs bg-amber-brand/10 px-1 py-0.5 rounded">8 a 10 dias para ser inteiramente confeccionado</strong>.
                        </span>
                      </div>

                      <div className="bg-white/85 p-2.5 rounded-xl border border-border-brand/15">
                        <strong className="block text-dark font-semibold text-[10.5px] mb-1">📋 Passo a Passo para Fazer seu Pedido:</strong>
                        <ol className="list-decimal pl-4 space-y-1 font-light text-mid">
                          <li>Preencha a inicial e os nomes que deseja gravar nos campos de personalização logo abaixo;</li>
                          <li>No campo de observações, nos conte quais as suas cores prediletas, estilo de glitter ou detalhes;</li>
                          <li>Clique em "Confirmar Encomenda no WhatsApp" para enviar todos os dados prontos ao nosso chat;</li>
                          <li>No WhatsApp, confirmamos os detalhes finais do design e o pagamento para então iniciar a magia da confecção!</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Shipping Calculator (Calculadora de CEP com ViaCEP) */}
                  <div className="mt-5 pt-4 border-t border-border-brand/35 bg-white p-4 rounded-2xl border border-border-brand/50 shadow-xs">
                    <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Truck size={14} className="text-amber-brand" /> 
                      Calcular Frete & Prazo de Entrega:
                    </h4>
                    <p className="text-[10px] text-mid/80 leading-normal mb-3">
                      Enviamos de <strong className="font-semibold text-dark">Sarzedo/Minas Gerais</strong> para todo o Brasil. Insira seu CEP para calcular o valor real e a previsão de entrega incluindo o tempo de cura da resina:
                    </p>

                    <form onSubmit={handleCepCalculate} className="flex gap-2">
                      <div className="relative flex-grow">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mid/40" />
                        <input
                          type="text"
                          placeholder="00000-000"
                          value={shippingCep}
                          onChange={handleCepChange}
                          className="w-full bg-cream/15 border border-border-brand/80 rounded-xl pl-9 pr-3 py-2 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30 font-mono tracking-wider animate-none"
                          disabled={shippingLoading}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={shippingLoading}
                        className="bg-dark hover:bg-amber-brand text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center justify-center min-w-[85px] h-9"
                      >
                        {shippingLoading ? (
                          <RefreshCcw size={14} className="animate-spin text-white" />
                        ) : (
                          'Calcular'
                        )}
                      </button>
                    </form>

                    {shippingError && (
                      <div className="mt-2.5 text-[10px] text-red-650 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-1.5">
                        <Info size={11} className="flex-shrink-0 text-red-500" />
                        <span>{shippingError}</span>
                      </div>
                    )}

                    {shippingResult && (
                      <div className="mt-4 p-3.5 bg-amber-pale/25 border border-amber-brand/15 rounded-xl space-y-3">
                        <div className="text-[11px] text-mid pb-2 border-b border-border-brand/10 font-medium">
                          📍 Envio para: <span className="text-dark font-bold">{shippingResult.localidade} - {shippingResult.uf}</span>
                          {shippingResult.logradouro && <span className="block text-[10px] font-normal text-mid/70 mt-0.5">{shippingResult.logradouro}, {shippingResult.bairro}</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* PAC Option */}
                          <div className="p-3 bg-white/95 border border-border-brand/20 rounded-lg flex flex-col justify-between shadow-xs">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-[10px] text-mid uppercase">🚚 Correios PAC</span>
                              <span className="font-mono text-xs font-extrabold text-amber-brand bg-amber-brand/5 px-1.5 py-0.5 rounded">
                                R$ {shippingResult.pacPrice.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                            <div className="text-[10px] text-mid/85 font-light leading-snug mt-1.5">
                              Traslado: ~{shippingResult.pacDays} dias úteis.<br />
                              <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1.5 text-[9.5px]">
                                Entrega Total: {shippingResult.pacDays + 9} dias úteis
                              </span>
                            </div>
                          </div>

                          {/* SEDEX Option */}
                          <div className="p-3 bg-white/95 border border-border-brand/20 rounded-lg flex flex-col justify-between shadow-xs">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-[10px] text-dark uppercase">⚡ Correios SEDEX</span>
                              <span className="font-mono text-xs font-extrabold text-amber-brand bg-amber-brand/5 px-1.5 py-0.5 rounded">
                                R$ {shippingResult.sedexPrice.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                            <div className="text-[10px] text-mid/85 font-light leading-snug mt-1.5">
                              Traslado: ~{shippingResult.sedexDays} dias úteis.<br />
                              <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1.5 text-[9.5px]">
                                Entrega Total: {shippingResult.sedexDays + 9} dias úteis
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[9px] text-mid/70 leading-normal italic pt-1 border-t border-border-brand/5">
                          * "Entrega Total" inclui os 8 a 10 dias do processo obrigatório de confecção e cura completa da resina para que alcance a rigidez e brilho impecáveis antes do despacho.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Ordering Configuration Form */}
                {modalFlow === 'order' ? (
                  <form onSubmit={handleModalOrderSubmit} className="mt-6 pt-4 border-t border-border-brand/35">
                  <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-3">
                    Personalização do Seu Item
                  </h4>

                  {/* 1. Letter / Inicial Selection for Keychains */}
                  {selectedProductForModal.category === 'chaveiro' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] uppercase font-bold text-mid">
                          Letras / Iniciais do Chaveiro
                        </label>
                        <span className="text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-md leading-none text-amber-brand bg-amber-brand/10">
                          Suporta múltiplas letras
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={80}
                        placeholder="Ex: G, M, A..."
                        value={letterOnPiece}
                        onChange={(e) => setLetterOnPiece(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-border-brand/60 rounded-xl px-3 py-2 text-sm text-dark font-bold focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30"
                      />
                      <p className="text-[10px] text-mid/70 mt-1.5 leading-relaxed bg-amber-pale/15 px-2.5 py-1.5 rounded-lg border border-border-brand/20">
                        💡 Separe as iniciais por vírgula para encomendar múltiplos chaveiros de uma vez (Ex: <strong className="text-amber-brand">G, M</strong>). Cada inicial será feita como um chaveiro próprio. Ao encomendar <strong className="text-emerald-600">mais de 3 chaveiros</strong>, você ganha <strong className="text-emerald-600">5% de desconto</strong> no valor total!
                      </p>
                    </div>
                  )}

                  {/* 2. Name engraving selection for keychains that support name (chaveiro-2, chaveiro-4) */}
                  {selectedProductForModal.category === 'chaveiro' && 
                    (selectedProductForModal.id === 'chaveiro-2' || selectedProductForModal.id === 'chaveiro-4') && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] uppercase font-bold text-mid">
                          Nome Gravado no Chaveiro (Em cima da letra)
                        </label>
                        <span className="text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-md leading-none text-emerald-600 bg-emerald-50">
                          Incluso
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={14}
                        placeholder="Ex: Beatriz, Bruno, Sophia..."
                        value={nameOnPiece}
                        onChange={(e) => setNameOnPiece(e.target.value)}
                        className="w-full bg-white border border-border-brand/60 rounded-xl px-3 py-2 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30"
                      />
                    </div>
                  )}

                  {/* 3. Name or Phrase for Pen com Nome (caneta-2) */}
                  {selectedProductForModal.category === 'caneta' && selectedProductForModal.id === 'caneta-2' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] uppercase font-bold text-mid">
                          Nome para Gravação na Caneta
                        </label>
                        <span className="text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-md leading-none text-emerald-600 bg-emerald-50">
                          Incluso
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={14}
                        placeholder="Ex: Dra. Júlia, Mateus, Ana..."
                        value={nameOnPiece}
                        onChange={(e) => setNameOnPiece(e.target.value)}
                        className="w-full bg-white border border-border-brand/60 rounded-xl px-3 py-2 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30"
                      />
                    </div>
                  )}

                  {/* 4. Text for customizable Bookmarks and Badges (marca-pagina-2, cracha-1) */}
                  {selectedProductForModal.category === 'outros' && 
                    (selectedProductForModal.id === 'marca-pagina-2' || selectedProductForModal.id === 'cracha-1') && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] uppercase font-bold text-mid">
                          {selectedProductForModal.id === 'cracha-1' ? "Nome e Cargo p/ Crachá" : "Frase ou Nome p/ Gravação"}
                        </label>
                        <span className="text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-md leading-none text-emerald-600 bg-emerald-50">
                          Incluso
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={selectedProductForModal.id === 'marca-pagina-2' ? 40 : 25}
                        placeholder={selectedProductForModal.id === 'marca-pagina-2' ? "Ex: Minha frase literária favorita..." : "Ex: Dra. Camila - Pediatria"}
                        value={nameOnPiece}
                        onChange={(e) => setNameOnPiece(e.target.value)}
                        className="w-full bg-white border border-border-brand/60 rounded-xl px-3 py-2 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30"
                      />
                    </div>
                  )}

                  {/* 5. Message for non-customizable products (caneta-1, caneta-3, marca-pagina-1) */}
                  {((selectedProductForModal.category === 'caneta' && selectedProductForModal.id !== 'caneta-2') ||
                    (selectedProductForModal.category === 'outros' && selectedProductForModal.id === 'marca-pagina-1')) && (
                    <div className="mb-4 p-3 bg-gray-50 border border-gray-100 rounded-xl text-center">
                      <p className="text-[11px] text-mid/80 leading-relaxed">
                        ✨ Este modelo básico padrão não acompanha gravação de textos personalizados.
                      </p>
                      <p className="text-[10px] text-amber-brand font-medium mt-1">
                        💡 Escolha as variações "com Nome" ou "com Frase" no catálogo para adicionar textos gravados!
                      </p>
                    </div>
                  )}

                  {/* Field 2: Multi-select Accessories (Shown for keychains) */}
                  {selectedProductForModal.category === 'chaveiro' && (
                    <div className="mb-4">
                      <label className="block text-[10px] uppercase font-bold text-mid mb-2">
                        Acessórios Opcionais do Chaveiro
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Tassel de Seda - Selectable for all keychains */}
                        <button
                          type="button"
                          onClick={() => setAddTasselSeda(!addTasselSeda)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            addTasselSeda
                              ? 'bg-amber-pale/40 border-amber-brand text-amber-brand font-bold shadow-xs'
                              : 'bg-white border-border-brand/65 hover:border-amber-brand/40 text-mid/80'
                          }`}
                        >
                          <span className="text-sm mb-1">🪢</span>
                          <span className="text-[10px] block font-semibold leading-tight">Tassel de Seda</span>
                          <span className="text-[9px] text-emerald-600 font-bold mt-0.5 leading-none">
                            Incluso (Grátis)
                          </span>
                        </button>

                        {/* Pompom Toggle Button */}
                        <button
                          type="button"
                          onClick={() => setAddPompom(!addPompom)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            addPompom
                              ? 'bg-amber-pale/40 border-amber-brand text-amber-brand font-bold shadow-xs'
                              : 'bg-white border-border-brand/65 hover:border-amber-brand/40 text-mid/80'
                          }`}
                        >
                          <span className="text-sm mb-1">⚪</span>
                          <span className="text-[10px] block font-semibold leading-tight">Pompom Pelúcia</span>
                          <span className="text-[9px] text-mid/70 mt-0.5 leading-none font-bold">
                            + R$ 3,00
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Field 3: Custom observations & specifications */}
                  <div className="mb-4">
                    <label className="block text-[10px] uppercase font-bold text-mid mb-1">
                      Observações e Especificações (Cores, Glitter, etc.)
                    </label>
                    <textarea
                      rows={2}
                      maxLength={250}
                      placeholder="Ex: Quero com Glitter dourado no fundo, flores secas rosas e tassel rosa..."
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      className="w-full bg-white border border-border-brand/60 rounded-xl px-3 py-2 text-xs text-dark focus:outline-none focus:ring-1 focus:ring-amber-brand placeholder:text-mid/30 resize-none leading-relaxed"
                    />
                    <p className="text-[9.5px] text-mid/60 leading-normal mt-1">
                      ✨ Indique todas as suas preferências de decoração (como tons, tipo de glitter, flores desidratadas, folhas de ouro/prata) para que sua peça fique perfeita!
                    </p>
                  </div>

                  {/* Live Budget Calculator Section */}
                  <div className="bg-amber-pale/25 border border-amber-brand/15 rounded-xl p-3.5 mb-4 text-xs font-light">
                    <div className="flex justify-between items-center text-mid pb-2 border-b border-border-brand/20">
                      <span>Preço Base Unitário:</span>
                      <span className="font-semibold text-dark font-mono">
                        R$ {selectedProductForModal.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    {letterOnPiece.trim() !== '' && (
                      <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                        <span className="flex items-center gap-1.5 font-medium">🔤 Iniciais do Chaveiro: "{letterOnPiece.trim().toUpperCase()}"</span>
                        <span className="font-bold uppercase text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded leading-none">Incluso</span>
                      </div>
                    )}

                    {nameOnPiece.trim() !== '' && (
                      <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                        <span className="flex items-center gap-1.5 font-medium">✍️ Gravação de Texto: "{nameOnPiece.trim()}"</span>
                        <span className="font-bold uppercase text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded leading-none">Incluso</span>
                      </div>
                    )}

                    {observations.trim() !== '' && (
                      <div className="py-2 border-b border-border-brand/10 text-mid">
                        <span className="block font-bold text-[9px] text-mid uppercase mb-1">📝 Minhas Escolhas (Cores/Glitter/Detalhes):</span>
                        <div className="bg-white/90 border border-border-brand/20 px-2.5 py-1.5 rounded-lg text-[10.5px] leading-relaxed italic text-dark/85 font-sans">
                          "{observations.trim()}"
                        </div>
                      </div>
                    )}

                    {selectedProductForModal.category === 'chaveiro' && (
                      <>
                        {(selectedProductForModal.id === 'chaveiro-3' || selectedProductForModal.id === 'chaveiro-4') && (
                          <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                            <span className="flex items-center gap-1.5">📿 Mini Terço de Pérolas:</span>
                            <span className="font-bold font-mono">Incluso</span>
                          </div>
                        )}

                        {addTasselSeda && (
                          <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                            <span className="flex items-center gap-1.5">🪢 Tassel de Seda:</span>
                            <span className="font-bold font-mono">Incluso</span>
                          </div>
                        )}

                        {addPompom && (
                          <div className="flex justify-between items-center text-amber-brand py-1.5 border-b border-border-brand/10">
                            <span className="flex items-center gap-1.5">⚪ Adicional Pompom de Pelúcia:</span>
                            <span className="font-bold font-mono">+ R$ 3,00</span>
                          </div>
                        )}
                      </>
                    )}

                    {selectedProductForModal.category === 'caneta' && (
                      <>
                        {selectedProductForModal.id === 'caneta-3' && (
                          <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                            <span className="flex items-center gap-1.5">📿 Mini Terço de Pérolas:</span>
                            <span className="font-bold font-mono">Incluso</span>
                          </div>
                        )}
                        {selectedProductForModal.id !== 'caneta-3' && (
                          <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10">
                            <span className="flex items-center gap-1.5">🪢 Tassel de Seda:</span>
                            <span className="font-bold font-mono">Incluso</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Quantity, Subtotal, and Discounts for Keychains */}
                    {(() => {
                      const { unitPrice, quantity, subtotal, discount, hasDiscount } = getPriceBreakdown();
                      if (selectedProductForModal.category === 'chaveiro') {
                        return (
                          <>
                            <div className="flex justify-between items-center text-mid py-1.5 border-b border-border-brand/10">
                              <span>Chaveiros a fabricar:</span>
                              <span className="font-bold font-mono text-dark bg-amber-pale px-2 py-0.5 rounded text-[11px] leading-none">
                                {quantity}x ({getKeychainLetters().join(', ') || 'Inicial'})
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-mid py-1.5 border-b border-border-brand/10">
                              <span>Valor por Unidade:</span>
                              <span className="font-semibold font-mono text-dark">
                                R$ {unitPrice.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                            {quantity > 1 && (
                              <div className="flex justify-between items-center text-mid py-1.5 border-b border-border-brand/10">
                                <span>Subtotal da Encomenda:</span>
                                <span className="font-semibold font-mono text-dark">
                                  R$ {subtotal.toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            )}
                            {hasDiscount && (
                              <div className="flex justify-between items-center text-emerald-600 py-1.5 border-b border-border-brand/10 bg-emerald-50/50 -mx-3.5 px-3.5">
                                <span className="font-bold">🏷️ Desconto de Atacado (5%):</span>
                                <span className="font-bold font-mono">
                                  - R$ {discount.toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            )}
                          </>
                        );
                      }
                      return null;
                    })()}

                    <div className="flex justify-between items-center text-xs font-extrabold text-dark mt-2 pt-2">
                      <span className="uppercase tracking-wider">Valor total da encomenda:</span>
                      <span className="text-amber-brand text-base leading-none font-mono">
                        {getModalTotalPrice().toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                  </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-brand hover:bg-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition duration-300 transform active:scale-95 cursor-pointer"
                    >
                      Confirmar Encomenda no WhatsApp <Send size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalFlow('details')}
                      className="w-full mt-2.5 bg-white hover:bg-amber-pale/20 text-mid/80 border border-border-brand/50 font-bold py-2 px-3 rounded-lg text-[10px] uppercase tracking-wide transition duration-200"
                    >
                      ← Voltar para Informações do Produto
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 pt-6 border-t border-border-brand/35 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setModalFlow('order')}
                      className="w-full bg-amber-brand hover:bg-dark text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition duration-300 transform active:scale-95 cursor-pointer"
                    >
                      Quero Personalizar e Pedir <Sparkles size={14} className="text-amber-light inline" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full bg-white hover:bg-amber-pale/10 text-dark border border-border-brand/55 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-300"
                    >
                      Voltar ao Catálogo
                    </button>
                  </div>
                )}

              </div>
             </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
