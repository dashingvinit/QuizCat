const { StatusCodes } = require('http-status-codes');
const { QuestionService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');
const mongoose = require('mongoose');

async function startQuiz(req, res) {
  try {
    const userId = req.body.id;
    const quizId = new mongoose.Types.ObjectId();
    await QuestionService.startNewQuiz(userId, quizId);
    successResponse.message = 'Quiz started successfully';
    successResponse.data = { quizId };
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function getQuestion(req, res) {
  try {
    const quizId = req.body.data.quizId;
    const data = await QuestionService.getNextQuestion(req.body.data.id, quizId);
    successResponse.data = data;
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

async function submitAnswer(req, res) {
  try {
    const { id, quizId, questionId, answer } = req.body;
    const data = await QuestionService.submitAnswer(id, quizId, questionId, answer);
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
    const data = await QuestionService.generateReport(req.params.id, req.params.quizId);

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
