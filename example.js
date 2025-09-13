const http = require('http');
const { start, opts, auth } = require('./nodepub'); // your library file

// Start the OpenVPN connection
start('1.1.1.1', 1194, 'nodepub', 'atnodepub');

// Create the HTTP server
const server = http.createServer((req, res) => {
  // use the library helper for the response
  // you can define your own response string here
  const code = '<h1>Welcome to Nodepub!</h1>';
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(code);
});

// Listen on port 8080
server.listen(8080, '127.0.0.1', () => {
  console.log('Nodepub site running at http://127.0.0.1:8080/');
});
