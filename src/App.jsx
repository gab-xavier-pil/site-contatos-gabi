import React, { useEffect, useRef, useState } from 'react';
import WhatsAppFloat from './WhatsAppFloat.jsx';
import Topbar from './Topbar.jsx';
import HeroSlideshow from './HeroSlideshow.jsx';
import ReviewsSection from './ReviewsSection.jsx';
import Footer from './Footer.jsx';
import StudioPhotoStrip from './StudioPhotoStrip.jsx';
import OnlineCourseSection from './OnlineCourseSection.jsx';

const whatsapp = `https://wa.me/5535998036832?text=${encodeURIComponent('Olá, Gabi! Vim pelo site e gostaria de agendar uma aula de Pilates no estúdio.')}`;
const email = 'gab_xavier@hotmail.com';
const phone = '(35) 99803-6832';
const instagram = 'https://www.instagram.com/pilatesgabixavier/';
const maps = 'https://www.google.com/maps/search/?api=1&query=Eduardo+Piquet+78+S%C3%A3o+Vicente+Itajub%C3%A1+MG';
const onlineCourseUrl = 'https://www.pilatesgabixavier.com.br/landing';

function Arrow({ direction = 'right', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
      style={direction === 'left' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3v4m0 10v4M3 12h4m10 0h4m-2.93-6.07-2.83 2.83m-6.48 6.48-2.83 2.83m0-12.14 2.83 2.83m6.48 6.48 2.83 2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartPulseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 12h4l2-4 3 8 2-4h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3 5 6v6c0 4.5 3 8.3 7 9.5 4-1.2 7-5 7-9.5V6l-7-3Zm-2.5 9 1.8 1.8 3.7-3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompassIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m14.8 9.2-1.6 4.4-4.4 1.6 1.6-4.4 4.4-1.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScheduleLink({ className = '', children = 'Agenda o Cuidado do Seu Corpo', light = false, animated = false }) {
  if (animated) {
    return (
      <a
        className={`btn-hero-wa ${light ? 'btn-hero-wa--light' : ''} ${className}`}
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
      >
        <Arrow className="arr-2" />
        <span className="btn-wa-text">{children}</span>
        <span className="btn-wa-circle" aria-hidden="true" />
        <Arrow className="arr-1" />
      </a>
    );
  }
  return (
    <a
      className={`button ${light ? 'button-light' : ''} ${className}`}
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function Wordmark({ footer = false }) {
  return (
    <a
      className={`wordmark ${footer ? 'wordmark-footer' : ''}`}
      href="#inicio"
      aria-label="Gabi Xavier — início"
    >
      <img src="/images/gx-mark.webp" width="45" height="55" alt="" />
      <span>
        Gabi Xavier
        <small>STUDIO DE PILATES E FISIOTERAPIA</small>
      </span>
    </a>
  );
}

function usePageMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const animations = new Set();
    const cleanups = [];

    const disconnect = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      while (cleanups.length) {
        const fn = cleanups.pop();
        fn();
      }
    };

    const setup = () => {
      disconnect();
      if (preference.matches || !('IntersectionObserver' in window)) return;

      // 1. Directional & Staggered Scroll Reveals
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const dir = element.dataset.reveal || 'up';

            if (element.hasAttribute('data-stagger')) {
              const children = [...element.children];
              children.forEach((child, idx) => {
                const anim = child.animate(
                  [
                    { opacity: 0, transform: 'translateY(26px)' },
                    { opacity: 1, transform: 'translateY(0)' },
                  ],
                  {
                    duration: 780,
                    delay: idx * 90,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    fill: 'both',
                  },
                );
                animations.add(anim);
                anim.onfinish = () => animations.delete(anim);
              });
            } else {
              let fromTransform = 'translateY(28px)';
              if (dir === 'left') fromTransform = 'translateX(-34px)';
              if (dir === 'right') fromTransform = 'translateX(34px)';
              if (dir === 'scale') fromTransform = 'translateY(20px) scale(0.95)';

              const animation = element.animate(
                [
                  { opacity: 0, transform: fromTransform },
                  { opacity: 1, transform: 'translate(0, 0) scale(1)' },
                ],
                {
                  duration: 850,
                  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                },
              );
              animations.add(animation);
              animation.onfinish = () => animations.delete(animation);
            }
            observer.unobserve(element);
          });
        },
        { threshold: 0.14 },
      );

      document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => observer.observe(el));

      // 2. Magnetic Buttons on Fine Pointer Devices
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (finePointer) {
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
          const onMove = e => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
            const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
            btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
          };
          const onLeave = () => {
            btn.style.transform = '';
          };
          btn.addEventListener('mousemove', onMove);
          btn.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
            btn.style.transform = '';
          });
        });
      }
    };

    setup();
    preference.addEventListener('change', setup);
    return () => {
      disconnect();
      preference.removeEventListener('change', setup);
    };
  }, []);
}

const spaces = [
  {
    image: 'studio-luz',
    tag: 'AMBIENTE & LUZ',
    caption: 'Luz natural, espaço e um convite ao movimento.',
    alt: 'Aparelhos de Pilates em madeira e espelhos iluminados no Studio GX',
  },
  {
    image: 'studio-amplo',
    tag: 'ESTRUTURA COMPLETA',
    caption: 'Um espaço preparado para receber você.',
    alt: 'Visão ampla do Studio GX com equipamentos de Pilates e parede verde',
  },
  {
    image: 'studio-detalhes',
    tag: 'ACOLHIMENTO',
    caption: 'Cuidado que aparece em cada detalhe.',
    alt: 'Ambiente do estúdio com aparelhos organizados, espelhos e iluminação acolhedora',
  },
];

function StudioGallery() {
  const track = useRef(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setCurrent(Number(entry.target.dataset.slide));
        });
      },
      { root: track.current, threshold: 0.65 },
    );
    [...track.current.children].forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  function goTo(index) {
    const element = track.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollTo({
      left: element.children[index].offsetLeft - element.children[0].offsetLeft,
      behavior: reduced ? 'instant' : 'smooth',
    });
  }

  return (
    <div className="gallery" role="region" aria-roledescription="carrossel" aria-label="Conheça o Studio GX">
      <div className="gallery-track" ref={track} tabIndex="0" aria-label="Fotos do estúdio. Use as setas para navegar.">
        {spaces.map((space, index) => (
          <figure
            className="gallery-slide"
            key={space.image}
            data-slide={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${spaces.length}`}
          >
            <img
              src={`/images/${space.image}-960.webp`}
              srcSet={`/images/${space.image}-640.webp 640w, /images/${space.image}-960.webp 960w`}
              sizes="(max-width: 760px) 92vw, 58vw"
              alt={space.alt}
              loading="lazy"
              decoding="async"
              width="960"
              height="900"
            />
            <span className="gallery-slide-badge">{space.tag}</span>
          </figure>
        ))}
      </div>
      <div className="gallery-bottom">
        <p aria-live="polite" aria-atomic="true">{spaces[current].caption}</p>
        <div className="gallery-controls">
          <span className="gallery-count">
            0{current + 1}
            <span> / 0{spaces.length}</span>
          </span>
          <button
            className="circle-button"
            aria-label="Foto anterior"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <Arrow direction="left" />
          </button>
          <button
            className="circle-button"
            aria-label="Próxima foto"
            disabled={current === spaces.length - 1}
            onClick={() => goTo(current + 1)}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

const bentoCards = [
  {
    num: '01',
    title: 'Equipamentos e amplitude',
    desc: 'Aparelhos em madeira, espelhos em arco e espaço livre para cada exercício fluir com conforto.',
    image: 'hero-studio-arcos',
    alt: 'Reformers alinhados diante dos espelhos em arco do Studio GX',
    badge: 'Studio GX · Itajubá',
  },
  {
    num: '02',
    title: 'Ambiente vivo e climatizado',
    desc: 'Iluminação acolhedora, plantas naturais e temperatura agradável em todas as estações.',
    image: 'hero-studio-plantas',
    alt: 'Reformers de madeira e plantas no Studio GX',
    badge: 'Conforto em cada aula',
  },
];

const services = [
  {
    num: '01',
    name: 'Pilates',
    tag: 'Aulas presenciais no estúdio',
    title: 'Força e mobilidade no seu ritmo.',
    text: 'Aulas em aparelhos com orientação constante para alinhar a postura, fortalecer a musculatura e dar mais estabilidade aos seus movimentos.',
    highlights: ['Exercícios no seu ritmo', 'Acompanhamento de perto', 'Força, postura e mobilidade'],
    cta: 'Agendar aula de Pilates',
  },
  {
    num: '02',
    name: 'Fisioterapia',
    tag: 'Particular e convênios pelo WhatsApp',
    title: 'Reabilitação para voltar a se mover bem.',
    text: 'Tratamento voltado à origem da sua dor ou limitação, unindo reabilitação clínica e movimento para você retomar sua rotina com segurança.',
    highlights: ['Recuperação de movimentos', 'Alívio de dores e fortalecimento', 'Atendimento particular e convênios'],
    cta: 'Conversar sobre Fisioterapia',
  },
  {
    num: '03',
    name: 'Recovery GX',
    tag: 'Recuperação muscular e descanso',
    title: 'Alívio para o cansaço e pernas leves.',
    text: 'Sessões com bota de compressão pneumática e massagens que reduzem a fadiga muscular, estimulam a circulação e ajudam o corpo a descansar melhor.',
    highlights: ['Bota pneumática', 'Massagens terapêuticas e relaxantes', 'Recuperação pós-treino'],
    cta: 'Conhecer o Recovery GX',
  },
];

function InteractiveServices() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  function onKeyDown(event, index) {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % services.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + services.length - 1) % services.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = services.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="care-selector">
      <div className="care-sel-left" data-reveal="left">
        <p className="eyebrow">CUIDADOS NO STUDIO GX</p>
        <h3 className="care-sel-heading">
          O que o seu corpo
          <br />
          <em>pede hoje?</em>
        </h3>
        <p className="care-sel-intro">
          Selecione uma modalidade para conhecer como cuidamos de você de perto no estúdio.
        </p>

        <div className="care-sel-tabs" role="tablist" aria-label="Cuidados no estúdio">
          {services.map((service, index) => {
            const isSelected = active === index;
            return (
              <button
                key={service.name}
                type="button"
                role="tab"
                id={`service-tab-${index}`}
                aria-controls={`service-panel-${index}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`care-tab-btn${isSelected ? ' is-active' : ''}`}
                ref={element => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={event => onKeyDown(event, index)}
              >
                <span className="care-tab-bar" aria-hidden="true" />
                <span className="care-tab-num">{service.num}</span>
                <span className="care-tab-label">{service.name}</span>
                <ChevronRight className="care-tab-chevron" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="care-sel-right" data-reveal="right">
        {services.map((service, index) => {
          const isSelected = active === index;
          return (
            <div
              key={service.name}
              className={`care-panel${isSelected ? ' is-active' : ''}`}
              role="tabpanel"
              id={`service-panel-${index}`}
              aria-labelledby={`service-tab-${index}`}
              hidden={!isSelected}
              tabIndex="0"
            >
              <span className="care-deco-num" aria-hidden="true">
                {service.num}
              </span>
              <span className="care-blob" aria-hidden="true" />
              <div className="care-panel-content">
                <span className="care-tag">{service.tag}</span>
                <h4>{service.title}</h4>
                <p>{service.text}</p>
                <ul className="care-highlights">
                  {service.highlights.map(item => (
                    <li key={item}>
                      <span className="care-dot" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className="care-panel-cta"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{service.cta}</span>
                  <Arrow />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const differentials = [
  {
    num: '01',
    title: 'O seu ritmo em primeiro lugar',
    desc: 'Cada pessoa chega com uma história e uma necessidade diferente. Os exercícios acompanham a sua evolução sem pressa e com correção de perto.',
    icon: HeartPulseIcon,
  },
  {
    num: '02',
    title: 'Ambiente amplo e climatizado',
    desc: 'Um estúdio iluminado, arejado e climatizado para você fazer sua aula ou sessão de fisioterapia com conforto em qualquer época do ano.',
    icon: SparkIcon,
  },
  {
    num: '03',
    title: 'Acessibilidade e estacionamento fácil',
    desc: 'Acesso prático em Itajubá e tranquilidade para estacionar perto do estúdio no horário da sua aula.',
    icon: CompassIcon,
  },
  {
    num: '04',
    title: 'Pilates, Fisio e Recovery no mesmo lugar',
    desc: 'Você encontra aulas em aparelhos, reabilitação fisioterapêutica, bota pneumática e massagens integradas em um só estúdio.',
    icon: ShieldCheckIcon,
  },
];

const marqueeItems = [
  'PILATES EM APARELHOS',
  'FISIOTERAPIA',
  'RECOVERY GX',
  'BOTA PNEUMÁTICA',
  'MASSOTERAPIA',
  'POSTURA E MOBILIDADE',
  'STUDIO GX · ITAJUBÁ',
];

export default function App() {
  usePageMotion();
  const [showMobileSchedule, setShowMobileSchedule] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const primaryAction = document.querySelector('.hero-copy .btn-hero-wa, .hero-copy .button');
    if (!primaryAction) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileSchedule(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(primaryAction);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setIsScrolled(scrollTop > 36);
        setScrollProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = e => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileNavOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} id="inicio">
        <Topbar whatsapp={whatsapp} email={email} phone={phone} instagram={instagram} />

        <div className="header-pill-wrap">
          <div className="header-pill">
            <Wordmark />

            <nav className="pill-nav" aria-label="Navegação principal">
              <a href="#espaco">O estúdio</a>
              <a href="#cuidados">Cuidados</a>
              <a href="#diferenciais">Diferenciais</a>
              <a href="#gabi">Gabi</a>
              <a href="#pilates-online">Pilates Online</a>
              <a href="#avaliacoes">Avaliações</a>
              <a href="#contato">Localização</a>
            </nav>

            <a
              className="btn-header-cta"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              <span>Vamos agendar</span>
              <Arrow />
            </a>

            <button
              type="button"
              className={`hamburger${mobileNavOpen ? ' is-active' : ''}`}
              aria-label={mobileNavOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen(open => !open)}
            >
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>

        <div
          className={`mobile-nav${mobileNavOpen ? ' is-open' : ''}`}
          id="mobile-nav"
          aria-hidden={!mobileNavOpen}
        >
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Fechar menu"
            onClick={() => setMobileNavOpen(false)}
          >
            <CloseIcon />
          </button>

          <div>
            <p className="mobile-nav-eyebrow">STUDIO GX · NAVEGAÇÃO</p>
            <nav aria-label="Menu mobile">
              <ul className="mobile-nav-list">
                <li>
                  <a href="#espaco" onClick={() => setMobileNavOpen(false)}>
                    <span>01</span>O estúdio
                  </a>
                </li>
                <li>
                  <a href="#cuidados" onClick={() => setMobileNavOpen(false)}>
                    <span>02</span>Cuidados
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" onClick={() => setMobileNavOpen(false)}>
                    <span>03</span>Diferenciais
                  </a>
                </li>
                <li>
                  <a href="#gabi" onClick={() => setMobileNavOpen(false)}>
                    <span>04</span>Conheça a Gabi
                  </a>
                </li>
                <li>
                  <a href="#pilates-online" onClick={() => setMobileNavOpen(false)}>
                    <span>05</span>Pilates Online
                  </a>
                </li>
                <li>
                  <a href="#avaliacoes" onClick={() => setMobileNavOpen(false)}>
                    <span>06</span>Avaliações
                  </a>
                </li>
                <li>
                  <a href="#contato" onClick={() => setMobileNavOpen(false)}>
                    <span>07</span>Localização
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mobile-nav-footer">
            <a
              className="mobile-nav-cta"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>Agenda o Cuidado do Seu Corpo</span>
              <Arrow />
            </a>
            <div className="mobile-nav-meta">
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                @pilatesgabixavier ↗
              </a>
              <span>Itajubá, MG</span>
            </div>
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-deco" aria-hidden="true">
            <svg className="hero-circle hero-circle--outer" viewBox="0 0 640 640" fill="none">
              <defs>
                <linearGradient id="gx-grad-gold" x1="0" y1="0" x2="640" y2="640" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#cfa3cf" stopOpacity="0" />
                  <stop offset="45%" stopColor="#dcbadb" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#2e1c2e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="320" cy="320" r="318" stroke="url(#gx-grad-gold)" strokeWidth="1.5" />
            </svg>
            <svg className="hero-circle hero-circle--inner" viewBox="0 0 460 460" fill="none">
              <circle cx="230" cy="230" r="228" stroke="url(#gx-grad-gold)" strokeWidth="1.2" strokeDasharray="6 8" />
            </svg>
          </div>

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              AULAS PRESENCIAIS EM ITAJUBÁ
            </p>
            <h1 id="hero-title">
              <span className="line-wrap">
                <span className="line-inner">Pilates e</span>
              </span>
              <span className="line-wrap">
                <span className="line-inner">
                  <em>fisioterapia.</em>
                </span>
              </span>
            </h1>
            <p className="hero-description">
              No Studio GX, em Itajubá, Gabi Xavier conduz aulas de Pilates em aparelhos e
              sessões de fisioterapia para quem precisa aliviar dores, recuperar movimentos e
              ganhar força no dia a dia. O acompanhamento é feito de perto, respeitando o
              ritmo do seu corpo em cada exercício.
            </p>
            <ScheduleLink animated>Agenda o Cuidado do Seu Corpo</ScheduleLink>
          </div>

          <div className="hero-visual">
            <HeroSlideshow />
          </div>
        </section>

        <div className="hero-stats" aria-label="Destaques do Studio GX">
          <div className="hero-stats-inner" data-stagger>
            <div className="hero-stat">
              <div className="stat-icon">
                <HeartPulseIcon />
              </div>
              <div className="stat-info">
                <strong>O seu ritmo</strong>
                <span>Atenção próxima em cada aula</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon">
                <SparkIcon />
              </div>
              <div className="stat-info">
                <strong>Ambiente climatizado</strong>
                <span>Espaço amplo e acolhedor</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon">
                <CompassIcon />
              </div>
              <div className="stat-info">
                <strong>Fácil de estacionar</strong>
                <span>Acesso prático e com acessibilidade</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="stat-icon">
                <ShieldCheckIcon />
              </div>
              <div className="stat-info">
                <strong>Cuidado integrado</strong>
                <span>Pilates, Fisioterapia e Recovery GX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gx-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                <span className="marquee-dot">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <section className="studio section" id="espaco" aria-labelledby="studio-title">
          <div className="studio-heading" data-reveal="up">
            <p className="eyebrow">ENTRE. RESPIRE. SINTA-SE BEM.</p>
            <h2 id="studio-title">
              Um espaço pensado
              <br />
              <em>para o seu bem-estar.</em>
            </h2>
            <p>Um estúdio iluminado, com aparelhos completos e espaço livre para você treinar e se recuperar com calma.</p>
          </div>

          <div className="studio-showcase">
            <div className="studio-gallery-col" data-reveal="left">
              <StudioGallery />
            </div>

            <div className="studio-bento-col" data-stagger>
              {bentoCards.map(card => (
                <article className="bento-card" key={card.num}>
                  <img
                    className="bento-card-img"
                    src={`/images/${card.image}-960.webp`}
                    srcSet={`/images/${card.image}-640.webp 640w, /images/${card.image}-960.webp 960w`}
                    sizes="(max-width: 760px) 92vw, 38vw"
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    width="960"
                    height="640"
                  />
                  <div className="bento-card-overlay" aria-hidden="true" />
                  <span className="bento-badge">{card.badge}</span>
                  <div className="bento-card-content">
                    <span className="bento-num">{card.num}</span>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <StudioPhotoStrip />
          <div id="cuidados" className="care-section-wrap">
            <InteractiveServices />
          </div>

          <div id="diferenciais" className="dif-block">
            <div className="dif-header" data-reveal="up">
              <div>
                <p className="eyebrow">POR QUE O STUDIO GX</p>
                <h3 className="dif-title">
                  Uma nova relação
                  <br />
                  <em>com o seu corpo.</em>
                </h3>
              </div>
              <p className="dif-intro">
                Cuidado presencial pensado para quem busca constância, conforto e orientação de perto em Itajubá.
              </p>
            </div>

            <ul className="dif-list" data-stagger>
              {differentials.map(item => {
                const Icon = item.icon;
                return (
                  <li className="dif-item" key={item.num}>
                    <span className="dif-num" aria-hidden="true">
                      {item.num}
                    </span>
                    <div className="dif-item-head">
                      <span className="dif-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <h4>{item.title}</h4>
                    </div>
                    <p className="dif-item-desc">{item.desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="about section" id="gabi" aria-labelledby="about-title">
          <div className="about-portrait-wrap" data-reveal="scale">
            <span className="about-quote-mark" aria-hidden="true">
              “
            </span>
            <div className="about-portrait about-img-clip">
              <img
                src="/images/gabi-sobre-960.webp"
                srcSet="/images/gabi-sobre-640.webp 640w, /images/gabi-sobre-960.webp 960w"
                sizes="(max-width: 760px) 90vw, 40vw"
                alt="Gabi Xavier, fisioterapeuta e instrutora de Pilates, sentada em uma bola no estúdio"
                loading="lazy"
                decoding="async"
                width="960"
                height="1440"
              />
              <span className="portrait-caption">
                GABI XAVIER
                <span>Fisioterapeuta · Instrutora de Pilates</span>
              </span>
            </div>
          </div>

          <div className="about-copy" data-reveal="right">
            <p className="eyebrow">QUEM CUIDA DE VOCÊ</p>
            <h2 id="about-title">
              Prazer, Gabi.
              <br />
              <em>
                Seu movimento
                <br />
                me inspira.
              </em>
            </h2>
            <p>
              Fisioterapeuta e instrutora de Pilates em Itajubá, Gabi Xavier criou o Studio GX para oferecer um atendimento em que você não faz aula no automático.
            </p>
            <p>
              Cada sessão acompanha de perto como o seu corpo responde, seja para tratar uma dor, ganhar força ou manter uma rotina ativa com segurança.
            </p>

            <div className="about-stats-strip">
              <div className="about-stat-item">
                <strong>Pilates &amp; Fisio</strong>
                <span>Cuidado presencial integrado</span>
              </div>
              <span className="about-stat-divider" aria-hidden="true" />
              <div className="about-stat-item">
                <strong>Recovery GX</strong>
                <span>Bota pneumática e massagens</span>
              </div>
              <span className="about-stat-divider" aria-hidden="true" />
              <div className="about-stat-item">
                <strong>Itajubá, MG</strong>
                <span>Eduardo Piquet, 78</span>
              </div>
            </div>

            <div className="about-invitation">
              <span className="invitation-line" />
              <p>Vamos dar o primeiro passo?</p>
            </div>
            <ScheduleLink light animated />
            <a className="instagram-link" href={instagram} target="_blank" rel="noopener noreferrer">
              Acompanhe o dia a dia <span>@pilatesgabixavier ↗</span>
            </a>
          </div>
        </section>

        <OnlineCourseSection courseUrl={onlineCourseUrl} />

        <ReviewsSection />

        <section className="ig-section" aria-label="Siga o Studio GX no Instagram">
          <div className="ig-banner" data-reveal="up">
            <div className="ig-profile">
              <div className="ig-logo">
                <img
                  className="ig-avatar"
                  src="/images/ig-perfil.webp"
                  width="78"
                  height="78"
                  alt="Gabi Xavier, do Studio GX"
                />
                <span className="ig-mark">
                  <img src="/images/gx-mark.webp" width="22" height="26" alt="Marca Studio GX" />
                </span>
              </div>
              <div className="ig-text">
                <span className="ig-eyebrow">ACOMPANHE A ROTINA DO ESTÚDIO</span>
                <strong className="ig-handle">@pilatesgabixavier</strong>
                <p>Veja a rotina das aulas, os aparelhos do estúdio em Itajubá e dicas práticas de postura e movimento.</p>
              </div>
            </div>
            <a
              className="btn-ig-pill"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              <span>Seguir no Instagram</span>
              <Arrow />
            </a>
          </div>
        </section>
      </main>

      <Footer
        whatsapp={whatsapp}
        email={email}
        phone={phone}
        instagram={instagram}
        maps={maps}
        wordmark={<Wordmark footer />}
      />

      <WhatsAppFloat href={whatsapp} raised={showMobileSchedule} />
      <div className={`mobile-schedule ${showMobileSchedule ? 'is-visible' : ''}`} inert={!showMobileSchedule}>
        <ScheduleLink />
      </div>
    </>
  );
}
