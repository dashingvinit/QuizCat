const { StatusCodes } = require('http-status-codes');
const { QuestionService } = require('../services');
const { successResponse, errorResponse } = require('../utils/common');

async function getQuestion(req, res) {
  try {
    const data = await QuestionService.getQuestion(req.body);
    successResponse.data = data;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res.status(error.statusCode || 500).json(errorResponse);
  }
}

module.exports = {
  getQuestion,
};
