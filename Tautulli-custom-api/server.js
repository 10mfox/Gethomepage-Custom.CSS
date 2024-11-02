const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.TAUTULLI_API_PORT;

// Configuration
const config = {
  baseUrl: process.env.TAUTULLI_BASE_URL,
  apiKey: process.env.TAUTULLI_API_KEY,
  sections: {
    shows: 3
  },
  defaultCount: 20
};

// Validate required environment variables
if (!config.baseUrl || !config.apiKey) {
  console.error('Required environment variables are missing:');
  if (!config.baseUrl) console.error('- TAUTULLI_BASE_URL is not set');
  if (!config.apiKey) console.error('- TAUTULLI_API_KEY is not set');
  process.exit(1);
}

// Middleware to parse JSON
app.use(express.json());

// Function to format the media index with title
function formatMediaIndexWithTitle(item) {
  if (item.parent_media_index && item.media_index && item.title) {
    return `S${item.parent_media_index}E${item.media_index} - ${item.title}`;
  }
  return item.title || '';
}

// Function to transform show data
function transformShowData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  // If it's an array, map over it
  if (Array.isArray(data)) {
    return data.map(item => ({
      grandparent_title: item.grandparent_title || '',
      combined_title: formatMediaIndexWithTitle(item)
    }));
  }

  // If it's an object with a data property, process it
  const transformed = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      transformed[key] = data[key].map(item => ({
        grandparent_title: item.grandparent_title || '',
        combined_title: formatMediaIndexWithTitle(item)
      }));
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      transformed[key] = transformShowData(data[key]);
    } else {
      transformed[key] = data[key];
    }
  }
  return transformed;
}

// Function to transform movie data
function transformMovieData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  // If it's an array, map over it
  if (Array.isArray(data)) {
    return data.map(item => ({
      title: item.title || '',
      year: item.year || ''
    }));
  }

  // If it's an object with a data property, process it
  const transformed = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      transformed[key] = data[key].map(item => ({
        title: item.title || '',
        year: item.year || ''
      }));
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      transformed[key] = transformMovieData(data[key]);
    } else {
      transformed[key] = data[key];
    }
  }
  return transformed;
}

// Shows endpoint
app.get('/api/recent/shows', async (req, res) => {
  try {
    const count = req.query.count || config.defaultCount;

    const response = await axios.get(config.baseUrl, {
      params: {
        apikey: config.apiKey,
        cmd: 'get_recently_added',
        count: count,
        section_id: config.sections.shows
      }
    });

    const modifiedData = transformShowData(response.data);
    res.json(modifiedData);
  } catch (error) {
    console.error('Show API Error:', error.message);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
});

// Movies endpoint
app.get('/api/recent/movies', async (req, res) => {
  try {
    const count = req.query.count || config.defaultCount;

    const response = await axios.get(config.baseUrl, {
      params: {
        apikey: config.apiKey,
        cmd: 'get_recently_added',
        count: count,
        media_type: 'movie'
      }
    });

    const modifiedData = transformMovieData(response.data);
    res.json(modifiedData);
  } catch (error) {
    console.error('Movie API Error:', error.message);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
});

// Combined endpoint
app.get('/api/recent/all', async (req, res) => {
  try {
    const count = req.query.count || config.defaultCount;

    // Make all API calls in parallel
    const [showsResponse, movieResponse] = await Promise.all([
      axios.get(config.baseUrl, {
        params: {
          apikey: config.apiKey,
          cmd: 'get_recently_added',
          count: count,
          section_id: config.sections.shows
        }
      }),
      axios.get(config.baseUrl, {
        params: {
          apikey: config.apiKey,
          cmd: 'get_recently_added',
          count: count,
          media_type: 'movie'
        }
      })
    ]);

    // Transform all responses
    const showsData = transformShowData(showsResponse.data);
    const movieData = transformMovieData(movieResponse.data);

    // Combine the responses
    res.json({
      shows: showsData,
      movies: movieData
    });
  } catch (error) {
    console.error('Combined API Error:', error.message);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- /api/recent/shows  (TV Shows content)');
  console.log('- /api/recent/movies (Movie content)');
  console.log('- /api/recent/all    (Combined content)');
  console.log(`Default items returned: ${config.defaultCount}`);
});