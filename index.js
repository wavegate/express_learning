// const users = require("./users.js");

// const app = require("express")();

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.use("/users", users);

// app.listen(8000, () => {
//   console.log(`listening on http://localhost:8000`);
// });

const app = require("express")();

let counter = 0;

const addOne = (req, res, next) => {
  counter++;
  next();
};

app.use(addOne);

app.get("/", (req, res) => {
  res.send(counter);
});

app.listen(3000);
