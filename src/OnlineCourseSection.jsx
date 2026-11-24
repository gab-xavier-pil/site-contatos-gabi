import React, { useEffect, useRef, useState } from 'react';
import './online-course.css';

const courseModules = [
  {
    num: '01',
    title: 'Fortalecimento do corpo todo',
    duration: 'Aulas de 10 a 15 min',
    summary:
      'Aulas completas que trabalham pernas, abdômen, costas e braços juntos, construindo força e resistência no seu ritmo.',
    objectives: [
      'Trabalhar todos os grupos musculares em aulas completas',
      'Ganhar fôlego e resistência para a rotina',
      'Firmar o centro do corpo e melhorar o equilíbrio',
      'Aprender a respirar e controlar cada movimento',
    ],
    stageCaption: 'Força global, controle e equilíbrio em aulas que respeitam o ritmo do seu corpo.',
    image: 'hero-gabi-straps',
    imageAlt: 'Gabi Xavier executando exercício de Pilates com foco em postura e alongamento',
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
    image: 'hero-gabi-reformer',
    imageAlt: 'Gabi Xavier em postura de controle e mobilidade no método Pilates',
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
    image: 'gabi-hero',
    imageAlt: 'Gabi Xavier, fisioterapeuta e instrutora do Desafio Pilates 8 GX online',
  },
];

const courseHighlights = [
  {
    value: '3 módulos',
    label: 'Do básico ao avançado, sem pular etapas.',
  },
  {
    value: '10 a 15 min',
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
      'Cada aula dura de 10 a 15 minutos por dia. São 4 exercícios por mês, e você pode assistir e realizar quantas vezes forem necessárias. O suporte fica disponível 24 horas.',
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

export default function OnlineCourseSection({ courseUrl }) {
  const [activeModule, setActiveModule] = useState(0);
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const tabRefs = useRef([]);

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
      resetTilt();
    };

    const handlePointerEnter = () => {
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
    setActiveModule(next);
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

      <div className="course-header" data-reveal="up">
        <div className="course-header-left">
          <p className="eyebrow course-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            DESAFIO PILATES 8 GX · AULAS ONLINE
          </p>
          <h2 id="course-title">
            O método da Gabi,
            <br />
            <em>no ritmo da sua casa.</em>
          </h2>
        </div>

        <p className="course-intro" itemProp="description">
          Quem não mora em Itajubá ou prefere treinar em casa pode praticar com a Gabi pelo
          Desafio Pilates 8 GX. São aulas gravadas em alta definição, pensadas para quem está
          começando do zero e para quem já pratica, com orientações claras de postura e sem
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
              <div className="course-card-stack">
                {courseModules.map((mod, idx) => {
                  const total = courseModules.length;
                  const relPos = (idx - activeModule + total) % total;
                  const depthClass =
                    relPos === 0 ? 'is-front' : relPos === 1 ? 'is-mid' : 'is-back';

                  return (
                    <figure
                      key={mod.num}
                      className={`course-stack-card ${depthClass}`}
                      aria-hidden={relPos !== 0}
                      onClick={() => {
                        if (relPos !== 0) setActiveModule(idx);
                      }}
                    >
                      <img
                        className="course-stack-img"
                        src={`/images/${mod.image}-960.webp`}
                        srcSet={`/images/${mod.image}-640.webp 640w, /images/${mod.image}-960.webp 960w`}
                        sizes="(max-width: 760px) 92vw, 44vw"
                        alt={mod.imageAlt}
                        width="960"
                        height="960"
                        loading="lazy"
                        decoding="async"
                      />
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
                          <strong className="course-stack-title">{mod.title}</strong>
                          <p>{mod.stageCaption}</p>
                          <div className="course-durations-line" aria-hidden="true">
                            <span>Rotinas de</span>
                            <strong>10 a 15 min</strong>
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
                    onClick={() => setActiveModule(idx)}
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
              aria-label="Conhecer o curso online Desafio Pilates 8 GX na página oficial da Gabi Xavier"
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
            respostas para o que as alunas mais perguntam.
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
