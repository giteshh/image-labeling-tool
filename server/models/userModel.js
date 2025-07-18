const db = require('./db');

async function createUser(username, email, passwordHash) {
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  await db.execute(sql, [username, email, passwordHash]);
}

module.exports = { createUser };
