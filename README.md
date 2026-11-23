# Gabi Xavier · Studio GX

Landing page em React + Vite para agendamento de Pilates presencial em Itajubá.

## Executar

Requer Node 20.19+ ou 22.12+. Dependências já instaladas nesta entrega.

```sh
rtk npm run dev
rtk npm run build
rtk npm run preview
```

O build gera `dist/`, com HTML pré-renderizado para leitura sem JavaScript e indexação. A interatividade é hidratada no navegador. Não utiliza Next.js nem serviços de backend.

## Editar

- Conteúdo, WhatsApp, endereço e serviços: `src/App.jsx`.
- Paleta, tipografia, layout e movimento: `src/styles.css`.
- SEO e dados estruturados: `index.html`.
- Fotos responsivas: `public/images/`; fontes e licenças: `public/fonts/`.
- Direção, análise do vídeo e referências: `docs/`.

Apenas React, React DOM e Vite foram instalados. Animações usam CSS e Web Animations API; carrossel usa scroll-snap. Preços, horários incompletos, depoimentos e números não confirmados foram omitidos.

## Vercel

`vercel.json` define Vite, comando `npm run build` e pasta `dist`. O projeto e domínio existentes devem ser mantidos. A entrega é local: não houve push, conexão de conta ou publicação. Se o projeto remoto já tiver build/output sobrescritos no painel, conferir essas opções na próxima publicação.

Arquivos estáticos antigos `styles.css`, `script.js` e `assets/` foram preservados como histórico e não são carregados pelo novo site nem copiados ao build.
