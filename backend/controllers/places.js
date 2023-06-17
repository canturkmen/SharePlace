const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Place = require("../models/place");
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
    return next(
      new HttpError("Invalid inputs passed. Please check your input", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (err) {
    return next(err);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwherearethosemorgans.com%2Fhow-to-visit-the-empire-state-building%2F&psig=AOvVaw2PDy9SzlxfnNssyYVSneQ9&ust=1687087599602000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOD605qZyv8CFQAAAAAdAAAAABAI",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating Place Failed, Please Try Again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    return next(
      new HttpError("Could not find the place with the specified place ID", 404)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed. Please check your input", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a place",
      500
    );
    return next(error);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not update the place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a place",
      500
    );
    return next(error);
  }  

  try {
    await place.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a place",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Place" });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not find a place",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places with the specified user ID",
      404
    );
    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

exports.createPlace = createPlace;
exports.getPlaceById = getPlaceById;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getPlacesByUserId = getPlacesByUserId;
