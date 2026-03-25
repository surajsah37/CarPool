const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  fromCity: String,
  toCity: String,
  date: Date,

  // ❌ REMOVE USER PRICE CONTROL
  price: {
    type: Number,
    default: 0,
  },

  seatsAvailable: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "approved","rejected"],
    default: "pending",
  },
  rejectionReason: {
  type: String,
  default: ""
}
});

module.exports = mongoose.model("Ride", rideSchema);