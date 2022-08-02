/* eslint-disable camelcase */
const express = require('express');
const { validateToken } = require('../middleware');
const {
  addAnswerToDb,
  findAnswerByQIdJoinedUsername,
  updateAnswer,
  deleteAnswer,
  findAnswersById,
  deleteAllAnswers,
  getAllAnswers,
} = require('../model/answersModel');

const answersRoutes = express.Router();

// GET QUESTIONS BY QUESTION ID JOINED WITH USERS
answersRoutes.get('/answersToQuestion/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const getResult = await findAnswerByQIdJoinedUsername(questionId);
  if (getResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(200).json(getResult);
});

// POST
answersRoutes.post('/answers', validateToken, async (req, res) => {
  const { user_id, question_id, answer } = req.body;

  const newAnswer = {
    user_id,
    question_id,
    answer,
  };

  const insertResult = await addAnswerToDb(
    newAnswer.user_id,
    newAnswer.question_id,
    newAnswer.answer
  );
  // console.log('insertResult ===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('answer created');
});

// UPDATE ANSWER
answersRoutes.patch('/answers/:answerId', validateToken, async (req, res) => {
  const { answerId } = req.params;
  const { answer } = req.body;
  const updateResult = await updateAnswer(answer, Number(answerId));
  // console.log('updateResult ===', updateResult);

  if (updateResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('answer updated');
});

// DELETE ANSWER (change archived to 1)
answersRoutes.delete('/answers/:answerId', validateToken, async (req, res) => {
  const { answerId } = req.params;
  const updateResult = await deleteAnswer(Number(answerId));
  // console.log('updateResult ===', updateResult);

  if (updateResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('answer archived');
});

// DELETE ALL ANSWERS WHERE QUESTION ID (change archived to 1)
answersRoutes.delete(
  '/allAnswers/:questionId',
  validateToken,
  async (req, res) => {
    const { questionId } = req.params;
    const updateResult = await deleteAllAnswers(Number(questionId));
    // console.log('updateResult ===', updateResult);

    if (updateResult === false) {
      res.status(500).json('something went wrong');
      return;
    }
    res.status(201).json('all answers archived');
  }
);

answersRoutes.get('/answers/:answerId', async (req, res) => {
  const { answerId } = req.params;
  const getResult = await findAnswersById(answerId);
  if (getResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(200).json(getResult);
});

answersRoutes.get('/answers', async (req, res) => {
  const getResult = await getAllAnswers();
  // console.log('getResult ===', getResult);
  if (getResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(200).json(getResult);
});

module.exports = answersRoutes;
