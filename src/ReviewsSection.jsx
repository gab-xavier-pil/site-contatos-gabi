import React, { useCallback, useEffect, useRef, useState } from 'react';
import initialReviewsData from './data/google-reviews.json';
import './reviews-section.css';

const AUTOPLAY_MS = 5000;
const CLONE_COUNT = 3;
const LONG_TEXT_LIMIT = 215;

const reviewTopics = [
  { label: 'Alívio de dores', count: 6 },
  { label: 'Aulas no estúdio', count: 6 },
  { label: 'Equipe acolhedora', count: 5 },
  { label: 'Bem-estar', count: 2 },
  { label: 'Ambiente feliz', count: 2 },
];

function GoogleGIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.56-5.15 3.56-8.65Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.28a12 12 0 0 0 0 10.78l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4 3.09c.95-2.84 3.6-4.95 6.72-4.95Z"
      />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 0 0-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 0 0-1.175 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.958a1 1 0 0 0-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.958Z" />
    </svg>
  );
}

function ArrowIcon({ direction = 'right', ...props }) {
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

function VerifiedBadgeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m6.8 10.2 2.1 2.1 4.4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getInitials(name) {
  const parts = String(name || 'GX')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase();
}

function ReviewAvatar({ src, author }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <span className="review-avatar-wrap" aria-hidden="true">
      <span className="review-avatar-initials">{getInitials(author)}</span>
      {src && !failed && (
        <img
          className={`review-avatar-img${loaded ? ' is-loaded' : ''}`}
          src={src}
          alt=""
          width="44"
          height="44"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function ReviewsSection() {
  const [data, setData] = useState(initialReviewsData);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isInstant, setIsInstant] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resetTick, setResetTick] = useState(0);

  const touchStartRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef([]);

  const reviews = (data.reviews || []).filter(r => Number(r.rating) === 5 && r.text);
  const total = reviews.length;
  const cloneCount = Math.min(CLONE_COUNT, total);
  const slides = total > 1 ? [...reviews, ...reviews.slice(0, cloneCount)] : reviews;
  const displayIndex = total > 0 ? ((trackIndex % total) + total) % total : 0;
  const isPaused = isHovered || isTouching || expandedId !== null;

  // Sincronização automática com a API serverless (/api/google-reviews) quando disponível em produção
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/google-reviews', { signal: controller.signal })
      .then(res => {
        if (!res.ok) return null;
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) return null;
        return res.json();
      })
      .then(live => {
        if (!live || !Array.isArray(live.reviews) || live.reviews.length === 0) return;
        const fiveStars = live.reviews.filter(r => Number(r.rating) === 5 && r.text);
        if (fiveStars.length > 0) {
          setData(prev => ({
            ...prev,
            rating: typeof live.rating === 'number' ? live.rating : prev.rating,
            totalReviews: typeof live.totalReviews === 'number' ? live.totalReviews : prev.totalReviews,
            placeUrl: live.placeUrl || prev.placeUrl,
            reviews: fiveStars,
          }));
        }
      })
      .catch(() => {
        // Mantém a base real sincronizada do Google Maps
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    return () => {
      rafRef.current.forEach(id => window.cancelAnimationFrame(id));
      rafRef.current = [];
    };
  }, []);

  const clearScheduledFrames = useCallback(() => {
    rafRef.current.forEach(id => window.cancelAnimationFrame(id));
    rafRef.current = [];
  }, []);

  const snapSilentlyTo = useCallback(
    (targetIdx, thenMoveTo = null) => {
      clearScheduledFrames();
      setIsInstant(true);
      setTrackIndex(targetIdx);

      const f1 = window.requestAnimationFrame(() => {
        const f2 = window.requestAnimationFrame(() => {
          setIsInstant(false);
          if (thenMoveTo !== null) {
            setTrackIndex(thenMoveTo);
          }
        });
        rafRef.current.push(f2);
      });
      rafRef.current.push(f1);
    },
    [clearScheduledFrames],
  );

  // Avança exatamente 1 card por vez (01 -> 02 -> ... -> 12 -> 01)
  const goNext = useCallback(() => {
    if (total <= 1) return;
    setExpandedId(null);
    setResetTick(t => t + 1);

    if (reducedMotion) {
      setIsInstant(true);
      setTrackIndex(prev => (prev + 1) % total);
      return;
    }

    if (trackIndex >= total) {
      snapSilentlyTo(0, 1);
      return;
    }

    setIsInstant(false);
    setTrackIndex(prev => prev + 1);
  }, [total, trackIndex, reducedMotion, snapSilentlyTo]);

  // Volta exatamente 1 card por vez (01 -> 12 -> 11 -> ...)
  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setExpandedId(null);
    setResetTick(t => t + 1);

    if (reducedMotion) {
      setIsInstant(true);
      setTrackIndex(prev => (prev - 1 + total) % total);
      return;
    }

    if (trackIndex <= 0) {
      snapSilentlyTo(total, total - 1);
      return;
    }

    setIsInstant(false);
    setTrackIndex(prev => prev - 1);
  }, [total, trackIndex, reducedMotion, snapSilentlyTo]);

  // Vai direto para o card selecionado pela bolinha ou clique
  const goTo = useCallback(
    index => {
      if (total <= 1) return;
      const safe = ((index % total) + total) % total;
      setExpandedId(null);
      setResetTick(t => t + 1);
      setIsInstant(reducedMotion);
      setTrackIndex(safe);
    },
    [total, reducedMotion],
  );

  // Reset invisível quando a animação suave chega ao clone do slide 0 (trackIndex === total)
  const handleTrackTransitionEnd = useCallback(
    event => {
      if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
      if (trackIndex >= total) {
        snapSilentlyTo(0);
      }
    },
    [trackIndex, total, snapSilentlyTo],
  );

  // Fallback de segurança caso transitionend não dispare (ex.: aba em segundo plano)
  useEffect(() => {
    if (trackIndex < total || isInstant) return;
    const safety = window.setTimeout(() => {
      snapSilentlyTo(0);
    }, 680);
    return () => window.clearTimeout(safety);
  }, [trackIndex, total, isInstant, snapSilentlyTo]);

  // Autoplay exato de 5 segundos sincronizado com displayIndex
  useEffect(() => {
    if (isPaused || reducedMotion || total <= 1) return;
    const timer = window.setTimeout(() => {
      setTrackIndex(prev => {
        if (prev >= total) return 1;
        return prev + 1;
      });
      setIsInstant(false);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [displayIndex, resetTick, isPaused, reducedMotion, total]);

  const handleTouchStart = event => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsTouching(true);
  };

  const handleTouchEnd = event => {
    const touch = event.changedTouches[0];
    setIsTouching(false);
    if (!touch) return;
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  if (total === 0) return null;

  const formattedRating = Number(data.rating || 5).toFixed(1).replace('.', ',');
  const formattedIndex = String(displayIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');
  const placeUrl =
    data.placeUrl ||
    'https://www.google.com/maps/search/?api=1&query=Pilates+e+Fisioterapia+Gabi+Xavier+Itajub%C3%A1';

  return (
    <section
      className="reviews-section section"
      id="avaliacoes"
      aria-labelledby="reviews-title"
    >
      <div className="reviews-ambient" aria-hidden="true" />

      <div className="reviews-header" data-reveal="up">
        <div className="reviews-heading-copy">
          <p className="eyebrow reviews-eyebrow">
            <GoogleGIcon className="reviews-g-mini" />
            <span>AVALIAÇÕES 5 ESTRELAS NO GOOGLE</span>
          </p>
          <h2 id="reviews-title">
            Quem treina aqui
            <br />
            <em>sente a diferença.</em>
          </h2>
          <p className="reviews-subtitle">
            Depoimentos reais de quem cuida da postura, alivia dores e encontra acolhimento de perto no Studio GX em Itajubá.
          </p>
        </div>

        <a
          className="reviews-score-card"
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Nota ${formattedRating} de 5 baseada em ${data.totalReviews} avaliações no Google Maps`}
        >
          <div className="reviews-score-top">
            <span className="reviews-score-num">{formattedRating}</span>
            <div className="reviews-score-stars-wrap">
              <div className="reviews-stars reviews-stars--hero" aria-hidden="true">
                {[0, 1, 2, 3, 4].map(i => (
                  <StarIcon key={i} style={{ '--star-i': i }} />
                ))}
              </div>
              <span className="reviews-score-count">
                <strong>{data.totalReviews} avaliações</strong> no Google
              </span>
            </div>
          </div>
          <div className="reviews-score-foot">
            <span className="reviews-google-pill">
              <GoogleGIcon />
              <span>Google Avaliações</span>
            </span>
            <span className="reviews-score-link">
              Ver todas <ArrowIcon />
            </span>
          </div>
        </a>
      </div>

      <div className="reviews-topics" aria-label="Temas mais elogiados nas avaliações">
        {reviewTopics.map(topic => (
          <span className="review-topic-chip" key={topic.label}>
            <span className="review-topic-dot" aria-hidden="true" />
            {topic.label}
            <small>{topic.count}</small>
          </span>
        ))}
      </div>

      <div
        className="reviews-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos 5 estrelas do Google"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setIsTouching(false)}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            goNext();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goPrev();
          }
        }}
      >
        <div className="reviews-viewport">
          <div
            className={`reviews-track${isInstant ? ' is-instant' : ''}`}
            style={{ '--track-index': trackIndex }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {slides.map((review, idx) => {
              const realIndex = idx % total;
              const isClone = idx >= total;
              const isActive = realIndex === displayIndex;
              const isLong = review.text.length > LONG_TEXT_LIMIT;
              const isExpanded = !isClone && expandedId === review.id;

              return (
                <article
                  className={`review-card${isActive ? ' is-active' : ''}${isExpanded ? ' is-expanded' : ''}`}
                  key={isClone ? `clone-${review.id}-${idx}` : review.id || `${review.author}-${idx}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={isClone || undefined}
                  aria-label={isClone ? undefined : `Avaliação ${realIndex + 1} de ${total}, por ${review.author}`}
                  onClick={() => {
                    if (!isActive) goTo(realIndex);
                  }}
                >
                  <span className="review-quote-deco" aria-hidden="true">
                    “
                  </span>

                  <div className="review-card-top">
                    <div className="reviews-stars" aria-label="5 de 5 estrelas">
                      {[0, 1, 2, 3, 4].map(i => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <span className="review-google-tag" title="Avaliação verificada no Google">
                      <GoogleGIcon />
                      <span>5,0</span>
                    </span>
                  </div>

                  <div className="review-body">
                    <blockquote className={`review-text${isLong && !isExpanded ? ' is-clamped' : ''}`}>
                      “{review.text}”
                    </blockquote>
                    {isLong && !isClone && (
                      <button
                        type="button"
                        className="review-more-btn"
                        aria-expanded={isExpanded}
                        onClick={e => {
                          e.stopPropagation();
                          setExpandedId(prev => (prev === review.id ? null : review.id));
                        }}
                      >
                        {isExpanded ? 'Mostrar menos' : 'Ler depoimento completo'}
                      </button>
                    )}
                  </div>

                  <footer className="review-author-row">
                    <ReviewAvatar src={review.avatar} author={review.author} />
                    <div className="review-author-info">
                      <strong>{review.author}</strong>
                      <span className="review-meta-line">
                        <VerifiedBadgeIcon />
                        <span>{review.relativeTime || 'Google Maps'}</span>
                      </span>
                    </div>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>

        <div className="reviews-footer-bar">
          <div className="reviews-dots" role="tablist" aria-label="Selecionar avaliação">
            {reviews.map((review, idx) => {
              const isSelected = idx === displayIndex;
              return (
                <button
                  key={review.id || idx}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Ver avaliação ${idx + 1} de ${total}, de ${review.author}`}
                  className={`review-dot${isSelected ? ' is-active' : ''}${isPaused || reducedMotion ? ' is-paused' : ''}`}
                  onClick={() => goTo(idx)}
                >
                  {isSelected && (
                    <span
                      key={`${displayIndex}-${resetTick}`}
                      className="review-dot-fill"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="reviews-controls">
            <span className="reviews-counter" aria-live="polite">
              {formattedIndex}
              <span> / {formattedTotal}</span>
            </span>
            <button
              type="button"
              className="circle-button"
              aria-label="Avaliação anterior"
              onClick={goPrev}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="circle-button"
              aria-label="Próxima avaliação"
              onClick={goNext}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-cta-strip">
        <p>
          Veja todas as <strong>{data.totalReviews} avaliações 5 estrelas</strong> no perfil oficial do estúdio no Google.
        </p>
        <a
          className="reviews-google-cta"
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
        >
          <GoogleGIcon />
          <span>Ver avaliações no Google Maps</span>
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
