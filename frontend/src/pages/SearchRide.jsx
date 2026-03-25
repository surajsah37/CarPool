import { useState, useEffect } from "react";
import API from "../services/api";

function SearchRide() {
  const [filters, setFilters] = useState({
    fromCity: "",
    toCity: "",
    date: ""
  });

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({});

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await API.get("/rides", { params: filters });
      setRides(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleBooking = async (rideId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const seats = selectedSeats[rideId] || 1;

      await API.post("/bookings/book", {
        rideId,
        userId: user._id,
        seatsBooked: seats
      });

      alert("Ride booked successfully");
      handleSearch();

    } catch (error) {
      alert(error.response?.data || "Booking failed");
    }
  };

  const handleSeatChange = (rideId, value) => {
    setSelectedSeats({
      ...selectedSeats,
      [rideId]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🚗 Search Rides
      </h2>

      {/* 🔍 SEARCH BOX */}
      <div className="bg-white p-5 rounded-xl shadow-md flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          name="fromCity"
          placeholder="From City"
          onChange={handleChange}
          className="border p-3 rounded-lg w-full md:w-1/4 focus:outline-blue-500"
        />

        <input
          type="text"
          name="toCity"
          placeholder="To City"
          onChange={handleChange}
          className="border p-3 rounded-lg w-full md:w-1/4 focus:outline-blue-500"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-blue-500"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>

      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-blue-600 font-medium">Loading rides...</p>
      )}

      {/* ❌ NO RIDES */}
      {!loading && rides.length === 0 && (
        <p className="text-gray-500 text-lg">No rides found</p>
      )}

      {/* 🚗 RIDE CARDS */}
      <div className="grid gap-5">

        {rides.map((ride) => {

          const seats = selectedSeats[ride._id] || 1;

          return (
            <div
              key={ride._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >

              {/* ROUTE */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {ride.fromCity} → {ride.toCity}
                </h3>

                <span className="text-green-600 font-bold text-lg">
                  ₹ {ride.price}/seat
                </span>
              </div>

              {/* DETAILS */}
              <p className="text-gray-500 mt-1">
                📅 {new Date(ride.date).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mt-1">
                Seats Available: <b>{ride.seatsAvailable}</b>
              </p>

              {/* SEAT SELECT */}
              <div className="mt-4 flex items-center gap-4">

                <div>
                  <label className="text-gray-600 text-sm">
                    Select Seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={ride.seatsAvailable}
                    value={seats}
                    onChange={(e) =>
                      handleSeatChange(ride._id, Number(e.target.value))
                    }
                    className="border p-2 rounded-lg w-20 mt-1"
                  />
                </div>

                {/* TOTAL */}
                <div className="text-gray-700 mt-5">
                  Total: <b>₹ {ride.price * seats}</b>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleBooking(ride._id)}
                disabled={ride.seatsAvailable === 0}
                className={`mt-5 w-full py-3 rounded-lg text-white font-medium transition ${
                  ride.seatsAvailable === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {ride.seatsAvailable === 0 ? "Sold Out" : "Book Ride"}
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default SearchRide;


