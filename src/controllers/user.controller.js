const UserService = require('../services/user.service');
const sendResponse = require('../utils/responseHandler');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return sendResponse(res, 200, 'success', 'Users retrieved successfully', users);
    } catch (err) {
      err.status = err.status || 500;
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return sendResponse(res, 404, 'error', 'User not found');
      }
      return sendResponse(res, 200, 'success', 'User retrieved successfully', user);
    } catch (err) {
      err.status = err.status || 500;
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      return sendResponse(res, 201, 'success', 'User created successfully', newUser);
    } catch (err) {
      err.status = err.status || 500;
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return sendResponse(res, 404, 'error', 'User not found');
      }
      return sendResponse(res, 200, 'success', 'User updated successfully', updatedUser);
    } catch (err) {
      err.status = err.status || 500;
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const deleted = await UserService.deleteUser(req.params.id);
      if (!deleted) {
        return sendResponse(res, 404, 'error', 'User not found');
      }
      return sendResponse(res, 200, 'success', 'User deleted successfully');
    } catch (err) {
      err.status = err.status || 500;
      next(err);
    }
  }
}

module.exports = UserController;
