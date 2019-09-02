import express from "express";
import TodoService from "../services/TodoService";
const router = express.Router();
const todoService = new TodoService();

/**
 * get all todos
 * GET /todos/
 */
router.get("/", (req, res) => {
  const todos = todoService.getAll();
  return res.json(todos);
});

/**
 * get single todo by todo_id
 * GET /todos/:todo_id
 */
router.get("/:todo_id", (req, res) => {
  const { todo_id } = req.params;
  const todo = todoService.getById(todo_id);
  return res.json(todo);
});

/**
 * create todo
 * POST /todos/
 */
router.post("/", (req, res) => {
  const { text } = req.body;
  const newTodo = todoService.addTodo(text);
  if (newTodo) {
    res.json({ success: true, todo: newTodo });
  } else {
    res.status(404).json({ success: false, message: "invalid text" });
  }
});

/**
 * delete todo by todo_id
 * DELETE /todos/:todo_id
 */
router.delete("/:todo_id", (req, res) => {
  const { todo_id } = req.params;
  const todo = todoService.deleteTodo(todo_id);
  if (todo) {
    res.json({
      success: true,
      todo
    });
  } else {
    res.status(404).json({ success: false, message: "Faild to delete todo" });
  }
});


/**
 * Update a todo item by id
 * PATCH /todos/:todo_id
 */
router.patch("/:todo_id", (req, res) => {
  const { todo_id } = req.params;
  const { text, completed } = req.body;
  const todo = todoService.update({ id: todo_id, text, completed });
  if (todo) {
    res.json({
      success: true,
      todo
    });
  } else {
    res.status(404).json({ success: false, message: "Faild to update todo" });
  }
});

export default router;
