const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
})

fastify.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  swagger: {
    securityDefinitions: {
      Bearer: {
      type: 'apiKey',
      name: 'token',
      in: 'header',
      }
    },
    info: {
      title: 'API',
      description: 'Api para control de juegos',
      version: '1.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },

  exposeRoute: true
});

fastify.register(require('fastify-url-data'));
fastify.register(require('fastify-cors'), { origin: '*' });
fastify.register(require('./app/routes/players'));

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
