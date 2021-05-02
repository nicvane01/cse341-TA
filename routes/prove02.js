const path = require("path");

const express = require("express");

const router = express.Router();
const titles = [];
const summaries = [];

router.post("/add-book", (req, res) => {
  titles.push({ title: req.body.title });
  summaries.push({ summary: req.body.summary });
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("pages/prove02", {
    titles: titles,
    summaries: summaries,
    pageTitle: "Show Books",
  });
});

router.get("/add-book", (req, res) => {
  res.render("pages/add-book");
});

exports.routes = router;
exports.titles = titles;
exports.summaries = summaries;
