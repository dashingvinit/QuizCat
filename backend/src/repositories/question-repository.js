const CrudRepository = require('./crud-repository');
const Question = require('../models/question-model');

class QuestionRepository extends CrudRepository {
  constructor() {
    super(Question);
  }

  async getQuestionWithDifficulty(difficulty) {
    const data = Question.find({ difficulty: difficulty });
    return data;
  }
}

module.exports = QuestionRepository;
