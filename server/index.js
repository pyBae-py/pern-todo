const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1)",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const aTodo = await pool.query("SELECT * FROM todo WHERE todo_id=$1 ", [
      id
    ]);
    res.json(aTodo);
  } catch (error) {
    console.error(error.message);
  }
});
// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2", [
      description,
      id
    ]);
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
