const Booking = require("../models/Booking");
const Ride = require("../models/Ride");

exports.bookRide = async (req,res)=>{

  try{

    const {rideId,userId,seatsBooked} = req.body;

    const ride = await Ride.findById(rideId);

    if(!ride){
      return res.status(404).json("Ride not found");
    }

    if(ride.seatsAvailable < seatsBooked){
      return res.status(400).json("Not enough seats available");
    }

    ride.seatsAvailable -= seatsBooked;

    await ride.save();

    const booking = new Booking({
      user:userId,
      ride:rideId,
      seatsBooked
    });

    await booking.save();

    res.json({
      message:"Ride booked successfully",
      booking
    });

  }

  catch(error){

    res.status(500).json(error);

  }

};
exports.getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.params.userId
    }).populate("ride");

    res.json(bookings);

  } catch (error) {

    res.status(500).json(error);

  }

};