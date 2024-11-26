const { QuestionRepository, ProgressRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const questionRepository = new QuestionRepository();
const progressRepository = new ProgressRepository();

async function startNewQuiz(userId, quizId) {
  try {
    await progressRepository.create({ userId, quizId, questionsAnswered: [] });
  } catch (error) {
    throw new AppError('Error starting new quiz', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getNextQuestion(userId, quizId) {
  try {
    const userProgress = await progressRepository.getByQuizId(userId, quizId);

    let nextQuestionInfo = { difficulty: 'easy', isLast: false };

    if (userProgress && userProgress.questionsAnswered.length > 0) {
      const lastQuestion = userProgress.questionsAnswered.slice(-1)[0];

      if (userProgress.questionsAnswered.length >= 4) {
        nextQuestionInfo.isLast = true;
      }

      const wasCorrect = lastQuestion.correct;
      nextQuestionInfo.difficulty = wasCorrect
        ? lastQuestion.difficulty === 'medium'
          ? 'hard'
          : 'medium'
        : lastQuestion.difficulty === 'medium'
        ? 'easy'
        : 'medium';
    }

    const questions = await questionRepository.getQuestionWithDifficulty(
      nextQuestionInfo.difficulty
    );
    let nextQuestion = null;
    for (const qs of questions) {
      const alreadyAnswered = userProgress.questionsAnswered.some(
        (answered) => answered.questionId.toString() === qs._id.toString()
      );

      if (!alreadyAnswered) {
        nextQuestion = qs;
        break;
      }
      nextQuestion = qs;
    }

    return { ...nextQuestion.toObject(), isLast: nextQuestionInfo.isLast };
  } catch (error) {
    // console.log(error);
    throw new AppError('Cannot get next question', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function submitAnswer(userId, quizId, questionId, answer) {
  try {
    const question = await questionRepository.get(questionId);
    const isCorrect = question.correctAnswer === answer;
    console.log(question.correctAnswer, answer, isCorrect);
    const data = await progressRepository.updateProgress(userId, quizId, {
      questionId,
      correct: isCorrect,
      difficulty: question.difficulty,
    });
    return data;
  } catch (error) {
    throw new AppError('Error submitting answer', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function generateReport(userId, quizId) {
  try {
    const progress = await progressRepository.getByQuizId(userId, quizId);

    const correctAnswers = progress.questionsAnswered.filter((q) => q.correct).length;
    const totalQuestions = progress.questionsAnswered.length;

    const report = {
      correctAnswers,
      totalQuestions,
      accuracy: (correctAnswers / totalQuestions) * 100,
      suggestions:
        correctAnswers < totalQuestions / 2 ? 'Focus on easier topics' : 'Move to harder topics',
    };

    return report;
  } catch (error) {
    throw new AppError('Error generating report', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function resetProgress(userId) {
  try {
    await progressRepository.deleteByUserId(userId); // Clear existing progress for the user
  } catch (error) {
    throw new AppError('Error resetting progress', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getHistory(id) {
  try {
    const data = await progressRepository.getUserHis(id);
    return data;
  } catch (error) {
    throw new AppError('Error resetting progress', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getDetail(id) {
  try {
    const data = await progressRepository.getPopulated(id);
    return data;
  } catch (error) {
    throw new AppError('Error resetting progress', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  startNewQuiz,
  getNextQuestion,
  submitAnswer,
  generateReport,
  resetProgress,
  getHistory,
  getDetail,
};
