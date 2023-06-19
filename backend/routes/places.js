const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const placesController = require("../controllers/places");
const fileUpload = require("../middleware/file-upload");

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

router.get("/:pid", placesController.getPlaceById);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", placesController.deletePlace);

router.get("/user/:uid", placesController.getPlacesByUserId);

module.exports = router;
