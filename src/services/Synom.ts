import axios from 'axios';

const BASE_URL = 'https://api.datamuse.com';

/**
 * Normaliza una palabra: quita acentos y la convierte a minúsculas.
 */
function normalizeWord(word: string): string {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Fallback simple si no hay resultados.
 */
function generateFallbackSuggestions(word: string, lang: string): string[] {
  return [word];
}

/**
 * Intenta obtener sinónimos, palabras similares, traducciones aproximadas y palabras que suenan similar,
 * usando axios solo una vez por intento.
 */
export const fetchRelatedWords = async (word: string, lang: string = 'fr'): Promise<string[]> => {
  const normalized = normalizeWord(word);

  // 1. Sinónimos directos
  let response = await axios.get(`${BASE_URL}/words`, {
    params: { rel_syn: normalized, lang, max: 3 }
  });
  let data = response.data.map((item: { word: string }) => item.word);

  // 2. Palabras con significado similar
  if (data.length === 0) {
    response = await axios.get(`${BASE_URL}/words`, {
      params: { ml: normalized, lang, max: 3 }
    });
    data = response.data.map((item: { word: string }) => item.word);
  }

  // 3. Traducciones aproximadas (solo para francés)
  if (data.length === 0 && lang === 'fr') {
    response = await axios.get(`${BASE_URL}/words`, {
      params: { rel_trg: normalized, lang, max: 3 }
    });
    data = response.data.map((item: { word: string }) => item.word);
  }

  // 4. Palabras que suenan similar
  if (data.length === 0) {
    response = await axios.get(`${BASE_URL}/words`, {
      params: { sl: normalized, lang, max: 3 }
    });
    data = response.data.map((item: { word: string }) => item.word);
  }

  return data.length > 0 ? data : generateFallbackSuggestions(word, lang);
};