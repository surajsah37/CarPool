import { useState } from "react";
import API from "../services/api";

function OfferRide() {

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

      const res = await API.post("/rides/offer", ride);

      alert("Ride Created Successfully");

      console.log(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{padding:"40px"}}>

      <h2>Offer a Ride</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="fromCity"
          placeholder="From City"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="toCity"
          placeholder="To City"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="date"
          name="date"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="seatsAvailable"
          placeholder="Seats"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">
          Offer Ride
        </button>

      </form>

    </div>

  );

}

export default OfferRide;