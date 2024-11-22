const CrudRepository = require('./crud-repository');
const User = require('../models/user-model');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
