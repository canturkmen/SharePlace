const { v4: uuidv4 } = require('uuid');
const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    pid: "p1",
    uid: "u1",
    title: "Empire States Building",
    description: "An iconic building in New York",
    location: {
      lat: 40.7484474,
      lng: -73.98711516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.pid === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find the place with the specified place ID", 404)
    );
  }

  res.json({ place: place });
};

const getPlaceByUserId = (req, res, next) => {
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

exports.createPlace = createPlace;
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
