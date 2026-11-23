---
name: Gabi Xavier — Movimento com cuidado
description: Identidade editorial acolhedora para o Studio GX, com fotografias reais e convite direto à conversa.
colors:
  paper: "#faf6fa"
  sand: "#e8d1e7"
  cocoa: "#2e1c2e"
  taupe: "#685068"
  champagne: "#cfa3cf"
  gold-ink: "#764375"
  line: "#e3cee2"
  gold-on-cocoa: "#dcbadb"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(62px, 6.25vw, 96px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(50px, 4.6vw, 70px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.9
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  scale:
    px6: "6px"
    px7: "7px"
    px8: "8px"
    px9: "9px"
    px10: "10px"
    px11: "11px"
    px12: "12px"
    px14: "14px"
    px15: "15px"
    px16: "16px"
    px17: "17px"
    px18: "18px"
    px21: "21px"
    px23: "23px"
    px24: "24px"
    px25: "25px"
    px27: "27px"
    px30: "30px"
    px35: "35px"
    px43: "43px"
    px46: "46px"
    px47: "47px"
    px50: "50px"
    px52: "52px"
    px54: "54px"
    px56: "56px"
    px62: "62px"
    px66: "66px"
    px67: "67px"
    px70: "70px"
    px76: "76px"
    px78: "78px"
    px96: "96px"
rounded:
  square: "0px"
  circle: "50%"
  photo: "16px"
components:
  button-primary:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
  button-primary-hover:
    backgroundColor: "{colors.gold-ink}"
    textColor: "{colors.paper}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cocoa}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
  gallery-control:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.circle}"
    width: "40px"
    height: "40px"
---

# Design System: Gabi Xavier

## Overview

**Creative North Star: "Movimento com cuidado"**

O sistema aproxima cuidado presencial e elegância editorial. Papel quente, cacau, tipografia serifada e fotografias do próprio estúdio dão presença à Gabi sem transformar a página em catálogo de serviços. O espaço vazio, os recortes retos e os títulos grandes organizam a leitura.

A autoridade visual é a identidade fornecida pela cliente e pelo vídeo: Cormorant Garamond, Manrope, off-white e dourado. A referência solicitada foi a Azzo. Essa direção explícita prevaleceu sobre o sorteio do Impeccable, cujo seed não foi persistido. Não houve composição visual previamente aprovada; este documento registra a implementação final.

**Key Characteristics:**

- Contraste entre serifada expressiva e texto funcional discreto.
- Fotografias reais, amplas, com enquadramento preservando pessoa e ambiente.
- Superfícies planas, linhas finas e uma seção de cacau em largura total.
- Movimento breve e condicionado à preferência da pessoa.

Fontes de verdade: `src/styles.css`, `src/App.jsx`, `docs/design-direction.md` e capturas finais em `docs/screenshots/`. A revisão final registrou `ship`, após resolver o achado de contraste do dourado de texto (4,56:1). Esse resultado não substitui nova verificação quando cores ou fundos mudarem.

## Colors

A paleta combina tons lavanda e malva solicitados pela cliente (`#e8d1e7`, `#dcbadb`, `#cfa3cf`) com ameixa profundo editorial para garantir contraste e legibilidade.

### Primary

- **Ameixa Profundo — `cocoa` (`#2e1c2e`):** texto principal, botão de agendamento e fundo da seção sobre a Gabi.
- **Malva de Leitura — `gold-ink` (`#764375`):** itálicos dos títulos sobre papel, observações de serviços, foco e hover do botão principal.

### Secondary

- **Orquídea Suave — `champagne` (`#cfa3cf`):** linhas de apoio, contornos dos controles e pequenos detalhes gráficos.
- **Lilás sobre Ameixa — `gold-on-cocoa` (`#dcbadb`):** ênfase itálica do título e detalhes na seção escura.

### Neutral

- **Papel Lavanda — `paper` (`#faf6fa`):** fundo principal off-white sutil, texto claro e botão da seção escura.
- **Lavanda Clara — `sand` (`#e8d1e7`):** fundos de imagem, legenda do retrato, realces suaves e textos secundários sobre ameixa.
- **Malva Acinzentado — `taupe` (`#685068`):** parágrafos e informação secundária sobre papel.
- **Linha — `line` (`#e3cee2`):** divisórias de navegação, abas, rodapé e barra móvel.

**The Dourado Legível Rule.** Use `gold-ink` para texto dourado sobre papel. `champagne` é o acento de contorno e detalhe; não substitui o token de leitura.

## Typography

**Display Font:** Cormorant Garamond, com fallback Georgia e serif.

**Body Font:** Manrope, com fallback Arial e sans-serif.

As duas famílias são servidas localmente em WOFF2, com `font-display: swap` e `font-synthesis: none`. Cormorant tem arquivos normal e itálico, declarados para pesos de 300 a 700; Manrope usa arquivo variável de 200 a 800.

Os tokens acima descrevem a hierarquia de desktop. O título inicial muda para `clamp(52px, 10.9vw, 78px)` no mobile, com entrelinha de 1,01; o título do estúdio usa `clamp(43px, 9.8vw, 66px)`, com entrelinha de 1,02. O título sobre a Gabi tem escala própria: `clamp(56px, 5vw, 76px)` no desktop e `clamp(54px, 12.3vw, 76px)` no mobile.

Títulos mantêm peso regular. O itálico real marca a segunda ideia dos títulos principais. Parágrafos usam Manrope com entrelinha ampla, entre 1,8 e 1,9. O texto introdutório tem corpo maior no desktop (16px); os demais parágrafos principais usam 14px. Títulos dos serviços usam Cormorant (34px no desktop e 35px no mobile).

**The Duas Vozes Rule.** Use a serifada para títulos, assinatura e convites; preserve a sans-serif nos textos de serviço, navegação e ações.

Os pequenos rótulos em caixa alta presentes na página são registros desta composição. Não constituem uma exigência para novas seções nem uma escala tipográfica recomendada para novo conteúdo. O mapa scale registra os tamanhos que a folha de estilo já publica. No hero, rótulo, nota e link ficam em 14px; o parágrafo fica em 18px no desktop e 17px no mobile.

## Layout

A página implementada tem três seções principais: abertura, estúdio com serviços, apresentação da Gabi. Cabeçalho, faixa de acolhimento e rodapé completam essa sequência sem acrescentar outra seção comercial.

- **Abertura:** grade de duas colunas (48%/52%), largura máxima de 1640px e altura vinculada à viewport, limitada entre 710px e 900px no desktop. Texto à esquerda; fotografia à direita.
- **Estúdio:** contêiner de até 1480px, margens laterais de 5% e respiro vertical de 118px. Galeria e serviços dividem a área útil na proporção de 1,45/1, com intervalo de 7%.
- **Gabi:** fundo cacau em largura total, duas colunas, retrato à esquerda e texto à direita. O retrato chega a 540px de largura.
- **Rodapé:** três colunas no desktop; marca, endereço e contato. A versão móvel empilha os blocos.

Os ajustes principais ocorrem em 1100px e 760px; há ajustes finais abaixo de 359px. Até 760px, as três seções passam a uma coluna, com margens laterais de 6% e respiro de seção de 65px. A foto inicial vem após o CTA; a galeria vem antes das abas; o retrato vem antes da apresentação. A navegação de âncoras do cabeçalho fica oculta, mantendo a marca e o convite para agendar.

O ritmo combina espaços amplos entre seções e distâncias menores entre título, parágrafo e ação. O código usa valores locais e percentuais; não existe uma escala global de espaçamento a ser presumida.

**The Foto Como Presença Rule.** Use as fotos reais da Gabi e do Studio GX como evidência do lugar e de quem atende. Preserve o enquadramento por `object-fit: cover` e ajuste de posição, em vez de inserir ilustrações ou fotos genéricas.

As imagens são WebP responsivas. A abertura usa variantes de 640, 960 e 1365px e prioridade alta; galeria e retrato usam 640/960px e carregamento tardio. A galeria contém três fotos reais do espaço. O retrato da apresentação é diferente da imagem inicial.

## Elevation & Depth

A profundidade vem da fotografia, da mudança de superfície e das legendas sobrepostas. A implementação não usa sombras de cartões. Divisórias finas separam regiões funcionais; a legenda da abertura recorta uma área de papel sobre a fotografia, e a legenda do retrato usa uma faixa de areia.

**The Profundidade Pela Imagem Rule.** Preserve as superfícies planas e o contraste entre fotografia e papel. Novos blocos não precisam ganhar sombra para criar hierarquia.

## Shapes

Fotografias, botões de agendamento, faixas e painéis têm cantos retos. Os controles de galeria são circulares (40px de diâmetro); os pequenos pontos de apoio também são redondos. O sistema não usa cartões arredondados como unidade recorrente de conteúdo. As fotos do hero usam raio 16px.

As setas são SVG com traço fino; a marca GX é imagem real com fundo transparente. Preserve essas fontes em vez de substituir por caracteres decorativos.

## Components

### Agendamento

O botão principal é um retângulo cacau com texto claro, seta à direita, altura mínima de 57px e espaço interno definido no frontmatter. No mobile, o CTA inicial reduz para 53px de altura mínima e espaço interno de 14px/20px. A variante clara atende à seção de cacau. Todos levam ao mesmo WhatsApp com mensagem preenchida; o clique não envia a mensagem automaticamente.

Hover existe para ponteiro fino com suporte a hover. O botão principal muda para dourado de leitura; a variante clara muda para areia. A seta avança 4px. As cores transitam em 220ms; a seta usa a curva compartilhada `cubic-bezier(.23, 1, .32, 1)`.

O CTA fixo móvel ocupa a largura útil inferior, respeita a área segura e aparece somente depois que o botão inicial saiu pelo topo da tela. Oculto, fica `inert`. A faixa usa papel, divisória superior e botão de altura mínima de 47px.

### Galeria do estúdio

Carrossel manual com rolagem horizontal nativa, `scroll-snap`, três fotografias, legenda dinâmica e contagem. As setas anterior/próxima são botões circulares; os controles ficam desabilitados nas extremidades, com opacidade reduzida. Não há avanço automático.

As imagens têm descrição, o grupo identifica sua posição e a legenda usa anúncio discreto (`aria-live="polite"`). O trilho recebe foco. Os controles navegam com rolagem suave, substituída por instantânea com movimento reduzido.

### Abas de serviços

Pilates, Fisioterapia e Recovery GX compartilham uma linha de abas. A aba ativa recebe texto cacau, peso maior e sublinhado; as demais usam taupe. O painel mantém altura mínima para reduzir deslocamentos durante a troca. A interação usa `tablist`, `tab`, `tabpanel`, seleção e foco gerenciados; aceita setas esquerda/direita, Home e End.

### Navegação, links e foco

O cabeçalho reúne marca, âncoras para estúdio/Gabi e agendamento sublinhado. O rodapé concentra endereço, mapa e contatos. Links de navegação e Instagram revelam um sublinhado no hover; o link textual de agendamento tem seta fina. Links externos abrem em nova aba com `noopener noreferrer`.

O foco de teclado usa contorno dourado de leitura (2px), afastado do elemento (6px). O link para pular ao conteúdo aparece ao receber foco. Preserve esse estado inclusive nas ações secundárias.

### Movimento

O título e o texto introdutório entram com deslocamento vertical curto (18px) em 950ms; o parágrafo tem atraso de 90ms. Blocos selecionados revelam-se uma vez por `IntersectionObserver` e WAAPI, com deslocamento de 24px e duração de 750ms. O conteúdo permanece disponível quando essa capacidade não existe.

A fotografia inicial tem deriva vertical de −3% a 3%, com escala de 1,08, vinculada à rolagem somente onde `animation-timeline: view()` é suportado. Sem suporte, a fotografia é estática.

**The Movimento Opcional Rule.** `prefers-reduced-motion: reduce` desativa animações, transições e rolagem suave. O observador de revelação reage à mudança dessa preferência e cancela suas animações.

## Do's Don'ts

### Do:

- **Do** preservar a identidade do vídeo e o papel das duas famílias locais.
- **Do** usar o dourado adequado ao fundo e conferir o contraste após alterações.
- **Do** manter fotografias reais, recortes retos e espaço para leitura.
- **Do** manter navegação por teclado, foco visível e movimento opcional.
- **Do** centralizar os convites comerciais na conversa pelo WhatsApp.

### Don't:

- **Don't** substituir as fotos reais ou a marca por material genérico sem uma nova direção aprovada.
- **Don't** transformar o champagne de contorno em padrão de texto sobre papel.
- **Don't** criar formulários, preços, horários, depoimentos, métricas de pacientes ou promessas de cura sem informação confirmada.
- **Don't** transformar os pequenos rótulos em caixa alta da composição atual em obrigação para novas superfícies.
- **Don't** presumir estados, componentes ou comportamentos ausentes: este sistema contém links, botões, galeria e abas; não há formulário, modal, backend ou biblioteca de cartões.
