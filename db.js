var TodoList = require('./todoList'),
    _        = require('lodash');

var defaultTodos = [{
    id: 1,
    name: 'Buy some milk',
    description: 'I need milk for energy'
  },
  {
    id: 2,
    name: 'Buy some chocolate',
    description: 'NOM NOM chocolate'
  }];

exports.General = new TodoList(_.cloneDeep(defaultTodos));

var userTodos = {};
exports.Users = {
  get: function(userId) {
    var userTodo = userTodos[userId];
    if (!userTodo) {
      userTodo = userTodos[userId] = new TodoList(_.cloneDeep(defaultTodos));
    }
    return userTodo;
  }
}



