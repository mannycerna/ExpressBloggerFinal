const createError = require('http-errors');

const PORT = process.env.PORT || 3001;



const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


//load environment variables from .env (.env is the default file)

require("dotenv").config();
const {mongooseConnect} = require('./mongoose.js');
mongooseConnect();

//register routes.
//NOTE: notice how there is .js after index, this is because
// we exported the module as index. 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');

//connecting to mongo db 
// const { mongoConnect } = require('./mongo.js');
// mongoConnect();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up logger and cookie parser 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//allows use to load static files from public 
app.use(express.static(path.join(__dirname, 'public')));

//use CORS
app.use(cors());

//register routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Return the client
app.get('/blogs*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


module.exports = app;
