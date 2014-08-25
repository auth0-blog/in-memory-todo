var _             = require('lodash'),
    StatusError   = require('./statusError');

function TodoList(arr) {
  this.list = arr || [];
}

TodoList.prototype.getLastId = function() {
  return _.max(this.list, 'id').id;
}

TodoList.prototype.add = function(elem) {
  if (!elem.name) {
    throw new StatusError("You must send element's name", 400);
  }

  var newElem = _.pick(elem, 'name', 'description');
  newElem.id = this.getLastId() + 1;

  this.list.push(newElem);
  return newElem;
}

TodoList.prototype.remove = function(id) {
  var removeIdx = _.findIndex(this.list, {id: parseInt(id, 10)});

  if (removeIdx < 0) {
    throw new StatusError("Element not found", 404);
  }

  return todos.splice(removeIdx, 1);
}

TodoList.prototype.get = function(id) {
  var todo = _.find(this.list, {id: parseInt(id, 10)});

  if (!todo) {
    throw new StatusError("Element not found", 404);
  }

  return todo;
}

TodoList.prototype.getAll = function(id) {
  return this.list;
}

TodoList.prototype.update = function(id, newTodo) {
  var todo = _.find(this.list, {id: id});

  if (!todo) {
    throw new StatusError("Element not found", 404);
  }

  if (!newTodo || !newTodo.name) {
    throw new StatusError("Sending a new TODO and a name is mandatory", 400);
  }

  _.extend(todo, _.pick(newTodo, 'name', 'description'));

  return todo;
}

module.exports = TodoList;

