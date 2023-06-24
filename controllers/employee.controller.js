const express = require("express");
const router = express.Router();

const Employee = require("../models/employee.model");
const { generateCrudMethods } = require("../services");
const employeeCrud = generateCrudMethods(Employee);
const { validateDbId, raiseRecord404Error } = require("../middlewares");

router.get("/home", (req, res, next) => {
  employeeCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
  employeeCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/home", (req, res, next) => {
  employeeCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res, next) => {
  employeeCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.get("/search/:key", async (req, resp) => {
  let data = await Employee.find({
    $or: [
      { phone: { $regex: req.params.key } },
      {
        fullName: { $regex: req.params.key },
      },
    ],
  });
  resp.send(data);
});

router.delete("/:id", validateDbId, (req, res) => {
  employeeCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

module.exports = router;
