const User = require('../models/user.model');

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.updateUser = async (id, userData) => {
  return await User.update(id, userData);
};

exports.deleteUser = async (id) => {
  await User.delete(id);
};
