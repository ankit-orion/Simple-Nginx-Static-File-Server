const http = require('node:http');
const fs = require('node:fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let file_name;
    let content_type = 'text/html';

    if (req.url === '/') {
        file_name = 'index.html';
    } else if (req.url === '/about') {
        file_name = 'about.html';
    } else if (req.url === '/contact') {
        file_name = 'contact.html';
    } else if (req.url === '/index.css') {
        file_name = 'index.css';
        content_type = 'text/css';
    } else if (req.url === '/about.css') {
        file_name = 'about.css';
        content_type = 'text/css';
    } else if (req.url === '/contact.css') {
        file_name = 'contact.css';
        content_type = 'text/css';
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }

    fs.readFile(`${__dirname}/${file_name}`, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('500 Internal Server Error');
        }

        res.writeHead(200, { 'Content-Type': content_type });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});