const { StatusCodes } = require('http-status-codes');
const { QuestionService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function startQuiz(req, res) {
  try {
    const userId = req.body.id;
    const data = await QuestionService.startNewQuiz(userId);
    successResponse.message = 'Quiz started successfully';
    console.log('controller', data);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function getQuestion(req, res) {
  try {
    const quizId = req.body.data.quizId;
    const data = await QuestionService.getNextQuestion(quizId);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function submitAnswer(req, res) {
  try {
    const { quizId, questionId, answer } = req.body;
    const data = await QuestionService.submitAnswer(quizId, questionId, answer);
    successResponse.data = data;
    successResponse.message = 'Answer submitted successfully';
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    // console.log('error sending data', error);
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function generateReport(req, res) {
  try {
    console.log('report controller', req.params.quizId);
    const data = await QuestionService.generateReport(req.params.quizId);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function getHistory(req, res) {
  try {
    const data = await QuestionService.getHistory(req.params.id);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function getDetail(req, res) {
  try {
    const data = await QuestionService.getDetail(req.params.id);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

module.exports = {
  getQuestion,
  submitAnswer,
  generateReport,
  startQuiz,
  getHistory,
  getDetail,
};
