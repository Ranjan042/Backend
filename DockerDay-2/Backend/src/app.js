const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! i am backend running on port 3000 using docker");
});

app.get("/api/data", (req, res) => {
  const data = {
    message: "This is some data from the backend!",
  };
  res.json(data);
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  res.json(users);
});


module.exports = app;