function RideCard({ ride, onBook }) {

  return (

    <div className="bg-white shadow-lg rounded-lg p-6 mb-5">

      <h2 className="text-xl font-bold mb-2">
        {ride.fromCity} → {ride.toCity}
      </h2>

      <p className="text-gray-600">
        Date: {ride.date}
      </p>

      <p className="text-gray-600">
        Seats Available: {ride.seatsAvailable}
      </p>

      <p className="text-green-600 font-bold text-lg">
        ₹ {ride.price}
      </p>

      <button
        onClick={() => onBook(ride._id)}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Ride
      </button>

    </div>

  );

}

export default RideCard;