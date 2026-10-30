const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const WAITLIST_FILE = path.join(__dirname, 'waitlist.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const safePath = decodeURI(urlParts[0]);

  // Handle Waitlist API Submission
  if (req.method === 'POST' && safePath === '/api/waitlist') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const email = (data.email || '').trim().toLowerCase();

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          res.writeHead(400, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }));
          return;
        }

        // Read or initialize waitlist.json
        let subscribers = [];
        if (fs.existsSync(WAITLIST_FILE)) {
          try {
            subscribers = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf8'));
          } catch (e) {
            subscribers = [];
          }
        }

        // Check for duplicates
        const existing = subscribers.find(s => s.email === email);
        if (!existing) {
          subscribers.push({
            email,
            timestamp: new Date().toISOString(),
            ip: req.socket.remoteAddress || '',
          });
          fs.writeFileSync(WAITLIST_FILE, JSON.stringify(subscribers, null, 2), 'utf8');
        }

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ success: true, count: subscribers.length }));
      } catch (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ success: false, error: 'Server error processing waitlist.' }));
      }
    });
    return;
  }

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // Static file handling
  let targetPath = safePath === '/' || safePath === '' ? '/index.html' : safePath;
  const filePath = path.join(PUBLIC_DIR, targetPath);

  // Prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    let finalPath = filePath;
    if (stats.isDirectory()) {
      finalPath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(finalPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(finalPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
