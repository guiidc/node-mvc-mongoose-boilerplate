const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const csrf = require('csurf');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.emit('dbConnected'))
.catch((err) => console.log(err));

const route = require('./routes');
const { checkCsrfToken, generateCsrf } = require('./src/middlewares/csrf');

const app = express();
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const sessionsOptions = session({
  secret: process.env.MONGOSTORESECRET,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2,
    httpOnly: true,
  }
})
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(sessionsOptions);
app.use(helmet());
app.use(csrf());
app.use(checkCsrfToken);
app.use(generateCsrf);
app.use(route);

const PORT = process.env.PORT || 3000;

app.on('dbConnected', () => {
  app.listen(PORT, () => console.log('It\'s alive!!!'));
});
