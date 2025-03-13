// src/models/index.js
const sequelize = require('../config/config');
const User = require('./user.model');
const Course = require('./course.model');
const Enrollment = require('./enrollment.model');

// Assotsiatsiyalar: User va Course o'rtasida ko'p-ko'p munosabatni Enrollment orqali tashkil etamiz
User.hasMany(Enrollment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Course.hasMany(Enrollment, { foreignKey: 'courseId', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment
};
