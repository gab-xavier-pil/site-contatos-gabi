import { readFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_PLACE_QUERY = 'Pilates e Fisioterapia Gabi Xavier Itajubá';
const DEFAULT_DATA_ID = '0x94cb7d12ee268fe1:0x9af7fb0580f45451';

async function loadFallbackData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'google-reviews.json');
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function mergeReviews(liveReviews, fallbackReviews) {
  const seen = new Set();
  const merged = [];

  for (const item of [...liveReviews, ...fallbackReviews]) {
    if (!item || Number(item.rating) !== 5) continue;
    const text = normalizeText(item.text);
    if (text.length < 10) continue;
    const key = `${String(item.author || '').toLowerCase().trim()}::${text.slice(0, 48).toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push({
      id: item.id || key,
      author: item.author || 'Aluna Studio GX',
      meta: item.meta || 'Avaliação no Google',
      rating: 5,
      relativeTime: item.relativeTime || '',
      text,
      avatar: item.avatar || '',
    });
  }

  return merged;
}

async function fetchViaSerpApi(apiKey, dataId) {
  const collected = [];
  let nextPageToken = null;
  let rating = null;
  let totalReviews = null;

  // Pagina até 8 páginas (~80 avaliações) para cobrir todas as avaliações 5 estrelas
  for (let page = 0; page < 8; page++) {
    const params = new URLSearchParams({
      engine: 'google_maps_reviews',
      data_id: dataId || DEFAULT_DATA_ID,
      hl: 'pt-br',
      sort_by: 'ratingHigh',
      api_key: apiKey,
    });
    if (nextPageToken) params.set('next_page_token', nextPageToken);

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    if (!response.ok) throw new Error(`SerpApi HTTP ${response.status}`);
    const payload = await response.json();

    if (payload.place_info) {
      if (typeof payload.place_info.rating === 'number') rating = payload.place_info.rating;
      if (typeof payload.place_info.reviews === 'number') totalReviews = payload.place_info.reviews;
    }

    const batch = Array.isArray(payload.reviews) ? payload.reviews : [];
    for (const r of batch) {
      const stars = Number(r.rating);
      const snippet = normalizeText(r.extracted_snippet?.original || r.snippet || '');
      if (stars === 5 && snippet.length >= 10) {
        collected.push({
          id: r.review_id || r.link || `${r.user?.name}-${page}`,
          author: r.user?.name || 'Aluna Studio GX',
          meta: r.user?.reviews ? `${r.user.reviews} avaliações` : 'Avaliação no Google',
          rating: 5,
          relativeTime: r.date || '',
          text: snippet,
          avatar: r.user?.thumbnail || '',
        });
      }
    }

    // Como está ordenado por maior nota, se vier alguma avaliação < 5 estrelas já terminou as 5 estrelas
    if (batch.some(r => Number(r.rating) < 5)) break;

    nextPageToken = payload.serpapi_pagination?.next_page_token || null;
    if (!nextPageToken) break;
  }

  return { source: 'serpapi', rating, totalReviews, reviews: collected };
}

async function resolvePlaceId(apiKey) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({
      textQuery: DEFAULT_PLACE_QUERY,
      languageCode: 'pt-BR',
    }),
  });
  if (!res.ok) throw new Error(`Google Places Search HTTP ${res.status}`);
  const data = await res.json();
  return data.places?.[0]?.id || null;
}

async function fetchViaGooglePlaces(apiKey, placeId) {
  const resolvedId = placeId || (await resolvePlaceId(apiKey));
  if (!resolvedId) throw new Error('Google Place ID não encontrado.');

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(resolvedId)}?languageCode=pt-BR`;
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
    },
  });
  if (!res.ok) throw new Error(`Google Places Details HTTP ${res.status}`);
  const place = await res.json();

  const reviews = (Array.isArray(place.reviews) ? place.reviews : [])
    .filter(r => Number(r.rating) === 5 && normalizeText(r.text?.text || r.originalText?.text).length >= 10)
    .map(r => ({
      id: r.name || `${r.authorAttribution?.displayName}-${r.publishTime}`,
      author: r.authorAttribution?.displayName || 'Aluna Studio GX',
      meta: 'Avaliação verificada no Google',
      rating: 5,
      relativeTime: r.relativePublishTimeDescription || '',
      text: normalizeText(r.text?.text || r.originalText?.text),
      avatar: r.authorAttribution?.photoUri || '',
    }));

  return {
    source: 'google_places_api',
    placeUrl: place.googleMapsUri || null,
    rating: typeof place.rating === 'number' ? place.rating : null,
    totalReviews: typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
    reviews,
  };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=86400');

  let fallback;
  try {
    fallback = await loadFallbackData();
  } catch {
    fallback = {
      source: 'fallback',
      placeName: 'Pilates e Fisioterapia Gabi Xavier | Itajubá',
      placeUrl: 'https://www.google.com/maps/search/?api=1&query=Pilates+e+Fisioterapia+Gabi+Xavier+Itajub%C3%A1',
      rating: 5.0,
      totalReviews: 68,
      reviews: [],
    };
  }

  const serpApiKey = process.env.SERPAPI_KEY;
  const googlePlacesKey = process.env.GOOGLE_PLACES_API_KEY;
  const googlePlaceId = process.env.GOOGLE_PLACE_ID;
  const googleDataId = process.env.GOOGLE_MAPS_DATA_ID || DEFAULT_DATA_ID;

  try {
    let live = null;
    if (serpApiKey) {
      live = await fetchViaSerpApi(serpApiKey, googleDataId);
    } else if (googlePlacesKey) {
      live = await fetchViaGooglePlaces(googlePlacesKey, googlePlaceId);
    }

    if (live) {
      const reviews = mergeReviews(live.reviews, fallback.reviews || []);
      return res.status(200).json({
        source: live.source,
        placeName: fallback.placeName,
        placeUrl: live.placeUrl || fallback.placeUrl,
        rating: live.rating ?? fallback.rating,
        totalReviews: live.totalReviews ?? fallback.totalReviews,
        syncedAt: new Date().toISOString(),
        reviews,
      });
    }
  } catch (error) {
    console.error('[api/google-reviews] fallback acionado:', error.message);
  }

  return res.status(200).json({
    ...fallback,
    reviews: mergeReviews([], fallback.reviews || []),
  });
}
