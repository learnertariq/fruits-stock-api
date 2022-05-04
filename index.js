const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");

const rootRouter = require("./routes/root");
const fruitsRouter = require("./routes/fruits");
const loginRouter = require("./routes/login");

// import middlewares
const errorsMiddleware = require("./middlewares/errors");

const app = express();
if (app.get("env") !== "production") {
  require("dotenv").config();
}

// Connecting to database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lzyhs.mongodb.net/fruits-stock?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to mongoose"));

// middlewares
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-auth-token, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", " x-auth-token");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", rootRouter);
app.use("/fruits", fruitsRouter);
app.use("/login", loginRouter);
app.use(errorsMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
