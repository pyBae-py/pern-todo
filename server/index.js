const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize("perntodo", "athar", "12345", {
  host: "localhost",
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const Todo = sequelize.define(
  "todo",
  {
    // attributes
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Todo is already there!"
      }
    }
  },
  {
    // options
  }
);
app.post("/todos", (req, res) => {
  try {
    Todo.create({
      description: req.body.description
    }).then(todo => {
      res.json("Todo Created");
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Get all todos

app.get("/todos", (req, res) => {
  try {
    Todo.findAll({
      order: [["description", "ASC"]]
    }).then(todo => {
      res.json(todo);
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    Todo.update(
      { description: description },
      {
        where: {
          id: id
        }
      }
    ).then(() => {
      console.log("Done");
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Todo.destroy({
      where: {
        id: id
      }
    }).then(() => {
      console.log("Done");
    });
  } catch (error) {
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
