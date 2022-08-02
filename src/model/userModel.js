const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDb(username, email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users(username, email, password) VALUES(?, ?, ?)';
    const [result] = await conn.execute(sql, [username, email, password]);
    return result;
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findUserByUsername(username) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [result] = await conn.execute(sql, [username]);
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function getUsers() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users';
    const [result] = await conn.execute(sql, []);
    return result;
  } catch (error) {
    console.log('error getUsers', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = { addUserToDb, findUserByUsername, getUsers };
