const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

// Map legacy WordPress paths to modern pages seamlessly
const LEGACY_REDIRECTS = {
  '/about': '/about.html',
  '/about/': '/about.html',
  '/residential-services': '/residential.html',
  '/residential-services/': '/residential.html',
  '/commercial-services': '/commercial.html',
  '/commercial-services/': '/commercial.html',
  '/services': '/index.html#solutions',
  '/services/': '/index.html#solutions',
  '/contact': '/contact.html',
  '/contact/': '/contact.html',
  '/2-months-free-monitoring': '/contact.html#free-monitoring',
  '/2-months-free-monitoring/': '/contact.html#free-monitoring'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (LEGACY_REDIRECTS[pathname]) {
    res.writeHead(301, { Location: LEGACY_REDIRECTS[pathname] });
    res.end();
    return;
  }

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(ROOT, pathname);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p><a href="/index.html">Return to AVS Home</a></p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`AVS Valdosta modern server running at http://localhost:${PORT}/`);
});
