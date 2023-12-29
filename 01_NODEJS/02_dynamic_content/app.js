const express = require("express");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const rootDir = require("./util/path");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");
// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
