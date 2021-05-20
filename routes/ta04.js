//TA04 PLACEHOLDER
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.session.style =
    typeof req.session.style === "undefined" ? false : req.session.style;
  req.session.counter =
    typeof req.session.counter === "undefined" ? 0 : req.session.counter;

  res.render("pages/ta04", {
    title: "Team Activity 05",
    path: "/ta04", // For pug, EJS
    activeTA04: true, // For HBS
    contentCSS: true, // For HBS
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.get("/change-style", (req, res, next) => {
  req.session.style = !req.session.style;

  res.render("pages/ta04", {
    path: "/ta04/change-style",
    title: "Team Activity 04",
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.post("/counter", (req, res, next) => {
  if (req.body.increase === "true") {
    req.session.counter++;
  } else {
    req.session.counter--;
  }

  res.render("pages/ta04", {
    path: "/ta04/update-counter",
    title: "Team Activity 04",
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.get("/reset", (req, res, next) => {
  req.session.destroy();
  res.redirect("/ta04");
});

module.exports = router;
