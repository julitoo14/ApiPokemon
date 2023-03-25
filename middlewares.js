const authMiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authMiddleware.init();
    app.use(authMiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares; 