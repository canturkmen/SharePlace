const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

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
