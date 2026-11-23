import React, { useEffect, useState } from 'react';
import './hero-slideshow.css';

const slides = [
  { image: 'gabi-hero', alt: 'Gabi Xavier recebe você em seu estúdio de Pilates em Itajubá' },
  { image: 'hero-gabi-reformer', alt: 'Gabi Xavier em exercício de Pilates no reformer do Studio GX' },
  { image: 'hero-gabi-straps', alt: 'Gabi Xavier ajoelhada no reformer, com alongamento de braços no estúdio' },
  { image: 'hero-studio-plantas', alt: 'Reformers de madeira e plantas no Studio GX' },
  { image: 'hero-studio-barrel', alt: 'Aparelhos barrel de Pilates no Studio GX' },
  { image: 'hero-studio-verde', alt: 'Espaço do Studio GX com parede verde e equipamentos de Pilates' },
  { image: 'hero-studio-arcos', alt: 'Reformers alinhados diante dos espelhos em arco do Studio GX' },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    const id = window.setInterval(() => {
      setCurrent(index => (index + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);
  return <div className="hero-image-frame" role="region" aria-roledescription="carrossel" aria-label="Gabi Xavier e o Studio GX">
    {slides.map((slide, index) => <img
      key={slide.image}
      className={`hero-image${index === current ? ' is-active' : ''}`}
      src={`/images/${slide.image}-960.webp`}
      srcSet={`/images/${slide.image}-640.webp 640w, /images/${slide.image}-960.webp 960w, /images/${slide.image}-1365.webp 1365w`}
      sizes="(max-width: 760px) 100vw, 52vw"
      alt={slide.alt}
      width="1365"
      height="1365"
      fetchPriority={index === 0 ? 'high' : 'low'}
      loading={index === 0 ? 'eager' : 'lazy'}
      decoding={index === 0 ? 'sync' : 'async'}
    />)}
  </div>;
}
