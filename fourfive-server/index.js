require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const weighRoutes = require("./routes/weigh");
const errorHandler = require("./handlers/error");

const PORT = 8081;
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", weighRoutes);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
