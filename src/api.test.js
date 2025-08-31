const test = require('node:test');
const assert = require('node:assert');

process.env.NODE_ENV = 'development';
const { fetchInsights } = require('./api');

test('fetchInsights returns mock data in development mode', async () => {
  const data = await fetchInsights('default');
  assert.strictEqual(typeof data.followers, 'number');
  assert.strictEqual(typeof data.engagement, 'number');
});
