/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'chaveiro-1',
    name: 'Chaveiro de Letra (Normal)',
    category: 'chaveiro',
    displayCategory: 'Chaveiro Especial',
    price: 20.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516856100631347371/4F28A2ED-B000-46C6-B8CD-805AC0BB2D4D.png?ex=6a3429d4&is=6a32d854&hm=4a073226054d2284005964dda20e4e705afd682c369697daa9077ec2c265973c&=&format=webp&quality=lossless',
    description: 'Nossa inicial clássica confeccionada em resina premium de alta transparência. Inclui argola reforçada e tassel de seda elegante combinando.',
    details: [
      'Resina epóxi com proteção UV (bloqueia o amarelamento precoce)',
      'Argola reforçada disponível em dourado ou prata',
      'Acabamento com resina protetora (Domming) para toque suave e bordas arredondadas',
      'Personalização livre de cores e elementos internos (glitter ou flores)'
    ],
    isCustomizable: true
  },
  {
    id: 'chaveiro-2',
    name: 'Chaveiro com Nome',
    category: 'chaveiro',
    displayCategory: 'Chaveiro Especial',
    price: 22.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516856100631347371/4F28A2ED-B000-46C6-B8CD-805AC0BB2D4D.png?ex=6a3429d4&is=6a32d854&hm=4a073226054d2284005964dda20e4e705afd682c369697daa9077ec2c265973c&=&format=webp&quality=lossless',
    description: 'Sua inicial em resina com gravação interna permanente do seu nome em fonte cursiva metalizada luxuosa.',
    details: [
      'Gravação em alta precisão e resolução',
      'Fundo decorado com glitter ou folhas metálicas de sua escolha',
      'Acompanha tassel de seda de luxo combinando com a cor da peça',
      'Bordas arredondadas com toque macio e super brilhante'
    ],
    isCustomizable: true
  },
  {
    id: 'chaveiro-3',
    name: 'Chaveiro com Terço',
    category: 'chaveiro',
    displayCategory: 'Chaveiro Especial',
    price: 25.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516852984028336278/1595FF17-451D-4E2E-B909-64BE93876FC2.png?ex=6a3426ed&is=6a32d56d&hm=4ef4050a1970c158039936751180b94164c54f2f4ab54adca071f99f84d8ca72&=&format=webp&quality=lossless',
    description: 'Adicione um toque de fé e elegância ao seu dia a dia. Esse modelo acompanha um mini terço de pérolas delicadamente feito de forma artesanal.',
    details: [
      'Inicial em tamanho grande com acabamento brilhoso',
      'Mini terço de pérolas artificiais de alta qualidade feito à mão',
      'Acabamento premium sem bolhas de ar e com cantos polidos',
      'Acessórios metálicos de primeira linha antioxidantes'
    ],
    isCustomizable: true
  },
  {
    id: 'chaveiro-4',
    name: 'Chaveiro com Terço e Nome',
    category: 'chaveiro',
    displayCategory: 'Chaveiro Especial',
    price: 27.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516852984028336278/1595FF17-451D-4E2E-B909-64BE93876FC2.png?ex=6a3426ed&is=6a32d56d&hm=4ef4050a1970c158039936751180b94164c54f2f4ab54adca071f99f84d8ca72&=&format=webp&quality=lossless',
    description: 'A personalização completa e mais desejada! Inclui o nome gravado internamente e o delicado mini terço de pérolas artesanal.',
    details: [
      'Estilo super luxuoso combinando escrita, folhas metálicas e mini terço',
      'Resina líquida protetora de alto brilho em ambas as faces',
      'Feito 100% à mão com materiais cuidadosamente selecionados',
      'Produto exclusivo e altamente afetivo para presentear se amar'
    ],
    isCustomizable: true
  },
  {
    id: 'caneta-1',
    name: 'Caneta S/ Nome (Normal)',
    category: 'caneta',
    displayCategory: 'Escrita',
    price: 22.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516856774802669609/F3821073-95ED-4DD4-8806-EF1220B123C6.png?ex=6a342a74&is=6a32d8f4&hm=75ed822a3b1c9f48ac5da0f7ec6a60b968bfa8cb66112a85096a1d6c6105bf0c&=&format=webp&quality=lossless',
    description: 'Caneta artística de luxo recarregável. Um design ergonômico feito inteiramente de resina, proporcionando peso ideal e conforto indescritível na escrita.',
    details: [
      'Corpo 100% em resina sólida de alta transparência',
      'Suporte para troca de carga (compatível com cargas padrão tipo Bic)',
      'Misturas incríveis de pigmentos, purpurina e folha de ouro',
      'Efeito vitrificado impecável que não perde o brilho regular'
    ],
    isCustomizable: true
  },
  {
    id: 'caneta-2',
    name: 'Caneta com Nome',
    category: 'caneta',
    displayCategory: 'Escrita',
    price: 25.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516856774802669609/F3821073-95ED-4DD4-8806-EF1220B123C6.png?ex=6a342a74&is=6a32d8f4&hm=75ed822a3b1c9f48ac5da0f7ec6a60b968bfa8cb66112a85096a1d6c6105bf0c&=&format=webp&quality=lossless',
    description: 'Eternize momentos importantes ou presenteie alguém especial. Esta versão inclui a personalização do nome gravado internamente com fonte cursiva luxuosa.',
    details: [
      'Gravação interna permanente do nome em alta precisão',
      'Letras que não desbotam ou descascam com o uso',
      'Recarregável rápida no topo com tampa elegante combinando',
      'Escolha de cores personalizadas e efeitos translúcidos'
    ],
    isCustomizable: true
  },
  {
    id: 'caneta-3',
    name: 'Caneta com o Terço',
    category: 'caneta',
    displayCategory: 'Escrita',
    price: 30.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516856774802669609/F3821073-95ED-4DD4-8806-EF1220B123C6.png?ex=6a342a74&is=6a32d8f4&hm=75ed822a3b1c9f48ac5da0f7ec6a60b968bfa8cb66112a85096a1d6c6105bf0c&=&format=webp&quality=lossless',
    description: 'Lindo instrumento de escrita super luxuoso, acompanhado de um mini terço de pérolas artificiais de alta cintilância integrado.',
    details: [
      'Acabamento vitrificado ultra brilhante',
      'Mini terço fixado delicadamente na extremidade superior',
      'Escrita macia com cores harmônicas à sua escolha',
      'Peça perfeita para presentear com amor e carinho'
    ],
    isCustomizable: true
  },
  {
    id: 'marca-pagina-1',
    name: 'Marca-Páginas (Normal)',
    category: 'outros',
    displayCategory: 'Marca-Páginas',
    price: 20.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1517012899212562483/B8C43092-1297-4324-BE6E-97C9C1C1615C.png?ex=6a34bbdb&is=6a336a5b&hm=e34124af55bb2629c42950b1ba2e34d44beaa14e3c5d850e982931313b126b19&=&format=webp&quality=lossless',
    description: 'Marca-páginas artesanal com mix de flores secas e folhas de ouro. Lindo adorno para amantes de livros que buscam requinte na leitura.',
    details: [
      'Espessura fina ideal para não forçar as páginas dos livros',
      'Tassel de seda premium de cor neutra ou combinando',
      'Flores naturais desidratadas de alta durabilidade',
      'Excelente opção afetiva para presentear bibliófilos'
    ],
    isCustomizable: true
  },
  {
    id: 'marca-pagina-2',
    name: 'Marca-Páginas com Nome ou Frase',
    category: 'outros',
    displayCategory: 'Marca-Páginas',
    price: 23.00,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    description: 'Grave sua citação literária preferida, seu nome ou data comemorativa dentro do seu folheador místico.',
    details: [
      'Personalização de frases de até 40 caracteres',
      'Resina epóxi super leve resistente à luz solar e calor',
      'Brilho translúcido que destaca florais ou glitteres',
      'Diferentes pigmentações de fundo disponíveis'
    ],
    isCustomizable: true
  },
  {
    id: 'cracha-1',
    name: 'Crachá de Resina',
    category: 'outros',
    displayCategory: 'Corporativo',
    price: 30.00,
    imageUrl: 'https://media.discordapp.net/attachments/1048593258063859815/1516857570139181187/DF563863-7C30-4213-A67E-676A9A529B7F.png?ex=6a342b32&is=6a32d9b2&hm=26f4c6a4439315f591b76567556efb07ee1234099af80090ade9f5b353ef1e91&=&format=webp&quality=lossless',
    description: 'Destaque-se no ambiente de trabalho! Nossos porta crachás ou de identificação de resina são ideais para profissionais da saúde, beleza, atendimento e corporativo.',
    details: [
      'Presilha tipo jacaré ou cordão retrátil (roller clip)',
      'Superfície lisa, fácil de higienizar com álcool 70%',
      'Acabamento brilhante e resistente a quedas diárias',
      'Pode incluir nome, profissão ou logotipo corporativo'
    ],
    isCustomizable: true
  }
];

export const COLORS = [
  { id: 'transparente', name: 'Transparente', class: 'bg-cream/10 border border-amber-brand/40', bgHex: 'transparent' },
  { id: 'ouro', name: 'Ouro', class: 'bg-gradient-to-tr from-yellow-300 via-yellow-500 to-amber-400', bgHex: '#D4AF37' },
  { id: 'prata', name: 'Prata', class: 'bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-300', bgHex: '#C0C0C0' },
  { id: 'rosa', name: 'Rosa', class: 'bg-gradient-to-tr from-pink-400 via-pink-600 to-rose-400', bgHex: '#EC4899' },
  { id: 'azul', name: 'Azul', class: 'bg-gradient-to-tr from-blue-400 via-sky-600 to-indigo-600', bgHex: '#0284C7' },
  { id: 'preto', name: 'Preto ', class: 'bg-gradient-to-tr from-neutral-800 via-black to-neutral-700', bgHex: '#171717' },
  { id: 'verde', name: 'Verde Esmeralda', class: 'bg-gradient-to-tr from-green-300 via-emerald-600 to-teal-500', bgHex: '#059669' },
  { id: 'ametista', name: 'Violeta', class: 'bg-gradient-to-tr from-purple-400 via-purple-600 to-fuchsia-600', bgHex: '#7C3AED' }
];

export const FILLERS = [
  { id: 'nenhum', name: 'Sem aditivos (Translúcido / Cor Pura)', preview: 'Puro' },
  { id: 'ouro_folha', name: 'Fragmentos de Folha de Ouro', preview: '✨ Folhas de Ouro' },
  { id: 'prata_folha', name: 'Fragmentos de Folha de Prata', preview: '❇️ Folhas de Prata' },
  { id: 'flores', name: 'Mini Flores Secas Naturais ', preview: '🌸 Flores Secas' },
  { id: 'glitter_holografico', name: 'Micro Glitter Holográfico', preview: '🔮 Aurora Borealis' },
  { id: 'estrelas', name: 'Estrelinhas & Corações Metálicos', preview: '💖 Estrelas & Corações' }
];

export const ACCESSORIES = [
  { id: 'terco', name: 'Com Terço', price: 5.00 },
  { id: 'tessel', name: 'Tessel', price: 0.00 },
  { id: 'pompom', name: 'Pompom', price: 3.00 },
  { id: 'pingente_coracao', name: 'Pingente de Coração', price: 2.00 }
];
