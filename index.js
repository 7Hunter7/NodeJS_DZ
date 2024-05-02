const express = require("express");
const fs = require("fs");
const path = require("path");
const { schema } = require("./shema");
const { checkParams, checkBody } = require("./validator");
const pathToFiles = path.join(__dirname, "users.json");
const port = 3000;
let newID = 1;
const app = express();

app.use(express.json());
// Получить всех пользователей
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFiles, "utf-8"));
  if (users) {
    res.send({ users });
  } else {
    res.status(404);
    res.send({ error: "Users not found" });
  }
});

// Получить конкретного пользователя
app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFiles, "utf-8"));
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// Обновление конкретного пользователя
app.put("/users/:id", checkParams(schema), checkBody(schema), (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFiles, "utf-8"));
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.city = req.body.city;
    user.age = req.body.age;
    res.send({ user });
    fs.writeFileSync(pathToFiles, JSON.stringify(users));
  } else {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// Создание нового пользователя
app.post("/users", checkBody(schema), (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFiles, "utf-8"));
  const user = {
    id: ++newID,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    city: req.body.city,
    age: req.body.age,
  };
  users.push(user);
  fs.writeFileSync(pathToFiles, JSON.stringify(users));
  res.send({ user });
});

// Удаление конкретного пользователя
app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFiles, "utf-8"));
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    fs.writeFileSync(pathToFiles, JSON.stringify(users));
    res.status(200);
    res.send({ status: "User deleted" });
  } else {
    res.status(404);
    res.send({ error: "User not found" });
  }
});

// Обработка несуществующих роутов
app.use((req, res) => {
  res.status(404).send({
    message: "URL not found",
  });
});

app.listen(port, () => console.log(`Сервер запущен, порт: ${port}`));
