const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const Dbconnect = require("./config/DbConnection");
const path = require("./Routes/CategoryRoute");
const path2 = require("./Routes/TaskRoute");
const path3 = require("./Routes/UserRoute");
const bodyParser = require("body-parser");

Dbconnect();

app.use(express.json());
app.use("/api/Category", path);
app.use("/api/Task", path2);
app.use("/api/User", path3);
app.listen(port, () => {
  console.log(`port ${port}`);
});
