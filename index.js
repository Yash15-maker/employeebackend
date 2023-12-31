const express = require("express");
const bodyParser = require("body-parser");

//local imports
// const { initializingPassport } = require("./passportConfig.js");
// const passport = require("passport");
// const session = require("express-session");
const cors = require("cors");
const connectDb = require("./db.js");
const employeeRoutes = require("./controllers/employee.controller");
const userRouter = require("./controllers/authController.js");

const { errorHandler } = require("./middlewares");

const app = express();
//middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// initializingPassport(passport);
app.use(bodyParser.json());
app.use(cors());
// app.set("view engine", "ejs");
app.use("/api/employees", employeeRoutes);
app.use("/api/auth/", userRouter);
// app.use(
//   session({
//     secret: "Ym15",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("db connection succeeded.");
    app.listen(8080, () => console.log("server started at 8080."));
  })
  .catch((err) => console.log(err));
