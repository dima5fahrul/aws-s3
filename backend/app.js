require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Tambahkan require untuk 'cors'

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mahasiswaRouter = require('./routes/mahasiswa');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3001'
})); // Tambahkan middleware 'cors' di sini
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mahasiswa', mahasiswaRouter);

module.exports = app;
