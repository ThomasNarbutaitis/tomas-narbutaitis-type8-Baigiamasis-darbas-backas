/* eslint-disable eqeqeq */
/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addAnswerToDb(user_id, question_id, answer) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'INSERT INTO answers(user_id, question_id, answer) VALUES(?, ?, ?)';
    const [result] = await conn.execute(sql, [user_id, question_id, answer]);
    return result;
  } catch (error) {
    console.log('error addAnswerToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findAnswerById(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM answers WHERE a_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error findAnswerById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findAnswersByQestionId(question_id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT * FROM answers WHERE question_id = ? AND answers.archived=0';
    const [result] = await conn.execute(sql, [question_id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error findAnswersByQestionId', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function updateAnswer(updatedAnswer, id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE answers SET answer = ? WHERE a_id = ?';
    const [result] = await conn.execute(sql, [updatedAnswer, id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error updateAnswer', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function deleteAnswer(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE answers SET archived = 1 WHERE a_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result.affectedRows;
  } catch (error) {
    console.log('error deleteAnswer', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function deleteAllAnswers(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'UPDATE answers SET archived = 1 WHERE question_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result.affectedRows;
  } catch (error) {
    console.log('error deleteAllAnswer', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findAnswerByQIdJoinedUsername(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql =
      'SELECT answers.a_id, answers.user_id, answers.answer, answers.created_at, answers.modified_at, users.username FROM answers, users WHERE answers.user_id=users.id AND answers.archived=0 AND answers.question_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result;
  } catch (error) {
    console.log('error findQuestionById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findAnswersById(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM answers WHERE a_id = ?';
    const [result] = await conn.execute(sql, [id]);
    // console.log('result ===', result);
    return result[0];
  } catch (error) {
    console.log('error findAnswersById', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function getAllAnswers() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM answers WHERE archived=0';
    const [result] = await conn.execute(sql, []);
    // console.log('result ===', result);
    return result;
  } catch (error) {
    console.log('error getAllAnswers', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = {
  addAnswerToDb,
  findAnswerById,
  findAnswersByQestionId,
  updateAnswer,
  deleteAnswer,
  findAnswerByQIdJoinedUsername,
  findAnswersById,
  deleteAllAnswers,
  getAllAnswers,
};
