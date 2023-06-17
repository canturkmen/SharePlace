const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places");
const userRoutes = require("./routes/users");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST",
    "GET",
    "DELETE",
    "PATCH"
  );
  next();
});

app.use("/api/places", placesRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "An Unknown Error Occured!",
  });
});

mongoose
  .connect(
    "mongodb+srv://CanTurkmen:CanTurkmen12@cluster0.t76i6e6.mongodb.net/SharePlace"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
