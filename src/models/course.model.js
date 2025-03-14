const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = Course;
