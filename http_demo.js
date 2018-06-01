const http = require('http');

let count = 0;
const server = http.createServer((request, response) => {
  count += 1;
  response.end(`Hello, You are No${count} User`);
});
server.listen(8989);
