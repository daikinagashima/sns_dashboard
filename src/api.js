const mockData = require('./mockData');

const API_URL = 'https://api.example.com/insights';

async function fetchInsights(accountId) {
  const id = accountId || 'default';
  // Use mock data in development mode or when API token is missing
  if (process.env.NODE_ENV === 'development' || !process.env.API_TOKEN) {
    return mockData[id] || mockData.default;
  }

  const url = `${API_URL}?account=${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  return res.json();
}

module.exports = { fetchInsights };
