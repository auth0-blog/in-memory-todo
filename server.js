var logger        = require('morgan'),
    cors          = require('cors'),
    http          = require('http'),
    express       = require('express'),
    errorhandler  = require('errorhandler'),
    routes        = require('./routes'),
    cors          = require('cors'),
    bodyParser    = require('body-parser');

var app = express();

// Parsers
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

routes.anonymousTodo(app);
routes.userTodo(app);

var port = process.env.PORT || 3000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

