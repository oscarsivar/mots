import axios from 'axios';

// Base URL for Le Robert API
const BASE_URL = 'https://api.datamuse.com';

/**
 * Fetch related words from Le Robert API.
 * @param {string} word - The word to fetch related words for.
 * @returns {Promise<string[]>} - A promise that resolves to an array of related words.
 */
export const fetchRelatedWords = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}/words`, {
      params: {
        rel_rhy: word, // Use the word to find related words
        max: 3, // Limit the number of related words to 3
        v: 'fr', // Specify the version as French
      },
    });

    // Extract related words from the response
    return response.data.map((item: { word: string }) => item.word); // Return only the words
  } catch (error) {
    console.error('Error fetching related words from Le Robert API:', error);
    return []; // Return an empty array in case of error
  }
};