var createError = require('http-errors');
var express = require('express'),
bodyParser = require("body-parser");
port = 3060;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// load mongoose package
var mongoose = require('mongoose');
var cors = require('cors');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inform = require('./routes/inform');
var image = require('./routes/image');

var app = express();
//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
  });
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inform', inform);
app.use('/image', image);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(cors());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb+srv://clemmy:10235035royal@cluster0.frwjn.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

let conn = mongoose.connection
let gfs
    conn.once('open', () => {
        //initialize our stream
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('imageUpload')
    })
module.exports = app;
