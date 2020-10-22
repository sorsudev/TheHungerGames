require('dotenv').config();

module.exports = {
  knex : require('knex')({
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset  : 'utf8'
    },
    pool: { min: 0, max: 7 }
  })

};