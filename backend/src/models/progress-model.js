const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
  questionsAnswered: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      correct: Boolean,
      difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    },
  ],
});

const Progress = mongoose.model('Progress', ProgressSchema);
module.exports = Progress;