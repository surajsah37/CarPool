
// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   ride: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Ride"
//   },
//   seatsBooked: Number
// });

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },

  seatsBooked: Number,

  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },

  cancellationReason: {
    type: String,
    default: "",
  },

  cancelledAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);