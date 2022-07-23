require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userOneRoutes = require("./routes/user");
const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userOneRoutes);

require('dotenv').config();

const mongoose = require('mongoose'); 

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(console.error);
 

const Todo = require('./models/todo');

app.get('/api/todos/:userId', async (req, res) => {
    const todos = await Todo.find({ authorId : req.params.userId});
    res.json(todos);
});

app.post('/api/todo/new', (req, res) => {
    const todo = new Todo({
        authorId:req.body.authorId,
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/api/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);
});

app.get ('/api/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete; // to be true value

    todo.save();
    res.json(todo);
})


app.listen(process.env.PORT || 3001, () => console.log("Server listening on port 3001"));


app.use(express.json());
app.use(cors());

