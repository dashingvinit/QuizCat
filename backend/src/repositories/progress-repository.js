const CrudRepository = require('./crud-repository');
const Progress = require('../models/progress-model');

class ProgressRepository extends CrudRepository {
  constructor() {
    super(Progress);
  }

  async getUserHis(userId) {
    return Progress.find({ userId: userId });
  }
  async getPopulated(id) {
    return Progress.findOne({ _id: id }).populate('questionsAnswered.questionId').exec();
  }

  async updateProgress(quizId, data) {
    const progress = await Progress.findOneAndUpdate(
      { _id: quizId },
      { $push: { questionsAnswered: data } },
      { new: true, upsert: true }
    );
    return progress;
  }

  async deleteByUserId(userId) {
    return Progress.deleteOne({ userId });
  }
}

module.exports = ProgressRepository;
