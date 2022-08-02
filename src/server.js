const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

const { showBody } = require('./middleware');
const userRoutes = require('./routes/userRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
const answersRoutes = require('./routes/answersRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(showBody);
app.use(cors());

// ROUTES
app.use('/', userRoutes);
app.use('/', questionsRoutes);
app.use('/', answersRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Server is running on port', PORT));
