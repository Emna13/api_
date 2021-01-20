const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();

//4-Create the Schema
const User = require("./models/User");

//3-Setup env variables
require("dotenv").config({ path: "./config/.env" });

//2-Connect DB
connectDB();

//5-Start the CRUD
//GET all users path:/api/users
app.use(express.json());
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
});

//GET user by id
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

//POST : Add User
app.post("/api/add_user", (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, lastName, email, phone });
  newUser
    .save()
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

//EDIT: Update a User by id
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

//DELETE: Delete a User by id
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

//1-start the server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err
    ? console.error(err)
    : console.log(`The server is running on port ${PORT}`);
});
