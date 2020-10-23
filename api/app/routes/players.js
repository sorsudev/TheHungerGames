require('dotenv').config();
const prefix = '/players',
  chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
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
            color: {type: 'string'}
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
      return new Player(request.body).save()
        .then(function (player) {
          return response.send(player);
        })
        .catch(function (err) {
          return response.send(err);
        });
    }
  );
  fastify.patch(`${prefix}/:id`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Ruta para actualizar informacion de un Player',
        tags: ['Players'],
        summary: 'Ruta para actualizar player',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
      if (request.body === null)
        return response.send({message: 'no data'});
      return Player.where({
        id: request.params.id
      }).fetch().then((player) => {
        return player.save(request.body, { patch: true })
          .then((player) => {
            if (!request.body.hasOwnProperty('password'))
              return response.send(player);
            return player.updatePassword()
              .then((player) => {
                return response.send(player);
              })
              .catch((err) => {
                return response.send(err);
              });
          })
          .catch((err) => {
            return response.send(err);
          });
      });
    }
  );
  fastify.patch(`${prefix}/:id/setcurrent`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Ruta para actualiza el Player actual que movera',
        tags: ['Players'],
        summary: 'Ruta para actualizar current player',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
      return Player
        .where({ is_current: true })
        .save(
          { is_current: false },
          { method: 'update', patch: true }
        )
        .then((players) => {
          return Player.where({
            id: request.params.id
          }).fetch().then((player) => {
            return player.save({ is_current: true }, { patch: true })
              .then((player) => {
                return response.send(player);
              })
              .catch((err) => {
                return response.send(err);
              });
          });
        })
        .catch((err) => {
          return Player.where({
            id: request.params.id
          }).fetch().then((player) => {
            return player.save({ is_current: true }, { patch: true })
              .then((player) => {
                return response.send(player);
              })
              .catch((err) => {
                return response.send(err);
              });
          });
        });
    }
  );
  fastify.get(`${prefix}/getcurrent`, 
  {
    schema: {
      security: [
        {
          Bearer: []
        }
      ],
      description: 'Ruta para actualiza el Player actual que movera',
      tags: ['Players'],
      summary: 'Ruta para actualizar current player',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
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
    return Player.where({is_current: true}).fetch()
      .then((player) => {
        return response.send(player);
      })
      .catch((err) => {
        return Player.fetchAll().then(function (players) {
          let playersIds = players.map((player) => player.id);
          let playerId = Math.floor(Math.random() * playersIds.length) + 1;
          return Player.where({ id: playerId }).fetch()
            .then((player) => {
              return player.save({ is_current: true }, { patch: true })
                .then((player) => {
                  return response.send(player);
                })
                .catch((err) => {
                  return response.send(err);
                });
            })
            .catch((err) => {
              return response.send(err);
            });
        });
      });
  });
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
  fastify.get(`${prefix}/:id`,
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
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
      Player.where({id: request.params.id}).fetch().then(function (player) {
        return response.send(player);
      });
    }
  );
  fastify.get(`${prefix}/ingame`,
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
      return Player.where({in_game: true}).orderBy('id', 'ASC').fetchAll().then(function (players) {
        return response.send(players);
      });
    }
  );
  fastify.get(`${prefix}/getvsplayer/:id`,
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
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
      return Player.where({in_game: true}).orderBy('positive_score', 'DESC').fetchAll()
        .then(function (players) {
          let playersIds = players.map( (player) => player.id);
          let groups = chunk(playersIds, 2);
          let playersVsIds = groups.find(playersGroup => playersGroup.indexOf(request.params.id) > -1);
          return Player.forge().where('id', 'in', playersVsIds).fetchAll()
            .then( (players) => {
              return response.send(players);
            })
            .catch( (err) => {
              return response.send(err);
            });
        })
        .catch((err) => {
          return response.send(err);
        });
    }
  );
  fastify.post(`${prefix}/sign_in`,
    {
      schema: {
        security: [
          {
            Bearer: []
          }
        ],
        description: 'Proceso de autenticacion del Player',
        tags: ['Player'],
        summary: 'Valida Player',
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
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
      return Player.where({ email: request.body.email }).fetch()
        .then((player) => {
          if (!player)
            return response.send({ error: 'datos no coinciden' });

          return player.validatePassord(request.body.password).then((validateResponse) => {
            if (!validateResponse)
              return response.send({ error: 'datos no coinciden' });

            return response.send(player);
          });
        });
    }
  );

  done();
};