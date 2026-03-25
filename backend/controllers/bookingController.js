const Booking = require("../models/Booking");
const Ride = require("../models/Ride");
exports.bookRide = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG

    const { rideId, userId, seatsBooked } = req.body;

    if (!rideId || !userId) {
      return res.status(400).json("Missing data");
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json("Ride not found");
    }

    if (ride.seatsAvailable < seatsBooked) {
      return res.status(400).json("Not enough seats available");
    }

    // decrease seats
    ride.seatsAvailable -= seatsBooked;
    await ride.save();

    const booking = new Booking({
      user: userId,
      ride: rideId,
      seatsBooked
    });

    await booking.save();

    res.json({
      message: "Ride booked successfully",
      booking
    });

  } catch (error) {
    console.log("BOOKING ERROR:", error); // 🔥 VERY IMPORTANT
    res.status(500).json("Server error");
  }
};
exports.getMyBookings = async (req, res) => {
  try {

    // ✅ get user from token
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("ride");

    res.json(bookings);

  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
// ✅ ADMIN ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("ride")
      .populate("user", "name email");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};
// exports.cancelBooking = async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const { reason } = req.body;

//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json("Booking not found");
//     }

//     // already cancelled check
//     if (booking.status === "cancelled") {
//       return res.status(400).json("Already cancelled");
//     }

//     // 🔄 return seats
//     const ride = await Ride.findById(booking.ride);

//     if (ride) {
//       ride.seatsAvailable += booking.seatsBooked;
//       await ride.save();
//     }

//     // ❌ update instead of delete
//     booking.status = "cancelled";
//     booking.cancelReason = reason;

//     await booking.save();

//     res.json({ message: "Booking cancelled successfully" });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Error cancelling booking");
//   }
// };
exports.cancelBooking = async (req, res) =>  {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    booking.cancellationReason = reason;
    booking.cancelledAt = new Date();

    await booking.save();

    res.json({ message: "Cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};