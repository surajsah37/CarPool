const router = require("express").Router();

const { bookRide, getMyBookings } = require("../controllers/bookingController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/book", verifyToken, bookRide);

router.get("/mybookings/:userId", verifyToken, getMyBookings);

module.exports = router;