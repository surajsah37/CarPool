// const router = require("express").Router();
// const { rejectRide } = require("../controllers/rideController");
// const { getMyRides } = require("../controllers/rideController");
// const {
//   offerRide,
//   getRides,
//   getAllRidesAdmin,
//   approveRide
// } = require("../controllers/rideController");

// const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// // ✅ USER REQUEST RIDE
// router.post("/offer", verifyToken, offerRide);
// router.put("/reject/:id", verifyToken, isAdmin, rejectRide);
// router.get("/my", verifyToken, getMyRides);
// // ✅ USERS SEE ONLY APPROVED
// router.get("/", getRides);

// // ✅ ADMIN PANEL
// router.get("/admin", verifyToken, isAdmin, getAllRidesAdmin);
// router.put("/approve/:id", verifyToken, isAdmin, approveRide);

// module.exports = router;
const router = require("express").Router();

const {
  offerRide,
  getRides,
  getAllRidesAdmin,
  approveRide,
  rejectRide,
  getMyRides
} = require("../controllers/rideController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// USER
router.post("/offer", verifyToken, offerRide);
router.get("/my", verifyToken, getMyRides);

// PUBLIC
router.get("/", getRides);

// ADMIN
router.get("/admin", verifyToken, isAdmin, getAllRidesAdmin);
router.put("/approve/:id", verifyToken, isAdmin, approveRide);
router.put("/reject/:id", verifyToken, isAdmin, rejectRide);

module.exports = router;