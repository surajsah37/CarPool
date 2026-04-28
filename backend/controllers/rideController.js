const Ride = require("../models/Ride");
const Notification = require("../models/Notification");

// ✅ USER REQUEST RIDE
exports.offerRide = async (req, res) => {
  try {
    console.log("USER:", req.user);

    const { fromCity, toCity, date, seatsAvailable } = req.body;

    const ride = new Ride({
      fromCity: fromCity.trim().toLowerCase(),
      toCity: toCity.trim().toLowerCase(),
      date: new Date(date),
      seatsAvailable,
      user: req.user.id,
      status: "pending",
      price: 0
    });

    await ride.save(); // ✅ IMPORTANT

    res.json({ message: "Ride requested successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json("Error creating ride");
  }
};

// ✅ USER SEE ONLY APPROVED RIDES
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: "approved" });
    res.json(rides);
  } catch (error) {
    res.status(500).json("Error");
  }
};

// ✅ ADMIN SEE ALL RIDES
exports.getAllRidesAdmin = async (req, res) => {
  try {
    const rides = await Ride.find().populate("user", "email");
    res.json(rides);
  } catch (error) {
    res.status(500).json("Error");
  }
};

// ✅ APPROVE RIDE
exports.approveRide = async (req, res) => {
  try {
    const { id } = req.params;

    const ride = await Ride.findById(id);

    ride.status = "approved";
    await ride.save();

    const io = req.app.get("io");

    io.emit("notification", {
      message: `Ride approved successfully`
    });

    res.json({ message: "Approved" });

  } catch (error) {
    res.status(500).json("Error");
  }
};

// ✅ REJECT RIDE
exports.rejectRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const ride = await Ride.findById(id);

    ride.status = "rejected";
    ride.rejectionReason = reason;

    await ride.save();

    const io = req.app.get("io");

    io.emit("notification", {
      message: `Ride rejected: ${reason}`
    });

    res.json({ message: "Rejected" });

  } catch (error) {
    res.status(500).json("Error");
  }
};

// ✅ GET USER RIDES
exports.getMyRides = async (req, res) => {
  try {
    console.log("FETCH USER:", req.user);

    const rides = await Ride.find({ user: req.user.id });

    res.json(rides);

  } catch (error) {
    res.status(500).json("Error");
  }
};