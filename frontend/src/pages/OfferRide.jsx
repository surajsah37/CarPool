
import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function OfferRide() {

  //const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied. Admin only.");
      navigate("/");
    }
  }, []);
 
  const navigate = useNavigate();

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

      alert("Ride offered successfully");

      navigate("/search");

    } catch (error) {

      console.log(error);

      alert("Failed to offer ride");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Offer a Ride
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fromCity"
            placeholder="From City"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="text"
            name="toCity"
            placeholder="To City"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="number"
            name="seatsAvailable"
            placeholder="Seats Available"
            onChange={handleChange}
            className="w-full border p-2 mb-6 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Offer Ride
          </button>

        </form>

      </div>

    </div>

  );

}
export default OfferRide;

