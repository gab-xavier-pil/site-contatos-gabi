import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './ig-banner.css';
import './photo-strip.css';

const container = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
