const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    let user = await userRepository.create({
      _id: data._id,
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
      password: data.password,
      role: data.role,
    });
    const jwt = Auth.createToken({
      userId: user._id,
    });
    return { jwt, user };
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getUser(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    throw new AppError('Cannot get data of the user', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteUser(id) {
  try {
    const user = await userRepository.destroy(id);
    if (!user) {
      throw new AppError('no user exist for the given userId', StatusCodes.BAD_REQUEST);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Cannot delete user from the database', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function patchUser(id, data) {
  try {
    const response = await userRepository.update(id, data);
    return response;
  } catch (error) {
    throw new AppError('Cannot update data of the user', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  patchUser,
};
