import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
  try {
    const reason = prompt("Enter reason for cancellation:");

    if (!reason) return;

    await API.delete(`/bookings/cancel/${bookingId}`, {
      data: { reason }
    });

    alert("Booking cancelled");

    fetchBookings();

  } catch (error) {
    console.log(error);
    alert("Cancel failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📖 My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      ) : (

        <div className="grid gap-5">

          {bookings.map((b) => {

            const totalPrice = b.ride?.price * b.seatsBooked;

            return (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-semibold text-gray-800">
                    {b.ride?.fromCity} → {b.ride?.toCity}
                  </h3>

                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Confirmed
                  </span>

                </div>

                <p className="text-gray-500 mt-2">
                  📅 {new Date(b.ride?.date).toLocaleDateString()}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">

                  <div>
                    <p className="text-gray-500 text-sm">Seats</p>
                    <p className="font-semibold">{b.seatsBooked}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-semibold text-green-600">
                      ₹ {totalPrice}
                    </p>
                  </div>

                </div>

                <hr className="my-4" />

                <div className="flex justify-between items-center">

                  <p className="text-sm text-gray-400">
                    Booking ID: {b._id.slice(-6).toUpperCase()}
                  </p>

                  <button
                    onClick={() => handleCancel(b._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyBookings;