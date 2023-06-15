const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
  {
    pid: "p1",
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

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed. Please check your input", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (err) {
    return next(err);
  }

  const createdPlace = {
    pid: uuidv4(),
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

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed. Please check your input", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.pid === placeId),
  };

  const placeIndex = DUMMY_PLACES.findIndex((place) => place.pid === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((place) => place.pid === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.pid !== placeId);
  res.status(200).json({ message: "Deleted Place" });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places || places.length === 0) {
    throw new HttpError(
      "Could not find places with the specified user ID",
      404
    );
  }

  res.json({ places: places });
};

exports.createPlace = createPlace;
exports.getPlaceById = getPlaceById;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getPlacesByUserId = getPlacesByUserId;
