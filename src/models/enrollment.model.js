// Enrollment model: Provides methods to interact with the 'enrollments' table
const db = require('../config/db');

class Enrollment {
  // Retrieve all enrollments
  static async findAll() {
    const result = await db.query('SELECT * FROM enrollments');
    return result.rows;
  }

  // Retrieve an enrollment by its ID
  static async findById(id) {
    const result = await db.query('SELECT * FROM enrollments WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Create a new enrollment record
  static async create({ student_id, course_id, completed = false }) {
    const result = await db.query(
      'INSERT INTO enrollments (student_id, course_id, completed) VALUES ($1, $2, $3) RETURNING *',
      [student_id, course_id, completed]
    );
    return result.rows[0];
  }

  // Update an existing enrollment record
  static async update(id, { student_id, course_id, completed }) {
    const result = await db.query(
      'UPDATE enrollments SET student_id = $1, course_id = $2, completed = $3 WHERE id = $4 RETURNING *',
      [student_id, course_id, completed, id]
    );
    return result.rows[0];
  }

  // Delete an enrollment record by its ID
  static async delete(id) {
    await db.query('DELETE FROM enrollments WHERE id = $1', [id]);
  }
}

module.exports = Enrollment;
