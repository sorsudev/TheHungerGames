
exports.up = function(knex) {
  return knex.schema.createTable('players', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.string('email');
    table.string('name');
    table.string('win');
    table.integer('position');
    table.string('element');
    table.string('color');
    table.integer('positive_score');
    table.integer('negative_score');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};
