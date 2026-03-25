const Ride = require("../models/Ride");

// ✅ CREATE RIDE (ADMIN)
exports.offerRide = async (req, res) => {
  try {

    const { fromCity, toCity, date, price, seatsAvailable } = req.body;

    if (!fromCity || !toCity || !date || !price || !seatsAvailable) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // const ride = new Ride({
    //   fromCity,
    //   toCity,
    //   date,
    //   price,
    //   seatsAvailable
    // });
    const ride = new Ride({
  fromCity: fromCity.trim().toLowerCase(),
  toCity: toCity.trim().toLowerCase(),
  date: new Date(date),   // ✅ FIXED
  price,
  seatsAvailable
});
    await ride.save();

    res.status(201).json({
      message: "Ride created successfully",
      ride
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Error creating ride"
    });
  }
};

exports.getRides = async (req, res) => {
  try {
    const { fromCity, toCity, date } = req.query;

    let query = {};

    if (fromCity) {
      query.fromCity = fromCity.trim().toLowerCase();
    }

    if (toCity) {
      query.toCity = toCity.trim().toLowerCase();
    }

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = {
        $gte: start,
        $lte: end
      };
    }

    const rides = await Ride.find(query);

    res.json(rides);

  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};