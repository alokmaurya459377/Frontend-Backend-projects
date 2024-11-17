const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const router = require("./router/player.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/teamindia";

main()
  .then(() => {
    console.log("connected to databases");
  })
  .catch((err) => {
    console.log(err);
  })

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use("/players", router);

app.get("/", (req, res) => {
  res.render("players/home.ejs");
})

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page is not found!"));
})

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error/error.ejs", { message });
  // res.status(statusCode).send(message);
})

app.listen(port, () => {
  console.log(`server is listing to ${port}`);
})