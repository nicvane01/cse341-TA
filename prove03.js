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

const cors = require("cors"); // Place this with other requires (like 'path' and 'express')
const corsOptions = {
  origin: "https://<your_app_name>.herokuapp.com/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4,
};

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://class-project:2011102778@cluster0.egvmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoConnect(() => {
  app.listen(PORT);
});
