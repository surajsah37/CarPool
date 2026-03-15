import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(`/bookings/mybookings/${user._id}`);

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadBookings();

  }, []);

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.map((booking) => (

        <div
          key={booking._id}
          className="bg-white shadow-lg rounded-lg p-6 mb-4"
        >

          <h2 className="text-xl font-bold">

            {booking.ride.fromCity} → {booking.ride.toCity}

          </h2>

          <p>Date: {booking.ride.date}</p>

          <p>Seats Booked: {booking.seatsBooked}</p>

          <p className="text-green-600 font-bold">

            ₹ {booking.ride.price}

          </p>

        </div>

      ))}

    </div>

  );

}

export default MyBookings;