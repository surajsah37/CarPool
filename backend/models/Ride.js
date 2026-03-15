const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({

  fromCity: String,
  toCity: String,
  date: String,
  price: Number,
  seatsAvailable: Number

});

module.exports = mongoose.model("Ride", rideSchema);