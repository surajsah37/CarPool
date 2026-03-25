// import { useState } from "react";
// import API from "../services/api";

// function AdminRides() {

//   const [ride, setRide] = useState({
//     fromCity: "",
//     toCity: "",
//     date: "",
//     price: "",
//     seatsAvailable: ""
//   });

//   const handleChange = (e) => {
//     setRide({
//       ...ride,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const res = await API.post("/rides/offer", ride);

//       console.log("SUCCESS:", res.data);

//       alert("Ride created successfully");

//     } catch (error) {

//       console.log("ERROR:", error.response?.data);

//       alert(error.response?.data?.message || "Error creating ride");

//     }
//   };

//   return (
//     <div className="p-6">

//       <h2 className="text-2xl font-bold mb-4">Create Ride</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">

//         <input name="fromCity" placeholder="From" onChange={handleChange} required />
//         <input name="toCity" placeholder="To" onChange={handleChange} required />
//         <input type="date" name="date" onChange={handleChange} required />
//         <input name="price" placeholder="Price" onChange={handleChange} required />
//         <input name="seatsAvailable" placeholder="Seats" onChange={handleChange} required />

//         <button className="bg-blue-500 text-white p-2 rounded">
//           Create Ride
//         </button>

//       </form>

//     </div>
//   );
// }

// export default AdminRides;





import { useState } from "react";
import API from "../services/api";

function AdminRides() {

  const [ride, setRide] = useState({
    fromCity: "",
    toCity: "",
    date: "",
    price: "",
    seatsAvailable: ""
  });

  const handleChange = (e) => {
    setRide({
      ...ride,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/rides/offer", ride);
      alert("Ride created successfully");

      setRide({
        fromCity: "",
        toCity: "",
        date: "",
        price: "",
        seatsAvailable: ""
      });

    } catch (error) {
      alert(error.response?.data || "Error");
    }
  };

  return (
    <div className="flex justify-center mt-10">

      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Create Ride</h2>

        <input name="fromCity" placeholder="From City" onChange={handleChange} className="w-full border p-2 mb-3" />
        <input name="toCity" placeholder="To City" onChange={handleChange} className="w-full border p-2 mb-3" />
        <input type="date" name="date" onChange={handleChange} className="w-full border p-2 mb-3" />
        <input type="number" name="price" placeholder="Price (₹)" onChange={handleChange} className="w-full border p-2 mb-3" />
        <input type="number" name="seatsAvailable" placeholder="Seats" onChange={handleChange} className="w-full border p-2 mb-4" />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Create Ride
        </button>

      </form>
    </div>
  );
}

export default AdminRides;