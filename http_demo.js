const http = require('http');
const url = require('url');

const server = http.createServer();
const users = [];
server.on('request', (request, response) => {
  /*
    const contentType = request.headers['content-type'];
  */
  const reqUrl = url.parse(request.url, true);
  const { method: methods } = request;
  switch (reqUrl.pathname) {
    case '/users': {
      switch (methods) {
        case 'GET': {
          const userName = reqUrl.query.name;
          console.log(users[0]);
          const user = users.find(u => u.name === userName);
          response.end(JSON.stringify(user));
          break;
        }
        case 'POST': {
          let str = '';
          request.on('data', (data) => {
            str += data.toString('utf8');
          });
          request.on('end', () => {
            let user;
            try {
              user = JSON.parse(str);
            } catch (e) {
              response.statusCode = 400;
              response.end(JSON.stringify({ err: 'you send a bad request' }));
            }
            users.push(user);
            response.end(JSON.stringify({
              status: 'succeed',
            }));
          });
          break;
        }
        default:
          break;
      }
      break;
    }
    default:
      response.statusCode = 400;
      response.end('路径错误');
      break;
  }
  /*  switch (contentType) {
      case 'text/plain': {
        response.setHeader('Content-Type', 'text/plain');
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
    } */
});
server.listen(8989);
