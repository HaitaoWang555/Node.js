const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
  response.end('Hello World');
});
server.listen(7000);
