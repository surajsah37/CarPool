// import { useState } from "react";
// import API from "../services/api";
// import RideCard from "../components/RideCard";

// function SearchRide() {

//   const [rides, setRides] = useState([]);

//   const loadRides = async () => {

//     try {

//       const res = await API.get("/rides");

//       setRides(res.data);

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   const bookRide = async (rideId) => {

//     try {

//       const user = JSON.parse(localStorage.getItem("user"));

//       await API.post("/bookings/book",{
//         rideId,
//         userId:user._id,
//         seatsBooked:1
//       });

//       alert("Ride booked successfully");

//     } catch (error) {

//       console.log(error);

//     }

//   };

//   return (

//     <div className="p-10 bg-gray-100 min-h-screen">

//       <h1 className="text-3xl font-bold mb-6">
//         Available Rides
//       </h1>

//       <button
//         onClick={loadRides}
//         className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Load Rides
//       </button>

//       {rides.map((ride) => (

//         <RideCard
//           key={ride._id}
//           ride={ride}
//           onBook={bookRide}
//         />

//       ))}

//     </div>

//   );

// }

// export default SearchRide;

import { useState } from "react";
import API from "../services/api";
import RideCard from "../components/RideCard";
import { useNavigate } from "react-router-dom";

function SearchRide() {

  const [rides, setRides] = useState([]);

  const navigate = useNavigate();

  const loadRides = async () => {

    try {

      const res = await API.get("/rides");

      setRides(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const bookRide = async (rideId) => {

    // check if user logged in
    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login first to book a ride");

      navigate("/login");

      return;

    }

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/bookings/book", {

        rideId,
        userId: user._id,
        seatsBooked: 1

      });

      alert("Ride booked successfully");

    } catch (error) {

      console.log(error);

      alert("Booking failed");

    }

  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Available Rides
      </h1>

      <button
        onClick={loadRides}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
      >
        Load Rides
      </button>

      {rides.map((ride) => (

        <RideCard
          key={ride._id}
          ride={ride}
          onBook={bookRide}
        />

      ))}

    </div>

  );

}

export default SearchRide;