const path = require("path");
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");

const express = require("express");
const { Recoverable } = require("repl");
const app = express();

const mongoConnect = require("./util/database").mongoConnect;

app.set("view engine", "ejs");
app.set("views, views");

const adminRoutes = require("./routes/p03admin");
const shopRoutes = require("./routes/p03shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
  app.listen(PORT);
});
