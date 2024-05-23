const express = require("express");
const toDorouter = express.Router();
toDorouter.get("/", (req, res) => {
  console.log("in todoRoute get/");
  console.log(req.user);
  res.json({ message: `Hello, ${req.user.username}` });
});
toDorouter.post("/", (req, res) => {
  res.send({ message: "todo added" });
});
toDorouter.put("/:id", (req, res) => {});
toDorouter.delete("/:id", (req, res) => {});
toDorouter.get("/all-status", (req, res) => {});

module.exports = toDorouter;
