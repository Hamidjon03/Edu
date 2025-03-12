const db = require('../config/db');

class User {
  // Retrieve all users
  static async findAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  // Retrieve a user by its ID
  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Create a new user record
  // Here, 'role' defaults to 'student' if not provided
  static async create({ name, email, password, role = 'student' }) {
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    );
    return result.rows[0];
  }

  // Update an existing user record
  static async update(id, { name, email, role }) {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [name, email, role, id]
    );
    return result.rows[0];
  }

  // Delete a user record by its ID
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = User;
