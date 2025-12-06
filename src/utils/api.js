// API utility for making calls to Netlify functions
// In production, set REACT_APP_NETLIFY_URL to your Netlify site URL (e.g., https://your-site.netlify.app)
// For local development with netlify dev, functions are available at http://localhost:8888
// If REACT_APP_NETLIFY_URL is not set, it will use relative paths (works when frontend and functions are on same domain)
const API_BASE_URL = process.env.REACT_APP_NETLIFY_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : '');

/**
 * Fetches movie details from TMDB API via Netlify function
 * @param {string} movieID - The TMDB movie ID
 * @returns {Promise<Object>} Movie details object
 */
export const getMovieDetails = async (movieID) => {
  const response = await fetch(
    `${API_BASE_URL}/.netlify/functions/movie-details?movieID=${movieID}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  
  return response.json();
};

/**
 * Searches for movies or returns trending movies
 * @param {string} query - Search query (if less than 3 chars, returns trending)
 * @returns {Promise<Object>} Search results object
 */
export const searchMovies = async (query = '') => {
  const url = query && query.length >= 3
    ? `${API_BASE_URL}/.netlify/functions/movie-search?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/.netlify/functions/movie-search`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  
  return response.json();
};

/**
 * Fetches movie videos/trailers from TMDB API via Netlify function
 * @param {string} movieID - The TMDB movie ID
 * @returns {Promise<Object>} Videos object
 */
export const getMovieVideos = async (movieID) => {
  const response = await fetch(
    `${API_BASE_URL}/.netlify/functions/movie-videos?movieID=${movieID}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  
  return response.json();
};

/**
 * Fetches movie ratings from OMDB API via Netlify function
 * @param {string} imdbID - The IMDB movie ID
 * @returns {Promise<Object>} Ratings object
 */
export const getMovieRatings = async (imdbID) => {
  const response = await fetch(
    `${API_BASE_URL}/.netlify/functions/omdb-ratings?imdbID=${encodeURIComponent(imdbID)}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch ratings');
  }
  
  return response.json();
};

