const express = require("express");
const bodyParser = require("body-parser");

//local imports
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
app.use(bodyParser.json());
app.use(cors());
app.use("/api/employees", employeeRoutes);
app.use("/api/auth/", userRouter);
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("db connection succeeded.");
    app.listen(8080, () => console.log("server started at 8080."));
  })
  .catch((err) => console.log(err));
