const config = require('./base'),
      md5 = require('md5'),
      bcrypt = require('bcrypt');
      bookshelf = require('bookshelf')(config.knex);

let Player = bookshelf.Model.extend({
  tableName: 'players',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', (model, attrs, options) => {
      let that = this;
      return this.hashPassword().then((hash) => {
        return that.set('password', hash);
      });
    }, this);
  },
  updatePassword: async function() {
    let that = this;
    const hash = await bcrypt.hash(md5(this.attributes.password), 12);
    that.set('password', hash);
    return that.save();
  },
  hashPassword: function(){
    return bcrypt.hash(md5(this.attributes.password), 12);
  },
  validatePassord: function(comparePassword){
    return bcrypt.compare(md5(comparePassword), this.attributes.password);
  }
});

module.exports = {
  Player : Player
};