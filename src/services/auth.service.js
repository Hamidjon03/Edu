// src/services/auth.service.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken.model');

// Misol uchun statik foydalanuvchi ma'lumotlari (haqiqiy ilovada DB dan olinadi)
const user = {
  id: 1,
  username: 'admin',
  // Hashed password for 'password' generated with bcrypt.hash('password', saltRounds)
  password: '$2b$10$KIX.Q0dP.7WmEr75iYm5GeDeZtrEvBykN8lsWz/q8N6duFqR.6eOm'
};

const SALT_ROUNDS = 10;

// Login service: validates credentials, creates access & refresh tokens
exports.login = async ({ username, password }) => {
  // Validate credentials (haqiqiy ilovada DB dan foydalanuvchi olinadi)
  if (username !== user.username) {
    throw new Error('Invalid credentials');
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }
  
  // Create access token valid for 15 minutes
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  // Generate refresh token:
  // 1. Create token_id and tokenSecret
  const token_id = crypto.randomBytes(16).toString('hex');
  const tokenSecret = crypto.randomBytes(64).toString('hex');
  // 2. Combine into a single token string: token_id.tokenSecret
  const refreshTokenPlain = `${token_id}.${tokenSecret}`;
  
  // Hash the tokenSecret before storing
  const token_hash = await bcrypt.hash(tokenSecret, SALT_ROUNDS);
  
  // Save hashed refresh token in DB with expiration (7 days)
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ token_id, token_hash, user_id: user.id, expires_at });
  
  return { accessToken, refreshToken: refreshTokenPlain };
};

// Refresh token service: validates and returns a new access token
exports.refreshToken = async (refreshToken) => {
  // Split refresh token into token_id and tokenSecret parts
  const parts = refreshToken.split('.');
  if (parts.length !== 2) {
    throw new Error('Invalid refresh token format');
  }
  const token_id = parts[0];
  const tokenSecret = parts[1];
  
  // Retrieve the stored refresh token record
  const storedToken = await RefreshToken.findByTokenId(token_id);
  if (!storedToken) {
    throw new Error('Invalid refresh token');
  }
  
  // Check if refresh token is expired
  if (new Date(storedToken.expires_at) < new Date()) {
    await RefreshToken.deleteByTokenId(token_id);
    throw new Error('Refresh token expired');
  }
  
  // Compare provided tokenSecret with stored hash
  const isValid = await bcrypt.compare(tokenSecret, storedToken.token_hash);
  if (!isValid) {
    throw new Error('Invalid refresh token');
  }
  
  // Generate new access token
  const newAccessToken = jwt.sign(
    { id: storedToken.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  return { accessToken: newAccessToken };
};
