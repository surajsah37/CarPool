
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminRides() {

  const [rides, setRides] = useState([]);
  const [priceInput, setPriceInput] = useState({});
  const [rejectReason, setRejectReason] = useState({});

  const fetchRides = async () => {
    try {
      const res = await API.get("/rides/admin");
      setRides(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  // ✅ APPROVE
  const approveRide = async (id) => {
    const price = priceInput[id];

    if (!price) {
      alert("Enter price");
      return;
    }

    try {
      await API.put(`/rides/approve/${id}`, { price });
      alert("Ride Approved");
      fetchRides();
    } catch (error) {
      console.log(error);
      alert("Error approving ride");
    }
  };

  // ✅ REJECT
  const rejectRide = async (id) => {
    const reason = rejectReason[id];

    if (!reason) {
      alert("Enter reject reason");
      return;
    }

  //   try {
  //     await API.put(`/rides/reject/${id}`, { reason });
  //     alert("Ride Rejected");
  //     fetchRides();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error rejecting ride");
  //   }
  // };
   try {
    await API.put(`/rides/reject/${id}`, {
      reason: reason   // ✅ MUST SEND THIS
    });

    alert("Ride Rejected");
    fetchRides();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Admin Ride Requests
      </h2>

      {rides.length === 0 ? (
        <p>No rides found</p>
      ) : (
        rides.map((ride) => (
          <div
            key={ride._id}
            className="bg-white p-4 mb-4 shadow rounded"
          >

            <p>
              <b>{ride.fromCity} → {ride.toCity}</b>
            </p>

            <p>
              Date: {new Date(ride.date).toLocaleDateString()}
            </p>

            {/* ✅ STATUS COLOR */}
            <p className={`font-semibold 
              ${ride.status === "approved" ? "text-green-600" :
                ride.status === "rejected" ? "text-red-600" :
                "text-yellow-600"}`}>
              Status: {ride.status}
            </p>

            <p>User: {ride.user?.email}</p>

            {/* ✅ SHOW REJECTION REASON */}
            {ride.status === "rejected" && (
              <p className="text-red-500">
                Reason: {ride.rejectionReason}
              </p>
            )}

            {/* ✅ ACTIONS */}
            {ride.status === "pending" && (
              <div className="mt-3">

                {/* APPROVE */}
                <input
                  type="number"
                  placeholder="Set Price"
                  onChange={(e) =>
                    setPriceInput({
                      ...priceInput,
                      [ride._id]: e.target.value
                    })
                  }
                  className="border p-1 mr-2"
                />

                <button
                  onClick={() => approveRide(ride._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Approve
                </button>

                {/* REJECT */}
                <input
                  type="text"
                  placeholder="Reject reason"
                  onChange={(e) =>
                    setRejectReason({
                      ...rejectReason,
                      [ride._id]: e.target.value
                    })
                  }
                  className="border p-1 mr-2"
                />

                <button
                  onClick={() => rejectRide(ride._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

              </div>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default AdminRides;