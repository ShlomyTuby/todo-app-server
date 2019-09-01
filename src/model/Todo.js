const uuid = require('uuid');
class Todo {
    constructor(text) {
        this.text = text;
        this.id = uuid();
        this.completed = false;
    }
}

module.exports = Todo;