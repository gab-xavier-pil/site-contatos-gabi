import React, { useEffect, useRef, useState } from 'react';
import './online-course.css';

const PHOTO_INTERVAL_MS = 4000;

const homePilatesPhotos = [
  {
    id: 'casa-1',
    image: 'pilates-em-casa-1',
    position: '50% 64%',
    kbFrom: 'translate3d(-1.4%, 0, 0) scale(1.02)',
    kbTo: 'translate3d(1.4%, -0.8%, 0) scale(1.09)',
    label: 'Fortalecimento no tapete em casa',
    alt: 'Gabi Xavier praticando exercício de fortalecimento do corpo todo no tapete em casa',
  },
  {
    id: 'casa-2',
    image: 'pilates-em-casa-2',
    position: '50% 58%',
    kbFrom: 'translate3d(1.4%, 0, 0) scale(1.02)',
    kbTo: 'translate3d(-1.4%, -0.8%, 0) scale(1.09)',
    label: 'Pilates funcional e equilíbrio na sala',
    alt: 'Gabi Xavier executando exercício de Pilates funcional e equilíbrio na sala de casa',
  },
  {
    id: 'casa-3',
    image: 'pilates-em-casa-3',
    position: '50% 66%',
    kbFrom: 'translate3d(-1%, 0.6%, 0) scale(1.02)',
    kbTo: 'translate3d(1.2%, -1%, 0) scale(1.09)',
    label: 'Treino de pernas e core sem aparelhos',
    alt: 'Gabi Xavier demonstrando treino de braços, pernas e abdômen no Pilates em casa',
  },
];

const courseModules = [
  {
    num: '01',
    title: 'Fortalecimento do corpo todo',
    duration: 'Até 20 min',
    summary:
      'Aulas completas que trabalham pernas, abdômen, costas e braços juntos, construindo força e resistência no seu ritmo.',
    objectives: [
      'Trabalhar todos os grupos musculares em aulas completas',
      'Ganhar fôlego e resistência para a rotina',
      'Firmar o centro do corpo e melhorar o equilíbrio',
      'Aprender a respirar e controlar cada movimento',
    ],
    stageCaption: 'Força global, controle e equilíbrio em aulas que respeitam o ritmo do seu corpo.',
    photoIndex: 0,
  },
  {
    num: '02',
    title: 'Pilates funcional',
    duration: 'Postura e mobilidade',
    summary:
      'Movimentos do Pilates clássico combinados com exercícios funcionais para destravar o corpo, alinhar a postura e aliviar tensões do dia a dia.',
    objectives: [
      'Unir força, mobilidade e coordenação na mesma aula',
      'Corrigir a postura sem forçar pescoço nem lombar',
      'Ganhar flexibilidade e soltar articulações travadas',
      'Proteger o corpo contra lesões e dores recorrentes',
    ],
    stageCaption: 'Pilates clássico e movimentos funcionais para ganhar amplitude e se mover sem dor.',
    photoIndex: 1,
  },
  {
    num: '03',
    title: 'Braços e pernas',
    duration: 'Firmeza e definição',
    summary:
      'Treinos focados em membros superiores e inferiores para ganhar firmeza, definição e sustentação sem depender de aparelhos.',
    objectives: [
      'Fortalecer e definir braços, ombros e costas',
      'Trabalhar pernas, glúteos e panturrilhas com controle',
      'Dar mais firmeza e sustentação à musculatura',
      'Levar mais força para tarefas simples do dia a dia',
    ],
    stageCaption: 'Aulas direcionadas para tonificar braços e pernas com correção de postura.',
    photoIndex: 2,
  },
];

const courseHighlights = [
  {
    value: '3 módulos',
    label: 'Do básico ao avançado, sem pular etapas.',
  },
  {
    value: 'Até 20 min',
    label: 'Por dia.',
  },
  {
    value: '4 exercícios por mês',
    label: 'Pode assistir e realizar quantas vezes forem necessárias.',
  },
  {
    value: 'Suporte 24h',
    label: 'Ajuda disponível a qualquer hora.',
  },
];

const courseFaqs = [
  {
    question: 'Quem pode fazer o Desafio Pilates 8 GX?',
    answer:
      'Qualquer pessoa que queira ganhar força, flexibilidade e aliviar dores praticando Pilates em casa. As aulas têm progressão do iniciante ao avançado, então você começa no nível em que está hoje e avança conforme o corpo responde.',
  },
  {
    question: 'Preciso comprar aparelhos ou acessórios para começar?',
    answer:
      'Não. Todas as rotinas principais foram montadas para fazer em casa sem aparelhos. Se um dia você quiser usar algum acessório para variar os treinos, há aulas opcionais para essa fase.',
  },
  {
    question: 'Quanto tempo dura cada aula e como funciona o acesso?',
    answer:
      'Cada aula dura até 20 minutos. São 4 exercícios por mês, e você pode assistir e realizar quantas vezes forem necessárias. O suporte fica disponível 24 horas.',
  },
];

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
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

function ExternalArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 17 17 7m0 0H9m8 0v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 4.5v11M4.5 10h11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="4" y="3" width="2.8" height="10" rx="1" />
      <rect x="9.2" y="3" width="2.8" height="10" rx="1" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5 3.4c0-.66.72-1.06 1.28-.72l6.6 4.02c.54.33.54 1.11 0 1.44l-6.6 4.02C5.72 12.5 5 12.1 5 11.44V3.4Z" />
    </svg>
  );
}

export default function OnlineCourseSection({ courseUrl }) {
  const [activeModule, setActiveModule] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [photoTick, setPhotoTick] = useState(0);
  const [isPhotoPaused, setIsPhotoPaused] = useState(false);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const tabRefs = useRef([]);

  const isAutoPaused = isPhotoPaused || isStageHovered || reducedMotion;

  const goToPhoto = nextIdx => {
    setActivePhoto(current => {
      if (current === nextIdx) return current;
      setPrevPhoto(current);
      return nextIdx;
    });
    setPhotoTick(t => t + 1);
  };

  const selectModule = idx => {
    setActiveModule(idx);
    goToPhoto(courseModules[idx].photoIndex);
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (isAutoPaused) return;
    const timer = window.setTimeout(() => {
      setActivePhoto(current => {
        setPrevPhoto(current);
        return (current + 1) % homePilatesPhotos.length;
      });
      setPhotoTick(t => t + 1);
    }, PHOTO_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [activePhoto, photoTick, isAutoPaused]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');

    const resetTilt = () => {
      stage.style.setProperty('--rx', '2deg');
      stage.style.setProperty('--ry', '-4.5deg');
      stage.style.setProperty('--gx', '60%');
      stage.style.setProperty('--gy', '26%');
      stage.style.setProperty('--sx', '0px');
      stage.style.setProperty('--sy', '0px');
    };

    resetTilt();

    const handlePointerMove = event => {
      if (reducedMq.matches || !finePointerMq.matches) return;
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      const rotateY = (px - 0.5) * 15;
      const rotateX = (0.5 - py) * 12;
      const shadowX = -(px - 0.5) * 24;
      const shadowY = -(py - 0.5) * 14;

      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(() => {
        stage.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
        stage.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
        stage.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        stage.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        stage.style.setProperty('--sx', `${shadowX.toFixed(1)}px`);
        stage.style.setProperty('--sy', `${shadowY.toFixed(1)}px`);
      });
    };

    const handlePointerLeave = () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      stage.classList.remove('is-tilting');
      setIsStageHovered(false);
      resetTilt();
    };

    const handlePointerEnter = () => {
      setIsStageHovered(true);
      if (reducedMq.matches || !finePointerMq.matches) return;
      stage.classList.add('is-tilting');
    };

    stage.addEventListener('pointerenter', handlePointerEnter);
    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      stage.removeEventListener('pointerenter', handlePointerEnter);
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  function handleModuleKeyDown(event, index) {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (index + 1) % courseModules.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (index + courseModules.length - 1) % courseModules.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = courseModules.length - 1;
    }
    if (next === undefined) return;
    event.preventDefault();
    selectModule(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      className="course-section section"
      id="pilates-online"
      aria-labelledby="course-title"
      itemScope
      itemType="https://schema.org/Course"
    >
      <meta itemProp="name" content="Desafio Pilates 8 GX: Transformação em Casa" />
      <meta itemProp="courseCode" content="8GX-ONLINE" />
      <meta itemProp="inLanguage" content="pt-BR" />
      <meta itemProp="educationalLevel" content="Iniciante ao Avançado" />
      <link itemProp="url" href={courseUrl} />

      <div className="course-ambient" aria-hidden="true" />

      {/* ── Divisor centralizado de capítulo (Serviço 03 de 05 · On-line) ── */}
      <div className="service-chapter-marker service-chapter-marker--online" data-reveal="up">
        <div className="chapter-rule-row">
          <span className="chapter-rule" aria-hidden="true" />
          <span className="chapter-kicker chapter-kicker--online">
            <strong>03 / 05</strong>
            <span className="chapter-sep" aria-hidden="true">·</span>
            <span>MODALIDADE 100% ON-LINE</span>
          </span>
          <span className="chapter-rule" aria-hidden="true" />
        </div>
        <p className="chapter-banner-title">
          <span className="chapter-banner-num" aria-hidden="true">03</span>
          <span>Desafio GX — Pilates on-line</span>
        </p>
        <p className="chapter-online-note">
          Diferente das aulas presenciais aqui em Itajubá, no on-line você pratica em casa com
          videoaulas gravadas por mim, sem precisar de aparelhos.
        </p>
      </div>

      <div className="course-header" data-reveal="up">
        <div className="course-header-left">
          <p className="eyebrow course-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            DESAFIO PILATES 8 GX · AULAS ONLINE
          </p>
          <h2 id="course-title">
            O meu método,
            <br />
            <em>no seu ritmo e na sua casa.</em>
          </h2>
        </div>

        <p className="course-intro" itemProp="description">
          Quem não mora em Itajubá ou prefere treinar em casa pode treinar comigo pelo Desafio
          Pilates 8 GX. São aulas gravadas por mim em alta definição, pensadas tanto para quem está
          começando do zero quanto para quem já pratica, com orientações claras de postura e sem
          precisar de aparelhos.
        </p>
      </div>

      {/* Faixa editorial de fatos concretos do curso */}
      <dl className="course-facts-strip" data-stagger aria-label="Como funciona o curso online">
        {courseHighlights.map(item => (
          <div className="course-fact-item" key={item.value}>
            <dt>{item.value}</dt>
            <dd>{item.label}</dd>
          </div>
        ))}
      </dl>

      <div className="course-main-grid">
        {/* ── Pilha Fotográfica 3D Interativa ── */}
        <div className="course-stage-column" data-reveal="left">
          <div className="course-stage-scene" ref={stageRef}>
            <div className="course-stage-3d">
              {/* Aro arquitetônico dourado inclinado em 3D */}
              <div className="course-orbit" aria-hidden="true" />

              {/* Sombra volumétrica que acompanha a inclinação */}
              <div className="course-floor-shadow" aria-hidden="true" />

              {/* Pilha física de 3 cartões fotográficos em camadas Z */}
              <div
                className="course-card-stack"
                role="region"
                aria-roledescription="carrossel"
                aria-label="Fotos reais das aulas de Pilates em casa"
              >
                {courseModules.map((mod, idx) => {
                  const total = courseModules.length;
                  const relPos = (idx - activeModule + total) % total;
                  const depthClass =
                    relPos === 0 ? 'is-front' : relPos === 1 ? 'is-mid' : 'is-back';
                  const backPhoto =
                    homePilatesPhotos[(activePhoto + relPos) % homePilatesPhotos.length];

                  return (
                    <figure
                      key={mod.num}
                      className={`course-stack-card ${depthClass}`}
                      aria-hidden={relPos !== 0}
                      onClick={() => {
                        if (relPos !== 0) selectModule(idx);
                      }}
                    >
                      {relPos === 0 ? (
                        <div className="course-photo-stage">
                          {homePilatesPhotos.map((photo, pIdx) => {
                            const isCurrent = pIdx === activePhoto;
                            const isPrev = pIdx === prevPhoto && pIdx !== activePhoto;
                            return (
                              <img
                                key={photo.id}
                                className={`course-photo-layer${isCurrent ? ' is-current' : ''}${isPrev ? ' is-prev' : ''}${isAutoPaused ? ' is-paused' : ''}`}
                                src={`/images/${photo.image}-960.webp`}
                                srcSet={`/images/${photo.image}-640.webp 640w, /images/${photo.image}-960.webp 920w`}
                                sizes="(max-width: 760px) 92vw, 44vw"
                                style={{
                                  objectPosition: photo.position,
                                  '--kb-from': photo.kbFrom,
                                  '--kb-to': photo.kbTo,
                                }}
                                alt={photo.alt}
                                width="920"
                                height="586"
                                loading="lazy"
                                decoding="async"
                              />
                            );
                          })}
                          {!reducedMotion && (
                            <span
                              key={`sheen-${activePhoto}-${photoTick}`}
                              className="course-photo-sheen"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          className="course-stack-img"
                          src={`/images/${backPhoto.image}-960.webp`}
                          srcSet={`/images/${backPhoto.image}-640.webp 640w, /images/${backPhoto.image}-960.webp 920w`}
                          sizes="(max-width: 760px) 92vw, 44vw"
                          style={{ objectPosition: backPhoto.position }}
                          alt=""
                          width="920"
                          height="586"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="course-stack-overlay" aria-hidden="true" />
                      {relPos === 0 && <div className="course-stack-glare" aria-hidden="true" />}

                      <figcaption className="course-stack-content">
                        <div className="course-stack-top">
                          <span className="course-stack-index" aria-live={relPos === 0 ? 'polite' : undefined}>
                            Módulo {mod.num} de 0{total}
                          </span>
                          <span className="course-stack-tag">{mod.duration}</span>
                        </div>

                        <div className="course-stack-bottom">
                          {relPos === 0 && (
                            <div className="course-photo-hud">
                              <div
                                className="course-photo-bars"
                                role="tablist"
                                aria-label="Escolher foto do Pilates em casa"
                              >
                                {homePilatesPhotos.map((photo, pIdx) => {
                                  const isSelected = pIdx === activePhoto;
                                  return (
                                    <button
                                      key={photo.id}
                                      type="button"
                                      role="tab"
                                      aria-selected={isSelected}
                                      aria-label={`Ver foto ${pIdx + 1} de ${homePilatesPhotos.length}: ${photo.label}`}
                                      className={`course-photo-bar${isSelected ? ' is-active' : ''}${isAutoPaused ? ' is-paused' : ''}`}
                                      onClick={e => {
                                        e.stopPropagation();
                                        goToPhoto(pIdx);
                                      }}
                                    >
                                      <span className="course-photo-bar-track" aria-hidden="true">
                                        {isSelected && (
                                          <span
                                            key={`${activePhoto}-${photoTick}`}
                                            className="course-photo-bar-fill"
                                          />
                                        )}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              <button
                                type="button"
                                className="course-photo-pause"
                                aria-pressed={isPhotoPaused}
                                aria-label={
                                  isPhotoPaused
                                    ? 'Retomar troca automática das fotos'
                                    : 'Pausar troca automática das fotos'
                                }
                                onClick={e => {
                                  e.stopPropagation();
                                  setIsPhotoPaused(p => !p);
                                }}
                              >
                                {isPhotoPaused ? <PlayIcon /> : <PauseIcon />}
                              </button>
                            </div>
                          )}
                          <strong className="course-stack-title">{mod.title}</strong>
                          <p>{mod.stageCaption}</p>
                          <div className="course-durations-line" aria-hidden="true">
                            <span>Rotinas de</span>
                            <strong>até 20 min</strong>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              {/* Placa flutuante única em profundidade Z com marca e credenciais reais */}
              <div className="course-float-plaque" aria-hidden="true">
                <span className="course-plaque-mark">
                  <img src="/images/gx-mark.webp" width="26" height="32" alt="" />
                </span>
                <div className="course-plaque-stats">
                  <div>
                    <strong>12+</strong>
                    <span>anos de Pilates</span>
                  </div>
                  <span className="course-plaque-sep" />
                  <div>
                    <strong>15+</strong>
                    <span>aulas em HD</span>
                  </div>
                  <span className="course-plaque-sep" />
                  <div>
                    <strong>1MI+</strong>
                    <span>seguidores</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Módulos Interativos e CTA ── */}
        <div className="course-content-column" data-reveal="right">
          <div className="course-modules-head">
            <span className="course-modules-eyebrow">O QUE TEM NOS 3 MÓDULOS</span>
            <p className="course-modules-sub">
              Clique em um módulo para ver o que você trabalha em cada etapa.
            </p>
          </div>

          <div
            className="course-modules-list"
            role="tablist"
            aria-label="Módulos do Desafio Pilates 8 GX"
          >
            {courseModules.map((mod, idx) => {
              const isSelected = activeModule === idx;
              return (
                <article
                  key={mod.num}
                  className={`course-module-card${isSelected ? ' is-active' : ''}`}
                  itemProp="hasCourseInstance"
                  itemScope
                  itemType="https://schema.org/CourseInstance"
                >
                  <meta itemProp="courseMode" content="online" />
                  <button
                    type="button"
                    role="tab"
                    id={`course-mod-tab-${idx}`}
                    aria-selected={isSelected}
                    aria-controls={`course-mod-panel-${idx}`}
                    tabIndex={isSelected ? 0 : -1}
                    ref={el => {
                      tabRefs.current[idx] = el;
                    }}
                    className="course-module-trigger"
                    onClick={() => selectModule(idx)}
                    onKeyDown={e => handleModuleKeyDown(e, idx)}
                  >
                    <span className="course-mod-bar" aria-hidden="true" />
                    <span className="course-mod-num" aria-hidden="true">
                      {mod.num}
                    </span>
                    <span className="course-mod-titles">
                      <strong itemProp="name">{mod.title}</strong>
                      <span>{mod.summary}</span>
                    </span>
                    <span className="course-mod-chevron" aria-hidden="true">
                      <PlusIcon />
                    </span>
                  </button>

                  <div
                    id={`course-mod-panel-${idx}`}
                    role="tabpanel"
                    aria-labelledby={`course-mod-tab-${idx}`}
                    className="course-module-details"
                  >
                    <div className="course-module-details-inner">
                      <ul className="course-objectives-list">
                        {mod.objectives.map(obj => (
                          <li key={obj}>
                            <span className="course-obj-dot" aria-hidden="true" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="course-cta-wrap">
            <a
              className="btn-hero-wa course-primary-cta"
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              aria-label="Conhecer o meu curso online Desafio Pilates 8 GX na página oficial"
            >
              <ArrowIcon className="arr-2" />
              <span className="btn-wa-text">Conhecer o Desafio Pilates 8 GX</span>
              <span className="btn-wa-circle" aria-hidden="true" />
              <ArrowIcon className="arr-1" />
            </a>

            <div className="course-cta-meta">
              <span>Abre a página das aulas, com suporte 24h.</span>
              <a
                className="course-inline-link"
                href={courseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Ver página oficial</span>
                <ExternalArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Perguntas frequentes (AIO / GEO) ── */}
      <div className="course-faq-band" data-reveal="up">
        <div className="course-faq-heading">
          <p className="eyebrow">DÚVIDAS COMUNS</p>
          <h3>
            Antes de acessar
            <br />
            <em>a página das aulas.</em>
          </h3>
          <p>
            Se você está pensando em começar o Desafio Pilates 8 GX em casa, aqui estão as
            respostas para o que as minhas alunas mais perguntam.
          </p>
        </div>

        <div className="course-faq-list">
          {courseFaqs.map((faq, idx) => (
            <details className="course-faq-item" key={faq.question} open={idx === 0}>
              <summary className="course-faq-summary">
                <span>{faq.question}</span>
                <span className="course-faq-icon" aria-hidden="true">
                  <PlusIcon />
                </span>
              </summary>
              <p className="course-faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
