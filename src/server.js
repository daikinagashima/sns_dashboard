const http = require('http');
const fs = require('fs');
const path = require('path');
const { fetchInsights } = require('./api');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  // API endpoint for insights
  if (req.url.startsWith('/api/insights')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const accountId = url.searchParams.get('accountId');
    try {
      const data = await fetchInsights(accountId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Static file serving
  const filePath = path.join(
    __dirname,
    '..',
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      ext === '.js'
        ? 'application/javascript'
        : ext === '.css'
        ? 'text/css'
        : 'text/html';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = server;
