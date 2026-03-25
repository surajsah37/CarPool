// import { useEffect, useState } from "react";
// import API from "../services/api";

// function MyBookings() {
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     try {
//       const res = await API.get("/bookings/my");
//       setBookings(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancel = async (bookingId) => {
//   try {
//     const reason = prompt("Enter reason for cancellation:");

//     if (!reason) return;

//     await API.delete(`/bookings/cancel/${bookingId}`, {
//       data: { reason }
//     });

//     alert("Booking cancelled");

//     fetchBookings();

//   } catch (error) {
//     console.log(error);
//     alert("Cancel failed");
//   }
// };
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         📖 My Bookings
//       </h2>

//       {bookings.length === 0 ? (
//         <div className="bg-white p-10 rounded-xl shadow text-center">
//           <p className="text-gray-500 text-lg">No bookings found</p>
//         </div>
//       ) : (

//         <div className="grid gap-5">

//           {bookings.map((b) => {

//             const totalPrice = b.ride?.price * b.seatsBooked;

//             return (
//               <div
//                 key={b._id}
//                 className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
//               >

//                 <div className="flex justify-between items-center">

//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {b.ride?.fromCity} → {b.ride?.toCity}
//                   </h3>

//                   <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
//                     Confirmed
//                   </span>

//                 </div>

//                 <p className="text-gray-500 mt-2">
//                   📅 {new Date(b.ride?.date).toLocaleDateString()}
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 mt-4">

//                   <div>
//                     <p className="text-gray-500 text-sm">Seats</p>
//                     <p className="font-semibold">{b.seatsBooked}</p>
//                   </div>

//                   <div>
//                     <p className="text-gray-500 text-sm">Price</p>
//                     <p className="font-semibold text-green-600">
//                       ₹ {totalPrice}
//                     </p>
//                   </div>

//                 </div>

//                 <hr className="my-4" />

//                 <div className="flex justify-between items-center">

//                   <p className="text-sm text-gray-400">
//                     Booking ID: {b._id.slice(-6).toUpperCase()}
//                   </p>

//                   <button
//                     onClick={() => handleCancel(b._id)}
//                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//                   >
//                     Cancel
//                   </button>

//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       )}

//     </div>
//   );
// }

// export default MyBookings;
import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ NEW STATES
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

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

  // ✅ OPEN MODAL
  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  // ✅ SUBMIT CANCEL
  const submitCancel = async () => {
    try {
      const finalReason = reason === "Other" ? customReason : reason;

      if (!finalReason) {
        alert("Please select reason");
        return;
      }

      // ✅ IMPORTANT CHANGE (PUT request)
      await API.put(`/bookings/cancel/${selectedBookingId}`, {
        reason: finalReason,
      });

      alert("Booking cancelled");

      setShowModal(false);
      setReason("");
      setCustomReason("");

      fetchBookings(); // refresh data
    // } catch (error) {
    //   console.log(error);
    //   alert("Cancel failed");
    // }
    }
    catch (error) {
  console.log("ERROR:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Cancel failed");
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

                  {/* ✅ STATUS FIX */}
                  <span className={`px-3 py-1 text-sm rounded-full 
                    ${b.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"}`}>
                    {b.status === "cancelled" ? "Cancelled" : "Confirmed"}
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

                {/* ✅ SHOW REASON */}
                {b.status === "cancelled" && (
                  <p className="text-red-500 mt-3">
                    Reason: {b.cancellationReason}
                  </p>
                )}

                <hr className="my-4" />

                <div className="flex justify-between items-center">

                  <p className="text-sm text-gray-400">
                    Booking ID: {b._id.slice(-6).toUpperCase()}
                  </p>

                  {/* ✅ HIDE BUTTON IF CANCELLED */}
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelClick(b._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg w-80">

            <h3 className="text-lg font-semibold mb-3">
              Select Reason
            </h3>

            <select
              onChange={(e) => setReason(e.target.value)}
              className="w-full border p-2 mb-3"
            >
              <option value="">Select reason</option>
              <option value="Plan changed">Plan changed</option>
              <option value="Found better ride">Found better ride</option>
              <option value="Driver issue">Driver issue</option>
              <option value="Other">Other</option>
            </select>

            {reason === "Other" && (
              <input
                type="text"
                placeholder="Enter custom reason"
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full border p-2 mb-3"
              />
            )}

            <div className="flex justify-between">
              <button
                onClick={submitCancel}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MyBookings;