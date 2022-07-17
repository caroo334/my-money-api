const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRouter = require('./routes/users');

app.use('/', usersRouter);

app.listen(port, () => console.log(`Express server running on port ${port}`));