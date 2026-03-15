const Ride = require("../models/Ride");

exports.offerRide = async (req, res) => {
  try {

    const { fromCity, toCity, date, price, seatsAvailable } = req.body;

    const ride = new Ride({
      fromCity,
      toCity,
      date,
      price,
      seatsAvailable
    });

    await ride.save();

    res.json({
      message: "Ride created successfully",
      ride
    });

  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getRides = async (req, res) => {

  try {

    const rides = await Ride.find();

    res.json(rides);

  } catch (error) {

    res.status(500).json(error);

  }

};