const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  tags: [String],
  weight: Number,
  isLast: { type: Boolean, default: false },
});

module.exports = mongoose.model('Question', QuestionSchema);
