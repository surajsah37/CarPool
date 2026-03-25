import { useEffect, useState } from "react";
import API from "../services/api";

function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {

      const res = await API.get("/bookings/all");

      console.log("BOOKINGS:", res.data);

      setBookings(res.data);

    } catch (error) {
      console.log("ERROR:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 mb-3 shadow rounded">

            <p><b>User:</b> {b.user?.name}</p>
            <p><b>Route:</b> {b.ride?.fromCity} → {b.ride?.toCity}</p>
            <p><b>Date:</b> {b.ride?.date}</p>
            <p><b>Seats Booked:</b> {b.seatsBooked}</p>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminBookings;