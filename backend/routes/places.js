const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();

const DUMMY_PLACES = [
  {
    pid: "p1",
    uid: "u1",
    title: "Empire States Building",
    description: "An iconic building in New York",
  },
];

router.get("/", (req, res, next) => {
  console.log("GET request in places");
  res.json({ message: "It Works!" });
});

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.pid === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find the place with the specified place ID", 404)
    );
  }

  res.json({ place: place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.uid === userId);

  if (!place) {
    throw new HttpError(
      "Could not find the place with the specified user ID",
      404
    );
  }

  res.json({ place: place });
});

module.exports = router;
