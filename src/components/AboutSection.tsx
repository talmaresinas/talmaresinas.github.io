/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart, ShieldCheck, Flame } from 'lucide-react';

export default function AboutSection() {
  const steps = [
    {
      title: 'Química Perfeita',
      desc: 'Proporção milimétrica de polimerização que elimina microbolhas na cura, garantindo o efeito cristal transparente absoluto.',
      icon: <Flame size={20} className="text-amber-brand" />
    },
    {
      title: 'Proteção Total UV',
      desc: 'Formulada com filtros fotoestabilizadores avançados. Sua caneta ou chaveiro livre do amarelamento causado pelo sol.',
      icon: <ShieldCheck size={20} className="text-amber-brand" />
    },
    {
      title: 'Polimento & Domming',
      desc: 'Acabamento final com camada protetora arredondada, deixando a superfície com toque acetinado macio e brilho de lente.',
      icon: <Sparkles size={20} className="text-amber-brand" />
    },
    {
      title: 'Feito com Alma',
      desc: 'Cada pigmento, glitter, flor seca natural ou foto é inserido ordenadamente com pinça, criando profundidade e história.',
      icon: <Heart size={20} className="text-amber-brand" />
    }
  ];

  return (
    <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Visual styling grid decorators */}
      <div className="absolute top-0 left-0 w-32 h-full bg-cream/30 border-r border-border-brand/20 pointer-events-none hidden lg:block" />
      
      <div className="max-w-7xl mx-auto relative z-10 lg:pl-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Detailed explanations story text */}
          <div className="lg:col-span-6">
            <span className="inline-block bg-amber-brand/10 text-amber-brand font-bold uppercase text-xs tracking-[0.2em] px-4 py-2 rounded-full mb-3" id="sobre-eyebrow">
              Arte Artesanal Autêntica
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-dark leading-tight" id="sobre-title">
              Nossa história é moldada por detalhes delicados
            </h2>
            <p className="text-mid text-xs sm:text-sm font-light leading-relaxed mt-4 max-w-xl">
              A <strong>Talma Resinas</strong> nasceu em Sarzedo, Minas Gerais, com o compromisso de traduzir memórias afetivas, preferências de marcas e iniciais em joias utilitárias elegantes. Acreditamos que um brinde ou presente é mais que um utilitário: é um porta-retratos de sentimentos.
            </p>
            <p className="text-mid text-xs sm:text-sm font-light leading-relaxed mt-4 max-w-xl">
              Nossa produção é completamente artesanal, desenvolvendo desde a cura lenta de líquidos autopolimerizáveis até o envio cuidadoso. Isso resulta em peças com excelente durabilidade química e resistência tátil que você sente ao toque.
            </p>

            {/* Floating metrics quote card */}
            <div className="mt-8 bg-amber-pale/40 border border-border-brand p-6 rounded-2xl flex items-start gap-4 max-w-lg shadow-xs">
              <span className="text-3xl select-none leading-none">✨</span>
              <div>
                <h4 className="font-serif text-sm font-bold text-dark">
                  Seu presente do seu jeito
                </h4>
                <p className="text-mid text-xs font-light mt-1 leading-normal">
                  "Unir resina com flores, purpurinas ou nomes especiais é a forma perfeita de estampar personalidade em acessórios que duram uma vida inteira."
                </p>
              </div>
            </div>
          </div>

          {/* Quick core process list steps icons */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6" id="sobre-features-grid">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-cream/40 p-6 rounded-2xl border border-border-brand hover:border-amber-brand/35 transition-all duration-300 shadow-xs"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs border border-border-brand/40 mb-4">
                  {step.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-dark mb-1.5">{step.title}</h3>
                <p className="text-mid/85 text-[11px] font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
