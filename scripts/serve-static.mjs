import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

http
  .createServer((request, response) => {
    let target;
    try {
      const url = new URL(request.url || '/', 'http://localhost');
      target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    } catch {
      response.writeHead(400);
      response.end('Bad request');
      return;
    }
    if (target !== root && !target.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      response.writeHead(404, { 'Content-Type': mime['.html'] });
      response.end(fs.readFileSync(path.join(root, '404.html')));
      return;
    }
    response.writeHead(200, {
      'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
    });
    fs.createReadStream(target).pipe(response);
  })
  .listen(port, '127.0.0.1', () => console.log('Margin static preview: http://127.0.0.1:' + port));
