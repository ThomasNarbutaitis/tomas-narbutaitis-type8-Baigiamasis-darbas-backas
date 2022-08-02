/* eslint-disable eqeqeq */
/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getQuestions() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT questions.q_id, questions.question, questions.created, questions.modified, users.username FROM questions, users WHERE questions.user_id=users.id AND questions.archived=0';
    const [result] = await conn.execute(sql, []);
    // console.log('result ===', result);

    return result;
  } catch (error) {
    console.log('error getQuestions', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findQuestionById(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM questions WHERE q_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error findQuestionById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function updateQuestion(updatedQuestion, id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE questions SET question = ? WHERE q_id = ?';
    const [result] = await conn.execute(sql, [updatedQuestion, id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error findQuestionById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function deleteQuestion(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE questions SET archived = 1 WHERE q_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result.affectedRows;
  } catch (error) {
    console.log('error deleteQuestion', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findQuestionByIdJoinedUsername(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT questions.q_id, questions.user_id, questions.question, questions.created, questions.modified, users.username FROM questions, users WHERE questions.user_id=users.id AND questions.archived=0';
    const [result] = await conn.execute(sql, []);
    // console.log('result ===', result);
    const filteredResult = result.find((rObj) => rObj.q_id == id);
    return filteredResult;
  } catch (error) {
    console.log('error findQuestionById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function addQuestionToDb(user_id, question) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO questions(user_id, question) VALUES(?, ?)';
    const [result] = await conn.execute(sql, [user_id, question]);
    return result;
  } catch (error) {
    console.log('error addQuestionToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getQuestions,
  findQuestionById,
  addQuestionToDb,
  findQuestionByIdJoinedUsername,
  updateQuestion,
  deleteQuestion,
};
