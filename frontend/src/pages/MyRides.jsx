import { useEffect, useState } from "react";
import API from "../services/api";

function MyRides() {

  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    const res = await API.get("/rides/my");
    setRides(res.data);
  };

  const handleCancel = async (rideId) => {
    try {
      await API.delete(`/rides/${rideId}`);
      setRides(rides.filter(ride => ride._id !== rideId));
    } catch (error) {
      console.error("Error canceling ride:", error);
    }
  };

  return (
    <div className="p-9">

      <h2 className="text-2xl font-bold mb-6">
        My Ride Requests
      </h2>

      {rides.map((ride) => (
        <div key={ride._id} className="bg-white p-4 mb-4 shadow rounded">

          <p><b>{ride.fromCity} → {ride.toCity}</b></p>

          <p>Date: {new Date(ride.date).toLocaleDateString()}</p>

          <p>Status: {ride.status}</p>

          {ride.status === "rejected" && (
            <p style={{ color: "red" }}>
              Reason: {ride.rejectionReason}
            </p>
          )}

          {ride.status === "approved" && (
            <p style={{ color: "green" }}>
              Price: ₹ {ride.price}
            </p>
          )}

        </div>
      ))}

    </div>
  );
}


export default MyRides;