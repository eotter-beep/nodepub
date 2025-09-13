const openvpnlib = require('openvpn-lib');
const http = require('http');

const opts = (ip, portnum) => ({
  host: ip,
  port: portnum,
  timeout: 1500,
  logpath: 'log.txt'
});

const auth = (usern, password) => ({
  user: usern,
  pass: password,
});

function start(ip, portnum, usern, password, responseText = 'Hello World') {
  const openvpn = openvpnlib.connect(opts(ip, portnum));

  openvpn.on('connected', () => {
    openvpnlib.authorize(auth(usern, password));
  });

  openvpn.on('console-output', output => console.log(output));
  openvpn.on('state-change', state => console.log(state));
  openvpn.on('error', error => console.log(error));

  // helper for sending responses
  function serverResponse(res, code) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(code);
  }

  // create the HTTP server here
  const server = http.createServer((req, res) => {
    serverResponse(res, responseText); // user-defined or default response
  });

  // start listening
  server.listen(portnum, ip, () => {
    console.log(`Nodepub server running at http://${ip}:${portnum}/`);
  });
}

module.exports = { start, opts, auth };
