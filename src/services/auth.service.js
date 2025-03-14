const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken.model'); // Sequelize modeli
const User = require('../models/user.model'); // Sequelize User modeli

const SALT_ROUNDS = 10;

exports.login = async ({ username, password }) => {
  // DB dan foydalanuvchini topish
  const user = await User.findOne({ where: { name: username } });
  if (!user) {
    console.log("User not found");
    throw new Error('Invalid credentials');
  }
  
  // Parolni solishtirish
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log("Invalid password");
    throw new Error('Invalid credentials');
  }
  
  // Access token yaratish (15 minut amal qiladi)
  const accessToken = jwt.sign(
    { id: user.id, username: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  // Refresh token yaratish:
  // 1. token_id va tokenSecret ni generatsiya qilish
  const token_id = crypto.randomBytes(16).toString('hex');
  const tokenSecret = crypto.randomBytes(64).toString('hex');
  // 2. Ikkitasini birlashtirib refresh token hosil qilamiz
  const refreshTokenPlain = `${token_id}.${tokenSecret}`;
  // 3. tokenSecret ni hash qilish
  const token_hash = await bcrypt.hash(tokenSecret, SALT_ROUNDS);
  
  // 4. Refresh tokenni DB ga saqlash (7 kun amal qilish muddati)
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ token_id, token_hash, user_id: user.id, expires_at });
  console.log("Refresh token created");
  return { accessToken, refreshToken: refreshTokenPlain };
};

exports.register = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  
  // Create user with hashed password
  const user = await User.create({
    ...userData,
    password: hashedPassword
  });
  
  // Return user without password
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

exports.logout = async (refreshToken, userId) => {
  const parts = refreshToken.split('.');
  if (parts.length !== 2) {
    throw new Error('Invalid refresh token format');
  }
  const token_id = parts[0];
  
  // Delete the refresh token
  await RefreshToken.destroy({ 
    where: { 
      token_id,
      user_id: userId 
    } 
  });
  
  return true;
};

exports.refreshToken = async (refreshToken) => {
  // Refresh tokenni token_id va tokenSecret qismlariga bo'lamiz
  const parts = refreshToken.split('.');
  if (parts.length !== 2) {
    throw new Error('Invalid refresh token format');
  }
  const token_id = parts[0];
  const tokenSecret = parts[1];
  
  // DB dan refresh token yozuvini qidiramiz
  const storedToken = await RefreshToken.findOne({ where: { token_id } });
  if (!storedToken) {
    throw new Error('Invalid refresh token');
  }
  
  // Muddati tugaganligini tekshiramiz
  if (new Date(storedToken.expires_at) < new Date()) {
    await RefreshToken.destroy({ where: { token_id } });
    throw new Error('Refresh token expired');
  }
  
  // TokenSecret hash bilan solishtiramiz
  const isValid = await bcrypt.compare(tokenSecret, storedToken.token_hash);
  if (!isValid) {
    throw new Error('Invalid refresh token');
  }
  
  // Foydalanuvchini DB dan olish (refresh token yozuvidagi user_id orqali)
  const user = await User.findByPk(storedToken.user_id);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Yangi access token yaratish (15 minut amal qiladi)
  const newAccessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  return { accessToken: newAccessToken };
};
