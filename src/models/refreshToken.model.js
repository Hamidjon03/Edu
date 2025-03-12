// RefreshToken model: Provides methods to interact with the 'refresh_tokens' table
const db = require('../config/db');

class RefreshToken {
  // Create a new refresh token record
  static async create({ token_id, token_hash, user_id, expires_at }) {
    const result = await db.query(
      `INSERT INTO refresh_tokens (token_id, token_hash, user_id, expires_at)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [token_id, token_hash, user_id, expires_at]
    );
    return result.rows[0];
  }

  // Find a refresh token by token_id
  static async findByTokenId(token_id) {
    const result = await db.query(
      `SELECT * FROM refresh_tokens WHERE token_id = $1`,
      [token_id]
    );
    return result.rows[0];
  }

  // Delete a refresh token by token_id
  static async deleteByTokenId(token_id) {
    await db.query(
      `DELETE FROM refresh_tokens WHERE token_id = $1`,
      [token_id]
    );
  }

  // Optionally, delete all tokens for a specific user
  static async deleteByUserId(user_id) {
    await db.query(
      `DELETE FROM refresh_tokens WHERE user_id = $1`,
      [user_id]
    );
  }
}

module.exports = RefreshToken;
