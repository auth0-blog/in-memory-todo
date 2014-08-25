var db     = require('./db'),
    jwt    = require('express-jwt'),
    dotenv = require('dotenv');

dotenv.load();

exports.anonymousTodo = function(app) {
  app.get('/api/open/todos', function(req, res) {
    res.send(200, db.General.getAll());
  });

  app.get('/api/open/todos/:id', function(req, res) {
    res.send(200, db.General.get(req.params.id));
  });

  app.put('/api/open/todos/:id', function(req, res) {
    res.send(200, db.General.update(req.params.id, req.body));
  });

  app.post('/api/open/todos', function(req, res) {
    res.send(201, db.General.add(req.body));
  });

  app.delete('/api/open/todos/:id', function(req, res) {
    res.send(200, db.General.remove(req.params.id));
  });
}

exports.userTodo = function(app) {

  var jwtCheck = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
  });

  app.use('/api/todos', jwtCheck);

  app.get('/api/todos', function(req, res) {
    res.send(200, db.Users.get(req.user.sub).getAll());
  });

  app.get('/api/todos/:id', function(req, res) {
    res.send(200, db.Users.get(req.user.sub).get(req.params.id));
  });

  app.put('/api/todos/:id', function(req, res) {
    res.send(200, db.Users.get(req.user.sub).update(req.params.id, req.body));
  });

  app.post('/api/todos', function(req, res) {
    res.send(201, db.Users.get(req.user.sub).add(req.body));
  });

  app.delete('/api/todos/:id', function(req, res) {
    res.send(200, db.Users.get(req.user.sub).remove(req.params.id));
  });
}
