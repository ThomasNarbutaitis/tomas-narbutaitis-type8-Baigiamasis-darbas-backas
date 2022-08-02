/* eslint-disable camelcase */
const express = require('express');
const { validateToken } = require('../middleware');
const {
  getQuestions,
  addQuestionToDb,
  findQuestionByIdJoinedUsername,
  updateQuestion,
  deleteQuestion,
} = require('../model/questionModel');

const questionsRoutes = express.Router();

// GET QUESTIONS
questionsRoutes.get('/questions', async (req, res) => {
  const getResult = await getQuestions();
  if (getResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(200).json(getResult);
});

// GET QUESTIONS BY ID JOINED WITH USERS
questionsRoutes.get('/questions/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const getResult = await findQuestionByIdJoinedUsername(questionId);
  if (getResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(200).json(getResult);
});

questionsRoutes.post('/questions', validateToken, async (req, res) => {
  const { user_id, question } = req.body;

  const newQuestion = {
    user_id,
    question,
  };

  const insertResult = await addQuestionToDb(
    newQuestion.user_id,
    newQuestion.question
  );
  // console.log('insertResult ===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('question created');
});

// UPDATE QUESTION
questionsRoutes.patch(
  '/questions/:questionId',
  validateToken,
  async (req, res) => {
    const { questionId } = req.params;
    const { question } = req.body;
    const updateResult = await updateQuestion(question, Number(questionId));
    // console.log('updateResult ===', updateResult);

    if (updateResult === false) {
      res.status(500).json('something went wrong');
      return;
    }
    res.status(201).json('question updated');
  }
);

// DELETE QUESTION (change archived to 1)
questionsRoutes.delete(
  '/questions/:questionId',
  validateToken,
  async (req, res) => {
    const { questionId } = req.params;
    const updateResult = await deleteQuestion(Number(questionId));
    // console.log('updateResult ===', updateResult);

    if (updateResult === false) {
      res.status(500).json('something went wrong');
      return;
    }
    res.status(201).json('question archived');
  }
);

module.exports = questionsRoutes;
