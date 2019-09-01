import Todo from '../model/Todo'

class TodoService {
    constructor(){
        this.todos = [];
    }

    getAll(){
        return this.todos;
    }

    getById(id){
        const exists = this.todos.filter(item => item.id === id);
        if(exists.length > 0){
            return exists.pop();
        }
        return null;
    }

    /**
     * @param string text
     * the Todo text
     * 
     * @returns bool
     */
    addTodo(text){
        const newTodo = new Todo(text);
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(id){
        const exist = this.getById(id);
        if(exist){
            this.todos = this.todos.filter(item => item.id !== id);
            return exist;
        } else {
            return false;
        }
    }

    update(todo){
        const exist = this.getById(todo.id);
        if(exist){
            this.todos = this.todos.map(item => {
                if(item.id == todo.id){
                    item.text = todo.text;
                    item.completed = todo.completed;
                } 
                return item;
            });
            return this.getById(todo.id);
        } else {
            return false;
        }
    }
}

export default TodoService;