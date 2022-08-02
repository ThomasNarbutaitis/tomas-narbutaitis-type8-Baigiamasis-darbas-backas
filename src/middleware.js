/* eslint-disable prefer-destructuring */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('req.body===', req.body);
  }
  next();
}

async function validateLoginUser(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().trim().min(4).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}

async function validateRegisterUser(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().trim().lowercase().required(),
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().min(4).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  if (!tokenFromHeaders) {
    res.status(401).json({ success: false, error: 'no token' });
    return;
  }
  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const userId = tokenPayload.userId;
    req.userId = userId;
    // console.log('tokenPayload ===', tokenPayload);
    next();
  } catch (error) {
    console.log('tokenPayload error ===', error);
    res.status(403).json({ success: false, error: 'invalid token' });
  }
}

module.exports = {
  showBody,
  validateLoginUser,
  validateRegisterUser,
  validateToken,
};
