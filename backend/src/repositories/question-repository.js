const CrudRepository = require('./crud-repository');
const Question = require('../models/question-model');

class QuestionRepository extends CrudRepository {
  constructor() {
    super(Question);
  }
}

module.exports = QuestionRepository;
