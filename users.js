const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Users base");
});

router.get("/about", (req, res) => {
  res.send("Users about");
});

module.exports = router;
