const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    pid: "p1",
    uid: "u1",
    title: "Empire States Building",
    description: "An iconic building in New York",
  },
];

export const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.pid === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find the place with the specified place ID", 404)
    );
  }

  res.json({ place: place });
};

export const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.uid === userId);

  if (!place) {
    throw new HttpError(
      "Could not find the place with the specified user ID",
      404
    );
  }

  res.json({ place: place });
};
