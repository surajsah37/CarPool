const router = require("express").Router();
const {
  bookRide,
  getMyBookings,
  getAllBookings
} = require("../controllers/bookingController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const { cancelBooking } = require("../controllers/bookingController");
router.delete("/cancel/:id", verifyToken, cancelBooking);
// ✅ BOOK RIDE
router.post("/book", verifyToken, bookRide);

// ✅ GET MY BOOKINGS (IMPORTANT)
router.get("/my/:userId", verifyToken, getMyBookings);
 


// ✅ USER BOOK RIDE
router.post("/book", verifyToken, bookRide);
// ✅ USER BOOKINGS
router.get("/my", verifyToken, getMyBookings);
// ✅ ADMIN BOOKINGS
router.get("/all", verifyToken, isAdmin, getAllBookings);
router.get("/my", verifyToken, getMyBookings);
module.exports = router;