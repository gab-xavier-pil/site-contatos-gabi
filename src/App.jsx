import React, { useEffect, useRef, useState } from 'react';
import WhatsAppFloat from './WhatsAppFloat.jsx';
import Topbar from './Topbar.jsx';
import HeroSlideshow from './HeroSlideshow.jsx';
import ReviewsSection from './ReviewsSection.jsx';
import Footer from './Footer.jsx';
import StudioPhotoStrip from './StudioPhotoStrip.jsx';
import OnlineCourseSection from './OnlineCourseSection.jsx';

const whatsappNumber = '5535998036832';
const createWhatsappLink = message =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const whatsapp = createWhatsappLink(
  'Olá, Gabi! Vim pelo site e gostaria de agendar o cuidado do meu corpo no Studio GX.',
);
const email = 'gab_xavier@hotmail.com';
const phone = '(35) 99803-6832';
const instagram = 'https://www.instagram.com/pilatesgabixavier/';
const maps =
  'https://www.google.com/maps/search/?api=1&query=Eduardo+Piquet+78+S%C3%A3o+Vicente+Itajub%C3%A1+MG';
const onlineCourseUrl = 'https://www.pilatesgabixavier.com.br/landing';

function Arrow({ direction = 'right', ...props }) {
  const rotation =
    direction === 'left'
      ? 'rotate(180deg)'
      : direction === 'down'
        ? 'rotate(90deg)'
        : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
      style={rotation ? { transform: rotation } : undefined}
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

function ScheduleLink({
  className = '',
  children = 'Agenda o Cuidado do Seu Corpo',
  light = false,
  animated = false,
  href = whatsapp,
}) {
  if (animated) {
    return (
      <a
        className={`btn-hero-wa ${light ? 'btn-hero-wa--light' : ''} ${className}`}
        href={href}
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
      href={href}
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
    image: 'hero-studio-fachada',
    tag: 'FACHADA · SÃO VICENTE',
    caption: 'Fácil de encontrar, com acessibilidade e estacionamento próximo na Rua Eduardo Piquet, 78.',
    alt: 'Fachada externa do Studio GX Pilates e Fisioterapia no bairro São Vicente em Itajubá',
    position: '50% 42%',
  },
  {
    image: 'studio-luz',
    tag: 'AMBIENTE & LUZ',
    caption: 'Luz natural, espaço e um convite ao movimento.',
    alt: 'Aparelhos de Pilates em madeira e espelhos iluminados no Studio GX',
  },
  {
    image: 'studio-amplo',
    tag: 'ESTRUTURA COMPLETA',
    caption: 'Um espaço que preparei para receber você.',
    alt: 'Visão ampla do Studio GX com equipamentos de Pilates e parede verde',
  },
  {
    image: 'studio-detalhes',
    tag: 'ACOLHIMENTO',
    caption: 'Cuidado que aparece em cada detalhe.',
    alt: 'Ambiente do studio com aparelhos organizados, espelhos e iluminação acolhedora',
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
      <div className="gallery-track" ref={track} tabIndex="0" aria-label="Fotos do studio. Use as setas para navegar.">
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
              style={space.position ? { objectPosition: space.position } : undefined}
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
    title: 'Estrutura completa',
    desc: 'Três kits de aparelhos em madeira, espelhos em arco e espaço amplo para cada exercício fluir com calma.',
    image: 'hero-studio-arcos',
    alt: 'Reformers alinhados diante dos espelhos em arco do Studio GX',
    badge: 'Studio GX · Itajubá',
  },
  {
    num: '02',
    title: 'Conforto e fácil acesso',
    desc: 'Ambiente climatizado, acolhedor, com acessibilidade e estacionamento fácil no bairro São Vicente.',
    image: 'hero-studio-plantas',
    alt: 'Reformers de madeira e plantas no Studio GX',
    badge: 'São Vicente · Itajubá',
  },
];

const servicesOverview = [
  {
    num: '01',
    id: 'servico-fisioterapia',
    name: 'Fisioterapia',
    mode: 'Presencial · Studio e domiciliar',
    isOnline: false,
    shortDesc: 'Reabilitação clínica, alívio de dores e retorno dos movimentos. Particular e convênios.',
  },
  {
    num: '02',
    id: 'servico-pilates',
    name: 'Pilates presencial no studio',
    mode: 'Presencial · Itajubá',
    isOnline: false,
    shortDesc: 'Aulas em aparelhos com orientação próxima minha e da minha equipe, no seu ritmo. Particular, Wellhub e TotalPass.',
  },
  {
    num: '03',
    id: 'pilates-online',
    name: 'Desafio GX',
    mode: '100% On-line · Aulas em casa',
    isOnline: true,
    shortDesc: 'Meu programa de Pilates on-line gravado por mim para você praticar em casa, sem aparelhos.',
  },
  {
    num: '04',
    id: 'servico-recovery',
    name: 'Recovery GX',
    mode: 'Presencial · Studio GX',
    isOnline: false,
    shortDesc: 'Sessões com bota de compressão pneumática para aliviar a fadiga, deixar as pernas mais leves e cuidar do lipedema.',
  },
  {
    num: '05',
    id: 'servico-massagens',
    name: 'Massagens',
    mode: 'Presencial · Studio GX',
    isOnline: false,
    shortDesc: 'Drenagem linfática, massagem modeladora, relaxante e terapêutica para aliviar tensões.',
  },
];

const studioServicesBeforeOnline = [
  {
    num: '01',
    id: 'servico-fisioterapia',
    name: 'Fisioterapia',
    modeBadge: 'PRESENCIAL NO STUDIO E DOMICILIAR',
    headingStart: 'Reabilitação para',
    headingEmphasis: 'voltar a se mover sem dor.',
    lead: 'Atendimento voltado à origem da sua dor ou limitação, unindo fisioterapia clínica e movimento para recuperar força, vitalidade e segurança na rotina.',
    details:
      'Além das sessões aqui no meu Studio GX em Itajubá, eu e minha equipe também oferecemos atendimento domiciliar para quem precisa de cuidado no conforto de casa.',
    highlights: [
      'Recuperação de movimentos e alívio de dores',
      'Atendimento presencial no studio ou domiciliar',
      'Particular e convênios: Unimed, SulAmérica, CASSI, Caixa, FuSEx e SPA',
    ],
    ctaLabel: 'Conversar sobre Fisioterapia',
    ctaHref: createWhatsappLink(
      'Olá, Gabi! Vim pelo site, tenho interesse em Fisioterapia e gostaria de mais informações.',
    ),
    imageSrc: '/images/faixa/ft-17.webp',
    imageAlt: 'Gabi Xavier conduzindo sessão de fisioterapia na sala clínica do Studio GX',
    imageWidth: 858,
    imageHeight: 720,
    imageCaption: 'Atendimento particular, convênios e domiciliar',
    reverse: false,
  },
  {
    num: '02',
    id: 'servico-pilates',
    name: 'Pilates presencial no studio',
    modeBadge: 'PRESENCIAL EM ITAJUBÁ · STUDIO GX',
    headingStart: 'Força, postura e mobilidade',
    headingEmphasis: 'no seu ritmo.',
    lead: 'Aulas presenciais em aparelhos com orientação próxima minha e da minha equipe, ajustando cada exercício para fortalecer a musculatura, alinhar a postura e ganhar condicionamento físico.',
    details:
      'Nada de aula no automático: o meu acompanhamento respeita o momento do seu corpo — presencialmente aqui no studio em Itajubá ou no atendimento domiciliar.',
    highlights: [
      'Três kits completos de aparelhos com acompanhamento de perto',
      'Fortalecimento, resistência física, postura e mobilidade',
      'Particular e parcerias Wellhub (Gympass) e TotalPass',
    ],
    ctaLabel: 'Agendar Pilates presencial',
    ctaHref: createWhatsappLink(
      'Olá, Gabi! Vim pelo site, tenho interesse no Pilates presencial no studio e gostaria de agendar uma aula.',
    ),
    mediaSlides: [
      {
        src: '/images/hero-gabi-reformer-960.webp',
        srcSet: '/images/hero-gabi-reformer-640.webp 640w, /images/hero-gabi-reformer-960.webp 960w',
        alt: 'Gabi Xavier demonstrando exercício de Pilates no aparelho reformer no Studio GX',
        width: 960,
        height: 960,
        position: '50% 24%',
      },
      {
        src: '/images/pilates-presencial-01-960.webp',
        srcSet: '/images/pilates-presencial-01-640.webp 640w, /images/pilates-presencial-01-960.webp 960w',
        alt: 'Aluna realizando exercício invertido no Cadillac durante aula presencial de Pilates no Studio GX',
        width: 960,
        height: 1581,
        position: '50% 46%',
        fit: 'contain',
      },
      {
        src: '/images/pilates-presencial-02-640.webp',
        alt: 'Aluna em exercício de suspensão e força no Cadillac durante aula de Pilates no Studio GX',
        width: 547,
        height: 961,
        position: '50% 48%',
        fit: 'contain',
      },
      {
        src: '/images/pilates-presencial-03-640.webp',
        alt: 'Aluno praticando prancha com fortalecimento de braço e core no Studio GX',
        width: 547,
        height: 961,
        position: '50% 44%',
      },
      {
        src: '/images/pilates-presencial-04-640.webp',
        alt: 'Aluna sorrindo durante exercício com bola no aparelho barrel do Studio GX',
        width: 547,
        height: 961,
        position: '50% 34%',
      },
    ],
    imageCaption: 'Aulas em aparelhos no Studio GX em Itajubá',
    reverse: true,
  },
];

const studioServicesAfterOnline = [
  {
    num: '04',
    id: 'servico-recovery',
    name: 'Recovery GX',
    modeBadge: 'PRESENCIAL NO STUDIO · BOTA PNEUMÁTICA',
    headingStart: 'Recuperação muscular',
    headingEmphasis: 'e pernas mais leves.',
    lead: 'Sessões com bota de compressão pneumática pensadas para quem treina, passa muito tempo em pé, sente o corpo cansado ou busca alívio e cuidado para o lipedema.',
    details:
      'A compressão sequencial estimula a circulação, reduz o inchaço e a fadiga muscular — sendo muito indicada também para quem tem lipedema, ajudando a aliviar o desconforto e deixar as pernas muito mais leves.',
    highlights: [
      'Sessões com bota de compressão pneumática',
      'Muito indicado para quem tem lipedema, auxiliando no alívio do inchaço e do peso nas pernas',
      'Estímulo à circulação, alívio da fadiga muscular e recuperação pós-treino',
    ],
    ctaLabel: 'Agendar Recovery GX',
    ctaHref: createWhatsappLink(
      'Olá, Gabi! Vim pelo site, tenho interesse no Recovery GX com bota pneumática e gostaria de agendar uma sessão.',
    ),
    imageSrc: '/images/recovery-bota-960.webp',
    imageSrcSet: '/images/recovery-bota-640.webp 640w, /images/recovery-bota-960.webp 960w',
    imageAlt: 'Sala de Recovery GX no Studio GX com sessão de terapia em bota de compressão pneumática',
    imageWidth: 960,
    imageHeight: 1200,
    imagePosition: '50% 72%',
    imageCaption: 'Bota de compressão pneumática no Studio GX · Recuperação e cuidado para lipedema',
    reverse: false,
  },
  {
    num: '05',
    id: 'servico-massagens',
    name: 'Massagens',
    modeBadge: 'PRESENCIAL NO STUDIO · MASSOTERAPIA',
    headingStart: 'Toque que solta',
    headingEmphasis: 'a tensão do corpo.',
    lead: 'Drenagem linfática, massagem modeladora, relaxante e terapêutica realizadas no studio para aliviar pontos de tensão, ativar a circulação e devolver leveza.',
    details:
      'Cada sessão é conduzida por mim e pela minha equipe em um ambiente reservado e tranquilo, cuidando tanto do relaxamento quanto do bem-estar físico do dia a dia.',
    highlights: [
      'Drenagem linfática e massagem modeladora',
      'Massagem relaxante e terapêutica para alívio de tensões',
      'Ambiente reservado, acolhedor e tranquilo no studio',
    ],
    ctaLabel: 'Agendar massagem',
    ctaHref: createWhatsappLink(
      'Olá, Gabi! Vim pelo site, tenho interesse em Massagens no Studio GX e gostaria de agendar uma sessão.',
    ),
    imageSrc: '/images/faixa/ft-18.webp',
    imageAlt: 'Gabi Xavier realizando massagem terapêutica e relaxante no Studio GX',
    imageWidth: 576,
    imageHeight: 720,
    imageCaption: 'Drenagem, modeladora, relaxante e terapêutica',
    reverse: true,
  },
];

function ServiceMediaSlideshow({ slides, num, label }) {
  const [current, setCurrent] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setCurrent(index => (index + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [slides.length, tick]);

  return (
    <div
      className={`service-story-frame is-slideshow${slides[current]?.fit === 'contain' ? ' is-portrait' : ''}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Fotos de ${label}`}
    >
      {slides.map((slide, index) => {
        const active = index === current;
        const contain = slide.fit === 'contain';
        return (
          <React.Fragment key={slide.src}>
            {contain ? (
              <img
                className={`service-slide-fill${active ? ' is-active' : ''}`}
                src={slide.src}
                srcSet={slide.srcSet}
                alt=""
                aria-hidden="true"
                width={slide.width}
                height={slide.height}
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <img
              className={`service-slide-img${active ? ' is-active' : ''}${contain ? ' is-contain' : ''}`}
              src={slide.src}
              srcSet={slide.srcSet}
              sizes="(max-width: 760px) 92vw, 46vw"
              style={!contain && slide.position ? { objectPosition: slide.position } : undefined}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading="lazy"
              decoding="async"
            />
          </React.Fragment>
        );
      })}
      <span className="service-media-num" aria-hidden="true">
        {num}
      </span>
      <div className="service-slide-dots" role="tablist" aria-label={`Selecionar foto de ${label}`}>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Ver foto ${index + 1} de ${slides.length}`}
            className={`service-slide-dot${index === current ? ' is-active' : ''}`}
            onClick={() => {
              setCurrent(index);
              setTick(t => t + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceStoryBlock({ service }) {
  return (
    <article
      className={`service-chapter${service.reverse ? ' is-reversed' : ''}`}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="service-chapter-marker" data-reveal="up">
        <div className="chapter-rule-row">
          <span className="chapter-rule" aria-hidden="true" />
          <span className="chapter-kicker">
            <strong>{service.num} / 05</strong>
            <span className="chapter-sep" aria-hidden="true">·</span>
            <span>{service.modeBadge}</span>
          </span>
          <span className="chapter-rule" aria-hidden="true" />
        </div>
        <h3 className="chapter-banner-title" id={`${service.id}-title`}>
          <span className="chapter-banner-num" aria-hidden="true">{service.num}</span>
          <span>{service.name}</span>
        </h3>
      </div>

      <div className="service-story-grid">
        <figure
          className="service-story-media"
          data-reveal={service.reverse ? 'right' : 'left'}
        >
          {service.mediaSlides ? (
            <ServiceMediaSlideshow
              slides={service.mediaSlides}
              num={service.num}
              label={service.name}
            />
          ) : (
            <div className="service-story-frame">
              <img
                src={service.imageSrc}
                srcSet={service.imageSrcSet}
                sizes="(max-width: 760px) 92vw, 46vw"
                style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                alt={service.imageAlt}
                width={service.imageWidth}
                height={service.imageHeight}
                loading="lazy"
                decoding="async"
              />
              <span className="service-media-num" aria-hidden="true">
                {service.num}
              </span>
            </div>
          )}
          <figcaption className="service-media-caption">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>{service.imageCaption}</span>
          </figcaption>
        </figure>

        <div
          className="service-story-body"
          data-reveal={service.reverse ? 'left' : 'right'}
        >
          <p className="service-story-headline">
            {service.headingStart}{' '}
            <em>{service.headingEmphasis}</em>
          </p>
          <p className="service-story-lead">{service.lead}</p>
          <p className="service-story-details">{service.details}</p>

          <ul className="service-story-list">
            {service.highlights.map(item => (
              <li key={item}>
                <span className="service-list-dot" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="service-story-actions">
            <ScheduleLink href={service.ctaHref}>{service.ctaLabel}</ScheduleLink>
          </div>
        </div>
      </div>
    </article>
  );
}

const marqueeItems = [
  '01 · FISIOTERAPIA',
  '02 · PILATES PRESENCIAL',
  '03 · DESAFIO GX ON-LINE',
  '04 · RECOVERY GX',
  '05 · MASSAGENS',
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
              <a href="#espaco">O espaço</a>
              <a href="#servicos">Serviços</a>
              <a href="#pilates-online">Desafio GX</a>
              <a href="#gabi">Sobre mim</a>
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
                    <span>01</span>O espaço
                  </a>
                </li>
                <li>
                  <a href="#servicos" onClick={() => setMobileNavOpen(false)}>
                    <span>02</span>Serviços prestados
                  </a>
                </li>
                <li>
                  <a href="#pilates-online" onClick={() => setMobileNavOpen(false)}>
                    <span>03</span>Desafio GX (On-line)
                  </a>
                </li>
                <li>
                  <a href="#gabi" onClick={() => setMobileNavOpen(false)}>
                    <span>04</span>Sobre mim
                  </a>
                </li>
                <li>
                  <a href="#avaliacoes" onClick={() => setMobileNavOpen(false)}>
                    <span>05</span>Avaliações
                  </a>
                </li>
                <li>
                  <a href="#contato" onClick={() => setMobileNavOpen(false)}>
                    <span>06</span>Localização
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
              STUDIO GX · ITAJUBÁ E ON-LINE
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
              No meu Studio GX, em Itajubá, eu e minha equipe cuidamos do seu corpo com
              fisioterapia, Pilates presencial, Recovery GX e massagens — além do meu Desafio GX
              on-line para quem prefere treinar em casa.
            </p>
            <div className="hero-actions">
              <ScheduleLink animated>Agenda o Cuidado do Seu Corpo</ScheduleLink>
              <a className="hero-secondary-link" href="#servicos">
                <span>Ver os 5 serviços</span>
                <Arrow direction="down" />
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <HeroSlideshow />
          </div>
        </section>

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

        {/* ── 1. O ESPAÇO (sem repetição) ── */}
        <section className="studio section" id="espaco" aria-labelledby="studio-title">
          <div className="studio-heading" data-reveal="up">
            <p className="eyebrow">O ESPAÇO · STUDIO GX EM ITAJUBÁ</p>
            <h2 id="studio-title">
              Um espaço pensado
              <br />
              <em>para o seu bem-estar.</em>
            </h2>
            <p>
              Um studio amplo, iluminado e acolhedor no bairro São Vicente, que preparei para você
              cuidar do corpo com calma e orientação de perto.
            </p>
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
        </section>

        {/* ── 2. SERVIÇOS PRESTADOS — ÍNDICE NUMERADO (01 A 05) ── */}
        <section className="services-overview-section section" id="servicos" aria-labelledby="services-title">
          <div className="services-overview-header" data-reveal="up">
            <div className="chapter-rule-row chapter-rule-row--section">
              <span className="chapter-rule" aria-hidden="true" />
              <p className="eyebrow">SERVIÇOS PRESTADOS · 01 A 05</p>
              <span className="chapter-rule" aria-hidden="true" />
            </div>
            <h2 id="services-title">
              Serviços oferecidos
              <br />
              <em>para cuidar do seu corpo.</em>
            </h2>
            <p className="services-overview-intro">
              Veja abaixo tudo o que eu e minha equipe oferecemos — presencialmente no Studio GX
              em Itajubá ou no formato on-line. Continue rolando a página para conhecer cada um em
              detalhes, ou clique no serviço desejado.
            </p>
          </div>

          <ol className="services-index-list" data-stagger aria-label="Lista numerada de serviços prestados">
            {servicesOverview.map(item => (
              <li key={item.num} className="services-index-row">
                <a
                  className={`services-index-link${item.isOnline ? ' is-online' : ''}`}
                  href={`#${item.id}`}
                >
                  <span className="services-index-num" aria-hidden="true">
                    {item.num}
                  </span>
                  <div className="services-index-main">
                    <div className="services-index-top">
                      <strong>{item.name}</strong>
                      <span className={`services-mode-pill${item.isOnline ? ' is-online' : ''}`}>
                        {item.mode}
                      </span>
                    </div>
                    <p>{item.shortDesc}</p>
                  </div>
                  <span className="services-index-arrow" aria-hidden="true">
                    <Arrow direction="down" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 3. DETALHAMENTO SEQUENCIAL: 01 FISIOTERAPIA & 02 PILATES PRESENCIAL ── */}
        <section className="services-chapters-section section" aria-label="Detalhes dos serviços 01 e 02">
          {studioServicesBeforeOnline.map(service => (
            <ServiceStoryBlock key={service.num} service={service} />
          ))}
        </section>

        {/* ── 4. SERVIÇO 03: DESAFIO GX (PILATES ON-LINE) ── */}
        <OnlineCourseSection courseUrl={onlineCourseUrl} />

        {/* ── 5. DETALHAMENTO SEQUENCIAL: 04 RECOVERY GX & 05 MASSAGENS ── */}
        <section className="services-chapters-section section" aria-label="Detalhes dos serviços 04 e 05">
          {studioServicesAfterOnline.map(service => (
            <ServiceStoryBlock key={service.num} service={service} />
          ))}
        </section>

        {/* ── 6. QUEM CUIDA DE VOCÊ (GABI XAVIER) ── */}
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
                alt="Gabi Xavier, fisioterapeuta e instrutora de Pilates, sentada em uma bola no studio"
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
              Sou fisioterapeuta e instrutora de Pilates em Itajubá, e criei o Studio GX para
              oferecer um atendimento em que você não faz aula no automático — hoje conto com uma
              equipe completa e três kits de aparelhos para cuidar de você.
            </p>
            <p>
              Em cada sessão, eu e minha equipe acompanhamos de perto como o seu corpo responde,
              seja para tratar uma dor, ganhar força, se recuperar melhor ou manter uma rotina
              ativa com segurança.
            </p>

            <div className="about-stats-strip">
              <div className="about-stat-item">
                <strong>Studio GX</strong>
                <span>Fisio, Pilates, Recovery e Massagens</span>
              </div>
              <span className="about-stat-divider" aria-hidden="true" />
              <div className="about-stat-item">
                <strong>Desafio GX</strong>
                <span>Aulas de Pilates 100% on-line</span>
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
                <span className="ig-eyebrow">ACOMPANHE O MEU DIA A DIA</span>
                <strong className="ig-handle">@pilatesgabixavier</strong>
                <p>Acompanhe a rotina das minhas aulas, os aparelhos do studio em Itajubá e dicas práticas de postura e movimento.</p>
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
