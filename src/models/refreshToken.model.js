const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  token_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  token_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'refresh_tokens',
  timestamps: true // Agar kerak bo'lsa, yaratilish va yangilanish sanalarini qo'shadi
});

module.exports = RefreshToken;
