const CrudRepository = require('./crud-repository');
const Progress = require('../models/progress-model');

class ProgressRepository extends CrudRepository {
  constructor() {
    super(Progress);
  }

  async get(userId) {
    return Progress.findOne({ userId });
  }

  async getUserHis(userId) {
    return Progress.find({ userId: userId });
  }
  async getPopulated(id) {
    return Progress.findOne({ _id: id }).populate('questionsAnswered.questionId').exec();
  }

  async getByQuizId(userId, quizId) {
    return Progress.findOne({ userId, quizId });
  }

  async updateProgress(userId, quizId, questionData) {
    return Progress.updateOne({ userId, quizId }, { $push: { questionsAnswered: questionData } });
  }

  async deleteByUserId(userId) {
    return Progress.deleteOne({ userId });
  }
}

module.exports = ProgressRepository;
