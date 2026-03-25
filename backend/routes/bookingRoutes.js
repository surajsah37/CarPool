const router = require("express").Router();

const {
  bookRide,
  getMyBookings,
  getAllBookings,
  cancelBooking
} = require("../controllers/bookingController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ✅ BOOK RIDE
router.post("/book", verifyToken, bookRide);

// ✅ USER BOOKINGS
router.get("/my", verifyToken, getMyBookings);

// ✅ ADMIN BOOKINGS
router.get("/all", verifyToken, isAdmin, getAllBookings);

// ✅ CANCEL BOOKING (IMPORTANT)
router.put("/cancel/:id", verifyToken, cancelBooking);

module.exports = router;