const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  currentScore: Number,
  questionsAnswered: [
    {
      questionId: mongoose.Types.ObjectId,
      correct: Boolean,
      difficulty: String,
    },
  ],
});

module.exports = new mongoose.model('Progress', ProgressSchema);
