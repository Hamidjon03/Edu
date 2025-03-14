const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { Op } = require('sequelize');

class UserService {
  // Retrieve all users
  static async getAllUsers() {
    return await User.findAll();
  }

  // Retrieve a single user by primary key (id)
  static async getUserById(id) {
    return await User.findByPk(id);
  }

  // Create a new user with validations and password hashing
  static async createUser(data) {
    try {
      // Check if the email already exists (unique constraint)
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) {
        throw new Error('Email already exists'); // Throw error if email exists
      }

      // Check if all required fields are provided
      if (!data.name || !data.email || !data.password || !data.role) {
        throw new Error('All fields are required: name, email, password, role');
      }

      // Validate that the role is one of the allowed values
      const validRoles = ['student', 'teacher', 'admin'];
      if (!validRoles.includes(data.role)) {
        throw new Error(`Invalid role. Allowed roles: ${validRoles.join(', ')}`);
      }

      // Hash the password before creating the user
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);

      // Create the user
      return await User.create(data);
    } catch (err) {
      // Throw the error to be handled in the controller
      throw err;
    }
  }

  // Update an existing user with validations and password hashing if updated
  static async updateUser(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;
      
      // If email is being updated, check that it's not used by another user
      if (data.email) {
        const existingUser = await User.findOne({ 
          where: { 
            email: data.email, 
            id: { [Op.ne]: id } 
          } 
        });
        if (existingUser) {
          throw new Error('Email already in use by another user');
        }
      }
      
      // If password is provided, hash the new password
      if (data.password) {
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);
      }

      // Update the user record
      return await user.update(data);
    } catch (err) {
      throw err;
    }
  }

  // Delete a user by id
  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;
      await user.destroy();
      return true;
    } catch (err) {
      console.error('Sequelize error:', err);
      throw err;
    }
  }
}

module.exports = UserService;
