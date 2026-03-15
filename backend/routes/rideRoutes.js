const router = require("express").Router();

const {
  offerRide,
  getRides
} = require("../controllers/rideController");

router.post("/offer", offerRide);

router.get("/", getRides);

module.exports = router;