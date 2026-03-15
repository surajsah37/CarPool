const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  ride:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Ride"
  },

  seatsBooked:{
    type:Number
  }

});

module.exports = mongoose.model("Booking", bookingSchema);