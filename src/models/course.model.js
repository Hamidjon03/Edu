// Course model: Provides methods to interact with the 'courses' table
const db = require('../config/db');

class Course {
  // Retrieve all courses
  static async findAll() {
    const result = await db.query('SELECT * FROM courses');
    return result.rows;
  }

  // Retrieve a course by its ID
  static async findById(id) {
    const result = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Create a new course
  static async create({ title, description }) {
    const result = await db.query(
      'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return result.rows[0];
  }

  // Update an existing course
  static async update(id, { title, description }) {
    const result = await db.query(
      'UPDATE courses SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    return result.rows[0];
  }

  // Delete a course by its ID
  static async delete(id) {
    await db.query('DELETE FROM courses WHERE id = $1', [id]);
  }
}

module.exports = Course;
