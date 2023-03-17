const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places");

const app = express();

const HttpError = require("./models/http-error");

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "An Unknown Error Occured!",
  });
});

app.listen(5000);
