const express = require("express");
const app = express();

const ExpressError = require("./expressError");
const itemsRoutes = require("./routes");

app.use(express.json());
app.use("/items", itemsRoutes);

app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.msg;

  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = app;
