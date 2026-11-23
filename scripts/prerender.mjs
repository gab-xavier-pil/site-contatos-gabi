import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

// ponytail: uma única rota permite pré-renderizar sem adicionar framework ou plugin.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const html = await readFile('dist/index.html', 'utf8');
  const content = renderToString(React.createElement(App));
  if (!html.includes('<div id="root"></div>')) throw new Error('O ponto de montagem do React não foi encontrado.');
  await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${content}</div>`));
  console.log('HTML pré-renderizado: conteúdo disponível antes do JavaScript.');
} finally {
  await server.close();
}
