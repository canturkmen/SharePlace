const express = require("express");
const placesController = require("../controllers/places");

const router = express.Router();

router.post("/", placesController.createPlace);

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlaceByUserId);

module.exports = router;
