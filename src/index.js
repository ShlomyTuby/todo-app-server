import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import todosRoutes from "./api/todos.js";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Todos API in route /todos/"));
app.use("/todos", todosRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  process.send({ message: "APPLICATION_READY" });
});
