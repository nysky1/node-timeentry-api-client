const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'VolunteerTrack - Home'
    }
  );
});
app.get('/register', (req, res) => {
  res.render(
    'register',
    {
      title: 'VolunteerTrack - Register'
    }
  );
});
app.get('/login', (req, res) => {
  res.render(
    'login',
    {
      title: 'VolunteerTrack - Login'
    }
  );
});
app.get('/dashboard', (req, res) => {
  res.render(
    'dashboard',
    {
      title: 'VolunteerTrack - Dashboard'
    }
  );
});
app.get('/activities', (req, res) => {
  res.render(
    'activities',
    {
      title: 'VolunteerTrack - Activities'
    }
  );
});
app.get('/activity_new', (req, res) => {
  res.render(
    'activity_new',
    {
      title: 'VolunteerTrack - New Activity'
    }
  );
});

app.listen(port,'0.0.0.0', () => {
  debug(`listening on port ${chalk.green(port)}`);
});
