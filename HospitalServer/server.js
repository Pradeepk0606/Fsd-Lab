const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {

const parsedUrl = url.parse(req.url, true);

// Serve HTML
if (parsedUrl.pathname === '/') {
fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(data);
});
}

// Serve CSS
else if (parsedUrl.pathname === '/style.css') {
fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, data) => {
res.writeHead(200, { 'Content-Type': 'text/css' });
res.end(data);
});
}

// Bill calculation
else if (parsedUrl.pathname === '/bill') {
const { name, phone, type } = parsedUrl.query;

let billAmount = 0;
if (type === "In") billAmount = 3000;
else if (type === "Out") billAmount = 1000;

res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(`
<h1>Hospital Bill Details</h1>
<p><b>Patient Name:</b> ${name}</p>
<p><b>Phone Number:</b> ${phone}</p>
<p><b>Patient Type:</b> ${type} Patient</p>
<h2>Total Bill Amount: Rs.${billAmount}</h2>
<a href="/">Go Back</a>
`);
}

else {
res.writeHead(404);
res.end("Page not found");
}

}).listen(3000, () => {
console.log("Server running at http://localhost:3000");
});