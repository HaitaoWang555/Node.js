const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
  console.log(request.headers);

  const contentType = request.headers['content-type'];
  switch (contentType) {
    case 'text/plain': {
      let str = '';
      request.on('data', (data) => {
        str += data.toString('utf8');
      });
      request.on('end', () => {
        response.end(`you sent plain text: ${str}`);
      });
      break;
    }
    default:
      response.end('not supported content type');
      break;
  }
});
server.listen(8989);
