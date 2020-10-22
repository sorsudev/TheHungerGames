require('dotenv').config();
const prefix = '/players',
  Player = require('../models/player').Player;

module.exports = function (fastify, opts, done) {
  fastify.post(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Ruta para crear Player',
        tags: ['Players'],
        summary: 'Ruta para crear player',
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            win: {type: 'string'},
            color: {type: 'color'}
          }
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              hello: { type: 'string' }
            }
          }
        }
      }
    },
    (request, response) => {
      let data = request.body;
      return new Player({
        username: data.username, password: data.password,
        email: data.email, name: data.name, win: data.win,
        color: data.color
      }
      ).save()
        .then(function (player) {
          return response.send(player);
        })
        .catch(function (err) {
          return response.send(err);
        });
    }
  );
  fastify.get(`${prefix}`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Retorna el listado de players',
        tags: ['Players'],
        summary: 'Listado completo de jugadores',
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              hello: { type: 'string' }
            }
          }
        }
      }
    },
    (request, response) => {
      Player.fetchAll().then(function (players) {
        return response.send(players);
      });
    }
  );

  done();
};