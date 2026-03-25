
const Ride = require("../models/Ride");
const Notification = require("../models/Notification");
// ✅ USER REQUEST RIDE
exports.offerRide = async (req, res) => {
  try {
    console.log("USER:", req.user); // DEBUG

    const { fromCity, toCity, date, seatsAvailable } = req.body;

    const ride = new Ride({
      fromCity: fromCity.trim().toLowerCase(),
      toCity: toCity.trim().toLowerCase(),
      date: new Date(date),
      seatsAvailable,
      user: req.user.id, // ✅ MUST SAVE USER
      status: "pending",
      price: 0
    });

    await ride.save();

    res.json({ message: "Ride request sent", ride });

  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
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

// ✅ APPROVE
// exports.approveRide = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { price } = req.body;

//     const ride = await Ride.findById(id);

//     ride.status = "approved";
//     ride.price = price;

//     await ride.save();

//     res.json({ message: "Approved" });

//   } catch (error) {
//     res.status(500).json("Error");
//   }
// };
exports.approveRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    const ride = await Ride.findById(id);

    ride.status = "approved";
    ride.price = price;

    await ride.save();

    // ✅ CREATE NOTIFICATION
    await Notification.create({
      user: ride.user,
      message: `Your ride from ${ride.fromCity} to ${ride.toCity} is approved. Price: ₹${price}`
    });

    res.json({ message: "Approved" });

  } catch (error) {
    res.status(500).json("Error");
  }
};
// exports.rejectRide = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;

//     console.log("🔥 RECEIVED REASON:", reason); // DEBUG

//     const ride = await Ride.findById(id);

//     if (!ride) {
//       return res.status(404).json("Ride not found");
//     }

//     ride.status = "rejected";
//     ride.rejectionReason = reason; // ✅ IMPORTANT

//     await ride.save();

//     console.log("🔥 SAVED:", ride.rejectionReason); // DEBUG

//     res.json({ message: "Ride rejected successfully", ride });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Error");
//   }
// };
exports.rejectRide = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const ride = await Ride.findById(id);

    ride.status = "rejected";
    ride.rejectionReason = reason;

    await ride.save();

    // ✅ CREATE NOTIFICATION
    await Notification.create({
      user: ride.user,
      message: `Your ride was rejected: ${reason}`
    });

    res.json({ message: "Rejected" });

  } catch (error) {
    res.status(500).json("Error");
  }
};
// ✅ GET USER RIDES (IMPORTANT)
exports.getMyRides = async (req, res) => {
  try {
    console.log("FETCH USER:", req.user);

    const rides = await Ride.find({ user: req.user.id });

    res.json(rides);

  } catch (error) {
    res.status(500).json("Error");
  }
};