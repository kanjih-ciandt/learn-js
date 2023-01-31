const http = require('http');
const routes = require('./routers');

const server = http.createServer(routes.handler);


server.listen(3000);