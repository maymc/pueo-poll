// Create a proxy is a user tries to go to /auth/google on react server. Forward request to localhost:5000 (other domain)

const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}