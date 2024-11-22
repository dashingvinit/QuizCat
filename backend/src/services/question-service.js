const { QuestionRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const questionRepository = new QuestionRepository();

async function getQuestion(data) {
  try {
    const question = await questionRepository.get(data);
    return question;
  } catch (error) {
    throw new AppError('Cannot get data of the user', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  getQuestion,
};
