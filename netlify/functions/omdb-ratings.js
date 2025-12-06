exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://moviecompare-a570f.web.app',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check origin - only allow requests from Firebase domain
  const origin = event.headers.origin || event.headers.Origin || '';
  const allowedOrigins = [
    'https://moviecompare-a570f.web.app',
    'https://moviecompare-a570f.firebaseapp.com',
    'http://localhost:3000' // For local development
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Forbidden: Origin not allowed' })
    };
  }

  const { imdbID } = event.queryStringParameters || {};

  if (!imdbID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'imdbID parameter is required' })
    };
  }

  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  if (!OMDB_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch ratings' })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin || 'https://moviecompare-a570f.web.app',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

