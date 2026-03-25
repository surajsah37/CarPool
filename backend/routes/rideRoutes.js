// const router = require("express").Router();
// const {
//   offerRide,
//   getRides
// } = require("../controllers/rideController");

// const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
// // ✅ ONLY ADMIN CAN CREATE RIDE
// router.post("/offer", verifyToken, isAdmin, offerRide);
// // ✅ USERS CAN VIEW RIDES
// router.get("/", getRides);
// module.exports = router;


const router = require("express").Router();

const {
  offerRide,
  getRides
} = require("../controllers/rideController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ✅ ONLY ADMIN CAN CREATE RIDE
router.post("/offer", verifyToken, isAdmin, offerRide);

// ✅ USERS CAN VIEW RIDES
router.get("/", getRides);

module.exports = router;