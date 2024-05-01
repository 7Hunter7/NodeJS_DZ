const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
const path = require("path");
const pathToCounter = path.join(__dirname, "./Counter.json");


app.get("/", (req, res) => {
  const Count = JSON.parse(fs.readFileSync(pathToCounter, "utf-8"));
  Count.home += 1;
  res.send(
    `<h1>Главная страница</h1><p>Просмотров: ${Count.home}</p><a href="/about">Ссылка на страницу About</a>`
  );
  fs.writeFileSync(pathToCounter, JSON.stringify(Count));
});

app.get("/about", (req, res) => {
  const Count = JSON.parse(fs.readFileSync(pathToCounter, "utf-8"));
  Count.about += 1;
  res.send(
    `<h1>Страница About</h1><p>Просмотров: ${Count.about}</p><a href="/">Ссылка на страницу Home</a>`
  );
  fs.writeFileSync(pathToCounter, JSON.stringify(Count));
  console.log(Count);
});

app.listen(port, () => console.log(`Сервер запущен, порт: ${port}`));
