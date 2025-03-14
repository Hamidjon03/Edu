const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

/**
 * Seed function to create admin user
 */
async function seedAdmin() {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({
      where: { email: 'admin@example.com' }
    });

    if (adminExists) {
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);

    // Create admin user
    await User.create({
      name: 'Administrator',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log("Admin user created successfully")
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

module.exports = seedAdmin;