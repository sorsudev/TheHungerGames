
exports.up = function(knex) {
  return knex.schema.createTable('players', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.string('email');
    table.string('name');
    table.string('win');
    table.integer('position').defaultTo(0);
    table.string('element').defaultTo(null);
    table.string('color');
    table.boolean('in_game').defaultTo(true);
    table.boolean('is_current').defaultTo(false);
    table.integer('positive_score').defaultTo(0);
    table.integer('negative_score').defaultTo(0);
    table.integer('current_game_election').defaultTo(0);
    table.integer('current_game_score').defaultTo(0);
    table.integer('current_game_lifes').defaultTo(3);
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};
