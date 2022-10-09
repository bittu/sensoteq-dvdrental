const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// const args = process.argv.slice(2)
// if (!!args.length && args[0] === 'build') {
//   const path = require('path')
//   const host = process.env.HOST || '127.0.0.1'
//   const port = process.env.PORT || 3000
//   const root = path.resolve(__dirname);
//   const app = express();
//   app.use(function(req, res, next) { console.log(req.url); next(); });
//   app.use(express.static(root + '/build'));
//   const server = app.listen(port, host, serverStarted);

//   function serverStarted () {
//     console.log('Server started', host, port);
//     console.log('Root directory', root);
//     console.log('Press Ctrl+C to exit...\n');
//   }
// } else {

  // proxy middleware options
  const clientOpts = {
    target: 'http://localhost:3001',
    ws: true
  };
  const serverOpts = {
    target: 'http://localhost:3002',
  };

  // create proxies
  const clientProxy = createProxyMiddleware(clientOpts);
  const serverProxy = createProxyMiddleware(serverOpts);

  // mount proxies in web server
  const app = express();
  app.use('/v1', serverProxy);
  app.use('/', clientProxy)
  app.listen(3000);
// }