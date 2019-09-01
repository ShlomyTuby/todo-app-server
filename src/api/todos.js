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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todoService.getById(id);
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
 * delete todo
 * DELETE /todos/:id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todoService.deleteTodo(id);
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
 * @param string id
 * the todo id
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = todoService.update({ id, text, completed });
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
