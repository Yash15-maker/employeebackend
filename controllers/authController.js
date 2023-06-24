const express = require("express");
const router = express.Router();
const collections = require("../models/authModel");
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collections.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, userType } = req.body;

  const data = {
    email: email,
    password: password,
    userType: userType,
  };

  try {
    const check = await collections.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      await collections.insertMany([data]);
      res.send({
        msg: { data },
      });
    }
  } catch (e) {
    res.json("fail");
  }
});

module.exports = router;
